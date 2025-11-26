import { NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import { getSimulationVideoBucket } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const simulationId = url.searchParams.get("simulationId")
    const componentType = url.searchParams.get("componentType") ?? "generic"

    if (!simulationId) {
      return new Response(JSON.stringify({ error: "simulationId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const contentType = request.headers.get("content-type") ?? "video/webm"
    const arrayBuffer = await request.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const bucket = await getSimulationVideoBucket()

    // Remove any existing video for this simulation
    const existing = await bucket
      .find({ "metadata.simulationId": simulationId })
      .toArray()
    for (const file of existing) {
      if (file._id) {
        await bucket.delete(new ObjectId(file._id))
      }
    }

    const uploadStream = bucket.openUploadStream(simulationId, {
      contentType,
      metadata: {
        simulationId,
        componentType,
      },
    })

    await new Promise<void>((resolve, reject) => {
      uploadStream.on("error", (err) => reject(err))
      uploadStream.on("finish", () => resolve())
      uploadStream.end(buffer)
    })

    const videoUrl = `/api/simulation-video?simulationId=${encodeURIComponent(simulationId)}`

    return new Response(JSON.stringify({ videoUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error saving simulation video to MongoDB:", error)
    return new Response(JSON.stringify({ error: "Failed to save simulation video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const simulationId = url.searchParams.get("simulationId")

    if (!simulationId) {
      return new Response("simulationId is required", { status: 400 })
    }

    const bucket = await getSimulationVideoBucket()
    const files = await bucket
      .find({ "metadata.simulationId": simulationId })
      .sort({ uploadDate: -1 })
      .limit(1)
      .toArray()

    if (!files.length) {
      return new Response("Video not found", { status: 404 })
    }

    const file = files[0]
    const stream = bucket.openDownloadStream(new ObjectId(file._id))

    const headers = new Headers()
    headers.set("Content-Type", file.contentType ?? "video/webm")
    headers.set("Accept-Ranges", "bytes")

    return new Response(stream as any, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error streaming simulation video from MongoDB:", error)
    return new Response("Failed to load simulation video", { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const simulationId = url.searchParams.get("simulationId")

    if (!simulationId) {
      return new Response(JSON.stringify({ error: "simulationId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const bucket = await getSimulationVideoBucket()
    const files = await bucket
      .find({ "metadata.simulationId": simulationId })
      .toArray()

    for (const file of files) {
      if (file._id) {
        await bucket.delete(new ObjectId(file._id))
      }
    }

    return new Response(JSON.stringify({ deleted: files.length }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error deleting simulation video from MongoDB:", error)
    return new Response(JSON.stringify({ error: "Failed to delete simulation video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


