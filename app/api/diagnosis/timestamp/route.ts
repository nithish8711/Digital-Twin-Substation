import { NextResponse } from "next/server"
import { getRealtimeDB, getFirebaseData } from "@/lib/server/diagnosis/live-data-service"
import { initializeFirebaseAuth, getFirebaseUID } from "@/lib/firebase"
import { updateCacheForNewTimestamp, getLatestCachedTimestamp } from "@/lib/server/diagnosis/readings-cache"

/**
 * Get the latest timestamp for readings without fetching the full data
 * This is a lightweight endpoint to check if new readings are available
 */
async function getLatestTimestampClient(
  basePath: string,
  isAdmin: boolean,
): Promise<string | null> {
  try {
    const readingsPath = `${basePath}/readings`
    
    const timestamps = await getFirebaseData(readingsPath, isAdmin)
    
    if (!timestamps || typeof timestamps !== "object") {
      return null
    }
    
    const keys = Object.keys(timestamps)
    const numericTimestamps = keys.map(Number).filter(ts => !isNaN(ts))
    
    if (numericTimestamps.length === 0) {
      const sortedKeys = keys.sort()
      return sortedKeys.length > 0 ? sortedKeys[sortedKeys.length - 1] : null
    }
    
    const latestTs = Math.max(...numericTimestamps)
    return String(latestTs)
  } catch (error) {
    console.error("[getLatestTimestampClient] Failed to get latest timestamp", error)
    return null
  }
}

export async function POST(request: Request) {
  let body: any = {}
  try {
    const text = await request.text()
    if (text) {
      body = JSON.parse(text)
    }
  } catch (error) {
    console.error("Failed to parse request body", error)
    return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
  }
  
  const areaCode = body.areaCode?.trim()
  
  if (!areaCode) {
    return NextResponse.json({ error: "areaCode is required" }, { status: 400 })
  }

  try {
    await initializeFirebaseAuth()
    const dbInfo = getRealtimeDB()
    
    if (!dbInfo) {
      return NextResponse.json({ timestamp: null, error: "Realtime DB not available" })
    }
    
    const { isAdmin } = dbInfo
    const basePathPrefix = "Madurai_West_Substation"
    const uid = getFirebaseUID()
    const basePath = `${basePathPrefix}/${uid}`
    
    const latestTimestamp = await getLatestTimestampClient(basePath, isAdmin)
    
    // If we have a new timestamp, update the cache with all readings
    const cachedTimestamp = getLatestCachedTimestamp()
    if (latestTimestamp && latestTimestamp !== cachedTimestamp) {
      console.log(`[Timestamp API] New timestamp detected: ${latestTimestamp}, updating cache...`)
      await updateCacheForNewTimestamp(latestTimestamp, areaCode)
    }
    
    return NextResponse.json({
      timestamp: latestTimestamp,
      areaCode,
    })
  } catch (error) {
    console.error("Timestamp API failure", error)
    return NextResponse.json({ error: "Unable to get timestamp", timestamp: null }, { status: 500 })
  }
}

