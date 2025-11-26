"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ComponentType as ReactComponentType } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from "firebase/firestore"
import {
  Loader2,
  Download,
  Lightbulb,
  Maximize2,
  PlayCircle,
  PauseCircle,
  FileText,
  FileDown,
  Trash2,
  X,
  Activity,
  TrendingUp,
  ShieldAlert,
  Stethoscope,
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

import { db } from "@/lib/firebase"
import {
  COMPONENT_HEALTH_BLUEPRINT,
  COMPONENT_VIDEO_LIBRARY,
  FAULT_LIBRARY,
  PARAMETER_THRESHOLDS,
  type ComponentType,
} from "@/lib/analysis-config"
import type { SolutionData } from "@/lib/simulation-solution"
import { useSimulation } from "./simulation-context"
import { cn } from "@/lib/utils"
import { calculateAllHealthScores } from "@/lib/simulation-engine"

const RECENT_LIMIT = 20

interface AssetMetadata {
  assetId?: string
  assetName?: string
  substationName?: string
  substationCode?: string
  areaName?: string
  voltageClass?: string
  operator?: string
  latitude?: number
  longitude?: number
  installationYear?: number
  manufacturer?: string
  model?: string
  ratedSpecs?: Array<{ label: string; value: string }>
}

export interface SimulationData {
  id: string
  substationId: string
  componentType: ComponentType
  assetMetadata?: AssetMetadata
  assetContext?: Record<string, unknown>
  inputValues: Record<string, number | string>
  timeline: Array<{
    time: number
    state: Record<string, number | string>
    healthScore: number
  }>
  finalState: Record<string, number | string>
  healthScores: Record<string, number>
  faultPredictions: Array<{
    type: string
    probability: number
    timeToFailure?: number
    severity: "low" | "medium" | "high" | "critical"
    cause?: string
    affected?: string
    action?: string
  }>
  diagnosis: string
  videoUrl?: string
  timestamp: string
  detailedScores?: Record<string, number>
  overallHealth?: number
  stressScore?: number
  agingFactor?: number
  faultProbability?: number
  solution?: SolutionData
}

type Severity = "normal" | "low" | "medium" | "high" | "critical"

const COMPONENT_LABELS: Record<ComponentType, string> = {
  transformer: "Transformer",
  bayLines: "Bay Line",
  circuitBreaker: "Circuit Breaker",
  isolator: "Isolator",
  busbar: "Busbar",
}

const SEVERITY_THEME: Record<
  Severity,
  { bg: string; border: string; text: string; pill: string; emoji: string }
> = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    pill: "bg-red-600 text-white",
    emoji: "🔴",
  },
  high: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    pill: "bg-orange-500 text-white",
    emoji: "🟠",
  },
  medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    pill: "bg-yellow-500 text-white",
    emoji: "🟡",
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    pill: "bg-blue-500 text-white",
    emoji: "🔵",
  },
  normal: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    pill: "bg-emerald-500 text-white",
    emoji: "🟢",
  },
}

const CORRELATION_BLUEPRINT: Record<
  ComponentType,
  Array<{ label: string; a: string; b: string; description: string }>
> = {
  transformer: [
    {
      label: "Load vs Hotspot",
      a: "transformerLoading",
      b: "hotspotTemperature",
      description: "Higher loading should correlate with hotspot rise",
    },
    {
      label: "Gas vs Hotspot",
      a: "hydrogenPPM",
      b: "hotspotTemperature",
      description: "Gas accumulation typically follows hotspot severity",
    },
    {
      label: "Moisture vs Dielectric",
      a: "oilMoisture",
      b: "dielectricStrength",
      description: "Moisture deteriorates dielectric strength",
    },
  ],
  bayLines: [
    {
      label: "PF vs Line Heating",
      a: "powerFactor",
      b: "lineCurrent",
      description: "Low PF increases line current",
    },
    {
      label: "THD vs Stress",
      a: "harmonicsTHDPercent",
      b: "lineCurrent",
      description: "High THD usually compounds current stress",
    },
  ],
  circuitBreaker: [
    {
      label: "SF6 vs Temperature",
      a: "sf6DensityPercent",
      b: "poleTemperature",
      description: "Leakage degrades cooling and elevates temperature",
    },
    {
      label: "Operations vs Wear",
      a: "operationCountPercent",
      b: "mechanismWearLevel",
      description: "Duty cycle directly impacts wear",
    },
  ],
  isolator: [
    {
      label: "Torque vs Contact",
      a: "motorTorqueNm",
      b: "contactResistanceMicroOhm",
      description: "High torque often tracks poor contact quality",
    },
  ],
  busbar: [
    {
      label: "Load vs Joint Temp",
      a: "busbarLoadPercent",
      b: "jointHotspotTemp",
      description: "Overload accelerates joint hotspots",
    },
    {
      label: "Temp vs Resistance",
      a: "busbarTemperature",
      b: "impedanceMicroOhm",
      description: "Thermal stress raises contact resistance",
    },
  ],
}

const TREND_WINDOWS = [30, 90, 180]

const formatKey = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()

const toNumber = (value: number | string | undefined, fallback = 0) => {
  if (typeof value === "number") return value
  const parsed = parseFloat(String(value ?? ""))
  return Number.isFinite(parsed) ? parsed : fallback
}

function evaluateSeverity(component: ComponentType, key: string, rawValue: number | string | undefined): Severity {
  const thresholds = PARAMETER_THRESHOLDS[component]
  if (!thresholds?.[key]) return "normal"
  const { warning, critical, direction = "high" } = thresholds[key]
  const value = toNumber(rawValue)

  if (direction === "high") {
    if (value >= critical) return "critical"
    if (value >= warning) return "high"
    if (value >= warning * 0.9) return "medium"
    return "normal"
  }

  if (direction === "low") {
    if (value <= critical) return "critical"
    if (value <= warning) return "high"
    if (value <= warning + (warning - critical) * 0.3) return "medium"
    return "normal"
  }

  return "normal"
}

