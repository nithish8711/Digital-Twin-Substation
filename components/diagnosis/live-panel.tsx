"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { AlertTriangle, ChevronDown, ChevronRight, Clock } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"
import type { DiagnosisComponentKey, DiagnosisSeverity, ParameterState } from "@/lib/diagnosis/types"
import { cn } from "@/lib/utils"

const severityConfig: Record<
  DiagnosisSeverity,
  { label: string; className: string; indicator: string }
> = {
  normal: { label: "Normal", className: "bg-emerald-50 text-emerald-700", indicator: "bg-emerald-500" },
  warning: { label: "Warning", className: "bg-amber-50 text-amber-700", indicator: "bg-amber-500" },
  alarm: { label: "Alarm", className: "bg-orange-50 text-orange-700", indicator: "bg-orange-500" },
  trip: { label: "Trip", className: "bg-red-50 text-red-700", indicator: "bg-red-600" },
}

interface LivePanelProps {
  component: DiagnosisComponentKey
  parameterStates: ParameterState[]
  trendHistory: Record<string, number[]>
  liveTimestamp?: string
  liveSource?: string
}

export function LivePanel({ component, parameterStates, trendHistory, liveTimestamp, liveSource }: LivePanelProps) {
  const definition = COMPONENT_DEFINITIONS[component]
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  useEffect(() => {
    queueMicrotask(() => setExpandedKey(null))
  }, [component])

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Real-time Readings</CardTitle>
          <p className="text-sm text-slate-500">
            Live sensor data from equipment monitoring systems. Values update continuously to reflect current operating conditions. 
            Status indicators show if parameters are within normal operating ranges (Normal), require attention (Warning), need immediate action (Alarm), or indicate critical failure (Trip).
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {liveTimestamp ? new Date(liveTimestamp).toLocaleTimeString() : "N/A"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="max-h-[520px] overflow-auto rounded-b-2xl">
        <div className="min-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parameterStates.map((param) => {
              const severity = severityConfig[param.severity] ?? severityConfig.normal
              const definitionParam = definition.parameters.find((p) => p.key === param.key)
              const thresholdText =
                definitionParam?.minAlarm || definitionParam?.maxAlarm
                  ? `${definitionParam?.minAlarm ?? "-"} / ${definitionParam?.maxAlarm ?? "-"}`
                  : "—"
              const trend = trendHistory[param.key] ?? []
              // Use actual Firebase value - no animation/jitter
              const displayValue = param.value

              return (
                <Fragment key={param.key}>
                  <TableRow key={param.key}>
                    <TableCell>
                    <div className="font-semibold">{param.label}</div>
                  </TableCell>
                    <TableCell className="font-semibold">
                      {displayValue ?? "—"} {param.unit}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{thresholdText}</TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", severity.className)}>{severity.label}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {trend.length > 1 ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => setExpandedKey(expandedKey === param.key ? null : param.key)}
                          aria-label="Toggle trend view"
                        >
                          {expandedKey === param.key ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      ) : (
                        <div className="text-xs text-slate-400">No trend</div>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedKey === param.key && trend.length > 1 && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-slate-50">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
                            {param.label} trend (last {trend.length} samples)
                          </p>
                          <ResponsiveContainer width="100%" height={220}>
                            <LineChart
                              data={trend.map((value, index) => ({
                                sample: index + 1,
                                value,
                              }))}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="sample" tick={{ fontSize: 10 }} />
                              <YAxis tick={{ fontSize: 10 }} />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}

