"use client"

import { Shield } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface HealthPanelProps {
  healthIndex: number
  breakdown: {
    mlImpact: number
    agingFactor: number
    maintenanceGap: number
    driftScore: number
    environmentalStress: number
  }
}

export function HealthPanel({ healthIndex, breakdown }: HealthPanelProps) {
  const stressors = [
    { label: "ML Impact", value: breakdown.mlImpact },
    { label: "Asset Aging", value: breakdown.agingFactor },
    { label: "Maintenance Gap", value: breakdown.maintenanceGap },
    { label: "Real-time Drift", value: breakdown.driftScore },
    { label: "Environmental Stress", value: breakdown.environmentalStress },
  ]

  const severity =
    healthIndex < 40 ? "bg-red-100 text-red-700" : healthIndex < 60 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>Health Index</CardTitle>
          <p className="text-sm text-slate-500">Blends ML scores, maintenance gaps, drift, and ambient stress.</p>
        </div>
        <Shield className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Overall Health</p>
              <p className="text-3xl font-semibold text-slate-900">{Math.round(healthIndex)}%</p>
            </div>
            <Badge className={severity}>{healthIndex < 40 ? "Alert" : healthIndex < 60 ? "Watch" : "Healthy"}</Badge>
          </div>
          <Progress value={healthIndex} className="mt-4 h-2 bg-slate-100" />
        </div>

        <div className="space-y-3">
          {stressors.map((item) => {
            const descriptions: Record<string, string> = {
              "ML Impact": "Machine learning models analyze historical patterns and predict potential issues. Higher values indicate increased risk detected by AI algorithms.",
              "Asset Aging": "Natural degradation over time based on installation date and operational hours. Older equipment typically shows higher aging factors.",
              "Maintenance Gap": "Time since last maintenance or deviation from recommended maintenance schedule. Larger gaps increase failure risk.",
              "Real-time Drift": "Deviation from normal operating parameters detected in live sensor readings. Persistent drift may indicate developing faults.",
              "Environmental Stress": "External factors like temperature, humidity, and load conditions affecting equipment performance. Extreme conditions accelerate wear.",
            }
            return (
              <div key={item.label} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <Progress value={Math.min(100, item.value)} className="mt-2 h-1.5" />
                <p className="mt-2 text-xs text-slate-500">{descriptions[item.label] || ""}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

