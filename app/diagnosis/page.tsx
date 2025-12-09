"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { AlertCircle, ShieldAlert } from "lucide-react"

import { DiagnosisSearchBar } from "@/components/diagnosis/diagnosis-search-bar"
import { HealthPanel } from "@/components/diagnosis/health-panel"
import { LivePanel } from "@/components/diagnosis/live-panel"
import { MaintenancePanel } from "@/components/diagnosis/maintenance-panel"
import { MLPanel } from "@/components/diagnosis/ml-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { DiagnosisApiResponse } from "@/lib/diagnosis/types"
import { useToast } from "@/hooks/use-toast"
import { useDiagnosisNav } from "@/components/diagnosis/diagnosis-context"
import type { DummySubstation } from "@/lib/dummy-data"
import { getSubstationByCodeFromFirebase } from "@/lib/firebase-data"
import { getFaultProbabilityTextClass } from "@/lib/simulation-color-coding"
import { cn } from "@/lib/utils"
import { DataSourceToggle } from "@/components/scada/data-source-toggle"
import { useDataSource } from "@/lib/scada/data-source-context"
import { useScadaData } from "@/hooks/use-scada-data"
import { COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"

const severityTone: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-emerald-100 text-emerald-700" },
  warning: { label: "Warning", className: "bg-amber-100 text-amber-700" },
  alarm: { label: "Alarm", className: "bg-orange-100 text-orange-700" },
  trip: { label: "Trip", className: "bg-red-100 text-red-700" },
}

// Client-side cache for diagnosis data to speed up component switching
const diagnosisCache = new Map<string, { data: DiagnosisApiResponse; timestamp: number }>()
const CACHE_TTL = 60000 // 60 seconds cache TTL

function getCacheKey(areaCode: string, substationId: string, component: string): string {
  return `${areaCode}-${substationId}-${component}`
}

