"use client"

import { useState, Suspense, lazy, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Loader2 } from "lucide-react"
import { SubstationPanel } from "@/components/live-trend/substation-panel"
import { TransformerPanel } from "@/components/live-trend/transformer-panel"
import { BayLinesPanel } from "@/components/live-trend/bay-lines-panel"
import { CircuitBreakerPanel } from "@/components/live-trend/circuit-breaker-panel"
import { IsolatorPanel } from "@/components/live-trend/isolator-panel"
import { OthersPanel } from "@/components/live-trend/others-panel"
import { ModelViewer } from "@/components/live-trend/model-viewer"
import { useLiveData, dataGenerators } from "@/hooks/use-live-data"
import { getGlowColor } from "@/lib/live-trend/glow-utils"
import { useLiveTrend } from "@/components/live-trend/live-trend-context"
import { getSubstationById } from "@/lib/firebase-data"
import type { DummySubstation } from "@/lib/dummy-data"

// Lazy load panels for better performance
const LazySubstationPanel = lazy(() =>
  Promise.resolve({ default: SubstationPanel })
)
const LazyTransformerPanel = lazy(() =>
  Promise.resolve({ default: TransformerPanel })
)
const LazyBayLinesPanel = lazy(() =>
  Promise.resolve({ default: BayLinesPanel })
)
const LazyCircuitBreakerPanel = lazy(() =>
  Promise.resolve({ default: CircuitBreakerPanel })
)
const LazyIsolatorPanel = lazy(() =>
  Promise.resolve({ default: IsolatorPanel })
)
const LazyOthersPanel = lazy(() =>
  Promise.resolve({ default: OthersPanel })
)

const toRealtimeKey = (value: string) => value.trim().replace(/\s+/g, "_")

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )
}

// Helper function to get all critical values (orange) from all panels
function useCriticalValues() {
  const substationData = useLiveData("substation", dataGenerators.substation)
  const transformerData = useLiveData("transformer", dataGenerators.transformer)
  const bayLinesData = useLiveData("bayLines", dataGenerators.bayLines)
  const circuitBreakerData = useLiveData("circuitBreaker", dataGenerators.circuitBreaker)
  const othersData = useLiveData("others", dataGenerators.others)

  return useMemo(() => {
    const criticalValues: Array<{ label: string; value: number | string; unit: string; category: string }> = []
    
    // Check all parameters for orange status (#FF8A2A)
    const checkParameter = (data: Record<string, number | string>, category: string, params: Array<{ key: string; label: string; unit: string }>) => {
      params.forEach(({ key, label, unit }) => {
        const value = data[key]
        if (value !== undefined) {
          const glowColor = getGlowColor(key, value)
          if (glowColor === "#FF8A2A") { // Orange
            criticalValues.push({ label, value, unit, category })
          }
        }
      })
    }

    // Substation parameters
    checkParameter(substationData, "Substation", [
      { key: "voltage", label: "Voltage", unit: "kV" },
      { key: "mw", label: "Active Power", unit: "MW" },
      { key: "mvar", label: "Reactive Power", unit: "MVAR" },
      { key: "frequency", label: "Frequency", unit: "Hz" },
      { key: "powerFactor", label: "Power Factor", unit: "p.u." },
      { key: "current", label: "Current", unit: "A" },
    ])

    // Transformer parameters
    checkParameter(transformerData, "Transformer", [
      { key: "oilLevel", label: "Oil Level", unit: "%" },
      { key: "oilTemperature", label: "Oil Temperature", unit: "°C" },
      { key: "gasLevel", label: "Gas Level", unit: "ppm" },
      { key: "windingTemperature", label: "Winding Temperature", unit: "°C" },
      { key: "tapPosition", label: "Tap Position", unit: "steps" },
    ])

    // Bay Lines parameters
    checkParameter(bayLinesData, "Bay Lines", [
      { key: "ctLoading", label: "CT Loading", unit: "%" },
      { key: "ptVoltageDeviation", label: "PT Voltage Deviation", unit: "%" },
      { key: "frequency", label: "Frequency", unit: "Hz" },
      { key: "powerFactor", label: "Power Factor", unit: "p.u." },
    ])

    // Circuit Breaker parameters
    checkParameter(circuitBreakerData, "Circuit Breaker", [
      { key: "sf6Density", label: "SF6 Density", unit: "%" },
      { key: "operationCount", label: "Operation Count", unit: "count" },
    ])

    // Others parameters
    checkParameter(othersData, "Others", [
      { key: "tripCount", label: "Trip Count", unit: "count" },
      { key: "batterySOC", label: "Battery SOC", unit: "%" },
    ])

    return criticalValues
  }, [substationData, transformerData, bayLinesData, circuitBreakerData, othersData])
}

