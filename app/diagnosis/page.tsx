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

  useEffect(() => {
    if (!query?.areaCode || !query?.substationId) return
    let isCancelled = false
    const controller = new AbortController()

    // Check cache first for instant display when switching components
    const cacheKey = getCacheKey(query.areaCode, query.substationId, activeComponent)
    const cached = diagnosisCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      // Show cached data immediately - no loading needed
      setData(cached.data)
      setLastUpdated(new Date(cached.data.timestamp || Date.now()).toISOString())
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
          setLastUpdated(new Date().toISOString())
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
  }, [query?.areaCode, query?.substationId, activeComponent, refreshToken])

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

  const maintenanceSnapshot = {
    automaticAlerts: data?.maintenance?.automaticAlerts ?? [],
    pendingIssues: data?.maintenance?.pendingIssues ?? [],
    suggestions: data?.maintenance?.suggestions ?? [],
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
      {activeComponent === "bayLines" && (
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

      {activeComponent !== "bayLines" && (
        <Card className="border-dashed border-slate-200 bg-slate-50/70">
          <CardContent className="py-4 text-sm text-slate-600">
            {query ? (
              <>
                Viewing diagnostics for{" "}
                <span className="font-semibold text-slate-900">{activeAreaLabel ?? query.areaCode}</span>. Switch back to
                the Bay Lines tab to change the area context.
              </>
            ) : (
              <>Select an area from the Bay Lines tab to unlock the rest of the equipment views.</>
            )}
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

      {data ? (
        <div className="space-y-6">
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
                <Badge className={severityTone[data.live_status]?.className ?? "bg-slate-100 text-slate-600"}>
                  {severityTone[data.live_status]?.label ?? "Normal"}
                </Badge>
                <Badge variant="outline">Health {Math.round(data.health_index)}%</Badge>
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
                  <p className="text-3xl font-bold text-slate-900">
                    {Math.round((data.fault_probability ?? 0) * 100)}%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Predicted Fault</p>
                  <p className="text-lg font-semibold text-slate-900">{data.predicted_fault ?? "Normal"}</p>
                  <p className="text-xs text-slate-500">{data.affected_subpart}</p>
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
                  {data.events?.length ? (
                    <div className="mt-3 space-y-2">
                      {data.events.slice(0, 2).map((event) => (
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
                  {data.maintenance?.pendingIssues?.length ? (
                    <div className="mt-3 space-y-2">
                      {data.maintenance.pendingIssues.slice(0, 2).map((issue) => (
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
                parameterStates={data.parameter_states}
                trendHistory={data.trend_history}
                liveTimestamp={data.timestamp}
                liveSource={data.live_source}
              />
              <HealthPanel healthIndex={data.health_index} top3Factors={data.Top3_HealthImpactFactors} />
            </div>
            <MLPanel
              component={activeComponent}
              faultProbability={data.fault_probability}
              predictedFault={data.predicted_fault}
              explanation={data.explanation}
              timeline={data.timeline_prediction}
              lstmScore={data.LSTM_ForecastScore}
              isolationForestScore={data.IsolationForestScore}
              xgboostScore={data.XGBoost_FaultScore}
              liveReadings={data.live_readings}
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
            <p className="font-semibold">Select an area from Bay Lines to load diagnostics.</p>
            <p className="text-sm">Once loaded, other equipment tabs will reuse the same area context.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

