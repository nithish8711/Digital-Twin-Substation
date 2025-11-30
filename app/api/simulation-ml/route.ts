import { NextResponse } from "next/server"

import type { ComponentType } from "@/lib/analysis-config"
import { invokeSimulationPredictor } from "@/lib/server/simulation/python-ml-runner"
import { mapInputFieldsToBackend } from "@/lib/server/simulation/field-mapping"

const SUPPORTED_COMPONENTS: ComponentType[] = ["transformer", "bayLines", "circuitBreaker", "isolator", "busbar"]

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const componentType = (body.componentType ?? "").trim() as ComponentType
    const substationId = (body.substationId ?? "").trim()
    const inputValues = (body.inputValues ?? {}) as Record<string, any>

    if (!SUPPORTED_COMPONENTS.includes(componentType)) {
      return NextResponse.json({ error: "Unsupported componentType" }, { status: 400 })
    }

    if (!substationId) {
      return NextResponse.json({ error: "substationId is required" }, { status: 400 })
    }

    // Map frontend field names to backend expected field names
    const mappedInputValues = mapInputFieldsToBackend(componentType, inputValues)

    const prediction = await invokeSimulationPredictor({
      componentType,
      substationId,
      inputValues: mappedInputValues,
    })

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Simulation ML predictor failed", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { 
        error: "Unable to run simulation predictor",
        details: errorMessage 
      }, 
      { status: 500 }
    )
  }
}




