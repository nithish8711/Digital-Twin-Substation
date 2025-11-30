import { NextResponse } from "next/server"

import { COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"
import { buildEventLog } from "@/lib/diagnosis/events"
import { buildMaintenancePanel } from "@/lib/diagnosis/maintenance"
import { deriveHealthMetrics } from "@/lib/diagnosis/health"
import { evaluateSeverity } from "@/lib/diagnosis/severity"
import type { DiagnosisComponentKey, DiagnosisSeverity } from "@/lib/diagnosis/types"
import { dispatchMaintenanceAlert } from "@/lib/server/diagnosis/maintenance-alerts"
import { invokePredictor } from "@/lib/server/diagnosis/python-runner"
import { fetchAssetMetadata, fetchLiveSnapshot } from "@/lib/server/diagnosis/live-data-service"

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
    const [liveSnapshot, assetMetadata] = await Promise.all([
      fetchLiveSnapshot(areaCode, substationId, component),
      fetchAssetMetadata(substationId ?? areaCode),
    ])

    const liveReadings = liveSnapshot.readings ?? {}
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
    // - Reduce Combined Fault Probability, Failure Predictor (XGBoost), and Fault Probability by 28 percentage points
    // - Increase Health Index by 28 points
    
    // Get raw values from prediction
    const rawFaultProbability = prediction.fault_probability ?? 0.3
    const rawXGBoostScore = prediction.XGBoost_FaultScore ?? 0
    const rawHealthIndex = prediction.health_index ?? 70
    
    // Adjust fault probabilities: reduce by 28 percentage points (0.28)
    const adjustedFaultProbability = Math.max(0, Math.min(1, rawFaultProbability - 0.28))
    const adjustedXGBoostScore = Math.max(0, Math.min(1, rawXGBoostScore - 0.28))
    
    // Adjust health index: increase by 28 points (clamped to 0-100)
    const adjustedHealthIndex = Math.max(0, Math.min(100, rawHealthIndex + 28))
    
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
      timeline_prediction: prediction.timeline_prediction,
      live_readings: liveReadings,
      asset_metadata: assetMetadata,
      timestamp: prediction.timestamp ?? new Date().toISOString(),
      parameter_states: parameterStates,
      live_status: liveSeverity,
      maintenance,
      health_breakdown: breakdown,
      events,
      trend_history: liveSnapshot.history,
      live_source: liveSnapshot.source,
      // Pass ML model scores from backend prediction (with adjusted XGBoost score)
      LSTM_ForecastScore: prediction.LSTM_ForecastScore,
      IsolationForestScore: prediction.IsolationForestScore,
      XGBoost_FaultScore: adjustedXGBoostScore,
      Top3_HealthImpactFactors: prediction.Top3_HealthImpactFactors,
    })
  } catch (error) {
    console.error("Diagnosis API failure", error)
    return NextResponse.json({ error: "Unable to process diagnosis request" }, { status: 500 })
  }
}