function getWorstSeverity(faults: SimulationData["faultPredictions"] = []): Severity {
  const priority: Severity[] = ["critical", "high", "medium", "low", "normal"]
  const found = faults.reduce<Severity>((acc, fault) => {
    const currentIndex = priority.indexOf(acc)
    const candidate = fault.severity as Severity
    const candidateIndex = priority.indexOf(candidate)
    return candidateIndex < currentIndex ? candidate : acc
  }, "normal")
  return found
}

function downloadBlob(filename: string, data: string, type: string) {
  const blob = new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

async function downloadPdfReport(simulation: SimulationData) {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text("Simulation Analysis Report", 14, 20)
  doc.setFontSize(10)
  const overallHealth = deriveOverallHealth(simulation)

  const summary = [
    `Component: ${COMPONENT_LABELS[simulation.componentType]}`,
    `Asset: ${simulation.assetMetadata?.assetName ?? simulation.assetMetadata?.assetId ?? "N/A"}`,
    `Substation: ${simulation.assetMetadata?.substationName ?? simulation.substationId}`,
    `Run at: ${format(new Date(simulation.timestamp), "PPpp")}`,
    `Overall Health: ${overallHealth.toFixed(1)}%`,
  ]

  summary.forEach((text, idx) => doc.text(text, 14, 30 + idx * 6))
  doc.text("Diagnosis Snapshot:", 14, 70)
  doc.text(doc.splitTextToSize(simulation.diagnosis ?? "N/A", 180) as string[], 14, 78)
  doc.text("Faults:", 14, 120)

  simulation.faultPredictions?.slice(0, 5).forEach((fault, idx) => {
    doc.text(
      `${fault.type} (${fault.severity}) – ${(fault.probability * 100).toFixed(0)}%`,
      14,
      130 + idx * 6,
    )
  })

  doc.save(`simulation-${simulation.id}.pdf`)
}

function createCsvFromTimeline(simulation: SimulationData) {
  const headers = new Set<string>()
  simulation.timeline?.forEach((step) => {
    Object.keys(step.state).forEach((key) => headers.add(key))
  })
  const headerArray = ["time", "healthScore", ...Array.from(headers)]
  const rows = simulation.timeline?.map((step) => {
    const row: Array<string | number> = [step.time, step.healthScore]
    headerArray.slice(2).forEach((key) => {
      row.push(step.state[key] ?? "")
    })
    return row
  })
  return [headerArray.join(","), ...(rows ?? []).map((row) => row.join(","))].join("\n")
}

function getHealthColor(score: number) {
  if (score >= 80) return "text-emerald-600"
  if (score >= 60) return "text-yellow-600"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

const clampHealth = (value: number) => Math.min(100, Math.max(0, value))

const getLatestState = (simulation?: SimulationData | null) => {
  if (!simulation) return {}
  const finalState = simulation.finalState ?? {}
  if (Object.keys(finalState).length > 0) {
    return finalState
  }
  const timelineState = simulation.timeline?.[simulation.timeline.length - 1]?.state
  if (timelineState && Object.keys(timelineState).length > 0) {
    return timelineState
  }
  return simulation.inputValues ?? {}
}

function deriveOverallHealth(simulation?: SimulationData | null) {
  if (!simulation) return 0
  if (typeof simulation.overallHealth === "number" && simulation.overallHealth > 0) {
    const normalized = simulation.overallHealth <= 1 ? simulation.overallHealth * 100 : simulation.overallHealth
    return clampHealth(normalized)
  }
  const direct = simulation.healthScores?.overall
  if (typeof direct === "number" && direct > 0) {
    return clampHealth(direct)
  }

  const latestState = getLatestState(simulation)
  const computedOverall =
    Object.keys(latestState).length > 0
      ? calculateAllHealthScores(simulation.componentType, latestState).overall
      : undefined
  if (typeof computedOverall === "number" && computedOverall > 0) {
    return clampHealth(computedOverall)
  }

  const secondaryScores =
    Object.entries(simulation.healthScores ?? {})
      .filter(([key]) => key !== "overall")
      .map(([, value]) => value)
      .filter((value): value is number => typeof value === "number" && value >= 0) ?? []

  if (secondaryScores.length > 0) {
    const average = secondaryScores.reduce((sum, value) => sum + value, 0) / secondaryScores.length
    if (average > 0) {
      return clampHealth(average)
    }
  }

  const timelineLength = simulation.timeline?.length ?? 0
  const timelineHealth =
    timelineLength > 0 ? simulation.timeline?.[timelineLength - 1]?.healthScore : undefined
  if (typeof timelineHealth === "number" && timelineHealth > 0) {
    return clampHealth(timelineHealth)
  }

  return typeof direct === "number" ? clampHealth(direct) : 0
}

const useVideoControls = () => {
  const MAX_RUNTIME_SECONDS = 15
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleLoaded = () => {
      const clippedDuration =
        video.duration && Number.isFinite(video.duration)
          ? Math.min(video.duration, MAX_RUNTIME_SECONDS)
          : MAX_RUNTIME_SECONDS
      setDuration(clippedDuration)
    }
    const handleTime = () => {
      const safeTime = Math.min(video.currentTime || 0, MAX_RUNTIME_SECONDS)
      if (safeTime >= MAX_RUNTIME_SECONDS) {
        video.pause()
        video.currentTime = MAX_RUNTIME_SECONDS
        setIsPlaying(false)
      }
      setCurrentTime(safeTime)
    }
    video.addEventListener("loadedmetadata", handleLoaded)
    video.addEventListener("timeupdate", handleTime)
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded)
      video.removeEventListener("timeupdate", handleTime)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
      return
    }
    video.play()
    setIsPlaying(true)
  }

  const updateTime = (value: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = value
    setCurrentTime(value)
  }

  const changeSpeed = (value: number) => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = value
    setPlaybackRate(value)
  }

  return {
    videoRef,
    isPlaying,
    duration,
    currentTime,
    playbackRate,
    togglePlay,
    updateTime,
    changeSpeed,
  }
}

