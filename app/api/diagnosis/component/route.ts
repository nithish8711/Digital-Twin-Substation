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
  const body = await request.json()
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

    const { score, breakdown } = deriveHealthMetrics({
      pythonHealth: prediction.health_index ?? 70,
      faultProbability: prediction.fault_probability ?? 0.3,
      installationYear: assetMetadata?.master?.installationYear,
      maintenanceCount: (assetMetadata?.maintenanceHistory ?? []).length,
      parameterStates,
      environmentReadings: component === "environment" ? liveReadings : undefined,
    })

    const maintenance = buildMaintenancePanel({
      component,
      assetMetadata,
      parameterStates,
      faultProbability: prediction.fault_probability ?? 0,
      healthScore: score,
    })

    const events = buildEventLog({
      component: definition.title,
      faultProbability: prediction.fault_probability ?? 0,
      predictedFault: prediction.predicted_fault ?? "Normal",
      parameterStates,
    })

    // Fire-and-forget alert push
    dispatchMaintenanceAlert({
      substationId,
      areaCode,
      componentType: component,
      fault: prediction.predicted_fault ?? "Normal",
      severity: liveSeverity,
      faultProbability: prediction.fault_probability ?? 0,
      healthIndex: score,
    }).catch((error) => {
      console.warn("Unable to push maintenance alert", error)
    })

    return NextResponse.json({
      component,
      areaCode,
      substationId,
      fault_probability: prediction.fault_probability,
      health_index: score,
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
    })
  } catch (error) {
    console.error("Diagnosis API failure", error)
    return NextResponse.json({ error: "Unable to process diagnosis request" }, { status: 500 })
  }
}

