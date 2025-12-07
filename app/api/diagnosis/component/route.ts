import { NextResponse } from "next/server"

import { COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"
import { buildEventLog } from "@/lib/diagnosis/events"
import { buildMaintenancePanel } from "@/lib/diagnosis/maintenance"
import { deriveHealthMetrics } from "@/lib/diagnosis/health"
import { evaluateSeverity } from "@/lib/diagnosis/severity"
import type { DiagnosisComponentKey, DiagnosisSeverity } from "@/lib/diagnosis/types"
import { dispatchMaintenanceAlert } from "@/lib/server/diagnosis/maintenance-alerts"
import { invokePredictor } from "@/lib/server/diagnosis/python-runner"
import { fetchAssetMetadata } from "@/lib/server/diagnosis/live-data-service"
import { getCachedReadings, initializeCache, getLatestCachedTimestamp } from "@/lib/server/diagnosis/readings-cache"

const severityRank: DiagnosisSeverity[] = ["normal", "warning", "alarm", "trip"]

const isDiagnosisComponent = (value: string): value is DiagnosisComponentKey =>
  [
    "bayLines",
    "transformer",
    "circuitBreaker",
    "busbar",
    "isolator",
    "relay",
    "pmu",
    "gis",
    "battery",
    "environment",
  ].includes(value as DiagnosisComponentKey)

export async function POST(request: Request) {
  let body: any = {}
  try {
    const text = await request.text()
    if (text) {
      body = JSON.parse(text)
    }
  } catch (error) {
    console.error("Failed to parse request body", error)
    return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
  }
  
  const areaCode = body.areaCode?.trim()
  const substationId = body.substationId?.trim() || areaCode
  const componentType = body.componentType?.trim()

  if (!areaCode) {
    return NextResponse.json({ error: "areaCode is required" }, { status: 400 })
  }

  const component: DiagnosisComponentKey = isDiagnosisComponent(componentType) ? componentType : "bayLines"
  const definition = COMPONENT_DEFINITIONS[component]

  try {
    // Initialize cache if not already done
    const cachedTimestamp = getLatestCachedTimestamp()
    if (!cachedTimestamp) {
      console.log("[Component API] Cache not initialized, initializing...")
      await initializeCache(areaCode)
    }

    // Get readings from cache instead of fetching from Firebase
    const cachedReadings = getCachedReadings(component)
    const liveReadings = cachedReadings || {}
    const liveTimestamp = getLatestCachedTimestamp() || new Date().toISOString()

    // Fetch asset metadata (this is separate from readings)
    const assetMetadata = await fetchAssetMetadata(substationId ?? areaCode)
    const prediction = await invokePredictor({
      component,
      areaCode,
      substationId,
      liveReadings,
      assetMetadata,
    })

    const parameterStates = definition.parameters.map((param) => {
      const value = liveReadings?.[param.key] ?? null
      const severity = evaluateSeverity(value as number | string | null, param)
      return {
        key: param.key,
        label: param.label,
        value,
        unit: param.unit,
        severity,
        minAlarm: param.minAlarm,
        maxAlarm: param.maxAlarm,
      }
    })

    const liveSeverity =
      parameterStates.reduce<DiagnosisSeverity>(
        (acc, current) =>
          severityRank.indexOf(current.severity) > severityRank.indexOf(acc) ? current.severity : acc,
        "normal"
      ) ?? "normal"

    // Adjust values as per requirements:
    // - Reduce Fault Probability, XGBoost, and Combined Fault Probability by 15 for all except isolator (5 for isolator)
    // - Increase Health Index by 25 for all except isolator (5 for isolator)
    // - LSTM: if negative, decrease it (not increase)
    
    // Get raw values from prediction
    const rawFaultProbability = prediction.fault_probability ?? 0.3
    const rawXGBoostScore = prediction.XGBoost_FaultScore ?? 0
    const rawHealthIndex = prediction.health_index ?? 70
    const rawLSTMScore = prediction.LSTM_ForecastScore ?? 0
    
    // Component-specific adjustments
    const isIsolator = component === "isolator"
    const faultProbabilityAdjustment = isIsolator ? 0.05 : 0.15  // 5% for isolator, 15% for others
    const healthIndexAdjustment = isIsolator ? 5 : 25  // 5 points for isolator, 25 for others
    
    // Adjust fault probabilities: reduce by adjustment percentage
    const adjustedFaultProbability = Math.max(0, Math.min(1, rawFaultProbability - faultProbabilityAdjustment))
    const adjustedXGBoostScore = Math.max(0, Math.min(1, rawXGBoostScore - faultProbabilityAdjustment))
    
    // Adjust health index: increase by adjustment points (clamped to 0-100)
    const adjustedHealthIndex = Math.max(0, Math.min(100, rawHealthIndex + healthIndexAdjustment))
    
    // Adjust LSTM: if negative, decrease it (multiply by a factor to decrease magnitude)
    let adjustedLSTMScore = rawLSTMScore
    if (rawLSTMScore < 0) {
      adjustedLSTMScore = rawLSTMScore * 0.8  // Decrease negative value by 20%
    }
    
    // Use adjusted health_index
    const healthIndex = adjustedHealthIndex
    
    // Still calculate breakdown for backward compatibility, but use adjusted backend health_index as primary
    const { score: _, breakdown } = deriveHealthMetrics({
      pythonHealth: healthIndex,
      faultProbability: adjustedFaultProbability,
      installationYear: assetMetadata?.master?.installationYear,
      maintenanceCount: (assetMetadata?.maintenanceHistory ?? []).length,
      parameterStates,
      environmentReadings: component === "environment" ? liveReadings : undefined,
    })

    const maintenance = buildMaintenancePanel({
      component,
      assetMetadata,
      parameterStates,
      faultProbability: adjustedFaultProbability,
      healthScore: healthIndex,
    })

    const events = buildEventLog({
      component: definition.title,
      faultProbability: adjustedFaultProbability,
      predictedFault: prediction.predicted_fault ?? "Normal",
      parameterStates,
    })

    // Fire-and-forget alert push (use adjusted values)
    dispatchMaintenanceAlert({
      substationId,
      areaCode,
      componentType: component,
      fault: prediction.predicted_fault ?? "Normal",
      severity: liveSeverity,
      faultProbability: adjustedFaultProbability,
      healthIndex: healthIndex,
    }).catch((error) => {
      console.warn("Unable to push maintenance alert", error)
    })

    return NextResponse.json({
      component,
      areaCode,
      substationId,
      fault_probability: adjustedFaultProbability,
      health_index: healthIndex,
      predicted_fault: prediction.predicted_fault,
      affected_subpart: prediction.affected_subpart,
      explanation: prediction.explanation,
      timeline_prediction: (prediction.timeline_prediction || []).map((val: number) => 
        val < 0 ? val * 0.8 : val  // Decrease negative values in timeline
      ),
      live_readings: liveReadings,
      asset_metadata: assetMetadata,
      timestamp: liveTimestamp,
      parameter_states: parameterStates,
      live_status: liveSeverity,
      maintenance,
      health_breakdown: breakdown,
      events,
      trend_history: {}, // History can be generated from cache if needed
      live_source: "firebase",
      // Pass ML model scores from backend prediction (with adjusted scores)
      LSTM_ForecastScore: adjustedLSTMScore,
      IsolationForestScore: prediction.IsolationForestScore,
      XGBoost_FaultScore: adjustedXGBoostScore,
      Top3_HealthImpactFactors: prediction.Top3_HealthImpactFactors,
    })
  } catch (error) {
    console.error("Diagnosis API failure", error)
    return NextResponse.json({ error: "Unable to process diagnosis request" }, { status: 500 })
  }
}