const deriveVideoSources = (src: string) => {
  const trimmed = (src ?? "").trim()
  if (!trimmed) {
    return []
  }
  try {
    const [base] = trimmed.split("?")
    const normalized = base?.toLowerCase() ?? ""
    if (normalized.endsWith(".mp4")) {
      return [{ src: trimmed, type: "video/mp4" }]
    }
    if (normalized.endsWith(".webm")) {
      return [{ src: trimmed, type: "video/webm" }]
    }
  } catch {
    // Fallback to dual sources below
  }
  return [
    { src: trimmed, type: "video/webm" },
    { src: trimmed, type: "video/mp4" },
  ]
}

function useCorrelationInsights(simulation: SimulationData | null) {
  return useMemo(() => {
    if (!simulation) return []
    const pairs = CORRELATION_BLUEPRINT[simulation.componentType] || []
    const timeline = simulation.timeline || []
    const insights: Array<{ label: string; description: string; value: number }> = []

    const pearson = (seriesA: number[], seriesB: number[]) => {
      if (!seriesA.length || !seriesB.length) return 0
      const meanA = seriesA.reduce((sum, val) => sum + val, 0) / seriesA.length
      const meanB = seriesB.reduce((sum, val) => sum + val, 0) / seriesB.length
      const numerator = seriesA.reduce(
        (sum, val, idx) => sum + (val - meanA) * (seriesB[idx] - meanB),
        0,
      )
      const denomA = Math.sqrt(seriesA.reduce((sum, val) => sum + (val - meanA) ** 2, 0))
      const denomB = Math.sqrt(seriesB.reduce((sum, val) => sum + (val - meanB) ** 2, 0))
      if (denomA === 0 || denomB === 0) return 0
      return numerator / (denomA * denomB)
    }

    pairs.forEach((pair) => {
      const aSeries: number[] = []
      const bSeries: number[] = []
      timeline.forEach((step) => {
        const a = toNumber(step.state[pair.a])
        const b = toNumber(step.state[pair.b])
        if (Number.isFinite(a) && Number.isFinite(b)) {
          aSeries.push(a)
          bSeries.push(b)
        }
      })
      if (aSeries.length > 2) {
        insights.push({
          label: pair.label,
          description: pair.description,
          value: pearson(aSeries, bSeries),
        })
      }
    })

    return insights.sort((a, b) => Math.abs(b.value) - Math.abs(a.value)).slice(0, 4)
  }, [simulation])
}

function generateHeatmapData(simulation: SimulationData | null) {
  if (!simulation) return []
  const component = simulation.componentType
  const thresholds = PARAMETER_THRESHOLDS[component]
  if (!thresholds) return []
  const final = getLatestState(simulation)

  return Object.keys(thresholds).map((key) => ({
    key,
    label: formatKey(key),
    severity: evaluateSeverity(component, key, final[key]),
    value: final[key],
    unit: thresholds[key].unit,
  }))
}

function generateTrendPrediction(simulation: SimulationData | null, overallOverride?: number) {
  if (!simulation) return []
  const overall = (typeof overallOverride === "number" ? overallOverride : deriveOverallHealth(simulation)) || 60
  
  // More realistic trend prediction based on:
  // 1. Current health score
  // 2. Fault predictions and their severity
  // 3. Stress indicators
  // 4. Aging factor
  const faultLoad = simulation.faultPredictions?.length ?? 0
  const criticalFaults = simulation.faultPredictions?.filter(f => f.severity === "critical" || f.severity === "high").length ?? 0
  const stressScore = simulation.stressScore ?? 0
  const agingFactor = simulation.agingFactor ?? 0.5
  
  // Calculate degradation rate based on multiple factors
  const baseDegradationRate = Math.max(0.001, (100 - overall) / 10000) // Slower for healthier components
  const faultAcceleration = criticalFaults * 0.003 + faultLoad * 0.001
  const stressAcceleration = stressScore * 0.002
  const agingAcceleration = (1 - agingFactor) * 0.0015
  
  const totalDegradationRate = baseDegradationRate + faultAcceleration + stressAcceleration + agingAcceleration
  
  return TREND_WINDOWS.map((days) => {
    // Exponential decay with realistic degradation
    const months = days / 30
    const degradation = Math.min(0.95, totalDegradationRate * days * (1 + months * 0.1))
    const projected = Math.max(5, Math.min(100, overall * (1 - degradation)))
    
    return {
      horizon: `${days} days`,
      projected: Math.round(projected * 10) / 10,
      severity: projected >= 70 ? "low" : projected >= 50 ? "medium" : "high",
    }
  })
}

function computeRiskScore(simulation: SimulationData | null, overallOverride?: number) {
  if (!simulation) return { riskScore: 0, shortTerm: 0, mediumTerm: 0, longTerm: 0 }
  const health = (typeof overallOverride === "number" ? overallOverride : deriveOverallHealth(simulation)) || 60
  const faultLoad = simulation.faultPredictions?.length ?? 0
  const severityWeight =
    simulation.faultPredictions?.reduce((sum, fault) => {
      const weights: Record<Severity, number> = {
        critical: 3,
        high: 2,
        medium: 1.2,
        low: 0.5,
        normal: 0,
      }
      return sum + (weights[fault.severity as Severity] ?? 1)
    }, 0) ?? 0

  const riskScore = Math.min(10, Math.max(0, 10 - health / 12 + severityWeight / 2))
  return {
    riskScore: Number(riskScore.toFixed(1)),
    shortTerm: Math.min(100, Math.max(5, riskScore * 10 + faultLoad * 5)),
    mediumTerm: Math.min(100, Math.max(5, (riskScore + 1) * 9)),
    longTerm: Math.min(100, Math.max(5, (riskScore + 2) * 8)),
  }
}

