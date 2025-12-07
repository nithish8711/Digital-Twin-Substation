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

    console.log("[Simulation ML API] Request received:", { componentType, substationId, inputKeys: Object.keys(inputValues) })

    if (!SUPPORTED_COMPONENTS.includes(componentType)) {
      console.warn("[Simulation ML API] Unsupported component:", componentType)
      return NextResponse.json({ error: "Unsupported componentType" }, { status: 400 })
    }

    if (!substationId) {
      console.warn("[Simulation ML API] Missing substationId")
      return NextResponse.json({ error: "substationId is required" }, { status: 400 })
    }

    // Map frontend field names to backend expected field names
    const mappedInputValues = mapInputFieldsToBackend(componentType, inputValues)
    console.log("[Simulation ML API] Mapped input values:", { originalKeys: Object.keys(inputValues), mappedKeys: Object.keys(mappedInputValues) })

    console.log("[Simulation ML API] Invoking predictor...")
    const prediction = await invokeSimulationPredictor({
      componentType,
      substationId,
      inputValues: mappedInputValues,
    })

    console.log("[Simulation ML API] Prediction received:", { 
      keys: Object.keys(prediction),
      hasTrueHealth: "trueHealth" in prediction,
      hasOverallHealth: "overallHealth" in prediction,
      sampleValues: Object.fromEntries(Object.entries(prediction).slice(0, 5))
    })

    if (!prediction || typeof prediction !== "object") {
      console.error("[Simulation ML API] Invalid prediction format:", prediction)
      return NextResponse.json(
        { error: "Invalid prediction format from ML model" },
        { status: 500 }
      )
    }

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("[Simulation ML API] Predictor failed:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    // Log full error details for debugging
    console.error("[Simulation ML API] Error details:", {
      message: errorMessage,
      stack: errorStack,
      errorType: error?.constructor?.name,
    })
    
    return NextResponse.json(
      { 
        error: "Unable to run simulation predictor",
        details: errorMessage,
        ...(process.env.NODE_ENV === "development" && errorStack ? { stack: errorStack } : {})
      }, 
      { status: 500 }
    )
  }
}




