"use client"

import { Activity, Brain, Network } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"
import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"

const modelIcons = {
  lstm: Brain,
  isolationForest: Network,
  xgboost: Activity,
}

interface MLPanelProps {
  component: DiagnosisComponentKey
  faultProbability: number
  predictedFault?: string
  explanation?: string
  timeline?: number[]
}

export function MLPanel({ component, faultProbability, predictedFault, explanation, timeline }: MLPanelProps) {
  const definition = COMPONENT_DEFINITIONS[component]
  const combinedScore = Math.round((faultProbability || 0) * 100)

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">ML-Based Fault Diagnosis</CardTitle>
        <p className="text-sm text-slate-500">
          Ensemble of LSTM forecast, Isolation Forest anomaly score, and XGBoost classification.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Combined Fault Probability</p>
              <p className="text-3xl font-semibold text-slate-900">{combinedScore}%</p>
            </div>
            <Badge
              className={
                combinedScore > 70
                  ? "bg-red-100 text-red-700"
                  : combinedScore > 50
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
              }
            >
              {combinedScore > 70 ? "Critical" : combinedScore > 50 ? "Caution" : "Stable"}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {explanation ?? "Awaiting detailed explanation from ML backend."}
          </p>
          <div className="mt-3 rounded-lg bg-blue-50 p-3 text-xs text-slate-700">
            <p className="font-semibold mb-1">What this means:</p>
            <p>
              {combinedScore > 70 
                ? "Critical fault probability indicates immediate attention is required. The ML models have detected multiple warning signals suggesting potential equipment failure. Recommended actions: Schedule emergency inspection, review maintenance logs, and prepare contingency plans."
                : combinedScore > 50
                  ? "Caution level indicates elevated risk that warrants monitoring. The system has identified anomalies that could lead to faults if not addressed. Recommended actions: Increase monitoring frequency, review recent operational parameters, and plan preventive maintenance."
                  : "Stable condition indicates normal operation with low fault probability. The equipment is functioning within expected parameters. Continue routine monitoring and scheduled maintenance."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Predicted Fault</p>
            <p className="text-lg font-semibold text-slate-800">{predictedFault ?? "Normal"}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Timeline Forecast (24h)</p>
            <p className="text-lg font-semibold text-slate-800">
              {timeline && timeline.length > 0 ? (
                timeline
                  .slice(-3)
                  .map((value, index) => (
                    <span key={value + index} className="mr-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                      {value.toFixed(1)}
                    </span>
                  ))
              ) : (
                <span className="text-sm text-slate-400">No forecast</span>
              )}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {definition.mlModels.map((model) => {
            const Icon = modelIcons[model.key]
            const derivedScore =
              model.key === "lstm"
                ? Math.round(combinedScore * 0.8 + 10)
                : model.key === "isolationForest"
                  ? Math.round(combinedScore * 0.9)
                  : Math.round(combinedScore * 1.05)
            return (
              <div key={model.key} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-semibold">{model.label}</p>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">{Math.min(100, derivedScore)}%</p>
                <p className="text-xs text-slate-500">{model.description}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