function computeRul(simulation: SimulationData | null, overallOverride?: number) {
  if (!simulation) return { optimistic: 0, conservative: 0 }
  const health = (typeof overallOverride === "number" ? overallOverride : deriveOverallHealth(simulation)) || 50
  
  // More realistic RUL calculation considering:
  // 1. Component type and typical lifespan
  // 2. Current health score
  // 3. Fault predictions and severity
  // 4. Stress indicators
  // 5. Aging factor
  // 6. Maintenance history (if available)
  
  const componentType = simulation.componentType
  const baseLifespans: Record<ComponentType, number> = {
    transformer: 30 * 12, // 30 years in months
    bayLines: 25 * 12,    // 25 years
    circuitBreaker: 20 * 12, // 20 years
    isolator: 25 * 12,    // 25 years
    busbar: 30 * 12,      // 30 years
  }
  
  const baseLife = baseLifespans[componentType] || 20 * 12
  
  // Calculate remaining life based on health
  // Health below 50% accelerates degradation significantly
  const healthFactor = health >= 80 ? 1.0 : health >= 60 ? 0.85 : health >= 40 ? 0.65 : 0.4
  
  // Factor in fault predictions
  const faultLoad = simulation.faultPredictions?.length ?? 0
  const criticalFaults = simulation.faultPredictions?.filter(f => 
    f.severity === "critical" || f.severity === "high"
  ).length ?? 0
  const faultPenalty = Math.min(0.4, criticalFaults * 0.15 + faultLoad * 0.05)
  
  // Factor in stress and aging
  const stressScore = simulation.stressScore ?? 0
  const agingFactor = simulation.agingFactor ?? 0.5
  const stressPenalty = Math.min(0.2, stressScore * 0.1)
  const agingPenalty = Math.min(0.3, (1 - agingFactor) * 0.3)
  
  // Calculate remaining useful life
  const remainingLifeFactor = Math.max(0.1, healthFactor * (1 - faultPenalty - stressPenalty - agingPenalty))
  const optimistic = Math.max(6, Math.min(baseLife, (health / 100) * baseLife * remainingLifeFactor))
  
  // Conservative estimate accounts for uncertainty and worst-case scenarios
  const uncertaintyFactor = 0.7 // 30% uncertainty buffer
  const worstCasePenalty = Math.min(0.5, criticalFaults * 0.2 + stressScore * 0.15)
  const conservative = Math.max(3, optimistic * uncertaintyFactor * (1 - worstCasePenalty))
  
  return { 
    optimistic: Math.round(optimistic), 
    conservative: Math.round(conservative) 
  }
}

