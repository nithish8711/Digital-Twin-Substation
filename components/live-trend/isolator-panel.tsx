"use client"

import { useState } from "react"
import { useLiveData, dataGenerators } from "@/hooks/use-live-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParameterDetailSection } from "./parameter-detail-section"
import { ParameterDisplay } from "./parameter-display"
import { buildParameterConfigs } from "./parameter-utils"

export function IsolatorPanel() {
  const data = useLiveData("isolator", dataGenerators.isolator)
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null)

  const resolvedData = data as Record<string, number | string | null | undefined>
  const parameters = buildParameterConfigs(
    resolvedData,
    ["status", "driveTorque", "operatingTime", "contactResistance", "motorCurrent"],
    { alias: { status: "isolatorStatus" } },
  )

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Isolator Live Parameters</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-3">
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
                  onDetailClick={(key) => setSelectedParameter((prev) => (prev === key ? null : key))}
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