// Helper to get glow data for each category
function useGlowData(category: string) {
  const transformerData = useLiveData("transformer", dataGenerators.transformer)
  const bayLinesData = useLiveData("bayLines", dataGenerators.bayLines)
  const circuitBreakerData = useLiveData("circuitBreaker", dataGenerators.circuitBreaker)

  return useMemo(() => {
    const glow: Record<string, number | string> = {}
    
    if (category === "transformer") {
      if (transformerData.oilLevel < 30) glow.oilLevel = transformerData.oilLevel
      if (transformerData.oilTemperature > 85) glow.oilTemperature = transformerData.oilTemperature
      if (transformerData.gasLevel > 300) glow.gasLevel = transformerData.gasLevel
      if (transformerData.windingTemperature > 110) glow.windingTemperature = transformerData.windingTemperature
      if (Math.abs(transformerData.tapPosition) > 4) glow.tapPosition = transformerData.tapPosition
    } else if (category === "bayLines") {
      if (bayLinesData.ctLoading > 60) glow.ctLoading = bayLinesData.ctLoading
      if (bayLinesData.ptVoltageDeviation < 90 || bayLinesData.ptVoltageDeviation > 110) {
        glow.ptVoltageDeviation = bayLinesData.ptVoltageDeviation
      }
      if (bayLinesData.frequency < 49.7 || bayLinesData.frequency > 50.3) {
        glow.frequency = bayLinesData.frequency
      }
      if (bayLinesData.powerFactor < 0.95) glow.powerFactor = bayLinesData.powerFactor
    } else if (category === "circuitBreaker") {
      if (circuitBreakerData.sf6Density < 90) glow.sf6Density = circuitBreakerData.sf6Density
      const maxOps = 10000
      const percent = (circuitBreakerData.operationCount / maxOps) * 100
      if (percent > 50) glow.operationCount = circuitBreakerData.operationCount
    }

    return glow
  }, [category, transformerData, bayLinesData, circuitBreakerData])
}