function ManualSimulationList({
  simulations,
  filterComponent,
  setFilterComponent,
  filterSeverity,
  setFilterSeverity,
  onSelect,
  onGoToSolution,
  selectedId,
}: {
  simulations: SimulationData[]
  filterComponent: string
  setFilterComponent: (value: string) => void
  filterSeverity: string
  setFilterSeverity: (value: string) => void
  onSelect: (simulation: SimulationData) => void
  onGoToSolution: (simulation: SimulationData) => void
  selectedId?: string | null
}) {
  const filtered = simulations.filter((sim) => {
    if (filterComponent !== "all" && sim.componentType !== filterComponent) return false
    if (filterSeverity !== "all") {
      const match = sim.faultPredictions?.some(
        (fault) => fault.severity.toLowerCase() === filterSeverity.toLowerCase(),
      )
      return match
    }
    return true
  })

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="whitespace-nowrap">Recent Simulations (Last {RECENT_LIMIT})</CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">Component</span>
              <Select value={filterComponent} onValueChange={setFilterComponent}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Object.entries(COMPONENT_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">Severity</span>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden px-0">
        <ScrollArea className="h-full pr-2">
          <div className="space-y-3 px-4 pb-4">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No simulations match the filters</p>
            )}
            {filtered.map((sim) => {
              const worst = getWorstSeverity(sim.faultPredictions)
              const derivedHealth = deriveOverallHealth(sim)
              const hasHealthData =
                (sim.healthScores && Object.keys(sim.healthScores).length > 0) || (sim.timeline?.length ?? 0) > 0
              const healthLabel = hasHealthData ? `${derivedHealth.toFixed(0)}%` : "—"
              return (
                <div
                  key={sim.id}
                  className={cn(
                    "rounded-xl border p-4 transition hover:border-primary/40 cursor-pointer bg-background",
                    selectedId === sim.id && "border-primary shadow-sm",
                  )}
                  onClick={() => onSelect(sim)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          {COMPONENT_LABELS[sim.componentType]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(sim.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={SEVERITY_THEME[worst].pill}>
                          {worst.toUpperCase()}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(event) => {
                            event.stopPropagation()
                            onGoToSolution(sim)
                          }}
                          aria-label="View solution recommendations"
                        >
                          <Lightbulb className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={getHealthColor(derivedHealth)}>
                        {healthLabel === "—" ? "Health —" : `Health ${healthLabel}`}
                      </span>
                      <span className="text-muted-foreground">
                        {sim.faultPredictions?.length ?? 0} predicted faults
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}


export function SimulationDetail({
  simulation,
  onGoToSolution,
  onDelete,
  showPlayback = true,
}: {
  simulation: SimulationData
  onGoToSolution: () => void
  onDelete: () => void
  showPlayback?: boolean
}) {
  const componentType = simulation.componentType
  const blueprint = COMPONENT_HEALTH_BLUEPRINT[componentType] ?? []
  const correlations = useCorrelationInsights(simulation)
  const latestState = useMemo(() => getLatestState(simulation), [simulation])
  const storedHealthScores = simulation.healthScores
  const healthScores = useMemo(() => {
    const computed =
      Object.keys(latestState).length > 0 ? calculateAllHealthScores(componentType, latestState) : {}
    const resolved: Record<string, number> = { ...computed }
    if (storedHealthScores) {
      Object.entries(storedHealthScores).forEach(([key, value]) => {
        if (typeof value === "number" && value > 0) {
          resolved[key] = value
        }
      })
    }
    if (simulation.detailedScores) {
      Object.entries(simulation.detailedScores).forEach(([key, value]) => {
        if (typeof value === "number" && value >= 0) {
          const normalized = value <= 1 ? value * 100 : value
          resolved[key] = clampHealth(normalized)
        }
      })
    }
    return resolved
  }, [componentType, latestState, storedHealthScores, simulation.detailedScores])
  const overallHealth = useMemo(() => {
    const resolved = typeof healthScores.overall === "number" ? healthScores.overall : undefined
    return clampHealth(resolved ?? deriveOverallHealth(simulation))
  }, [healthScores.overall, simulation])
  const heatmap = useMemo(() => generateHeatmapData(simulation), [simulation])
  const trend = useMemo(() => generateTrendPrediction(simulation, overallHealth), [simulation, overallHealth])
  const risk = useMemo(() => computeRiskScore(simulation, overallHealth), [simulation, overallHealth])
  const rul = useMemo(() => computeRul(simulation, overallHealth), [simulation, overallHealth])
  const videoControls = useVideoControls()
  const rates = [0.5, 1, 1.5, 2]
  const [selectedMetricKey, setSelectedMetricKey] = useState<string | null>(null)
  const [hasDismissedMetric, setHasDismissedMetric] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const fallbackPlaybackSrc = COMPONENT_VIDEO_LIBRARY[componentType]
  const [videoSource, setVideoSource] = useState<string>(fallbackPlaybackSrc)
  const [hasCustomVideo, setHasCustomVideo] = useState(false)
  const videoSources = useMemo(() => deriveVideoSources(videoSource), [videoSource])
  const metricSeries = useMemo(() => {
    const series: Record<string, Array<{ time: number; value: number }>> = {}
    if (simulation.timeline?.length) {
      simulation.timeline.forEach((step) => {
        const scores = calculateAllHealthScores(componentType, step.state)
        Object.entries(scores).forEach(([key, value]) => {
          if (!series[key]) {
            series[key] = []
          }
          series[key].push({ time: step.time, value })
        })
      })
    } else {
      Object.entries(healthScores).forEach(([key, value]) => {
        if (typeof value === "number") {
          series[key] = [{ time: 0, value }]
        }
      })
    }
    return series
  }, [componentType, healthScores, simulation.timeline])

  const activeMetric = useMemo(
    () => blueprint.find((metric) => metric.key === selectedMetricKey) ?? null,
    [blueprint, selectedMetricKey],
  )
  const activeSeries = useMemo(
    () => (selectedMetricKey ? metricSeries[selectedMetricKey] ?? [] : []),
    [metricSeries, selectedMetricKey],
  )
  const stressPercent =
    typeof simulation.stressScore === "number"
      ? simulation.stressScore <= 1
        ? simulation.stressScore * 100
        : simulation.stressScore
      : null
  const agingPercent =
    typeof simulation.agingFactor === "number"
      ? simulation.agingFactor <= 1
        ? simulation.agingFactor * 100
        : simulation.agingFactor
      : null
  const faultProbabilityPercent =
    typeof simulation.faultProbability === "number"
      ? simulation.faultProbability <= 1
        ? simulation.faultProbability * 100
        : simulation.faultProbability
      : null

  useEffect(() => {
    const trimmed = typeof simulation.videoUrl === "string" ? simulation.videoUrl.trim() : ""
    const hasAnyCustomVideo = trimmed.length > 0
    const isHttpUrl = /^https?:\/\//i.test(trimmed)
    console.log("[Analysis] Resolving video source", {
      simulationId: simulation.id,
      rawVideoUrl: simulation.videoUrl,
      trimmed,
      isHttpUrl,
      hasAnyCustomVideo,
    })
    // Treat both absolute (https://...) and relative (/api/...) URLs as valid custom sources.
    setVideoSource(hasAnyCustomVideo ? trimmed : fallbackPlaybackSrc)
    setHasCustomVideo(hasAnyCustomVideo)
    setVideoError(false)
  }, [simulation.id, simulation.videoUrl, fallbackPlaybackSrc])

  useEffect(() => {
    if (!blueprint.length) {
      setSelectedMetricKey(null)
      return
    }
    if (hasDismissedMetric && selectedMetricKey === null) {
      return
    }
    if (!selectedMetricKey || !blueprint.some((metric) => metric.key === selectedMetricKey)) {
      setSelectedMetricKey(blueprint[0].key)
    }
  }, [blueprint, hasDismissedMetric, selectedMetricKey])

  useEffect(() => {
    setHasDismissedMetric(false)
  }, [componentType])

  const handleDownload = (type: "json" | "csv" | "pdf") => {
    if (type === "json") {
      downloadBlob(`simulation-${simulation.id}.json`, JSON.stringify(simulation, null, 2), "application/json")
      return
    }
    if (type === "csv") {
      downloadBlob(`simulation-${simulation.id}.csv`, createCsvFromTimeline(simulation), "text/csv")
      return
    }
    if (type === "pdf") {
      downloadPdfReport(simulation)
    }
  }

  const handleVideoError = () => {
    console.warn("[Analysis] Video element onError fired", {
      simulationId: simulation.id,
      currentVideoSource: videoSource,
      fallbackPlaybackSrc,
    })
    if (videoSource !== fallbackPlaybackSrc) {
      setVideoSource(fallbackPlaybackSrc)
      setHasCustomVideo(false)
      setVideoError(false)
    } else {
      setVideoError(true)
    }
  }

  const stackedButtonClass = "flex flex-col items-center justify-center gap-1 w-24 h-auto py-3 px-3 text-xs font-semibold"

  const riskGaugePercent = Number.isFinite(risk.riskScore)
    ? Math.min(100, Math.max(0, (risk.riskScore / 10) * 100))
    : 0

  const actionButtons: Array<{
    id: string
    label: string
    icon: ReactComponentType<{ className?: string }>
    onClick: () => void
    variant?: "success" | "destructive"
  }> = [
    { id: "json", label: "Raw JSON", icon: Download, onClick: () => handleDownload("json") },
    { id: "csv", label: "CSV Timeline", icon: FileText, onClick: () => handleDownload("csv") },
    { id: "pdf", label: "PDF Report", icon: FileDown, onClick: () => handleDownload("pdf") },
    { id: "delete", label: "Delete", icon: Trash2, onClick: onDelete, variant: "destructive" },
    { id: "solution", label: "Solution", icon: Lightbulb, onClick: onGoToSolution, variant: "success" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardHeader className="flex flex-wrap gap-4 justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              {COMPONENT_LABELS[componentType]} Analysis -{" "}
              <span className="text-base text-muted-foreground">
                {simulation.assetMetadata?.assetName ?? simulation.assetMetadata?.assetId ?? "Asset"}
              </span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Run at {format(new Date(simulation.timestamp), "PPpp")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-end">
            {actionButtons.map((btn) => {
              const Icon = btn.icon
              const variantClass =
                btn.variant === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : btn.variant === "destructive"
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : ""
              const variant = btn.variant === "success" ? "default" : "outline"
              return (
                <Button key={btn.id} variant={variant} className={cn(stackedButtonClass, variantClass)} onClick={btn.onClick}>
                  <Icon className="h-4 w-4" />
                  <span>{btn.label}</span>
                </Button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 items-stretch">
            <div className="rounded-xl border bg-muted/40 p-4 flex flex-col h-full">
              <p className="text-xs uppercase text-muted-foreground tracking-wide">
                Component Info
              </p>
              <dl className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Asset</dt>
                  <dd className="font-semibold">
                    {simulation.assetMetadata?.assetName ?? simulation.assetMetadata?.assetId ?? "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Substation</dt>
                  <dd>{simulation.assetMetadata?.substationName ?? simulation.substationId}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Installed</dt>
                  <dd>{simulation.assetMetadata?.installationYear ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Manufacturer</dt>
                  <dd>{simulation.assetMetadata?.manufacturer ?? "Oceanberg Power"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Substation Code</dt>
                  <dd>{simulation.assetMetadata?.substationCode ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Component Model</dt>
                  <dd>{simulation.assetMetadata?.model ?? "-"}</dd>
                </div>
              </dl>
              <dl className="grid grid-cols-2 gap-3 mt-4 pt-3 text-sm border-t">
                <div>
                  <dt className="text-muted-foreground">Area</dt>
                  <dd>{simulation.assetMetadata?.areaName ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Voltage Class</dt>
                  <dd>{simulation.assetMetadata?.voltageClass ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Operator</dt>
                  <dd>{simulation.assetMetadata?.operator ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Location</dt>
                  <dd>
                    {simulation.assetMetadata?.latitude && simulation.assetMetadata?.longitude
                      ? `${simulation.assetMetadata.latitude.toFixed(4)}, ${simulation.assetMetadata.longitude.toFixed(4)}`
                      : "-"}
                  </dd>
                </div>
              </dl>
              {simulation.assetMetadata?.ratedSpecs && simulation.assetMetadata.ratedSpecs.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {simulation.assetMetadata.ratedSpecs.map((spec) => (
                    <span
                      key={spec.label}
                      className="rounded-full border border-dashed px-3 py-1 bg-white/60 text-gray-700"
                    >
                      <span className="font-semibold">{spec.label}:</span> {spec.value}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-xs uppercase text-muted-foreground tracking-wide">Input Snapshot</p>
              <div className="mt-4">
                <div className="grid gap-3 text-xs sm:grid-cols-2 xl:grid-cols-3">
                  {Object.entries(simulation.inputValues || {}).map(([key, value]) => (
                    <div key={key} className="rounded-lg border bg-background px-3 py-2 h-full">
                      <p className="font-medium text-slate-800">{formatKey(key)}</p>
                      <p className="text-muted-foreground break-words">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPlayback && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>3D Simulation Playback</CardTitle>
              {hasCustomVideo && (
                <Badge variant="outline" className="text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Video captured
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-2">
              15-second summary video representing the complete simulation runtime performance
            </p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="rounded-xl border overflow-hidden relative">
              {videoSources.length > 0 ? (
                <video
                  key={simulation.id}
                  ref={videoControls.videoRef}
                  className="w-full h-64 object-cover"
                  poster="/placeholder.jpg"
                  controls={false}
                  muted
                  playsInline
                  preload="metadata"
                  onError={handleVideoError}
                >
                  {videoSources.map((source) => (
                    <source key={`${source.type}-${source.src}`} src={source.src} type={source.type} />
                  ))}
                </video>
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-muted text-sm text-muted-foreground">
                  No video available for this simulation
                </div>
              )}
              {videoError && videoSources.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm">
                  Video source unavailable
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm" onClick={videoControls.togglePlay} disabled={videoError}>
                {videoControls.isPlaying ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" /> Play
                  </>
                )}
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Speed</span>
                <Select
                  value={String(videoControls.playbackRate)}
                  onValueChange={(value) => videoControls.changeSpeed(Number(value))}
                  disabled={videoError}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rates.map((rate) => (
                      <SelectItem key={rate} value={String(rate)}>
                        {rate}x
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => videoControls.videoRef.current?.requestFullscreen?.()}
                disabled={videoError}
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
              <div className="flex-1">
                <Slider
                  min={0}
                  max={videoControls.duration || 1}
                  step={0.1}
                  value={[videoControls.currentTime]}
                  onValueChange={([value]) => videoControls.updateTime(value)}
                  disabled={videoError}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <p>
                  {videoControls.currentTime.toFixed(1)}s / {videoControls.duration.toFixed(1)}s
                </p>
                <p>15s performance replay</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Health & Severity Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-white p-4">
              <p className="text-xs text-muted-foreground uppercase">True Health</p>
              <p className="text-2xl font-semibold">{overallHealth.toFixed(1)}%</p>
            </div>
            {stressPercent !== null && (
              <div className="rounded-xl border bg-white p-4">
                <p className="text-xs text-muted-foreground uppercase">Stress Score</p>
                <p className="text-2xl font-semibold text-orange-600">{stressPercent.toFixed(1)}%</p>
              </div>
            )}
            {faultProbabilityPercent !== null && (
              <div className="rounded-xl border bg-white p-4">
                <p className="text-xs text-muted-foreground uppercase">Fault Probability</p>
                <p className="text-2xl font-semibold text-red-600">{faultProbabilityPercent.toFixed(1)}%</p>
              </div>
            )}
            {agingPercent !== null && (
              <div className="rounded-xl border bg-white p-4">
                <p className="text-xs text-muted-foreground uppercase">Aging Factor</p>
                <p className="text-2xl font-semibold text-emerald-600">{agingPercent.toFixed(1)}%</p>
              </div>
            )}
          </div>
          <Separator />
          <div className="space-y-3">
            {heatmap.length === 0 && (
              <p className="text-sm text-muted-foreground">No severity metrics available.</p>
            )}
            {heatmap.map((item) => {
              const theme = SEVERITY_THEME[item.severity] ?? SEVERITY_THEME.normal
              return (
                <div
                  key={item.key}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                    theme.bg,
                    theme.border,
                  )}
                >
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.value ?? "-"} {item.unit ?? ""}
                    </p>
                  </div>
                  <span className="text-lg">{theme.emoji}</span>
                </div>
              )
            })}
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {blueprint.map((metric) => {
              const score = healthScores[metric.key] ?? 0
              const angle = Math.round((score / 100) * 360)
              const isActive = selectedMetricKey === metric.key
              return (
                <div
                  key={metric.key}
                  className={cn(
                    "rounded-xl border p-4 hover:shadow-sm transition cursor-pointer",
                    isActive && "border-primary bg-primary/5 shadow-sm",
                  )}
                  onClick={() => {
                    setHasDismissedMetric(false)
                    setSelectedMetricKey(metric.key)
                  }}
                >
                  <p className="text-sm font-medium">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div
                      className="h-16 w-16 rounded-full border-4 border-muted relative"
                      style={{
                        background: `conic-gradient(#10b981 ${angle}deg, #e5e7eb ${angle}deg)`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                        {score.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Severity</span>
                        <Badge variant="outline" className={getHealthColor(score)}>
                          {score >= 80 ? "Normal" : score >= 60 ? "Watch" : score >= 40 ? "High" : "Critical"}
                        </Badge>
                      </div>
                      <Progress value={score} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {activeMetric && (
            <div className="rounded-xl border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary tracking-wide">Time-Series</p>
                  <p className="text-lg font-semibold">{activeMetric.label}</p>
                  <p className="text-sm text-muted-foreground">{activeMetric.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Latest Score</p>
                    <p className={cn("text-2xl font-semibold", getHealthColor(healthScores[activeMetric.key] ?? 0))}>
                      {(healthScores[activeMetric.key] ?? 0).toFixed(0)}%
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setHasDismissedMetric(true)
                      setSelectedMetricKey(null)
                    }}
                    aria-label="Close metric chart"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                {activeSeries.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activeSeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                      <RechartsTooltip contentStyle={{ borderRadius: 12, borderColor: "#e5e7eb" }} />
                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground">No timeline samples available for this metric.</p>
                )}
              </div>
            </div>
          )}
          {simulation.faultPredictions?.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <p className="text-sm font-semibold">Fault Prediction Panel</p>
                {simulation.faultPredictions.map((fault, idx) => {
                  const theme = SEVERITY_THEME[fault.severity as Severity] ?? SEVERITY_THEME.low
                  const libraryMeta = FAULT_LIBRARY[componentType]?.find((f) => f.type === fault.type)
                  return (
                    <div key={`${fault.type}-${idx}`} className={cn("rounded-xl border p-4", theme.bg, theme.border)}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{fault.type}</p>
                          <p className="text-xs text-muted-foreground">
                            Probability {(fault.probability * 100).toFixed(0)}% - ETA{" "}
                            {fault.timeToFailure ? `${fault.timeToFailure.toFixed(1)} h` : "-"}
                          </p>
                        </div>
                        <Badge className={theme.pill}>{fault.severity.toUpperCase()}</Badge>
                      </div>
                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Cause</p>
                          <p>{fault.cause ?? libraryMeta?.cause ?? "Trend indicates anomaly"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Affected</p>
                          <p>{fault.affected ?? libraryMeta?.affected ?? "Subsystem"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Action</p>
                          <p>{fault.action ?? libraryMeta?.action ?? "Initiate inspection workflow"}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Correlation Insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {correlations.length === 0 && (
            <p className="text-sm text-muted-foreground">No meaningful correlations detected.</p>
          )}
          {correlations.map((insight) => {
            const direction = insight.value >= 0 ? "Positive" : "Negative"
            const magnitude = Math.abs(insight.value) * 100
            return (
              <div
                key={insight.label}
                className="rounded-xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 text-blue-700 p-2">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{insight.label}</p>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                  <Badge variant="secondary">{direction}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Strength</span>
                    <span className="font-semibold text-slate-700">{magnitude.toFixed(0)}%</span>
                  </div>
                  <Progress value={magnitude} />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Trend Prediction & RUL</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex min-w-[220px] flex-1 items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
              <div className="rounded-full bg-emerald-100 text-emerald-700 p-3">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Remaining Useful Life</p>
                <p className="text-lg font-bold">{rul.optimistic} months</p>
                <p className="text-xs text-muted-foreground">
                  Conservative window <span className="font-semibold text-slate-700">{rul.conservative} months</span>
                </p>
              </div>
            </div>
            <div className="grid flex-1 min-w-[220px] gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-gradient-to-br from-emerald-50 to-white p-3">
                <p className="text-xs text-muted-foreground uppercase">Optimistic</p>
                <p className="text-2xl font-semibold text-emerald-600">{rul.optimistic}</p>
                <p className="text-xs text-muted-foreground">months remaining</p>
              </div>
              <div className="rounded-lg border bg-gradient-to-br from-orange-50 to-white p-3">
                <p className="text-xs text-muted-foreground uppercase">Conservative</p>
                <p className="text-2xl font-semibold text-orange-600">{rul.conservative}</p>
                <p className="text-xs text-muted-foreground">months remaining</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {trend.map((window) => (
              <div key={window.horizon} className="rounded-lg border bg-white/80 p-3 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                  <span>{window.horizon}</span>
                  <span className={cn("font-semibold", getHealthColor(window.projected))}>
                    {window.projected.toFixed(1)}%
                  </span>
                </div>
                <Progress value={window.projected} />
                <p className="text-xs text-muted-foreground capitalize">Severity: {window.severity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Risk Score & Probabilities</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative h-28 w-28">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#dc2626 ${riskGaugePercent}%, #fee2e2 ${riskGaugePercent}%)`,
                }}
              />
              <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center shadow-inner text-center">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <p className="text-[11px] uppercase text-muted-foreground tracking-wide">Risk</p>
                <p className="text-2xl font-bold text-red-600">{risk.riskScore.toFixed(1)}</p>
              </div>
            </div>
            <div className="flex-1 min-w-[220px] space-y-2 text-sm">
              <p className="text-muted-foreground">
                Composite probability of failure derived from health {overallHealth.toFixed(1)}% and{" "}
                {simulation.faultPredictions?.length ?? 0} open faults.
              </p>
              {typeof simulation.faultProbability === "number" && (
                <p className="text-xs text-muted-foreground">
                  Master engine probability{" "}
                  {(
                    (simulation.faultProbability <= 1 ? simulation.faultProbability * 100 : simulation.faultProbability) ||
                    0
                  ).toFixed(1)}
                  %
                </p>
              )}
            </div>
          </div>
          <Separator />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "1 week", value: risk.shortTerm },
              { label: "1 month", value: risk.mediumTerm },
              { label: "6 months", value: risk.longTerm },
            ].map((bucket) => (
              <div key={bucket.label} className="rounded-lg border bg-white/80 p-3 text-sm shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{bucket.label}</span>
                  <span className="text-red-600 font-semibold">{bucket.value.toFixed(0)}%</span>
                </div>
                <Progress value={bucket.value} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-indigo-600" />
            <CardTitle>Diagnosis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm text-sm leading-relaxed relative overflow-hidden">
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-indigo-200/60 blur-2xl" aria-hidden="true" />
            <p className="whitespace-pre-wrap text-slate-800">{simulation.diagnosis}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-indigo-700">
              Insights curated by Oceanberg diagnostics engine
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalysisPageContent() {
  const { setSelectedSimulationId, selectedSimulationId, setActiveTab } = useSimulation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [simulations, setSimulations] = useState<SimulationData[]>([])
  const [filterComponent, setFilterComponent] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [isListLoading, setIsListLoading] = useState(false)
  const simulationBucketsRef = useRef<Map<string, SimulationData[]>>(new Map())
  const simulationSubscriptionsRef = useRef<Unsubscribe[]>([])
  useEffect(() => {
    let isMounted = true

    const teardownSubscriptions = () => {
      if (simulationSubscriptionsRef.current.length > 0) {
        simulationSubscriptionsRef.current.forEach((unsubscribe) => {
          try {
            unsubscribe()
          } catch (error) {
            console.warn("Error cleaning up simulation listener", error)
          }
        })
        simulationSubscriptionsRef.current = []
      }
    }

    const setupListeners = async () => {
      setIsListLoading(true)
      teardownSubscriptions()
      simulationBucketsRef.current.clear()

      try {
        const { getAllSubstations } = await import("@/lib/firebase-data")
        const substations = await getAllSubstations()

        if (!isMounted) {
          return
        }

        if (substations.length === 0) {
          setSimulations([])
          setIsListLoading(false)
          return
        }

        const listeners = substations.map((substation) => {
          const simsQuery = query(
            collection(db, `substations/${substation.id}/simulations`),
            orderBy("timestamp", "desc"),
            limit(RECENT_LIMIT),
          )

          return onSnapshot(
            simsQuery,
            (snapshot) => {
              if (!isMounted) return
              const entries: SimulationData[] = []
              snapshot.forEach((docSnap) => {
                const docData = docSnap.data()
                const normalizedTimestamp =
                  typeof docData.timestamp === "string"
                    ? docData.timestamp
                    : typeof docData.timestamp?.toDate === "function"
                      ? docData.timestamp.toDate().toISOString()
                      : new Date().toISOString()

                entries.push({
                  id: docSnap.id,
                  substationId: substation.id,
                  ...(docData as Omit<SimulationData, "id" | "substationId">),
                  timestamp: normalizedTimestamp,
                })
              })

              simulationBucketsRef.current.set(substation.id, entries)

              const merged = Array.from(simulationBucketsRef.current.values()).flat()
              merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              setSimulations(merged.slice(0, RECENT_LIMIT))
              setIsListLoading(false)
            },
            (error) => {
              console.error(`Error streaming simulations for ${substation.id}`, error)
            },
          )
        })

        if (!isMounted) {
          listeners.forEach((unsubscribe) => unsubscribe())
          return
        }

        simulationSubscriptionsRef.current = listeners
      } catch (error) {
        if (isMounted) {
          console.error("Error loading simulations", error)
          setIsListLoading(false)
        }
      }
    }

    setupListeners()

    return () => {
      isMounted = false
      teardownSubscriptions()
      simulationBucketsRef.current.clear()
    }
  }, [])

  useEffect(() => {
    const simId = searchParams.get("simulationId")
    if (simId) {
      setSelectedSimulationId(simId)
    }
  }, [searchParams, setSelectedSimulationId])

  const handleSelectSimulation = useCallback(
    (simulation: SimulationData) => {
      setSelectedSimulationId(simulation.id)
      router.push(`/simulation/detail?simulationId=${simulation.id}&substationId=${simulation.substationId}`)
    },
    [router, setSelectedSimulationId],
  )

  const handleGoToSolution = useCallback(
    (simulation: SimulationData) => {
      setActiveTab("solution")
      router.push(
        `/simulation?tab=solution&simulationId=${simulation.id}&substationId=${simulation.substationId}&combine=${simulation.componentType}&source=analysis`,
      )
    },
    [router, setActiveTab],
  )

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Diagnostics Hub</p>
          <h1 className="text-2xl font-bold">Analysis</h1>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ManualSimulationList
          simulations={simulations}
          filterComponent={filterComponent}
          setFilterComponent={setFilterComponent}
          filterSeverity={filterSeverity}
          setFilterSeverity={setFilterSeverity}
          onSelect={handleSelectSimulation}
          onGoToSolution={handleGoToSolution}
          selectedId={selectedSimulationId}
        />
        {isListLoading && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Fetching recent simulations...
          </div>
        )}
      </div>
    </div>
  )
}

export function AnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <AnalysisPageContent />
    </Suspense>
  )
}
