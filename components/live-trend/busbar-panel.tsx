"use client"

import { useState } from "react"

import { useLiveData, dataGenerators } from "@/hooks/use-live-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParameterDisplay } from "./parameter-display"
import { ParameterDetailSection } from "./parameter-detail-section"
import { buildParameterConfigs } from "./parameter-utils"

export function BusbarPanel() {
  const data = useLiveData("busbar", dataGenerators.busbar)
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null)

  const preferredOrder = ["busVoltage", "busCurrent", "busbarTemperature", "busbarLoad", "jointHotspotTemp", "impedanceMicroOhm"]
  const resolvedData = data as Record<string, number | string | null | undefined>
  const parameters = buildParameterConfigs(resolvedData, preferredOrder)

  const handleToggle = (key: string) => {
    setSelectedParameter((prev) => (prev === key ? null : key))
  }

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Busbar Live Parameters</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {parameters.map((param) => {
            const value = resolvedData[param.key]
            const expanded = selectedParameter === param.metadataKey

            return (
              <div key={param.metadataKey} className="space-y-3">
                <ParameterDisplay
                  label={param.label}
                  value={value}
                  unit={param.unit}
                  parameterKey={param.metadataKey}
                  onDetailClick={handleToggle}
                  isExpanded={expanded}
                />

                {expanded && (
                  <div className="border-t pt-4">
                    <ParameterDetailSection
                      parameterKey={param.metadataKey}
                      currentValue={value ?? "—"}
                      unit={param.unit}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