export default function LiveTrendPage() {
  const { activeCategory, setSelectedArea } = useLiveTrend()
  const criticalValues = useCriticalValues()
  const glowData = useGlowData(activeCategory)
  const [substationId, setSubstationId] = useState<string>("")
  const [substation, setSubstation] = useState<DummySubstation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!substationId.trim()) {
      setError("Please enter a substation ID, code, name, or area name")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const searchTerm = substationId.trim().toLowerCase()
      const realtimeKey = toRealtimeKey(substationId)
      setSelectedArea({
        key: realtimeKey,
        label: substationId.trim(),
        metadata: { areaName: substationId.trim() },
      })
      
      // First try direct ID lookup
      const data = await getSubstationById(searchTerm)
      if (data) {
        setSubstation(data)
        const derivedKey = toRealtimeKey(
          data.master.substationCode ??
            data.master.areaName ??
            data.master.name ??
            substationId,
        )
        setSelectedArea({
          key: derivedKey,
          label: data.master.areaName ?? data.master.name ?? substationId.trim(),
          metadata: {
            areaName: data.master.areaName,
            installationYear: data.master.installationYear,
            latitude: data.master.latitude,
            longitude: data.master.longitude,
          },
        })
        setIsLoading(false)
        return
      }

      // If not found, search all substations by code, name, or areaName
      const { getAllSubstations } = await import("@/lib/firebase-data")
      const allSubstations = await getAllSubstations()
      const found = allSubstations.find(s => 
        s.id.toLowerCase() === searchTerm ||
        s.master.substationCode?.toLowerCase() === searchTerm ||
        s.master.name?.toLowerCase().includes(searchTerm) ||
        s.master.areaName?.toLowerCase().includes(searchTerm)
      )
      
      if (found) {
        setSubstation(found)
        const derivedKey = toRealtimeKey(
          found.master.substationCode ??
            found.master.areaName ??
            found.master.name ??
            substationId,
        )
        setSelectedArea({
          key: derivedKey,
          label: found.master.areaName ?? found.master.name ?? substationId.trim(),
          metadata: {
            areaName: found.master.areaName,
            installationYear: found.master.installationYear,
            latitude: found.master.latitude,
            longitude: found.master.longitude,
          },
        })
      } else {
        setError("Area/Substation not found. Try searching by ID, code, name, or area name.")
        setSubstation(null)
      }
    } catch (err) {
      console.error("Error fetching substation:", err)
      setError("Error fetching substation. Please try again.")
      setSubstation(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
      {/* Search Bar - Only for Substation page */}
      {activeCategory === "substation" && (
        <Card className="p-4 flex-shrink-0 mb-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter Substation ID, Code, Name, or Area Name..."
                value={substationId}
                onChange={(e) => setSubstationId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600">{error}</div>
          )}
          {substation && (
            <div className="mt-2 text-sm text-green-600">
              Showing data for: {substation.master.name} ({substation.master.substationCode})
            </div>
          )}
        </Card>
      )}

      {/* Main Content - Conditional Layout: Full width for "others", Split for others */}
      {activeCategory === "others" ? (
        /* Full Width Layout for "Others" page */
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Critical Values - Top */}
          <Card className="p-4 bg-orange-50 border-orange-200 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Critical Values</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {criticalValues.length > 0 ? (
                criticalValues.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-md text-sm"
                  >
                    <span className="font-medium">{item.label}:</span>{" "}
                    <span className="font-bold">{item.value}</span>{" "}
                    <span className="text-gray-600">{item.unit}</span>
                    <span className="text-gray-500 ml-1">({item.category})</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">No critical values at this time</div>
              )}
            </div>
          </Card>

          {/* Parameters Panel - Full Width */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <LazyOthersPanel />
            </Suspense>
          </div>
        </div>
      ) : (
        /* Split Layout for pages with 3D Model */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left Column */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* Critical Values - Top Left */}
            <Card className="p-4 bg-orange-50 border-orange-200 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-orange-900">Critical Values</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {criticalValues.length > 0 ? (
                  criticalValues.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-md text-sm"
                    >
                      <span className="font-medium">{item.label}:</span>{" "}
                      <span className="font-bold">{item.value}</span>{" "}
                      <span className="text-gray-600">{item.unit}</span>
                      <span className="text-gray-500 ml-1">({item.category})</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic">No critical values at this time</div>
                )}
              </div>
            </Card>

            {/* Parameters Panel - Below Critical Values */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <Suspense fallback={<LoadingFallback />}>
                {activeCategory === "substation" && (
                  <LazySubstationPanel />
                )}
                {activeCategory === "bayLines" && (
                  <LazyBayLinesPanel />
                )}
                {activeCategory === "transformer" && (
                  <LazyTransformerPanel />
                )}
                {activeCategory === "circuitBreaker" && (
                  <LazyCircuitBreakerPanel />
                )}
                {activeCategory === "isolator" && (
                  <LazyIsolatorPanel />
                )}
              </Suspense>
            </div>
          </div>

          {/* Right Column - 3D Model Full Height */}
          <div className="h-full min-h-0">
            <Suspense fallback={<LoadingFallback />}>
              {activeCategory === "substation" && (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>3D Model View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 min-h-0">
                    <ModelViewer
                      key="substation-model"
                      modelPath="/models/substation/substation.glb"
                      showGlow={false}
                      className="w-full h-full"
                      componentType="substation"
                      useFallback
                    />
                  </CardContent>
                </Card>
              )}
              {activeCategory === "bayLines" && (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>3D Model View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 min-h-0">
                    <ModelViewer
                      key="bayLines-model"
                      modelPath="/models/bay-lines/bay-lines.glb"
                      glowData={glowData}
                      showGlow={Object.keys(glowData).length > 0}
                      className="w-full h-full"
                      componentType="bayLines"
                      useFallback
                    />
                  </CardContent>
                </Card>
              )}
              {activeCategory === "transformer" && (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>3D Model View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 min-h-0">
                    <ModelViewer
                      key="transformer-model"
                      modelPath="/models/transformer/transformer.glb"
                      glowData={glowData}
                      showGlow={Object.keys(glowData).length > 0}
                      className="w-full h-full"
                      componentType="transformer"
                      useFallback
                    />
                  </CardContent>
                </Card>
              )}
              {activeCategory === "circuitBreaker" && (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>3D Model View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 min-h-0">
                    <ModelViewer
                      key="circuitBreaker-model"
                      modelPath="/models/circuit-breaker/circuit-breaker.glb"
                      glowData={glowData}
                      showGlow={Object.keys(glowData).length > 0}
                      className="w-full h-full"
                      componentType="circuitBreaker"
                      useFallback
                    />
                  </CardContent>
                </Card>
              )}
              {activeCategory === "isolator" && (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>3D Model View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 min-h-0">
                    <ModelViewer
                      key="isolator-model"
                      modelPath="/models/isolator/isolator.glb"
                      showGlow={false}
                      className="w-full h-full"
                      componentType="isolator"
                      useFallback
                    />
                  </CardContent>
                </Card>
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}

