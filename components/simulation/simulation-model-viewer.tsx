"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModelViewer } from "@/components/live-trend/model-viewer"
import { useSimulation } from "./simulation-context"
import type { ComponentType } from "@/lib/analysis-config"

interface SimulationModelViewerProps {
  inputValues?: Record<string, number | string>
}

const MODEL_PATHS: Partial<Record<ComponentType, string>> = {
  transformer: "/models/transformer/transformer.glb",
  bayLines: "/models/bay-lines/bay-lines.glb",
  circuitBreaker: "/models/circuit-breaker/circuit-breaker.glb",
  isolator: "/models/isolator/isolator.glb",
  busbar: "/models/busbar/busbar.glb",
}

export function SimulationModelViewer({ inputValues = {} }: SimulationModelViewerProps) {
  const { selectedComponent } = useSimulation()

  // Generate glow data from input values for visual feedback
  const glowData = useMemo(() => {
    const glow: Record<string, number | string> = {}
    
    if (selectedComponent === "transformer") {
      if (inputValues.oilLevel && typeof inputValues.oilLevel === "number" && inputValues.oilLevel < 50) {
        glow.oilLevel = inputValues.oilLevel
      }
      if (inputValues.oilTemperature && typeof inputValues.oilTemperature === "number" && inputValues.oilTemperature > 85) {
        glow.oilTemperature = inputValues.oilTemperature
      }
      if (inputValues.windingTemperature && typeof inputValues.windingTemperature === "number" && inputValues.windingTemperature > 110) {
        glow.windingTemperature = inputValues.windingTemperature
      }
      if (inputValues.hydrogenPPM && typeof inputValues.hydrogenPPM === "number" && inputValues.hydrogenPPM > 300) {
        glow.hydrogenPPM = inputValues.hydrogenPPM
      }
    } else if (selectedComponent === "bayLines") {
      if (inputValues.ctBurdenPercent && typeof inputValues.ctBurdenPercent === "number" && inputValues.ctBurdenPercent > 80) {
        glow.ctBurdenPercent = inputValues.ctBurdenPercent
      }
      if (inputValues.frequencyHz && typeof inputValues.frequencyHz === "number" && (inputValues.frequencyHz < 49.7 || inputValues.frequencyHz > 50.3)) {
        glow.frequencyHz = inputValues.frequencyHz
      }
    } else if (selectedComponent === "circuitBreaker") {
      if (inputValues.sf6DensityPercent && typeof inputValues.sf6DensityPercent === "number" && inputValues.sf6DensityPercent < 90) {
        glow.sf6DensityPercent = inputValues.sf6DensityPercent
      }
    } else if (selectedComponent === "busbar") {
      if (inputValues.busbarTemperature && typeof inputValues.busbarTemperature === "number" && inputValues.busbarTemperature > 100) {
        glow.busbarTemperature = inputValues.busbarTemperature
      }
      if (inputValues.busbarLoadPercent && typeof inputValues.busbarLoadPercent === "number" && inputValues.busbarLoadPercent > 120) {
        glow.busbarLoadPercent = inputValues.busbarLoadPercent
      }
    }
    
    return glow
  }, [selectedComponent, inputValues])

  const modelPath = MODEL_PATHS[selectedComponent as ComponentType] ?? null

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>3D Model View</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0">
        <ModelViewer
          modelPath={modelPath}
          className="w-full h-full"
          componentType={selectedComponent as any}
          useFallback={!modelPath}
          glowData={glowData}
          showGlow={Object.keys(glowData).length > 0}
        />
      </CardContent>
    </Card>
  )
}

