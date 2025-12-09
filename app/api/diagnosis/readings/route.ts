import { NextResponse } from "next/server"
import { getCachedReadings, initializeCache, updateCacheForNewTimestamp, getLatestCachedTimestamp } from "@/lib/server/diagnosis/readings-cache"
import { getRealtimeDB, getLatestTimestampClient } from "@/lib/server/diagnosis/live-data-service"
import { initializeFirebaseAuth, getFirebaseUID } from "@/lib/firebase"
import { getFirebaseData } from "@/lib/server/diagnosis/live-data-service"
import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"

const isDiagnosisComponent = (value: string): value is DiagnosisComponentKey =>
  [
    "bayLines",
    "transformer",
    "circuitBreaker",
    "busbar",
    "isolator",
    "relay",
    "pmu",
    "gis",
    "battery",
    "environment",
  ].includes(value as DiagnosisComponentKey)

/**
 * Lightweight endpoint to fetch ONLY readings for a specific timestamp
 * No ML processing, no asset metadata - just raw readings
 * Used for efficient updates when timestamp changes
 */
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
  const componentType = body.componentType?.trim()
  const timestamp = body.timestamp?.trim() // Optional: if provided, use this timestamp

  if (!areaCode) {
    return NextResponse.json({ error: "areaCode is required" }, { status: 400 })
  }

  if (!componentType) {
    return NextResponse.json({ error: "componentType is required" }, { status: 400 })
  }

  const component: DiagnosisComponentKey = isDiagnosisComponent(componentType) ? componentType : "bayLines"

  try {
    // Initialize cache if not already done
    const cachedTimestamp = getLatestCachedTimestamp()
    if (!cachedTimestamp) {
      console.log("[Readings API] Cache not initialized, initializing...")
      await initializeCache(areaCode)
    }

    // If timestamp provided, use it directly; otherwise get latest from cache or Firebase
    let targetTimestamp = timestamp || getLatestCachedTimestamp()
    
    if (!targetTimestamp) {
      // Fallback: get from Firebase if cache is empty
      await initializeFirebaseAuth()
      const dbInfo = getRealtimeDB()
      
      if (!dbInfo) {
        return NextResponse.json({ error: "Realtime DB not available", readings: {}, timestamp: null }, { status: 500 })
      }
      
      const { isAdmin } = dbInfo
      const basePathPrefix = "Madurai_West_Substation"
      const uid = getFirebaseUID()
      const basePath = `${basePathPrefix}/${uid}`
      
      targetTimestamp = await getLatestTimestampClient(basePath, isAdmin)
      if (!targetTimestamp) {
        return NextResponse.json({
          readings: {},
          timestamp: null,
          areaCode,
          component,
        })
      }
      
      // Initialize cache with this timestamp
      await initializeCache(areaCode)
    }

    // Try to get from cache first
    let readings = getCachedReadings(component, targetTimestamp)
    
    // If not in cache, fetch and update cache
    if (!readings) {
      console.log(`[Readings API] Readings not in cache for ${component} at ${targetTimestamp}, fetching...`)
      await updateCacheForNewTimestamp(targetTimestamp, areaCode)
      readings = getCachedReadings(component, targetTimestamp)
    }
    
    return NextResponse.json({
      readings: readings || {},
      timestamp: targetTimestamp,
      areaCode,
      component,
    })
  } catch (error) {
    console.error("Readings API failure", error)
    return NextResponse.json({ 
      error: "Unable to get readings", 
      readings: {}, 
      timestamp: null 
    }, { status: 500 })
  }
}