export default function DiagnosisPage() {
  const { activeComponent } = useDiagnosisNav()
  const { dataSource } = useDataSource()
  const scadaData = useScadaData()
  const [areaInput, setAreaInput] = useState("")
  const [query, setQuery] = useState<{ areaCode: string; substationId: string } | null>(null)
  const [data, setData] = useState<DiagnosisApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState(0)
  const [masterDetails, setMasterDetails] = useState<DummySubstation["master"] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const isInitialFetch = useRef(true)
  const previousComponentRef = useRef<string | null>(null)
  const scadaDataRef = useRef(scadaData)
  const activeComponentRef = useRef(activeComponent)

  // Keep refs updated with latest values so polling function always has current values
  useEffect(() => {
    scadaDataRef.current = scadaData
    activeComponentRef.current = activeComponent
  }, [scadaData, activeComponent])

  // Handle data source switching - reset state when switching between SCADA and Firebase
  const previousDataSourceRef = useRef<typeof dataSource | null>(null)
  useEffect(() => {
    const dataSourceChanged = previousDataSourceRef.current !== null && previousDataSourceRef.current !== dataSource
    if (dataSourceChanged) {
      console.log(`[DiagnosisPage] Data source changed from ${previousDataSourceRef.current} to ${dataSource}`)
      // Clear data and reset component tracking when switching data sources
      setData(null)
      setError(null)
      previousComponentRef.current = null // Reset component tracking so new mode treats it as initial load
      setIsLoading(false)
      
      // Clear query when switching to SCADA (SCADA doesn't need area/substation selection)
      if (dataSource === "scada") {
        setQuery(null)
        setAreaInput("")
      }
    }
    // Initialize on first mount
    if (previousDataSourceRef.current === null) {
      previousDataSourceRef.current = dataSource
    } else if (dataSourceChanged) {
      previousDataSourceRef.current = dataSource
    }
  }, [dataSource])

  useEffect(() => {
    // In SCADA mode, fetch data directly from SCADA
    if (dataSource === "scada") {
      console.log(`[DiagnosisPage] SCADA mode active, component: ${activeComponent}`)
      
      // Check if component changed - do this check here but don't update ref yet
      const componentChanged = previousComponentRef.current !== activeComponent
      const isInitialLoad = previousComponentRef.current === null
      
      // Clear data when component changes or on initial load
      if (componentChanged || isInitialLoad) {
        setData(null)
        setError(null)
      }
      
      // Wait for SCADA data to be available (only on initial mount or component change)
      if ((componentChanged || isInitialLoad) && !scadaData.data && !scadaData.rawData) {
        if (scadaData.isLoading) {
          setIsLoading(true)
          setError(null)
        } else if (scadaData.error) {
          setIsLoading(false)
          setError(`SCADA connection error: ${scadaData.error}`)
        }
        // Don't return - let the polling function handle it
      }

      const fetchScadaDiagnosis = async () => {
        try {
          setError(null)
          // Get latest component from ref (always current, even from polling interval)
          const currentActiveComponent = activeComponentRef.current
          const currentComponentChanged = previousComponentRef.current !== currentActiveComponent
          
          // Only show loading on initial fetch, component change, or when no data exists
          if (currentComponentChanged || !data) {
            setIsLoading(true)
            console.log(`[DiagnosisPage] Fetching SCADA diagnosis for ${currentActiveComponent} (changed: ${currentComponentChanged})`)
          }
          
          // Update ref AFTER we've detected the change and started fetching
          if (currentComponentChanged) {
            previousComponentRef.current = currentActiveComponent
            console.log(`[DiagnosisPage] Component changed, updated ref to ${currentActiveComponent}`)
          }
          
          // Get latest SCADA data from ref (always current)
          const currentScadaData = scadaDataRef.current
          
          // Check if SCADA data is available
          // For IP data format, check rawData; for legacy format, check data
          const hasData = currentScadaData.rawData || currentScadaData.data
          if (!hasData) {
            if (currentScadaData.error) {
              setError(`SCADA connection error: ${currentScadaData.error}`)
            } else {
              setError("Waiting for SCADA data...")
            }
            setIsLoading(false)
            return
          }

          // Check if SCADA data includes asset metadata (IP address data format)
          // Use rawData which preserves the original structure with assets/master
          const hasAssetMetadata = currentScadaData.rawData && (
            (currentScadaData.rawData as any).assets || 
            (currentScadaData.rawData as any).master ||
            ((currentScadaData.rawData as any).assets && (currentScadaData.rawData as any).assets.master)
          )

          // For IP data format, component readings are in rawData with PascalCase keys
          // For legacy SCADA format, component readings are in scadaData.data with camelCase keys
          let scadaReadings: Record<string, any> = {}
          
          if (hasAssetMetadata && currentScadaData.rawData) {
            // IP data format: extract component readings from rawData using PascalCase component names
            const componentKeyMap: Record<string, string> = {
              bayLines: "BayLines",
              transformer: "Transformer",
              circuitBreaker: "CircuitBreaker",
              busbar: "Busbar",
              isolator: "Isolator",
            }
            const pascalCaseKey = componentKeyMap[currentActiveComponent] || currentActiveComponent
            scadaReadings = (currentScadaData.rawData as any)[pascalCaseKey] || {}
            
            // For IP data format, we always proceed even if readings are empty
            // because the API will extract readings from the ipData structure
            console.log(`[DiagnosisPage] IP data format detected for ${currentActiveComponent}, found ${Object.keys(scadaReadings).length} readings in rawData`)
          } else {
            // Legacy SCADA format: use mapped data with camelCase keys
            const componentKey = currentActiveComponent as keyof typeof currentScadaData.data
            scadaReadings = currentScadaData.data?.[componentKey] || {}
            
            // Only fetch if we have readings for this component (legacy format)
            if (!scadaReadings || Object.keys(scadaReadings).length === 0) {
              console.warn(`No SCADA data available for component: ${currentActiveComponent}`)
              setError(`No SCADA data available for ${currentActiveComponent}. Make sure the SCADA server is sending data for this component.`)
              setIsLoading(false)
              return
            }
          }

          // Call diagnosis API with SCADA data
          const controller = new AbortController()
          let timeoutId: NodeJS.Timeout | null = null
          
          // Set timeout with proper cleanup
          // Increased to 90 seconds to allow for ML model processing time
          timeoutId = setTimeout(() => {
            if (timeoutId) {
              console.warn(`[DiagnosisPage] Request timeout after 90s, aborting...`)
              controller.abort()
            }
          }, 90000) // 90 second timeout (increased for ML processing)

          try {
            const requestBody: any = {
              areaCode: "SCADA",
              substationId: "SCADA",
              componentType: currentActiveComponent,
            }

            // If IP address data format (includes assets), pass as ipData
            // Otherwise pass as scadaData (legacy SCADA format)
            if (hasAssetMetadata && currentScadaData.rawData) {
              requestBody.ipData = currentScadaData.rawData
              console.log(`[DiagnosisPage] Sending IP data format for ${currentActiveComponent}, component readings: ${Object.keys(scadaReadings).length} params`)
            } else {
              requestBody.scadaData = scadaReadings
              console.log(`[DiagnosisPage] Sending legacy SCADA format for ${currentActiveComponent}, readings: ${Object.keys(scadaReadings).length} params`)
            }

            const response = await fetch("/api/diagnosis/component", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestBody),
              signal: controller.signal,
            })

            // Clear timeout on successful response
            if (timeoutId) {
              clearTimeout(timeoutId)
              timeoutId = null
            }

            if (!response.ok) {
              let errorText = ""
              try {
                errorText = await response.text()
              } catch {
                errorText = response.statusText
              }
              throw new Error(`API error: ${response.status} ${errorText}`)
            }

            let payload: DiagnosisApiResponse
            try {
              const responseText = await response.text()
              console.log(`[DiagnosisPage] Raw response text length:`, responseText.length)
              payload = JSON.parse(responseText)
              console.log(`[DiagnosisPage] Received response for ${currentActiveComponent}, keys:`, Object.keys(payload))
              console.log(`[DiagnosisPage] Response data:`, {
                hasFaultProbability: 'fault_probability' in payload,
                hasHealthIndex: 'health_index' in payload,
                hasPredictedFault: 'predicted_fault' in payload,
                hasParameterStates: 'parameter_states' in payload,
                hasLiveReadings: 'live_readings' in payload,
                faultProbability: payload.fault_probability,
                healthIndex: payload.health_index,
              })
            } catch (parseError) {
              console.error(`[DiagnosisPage] JSON parse error:`, parseError)
              throw new Error(`Failed to parse response: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
            }
            
            // Update state - ensure this happens even if there are issues
            setData(payload)
            setLastUpdated(new Date().toISOString())
            setIsLoading(false)
            setError(null) // Clear any previous errors
            console.log(`[DiagnosisPage] State update called for ${currentActiveComponent} with payload keys:`, Object.keys(payload))
          } catch (fetchErr) {
            // Clear timeout on error
            if (timeoutId) {
              clearTimeout(timeoutId)
              timeoutId = null
            }
            
            // Re-throw to be handled by outer catch
            throw fetchErr
          }
          } catch (err) {
            console.error("SCADA diagnosis fetch error:", err)
            if (err instanceof Error) {
              if (err.name === "AbortError") {
                setError("Request timeout - the diagnosis API took too long to respond (90s timeout). The ML model may be processing. Please try again.")
              } else if (err.message.includes("Failed to fetch")) {
                setError("Network error - cannot connect to diagnosis API. Check if the server is running.")
              } else {
                setError(`Unable to fetch diagnosis data: ${err.message}`)
              }
            } else {
              setError("Unable to fetch diagnosis data from SCADA system")
            }
            setIsLoading(false)
          }
      }

      // Abort controller for SCADA mode to cancel requests when switching data sources
      const scadaAbortController = new AbortController()
      
      // Initial fetch
      setIsLoading(true)
      fetchScadaDiagnosis()

      // Poll every 2 seconds
      const interval = setInterval(() => {
        fetchScadaDiagnosis()
      }, 2000)

      return () => {
        clearInterval(interval)
        scadaAbortController.abort()
        console.log(`[DiagnosisPage] SCADA mode cleanup: stopped polling and aborted requests`)
      }
    }

    // Firebase mode - original logic
    if (!query?.areaCode || !query?.substationId) return
    let isCancelled = false
    const controller = new AbortController()

    // Check cache first for instant display when switching components
    const cacheKey = getCacheKey(query.areaCode, query.substationId, activeComponent)
    const cached = diagnosisCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      // Show cached data immediately - no loading needed
      setData(cached.data)
      // Safely parse timestamp - handle invalid dates
      try {
        const timestamp = cached.data.timestamp
        if (timestamp) {
          const date = new Date(timestamp)
          if (!isNaN(date.getTime())) {
            setLastUpdated(date.toISOString())
          } else {
            setLastUpdated(new Date().toISOString())
          }
        } else {
          setLastUpdated(new Date().toISOString())
        }
      } catch (error) {
        setLastUpdated(new Date().toISOString())
      }
      setIsLoading(false)
      
      // Still refresh in background, but don't show loading
      const fetchData = async () => {
        try {
          const response = await fetch("/api/diagnosis/component", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              areaCode: query.areaCode,
              substationId: query.substationId,
              componentType: activeComponent,
            }),
            signal: controller.signal,
          })

          if (!response.ok) {
            return // Silently fail if we have cached data
          }

          const payload: DiagnosisApiResponse = await response.json()
          if (!isCancelled) {
            setData(payload)
            setLastUpdated(new Date().toISOString())
            
            // Update cache
            diagnosisCache.set(cacheKey, {
              data: payload,
              timestamp: Date.now(),
            })
          }
        } catch (err) {
          // Silently fail - we have cached data to show
          console.debug("Background refresh failed:", err)
        }
      }
      
      // Refresh in background after a short delay
      const timeout = setTimeout(() => fetchData(), 1000)
      
      // Subsequent fetches without loading indicator (background refresh)
      const interval = setInterval(() => fetchData(), 5000)

      return () => {
        isCancelled = true
        controller.abort()
        clearTimeout(timeout)
        clearInterval(interval)
      }
    } else if (cached) {
      // Cache expired, but show stale data while fetching
      setData(cached.data)
    }

    const fetchData = async (isInitial: boolean) => {
      setError(null)
      if (isInitial && !cached) {
        setIsLoading(true)
      }
      try {
        const response = await fetch("/api/diagnosis/component", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            areaCode: query.areaCode,
            substationId: query.substationId,
            componentType: activeComponent,
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to load diagnosis data")
        }

        const payload: DiagnosisApiResponse = await response.json()
        if (!isCancelled) {
          setData(payload)
          // Safely parse timestamp from payload
          try {
            const timestamp = payload.timestamp
            if (timestamp) {
              const date = new Date(timestamp)
              if (!isNaN(date.getTime())) {
                setLastUpdated(date.toISOString())
              } else {
                setLastUpdated(new Date().toISOString())
              }
            } else {
              setLastUpdated(new Date().toISOString())
            }
          } catch (error) {
            setLastUpdated(new Date().toISOString())
          }
          setIsLoading(false)
          
          // Update cache
          diagnosisCache.set(cacheKey, {
            data: payload,
            timestamp: Date.now(),
          })
          
          // Clean up old cache entries (keep only last 20)
          if (diagnosisCache.size > 20) {
            const entries = Array.from(diagnosisCache.entries())
            entries.sort((a, b) => b[1].timestamp - a[1].timestamp)
            for (let i = 20; i < entries.length; i++) {
              diagnosisCache.delete(entries[i][0])
            }
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error(err)
          // Only show error if we don't have cached data to fall back to
          if (!cached) {
            setError("Unable to fetch diagnosis data. Check Firebase/ML backend.")
          }
          setIsLoading(false)
        }
      }
    }

    // Fetch fresh data if no cache or cache expired
    fetchData(!cached) // Initial fetch with loading only if no cache
    isInitialFetch.current = false
    
    // Subsequent fetches without loading indicator (background refresh)
    const interval = setInterval(() => fetchData(false), 5000)

    return () => {
      isCancelled = true
      controller.abort()
      clearInterval(interval)
      isInitialFetch.current = true // Reset for next query
    }
  }, [query?.areaCode, query?.substationId, activeComponent, refreshToken, dataSource, scadaData.isLoading, scadaData.error])

  // Debug: Log when data changes
  useEffect(() => {
    if (data) {
      console.log(`[DiagnosisPage] Data state changed for ${activeComponent}:`, {
        hasData: !!data,
        keys: Object.keys(data),
        faultProbability: data.fault_probability,
        healthIndex: data.health_index,
      })
    } else {
      console.log(`[DiagnosisPage] Data state is null for ${activeComponent}`)
    }
  }, [data, activeComponent])

  useEffect(() => {
    let ignore = false
    async function resolveMasterDetails() {
      if (!query?.areaCode) {
        if (!ignore) setMasterDetails(null)
        return
      }
      try {
        const record = await getSubstationByCodeFromFirebase(query.areaCode)
        if (!ignore) {
          setMasterDetails(record?.master ?? null)
        }
      } catch (fetchError) {
        console.warn("Unable to fetch substation master details from Firebase", fetchError)
        if (!ignore) setMasterDetails(null)
      }
    }
    resolveMasterDetails()
    return () => {
      ignore = true
    }
  }, [query?.areaCode])

  // Preload diagnosis data for all components when area is selected (background fetch)
  useEffect(() => {
    const areaCode = query?.areaCode
    const substationId = query?.substationId
    if (!areaCode || !substationId) return

    // Preload diagnosis data for all components in the background
    // This ensures data is cached when user switches components
    const components: Array<"bayLines" | "transformer" | "circuitBreaker" | "busbar" | "isolator"> = [
      "bayLines",
      "transformer",
      "circuitBreaker",
      "busbar",
      "isolator",
    ]

    // Preload all components in parallel (background, no loading indicators)
    components.forEach((component) => {
      const cacheKey = getCacheKey(areaCode, substationId, component)
      const cached = diagnosisCache.get(cacheKey)
      
      // Only preload if not already cached or cache is expired
      if (!cached || Date.now() - cached.timestamp >= CACHE_TTL) {
        fetch("/api/diagnosis/component", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            areaCode,
            substationId,
            componentType: component,
          }),
        })
          .then((res) => {
            if (!res.ok) return null
            return res.json()
          })
          .then((payload: DiagnosisApiResponse | null) => {
            if (payload) {
              // Update cache
              diagnosisCache.set(cacheKey, {
                data: payload,
                timestamp: Date.now(),
              })
            }
          })
          .catch((err) => {
            // Silently fail - this is just preloading
            console.debug(`Preload failed for ${component}:`, err)
          })
      }
    })
  }, [query?.areaCode, query?.substationId])

  const handleSearch = (areaValue: string) => {
    const trimmed = areaValue.trim()
    if (!trimmed) return
    const fallbackId = trimmed
    setQuery({ areaCode: trimmed, substationId: fallbackId })
  }

  const handleNotify = async ({ notes, files }: { notes: string; files: File[] }) => {
    if (!query) return
    await fetch("/api/diagnosis/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "notify",
        areaCode: query.areaCode,
        substationId: query.substationId,
        component: activeComponent,
        notes,
        attachments: files.map((file) => ({ name: file.name, size: file.size })),
      }),
    })
    toast({ title: "Maintenance notified", description: "Alert pushed to /maintenance/workflows" })
  }

  const handleMarkFixed = async ({ notes, files }: { notes: string; files: File[] }) => {
    if (!query) return
    await fetch("/api/diagnosis/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "markFixed",
        areaCode: query.areaCode,
        substationId: query.substationId,
        component: activeComponent,
        notes,
        attachments: files.map((file) => ({ name: file.name, size: file.size })),
      }),
    })
    toast({ title: "Maintenance updated", description: "Closure pushed to /maintenance/workflows" })
  }

  const areaSummary = useMemo(() => {
    if (!data) return null
    const combinedMaster = masterDetails ?? data.asset_metadata?.master ?? data.asset_metadata ?? {}
    return {
      name: combinedMaster.name ?? combinedMaster.areaName ?? query?.areaCode ?? "Unknown Substation",
      area: combinedMaster.areaName ?? "—",
      code: combinedMaster.substationCode ?? query?.areaCode ?? "—",
      voltage: combinedMaster.voltageClass ?? combinedMaster.voltage ?? "—",
      installationYear: combinedMaster.installationYear ?? combinedMaster.installed ?? "—",
      operator: combinedMaster.operator ?? "—",
      notes: combinedMaster.notes ?? "",
      latitude: combinedMaster.latitude ?? null,
      longitude: combinedMaster.longitude ?? null,
    }
  }, [data, query, masterDetails])

  const activeAreaLabel = areaSummary?.name ?? query?.areaCode ?? null

  // Apply transformations to diagnosis values
  const adjustedData = useMemo(() => {
    if (!data) {
      console.log(`[DiagnosisPage] adjustedData is null - no data available for ${activeComponent}`)
      return null
    }
    console.log(`[DiagnosisPage] Computing adjustedData for ${activeComponent}, data keys:`, Object.keys(data))

    // 1. Fault Probability: reduce by 18 percentage points
    const adjustedFaultProbability = Math.max(0, Math.min(1, (data.fault_probability ?? 0) - 0.18))

    // 2. Health Index: increase by 10
    const adjustedHealthIndex = Math.max(0, Math.min(100, (data.health_index ?? 0) + 10))

    // 3. XGBoost Score (Fault Mode Classifier): reduce by 15 percentage points
    const adjustedXGBoostScore = data.XGBoost_FaultScore !== undefined
      ? Math.max(0, Math.min(1, (data.XGBoost_FaultScore ?? 0) - 0.15))
      : data.XGBoost_FaultScore

    // 4. LSTM Forecast Score: reduce by 8 percentage points
    const adjustedLSTMScore = data.LSTM_ForecastScore !== undefined
      ? (data.LSTM_ForecastScore ?? 0) - 0.08
      : data.LSTM_ForecastScore

    // 5. Timeline Forecast: adjust based on LSTM score (cumulative per hour)
    // If LSTM is positive % (e.g., 20%): each hour increases by that % of the previous hour's value
    // If LSTM is negative % (e.g., -12.8%): each hour decreases by that % of the previous hour's value
    // Use the ADJUSTED LSTM score (after subtracting 8%)
    let adjustedTimeline: number[] | undefined = data.timeline_prediction
    if (data.timeline_prediction && data.timeline_prediction.length > 0 && data.LSTM_ForecastScore !== undefined) {
      // Use the adjusted LSTM score (already reduced by 8%)
      const lstmPercent = adjustedLSTMScore // Decimal (e.g., 0.20 for 20%, -0.128 for -12.8%)
      
      // Get current value from liveReadings based on component type
      let currentValue: number | null = null
      if (data.live_readings) {
        const getCurrentValueKey = () => {
          switch (activeComponent) {
            case "bayLines":
              return ["mw", "live_ActivePower_MW", "activePower"]
            case "transformer":
              return ["loading", "live_LoadingPercent", "loadingPercent"]
            case "isolator":
              return ["driveTorque", "live_DriveTorque_Nm", "drive_torque"]
            case "busbar":
              return ["busTemperature", "live_BusTemperature_C", "bus_temperature"]
            case "circuitBreaker":
              return ["operationTime", "live_OperationTime_ms", "operation_time"]
            default:
              return []
          }
        }
        
        const keys = getCurrentValueKey()
        for (const key of keys) {
          const rawValue = data.live_readings[key]
          if (rawValue !== undefined && rawValue !== null) {
            const numValue = Number(rawValue)
            if (!isNaN(numValue)) {
              currentValue = numValue
              break
            }
          }
        }
      }
      
      if (currentValue !== null) {
        // Calculate adjusted timeline with cumulative LSTM percentage
        // Each hour builds on the previous hour's adjusted value
        adjustedTimeline = []
        let previousHourValue = currentValue
        
        for (let i = 0; i < data.timeline_prediction.length; i++) {
          // Apply LSTM percentage adjustment cumulatively to previous hour's value
          // For positive LSTM (e.g., 0.20): multiply by 1.20 (20% increase)
          // For negative LSTM (e.g., -0.128): multiply by 0.872 (12.8% decrease)
          const adjustedForecastValue = previousHourValue * (1 + lstmPercent)
          
          // Convert back to delta (change from original current value)
          const adjustedDelta = adjustedForecastValue - currentValue
          adjustedTimeline.push(adjustedDelta)
          
          // Update previous hour value for next iteration (cumulative)
          previousHourValue = adjustedForecastValue
        }
      } else {
        // If current value not available, apply percentage to deltas directly
        adjustedTimeline = data.timeline_prediction.map((forecastDelta) => {
          return forecastDelta * (1 + lstmPercent)
        })
      }
    }

    return {
      ...data,
      fault_probability: adjustedFaultProbability,
      health_index: adjustedHealthIndex,
      XGBoost_FaultScore: adjustedXGBoostScore,
      LSTM_ForecastScore: adjustedLSTMScore,
      timeline_prediction: adjustedTimeline,
    }
  }, [data])

  const maintenanceSnapshot = {
    automaticAlerts: adjustedData?.maintenance?.automaticAlerts ?? [],
    pendingIssues: adjustedData?.maintenance?.pendingIssues ?? [],
    suggestions: adjustedData?.maintenance?.suggestions ?? [],
  }

  const formatCoordinate = (value: number | string | null | undefined) => {
    if (typeof value === "number") {
      return value.toFixed(4)
    }
    if (typeof value === "string") {
      return value
    }
    return "—"
  }

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-auto space-y-6 p-4 relative">
      {/* Search Bar - Only for bayLines component */}
      {activeComponent === "bayLines" && (
        <Card className="p-4">
          <div className="space-y-4">
            {/* Data Source Toggle */}
            <DataSourceToggle />
            
            {/* Search Input - Only shown when Firebase mode is active */}
            {dataSource === "firebase" && (
              <DiagnosisSearchBar
                areaQuery={areaInput}
                onChange={setAreaInput}
                onSubmit={(value) => {
                  setAreaInput(value)
                  handleSearch(value)
                }}
                activeArea={activeAreaLabel}
                isLoading={isLoading}
              />
            )}

            {/* SCADA Mode Info */}
            {dataSource === "scada" && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="text-sm text-green-800">
                  <strong>SCADA Mode Active:</strong> Live data is being streamed from SCADA system. Search is disabled.
                  {scadaData.error && (
                    <div className="mt-2 text-red-600">
                      <strong>Error:</strong> {scadaData.error}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {activeComponent !== "bayLines" && dataSource === "firebase" && (
        <Card className="border-dashed border-slate-200 bg-slate-50/70">
          <CardContent className="py-4 text-sm text-slate-600">
            {query ? (
              <>
                Viewing diagnostics for{" "}
                <span className="font-semibold text-slate-900">{activeAreaLabel ?? query.areaCode}</span>. Switch back to
                the Bays tab to change the area context.
              </>
            ) : (
              <>Select an area from the Bays tab to unlock the rest of the equipment views.</>
            )}
          </CardContent>
        </Card>
      )}
      
      {activeComponent !== "bayLines" && dataSource === "scada" && !data && !error && isLoading && (
        <Card className="border-dashed border-slate-200 bg-slate-50/70">
          <CardContent className="py-4 text-sm text-slate-600">
            Loading diagnostics for <span className="font-semibold text-slate-900">{COMPONENT_DEFINITIONS[activeComponent]?.title || activeComponent}</span> from SCADA system...
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Diagnosis fetch failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {adjustedData ? (
        <div className="space-y-6" key={`diagnosis-${activeComponent}-${data?.timestamp || Date.now()}`}>
          <Card className="border-2 border-slate-100">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold">{areaSummary?.name}</CardTitle>
                <p className="text-sm text-slate-500">
                  Code {areaSummary?.code} · {areaSummary?.voltage} · Installed {areaSummary?.installationYear}
                </p>
                <p className="text-xs text-slate-500">Operator: {areaSummary?.operator}</p>
                {(areaSummary?.latitude ?? areaSummary?.longitude) && (
                  <p className="text-xs text-slate-500">
                    Lat/Lon: {formatCoordinate(areaSummary?.latitude)}, {formatCoordinate(areaSummary?.longitude)}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={severityTone[adjustedData.live_status]?.className ?? "bg-slate-100 text-slate-600"}>
                  {severityTone[adjustedData.live_status]?.label ?? "Normal"}
                </Badge>
                <Badge variant="outline">Health {Math.round(adjustedData.health_index)}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-white/60 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Area</p>
                  <p className="font-semibold text-slate-900">{areaSummary?.area}</p>
                </div>
                <div className="rounded-xl border bg-white/60 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Voltage Class</p>
                  <p className="font-semibold text-slate-900">{areaSummary?.voltage}</p>
                </div>
                <div className="rounded-xl border bg-white/60 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Installed</p>
                  <p className="font-semibold text-slate-900">{areaSummary?.installationYear}</p>
                </div>
                <div className="rounded-xl border bg-white/60 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Operator</p>
                  <p className="font-semibold text-slate-900">{areaSummary?.operator}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Fault Probability</p>
                  <p className={cn("text-3xl font-bold", getFaultProbabilityTextClass(Math.round((adjustedData.fault_probability ?? 0) * 100)))}>
                    {Math.round((adjustedData.fault_probability ?? 0) * 100)}%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Predicted Fault</p>
                  <p className="text-lg font-semibold text-slate-900">{adjustedData.predicted_fault ?? "Normal"}</p>
                  <p className="text-xs text-slate-500">{adjustedData.affected_subpart}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Last Sync</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "—"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Latest Events</p>
                  {adjustedData.events?.length ? (
                    <div className="mt-3 space-y-2">
                      {adjustedData.events.slice(0, 2).map((event) => (
                        <div key={event.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                          <p className="font-semibold text-slate-900">{event.title}</p>
                          <p className="text-xs text-slate-500">{event.description}</p>
                          <p className="text-[11px] uppercase text-slate-400">{event.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">No recent events logged.</p>
                  )}
                </div>
                <div className="rounded-2xl border bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Maintenance Alerts</p>
                  {adjustedData.maintenance?.pendingIssues?.length ? (
                    <div className="mt-3 space-y-2">
                      {adjustedData.maintenance.pendingIssues.slice(0, 2).map((issue) => (
                        <div key={issue.id} className="rounded-lg bg-amber-50 px-3 py-2 text-sm">
                          <p className="font-semibold text-slate-900">{issue.title}</p>
                          <p className="text-xs text-slate-500">{issue.description}</p>
                          <p className="text-[11px] uppercase text-amber-600">{issue.severity}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">No pending maintenance tickets.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <LivePanel
                component={activeComponent}
                parameterStates={adjustedData.parameter_states}
                trendHistory={adjustedData.trend_history}
                liveTimestamp={adjustedData.timestamp}
                liveSource={adjustedData.live_source}
                areaCode={query?.areaCode}
                useLiveUpdates={true}
              />
              <HealthPanel healthIndex={adjustedData.health_index} top3Factors={adjustedData.Top3_HealthImpactFactors} />
            </div>
            <MLPanel
              component={activeComponent}
              faultProbability={adjustedData.fault_probability}
              predictedFault={adjustedData.predicted_fault}
              explanation={adjustedData.explanation}
              timeline={adjustedData.timeline_prediction}
              lstmScore={adjustedData.LSTM_ForecastScore}
              isolationForestScore={adjustedData.IsolationForestScore}
              xgboostScore={adjustedData.XGBoost_FaultScore}
              liveReadings={adjustedData.live_readings}
            />
            <MaintenancePanel
              automaticAlerts={maintenanceSnapshot.automaticAlerts}
              pendingIssues={maintenanceSnapshot.pendingIssues}
              suggestions={maintenanceSnapshot.suggestions}
              onNotify={handleNotify}
              onMarkFixed={handleMarkFixed}
            />
          </div>
        </div>
      ) : (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center gap-2 py-16 text-center text-slate-500">
            <ShieldAlert className="h-8 w-8 text-slate-400" />
            <p className="font-semibold">Select an area from Bays to load diagnostics.</p>
            <p className="text-sm">Once loaded, other equipment tabs will reuse the same area context.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

