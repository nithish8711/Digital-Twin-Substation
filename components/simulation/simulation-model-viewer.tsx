"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModelViewer } from "@/components/live-trend/model-viewer"
import { useSimulation } from "./simulation-context"
import type { ComponentType } from "@/lib/analysis-config"
import { captureVideoFromCanvas } from "@/lib/video-capture"
import type { SimulationResult } from "@/lib/simulation-engine"
import { calculateAllHealthScores } from "@/lib/simulation-engine"

interface SimulationModelViewerProps {
  inputValues?: Record<string, number | string>
}

export type SimulationModelViewerHandle = {
  captureVideo: (options?: {
    duration?: number
    onProgress?: (progress: number) => void
    timeline?: SimulationResult["timeline"]
  }) => Promise<Blob>
}

const MODEL_PATHS: Partial<Record<ComponentType, string>> = {
  transformer: "/models/transformer/transformer.glb",
  bayLines: "/models/bay-lines/bay-lines.glb",
  circuitBreaker: "/models/circuit-breaker/circuit-breaker.glb",
  isolator: "/models/isolator/isolator.glb",
  busbar: "/models/busbar/busbar.glb",
}

export const SimulationModelViewer = forwardRef<SimulationModelViewerHandle, SimulationModelViewerProps>(
  function SimulationModelViewer({ inputValues = {} }: SimulationModelViewerProps, ref) {
    const { selectedComponent } = useSimulation()
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const isMountedRef = useRef(true)
    const [timelineSnapshot, setTimelineSnapshot] = useState<Record<string, number | string> | null>(null)
    const [isTimelinePlaybackActive, setIsTimelinePlaybackActive] = useState(false)
    const [playbackProgress, setPlaybackProgress] = useState(0)
    const timelinePlaybackCleanupRef = useRef<(() => void) | null>(null)
    const [visualStats, setVisualStats] = useState<{
      overall: number
      fault: number
      stress: number
      aging: number
    } | null>(null)

    useEffect(() => {
      return () => {
        isMountedRef.current = false
        timelinePlaybackCleanupRef.current?.()
        timelinePlaybackCleanupRef.current = null
      }
    }, [])

    const stopTimelinePlayback = useCallback(() => {
      timelinePlaybackCleanupRef.current?.()
      timelinePlaybackCleanupRef.current = null
    }, [])

    const startTimelinePlayback = useCallback(
      (timeline: SimulationResult["timeline"], clipDuration: number) => {
        stopTimelinePlayback()
        if (!timeline || timeline.length === 0) {
          return
        }

        const states = timeline.map((step) => step.state)
        const durationMs = Math.max(1000, clipDuration * 1000)
        const playbackStart = performance.now()
        let frameId: number | null = null
        let lastIndex = -1

        const cleanup = () => {
          if (frameId !== null) {
            cancelAnimationFrame(frameId)
            frameId = null
          }
          if (isMountedRef.current) {
            setIsTimelinePlaybackActive(false)
          }
        }

        const tick = () => {
          const elapsed = performance.now() - playbackStart
          const progress = Math.min(1, elapsed / durationMs)
          const index = Math.min(states.length - 1, Math.round(progress * (states.length - 1)))
          if (isMountedRef.current && index !== lastIndex) {
            lastIndex = index
            setTimelineSnapshot(states[index])
            setIsTimelinePlaybackActive(true)
            setPlaybackProgress(progress)
          }
          if (progress < 1) {
            frameId = requestAnimationFrame(tick)
          } else {
            cleanup()
          }
        }

        frameId = requestAnimationFrame(tick)
        timelinePlaybackCleanupRef.current = cleanup
      },
      [stopTimelinePlayback],
    )

    // Generate glow data from input values for visual feedback
    const activeInputs = timelineSnapshot ?? inputValues
    const glowData = useMemo(() => {
      const glow: Record<string, number | string> = {}

      if (selectedComponent === "transformer") {
        if (activeInputs.oilLevel && typeof activeInputs.oilLevel === "number" && activeInputs.oilLevel < 70) {
          glow.oilLevel = activeInputs.oilLevel
        }
        if (
          activeInputs.oilTemperature &&
          typeof activeInputs.oilTemperature === "number" &&
          activeInputs.oilTemperature > 70
        ) {
          glow.oilTemperature = activeInputs.oilTemperature
        }
        if (
          activeInputs.windingTemperature &&
          typeof activeInputs.windingTemperature === "number" &&
          activeInputs.windingTemperature > 85
        ) {
          glow.windingTemperature = activeInputs.windingTemperature
        }
        if (
          activeInputs.hydrogenPPM &&
          typeof activeInputs.hydrogenPPM === "number" &&
          activeInputs.hydrogenPPM > 150
        ) {
          glow.hydrogenPPM = activeInputs.hydrogenPPM
        }
      } else if (selectedComponent === "bayLines") {
        if (
          activeInputs.ctBurdenPercent &&
          typeof activeInputs.ctBurdenPercent === "number" &&
          activeInputs.ctBurdenPercent > 70
        ) {
          glow.ctBurdenPercent = activeInputs.ctBurdenPercent
        }
        if (
          activeInputs.frequencyHz &&
          typeof activeInputs.frequencyHz === "number" &&
          (activeInputs.frequencyHz < 49.8 || activeInputs.frequencyHz > 50.2)
        ) {
          glow.frequencyHz = activeInputs.frequencyHz
        }
      } else if (selectedComponent === "circuitBreaker") {
        if (
          activeInputs.sf6DensityPercent &&
          typeof activeInputs.sf6DensityPercent === "number" &&
          activeInputs.sf6DensityPercent < 95
        ) {
          glow.sf6DensityPercent = activeInputs.sf6DensityPercent
        }
      } else if (selectedComponent === "busbar") {
        if (
          activeInputs.busbarTemperature &&
          typeof activeInputs.busbarTemperature === "number" &&
          activeInputs.busbarTemperature > 80
        ) {
          glow.busbarTemperature = activeInputs.busbarTemperature
        }
        if (
          activeInputs.busbarLoadPercent &&
          typeof activeInputs.busbarLoadPercent === "number" &&
          activeInputs.busbarLoadPercent > 90
        ) {
          glow.busbarLoadPercent = activeInputs.busbarLoadPercent
        }
      }

      return glow
    }, [selectedComponent, activeInputs])

    const modelPath = MODEL_PATHS[selectedComponent as ComponentType] ?? null
    const [forceFallbackModel, setForceFallbackModel] = useState(!modelPath)

    useEffect(() => {
      if (typeof window === "undefined") {
        setForceFallbackModel(true)
        return
      }

      let cancelled = false
      let timeoutId: number | null = null
      if (!modelPath) {
        setForceFallbackModel(true)
        return
      }
      const controller = new AbortController()

      const resolveUrl = (path: string) => {
        if (/^(https?:)?\/\//i.test(path)) {
          return path
        }
        return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
      }

      const verifyModelAvailability = async () => {
        try {
          const response = await fetch(resolveUrl(modelPath), {
            method: "HEAD",
            signal: controller.signal,
          })
          if (cancelled) return
          setForceFallbackModel(!response.ok)
        } catch (error) {
          if (cancelled) return
          console.warn("3D GLB unavailable, using fallback model instead.", error)
          setForceFallbackModel(true)
        }
      }

      setForceFallbackModel(false)
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setForceFallbackModel(true)
          controller.abort()
        }
      }, 4000)
      verifyModelAvailability().finally(() => {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId)
        }
      })

      return () => {
        cancelled = true
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId)
        }
        controller.abort()
      }
    }, [modelPath])

    // Derive simple visual stats (health, fault, stress, aging) from the active inputs.
    useEffect(() => {
      try {
        const scores = calculateAllHealthScores(selectedComponent as any, activeInputs as any)
        const overallTarget = typeof scores.overall === "number" ? scores.overall : 0
        const p = Math.min(1, Math.max(0, playbackProgress))

        // Targets derived from true health
        const faultTarget = Math.min(100, Math.max(0, 100 - overallTarget))
        const stressTarget = Math.min(100, Math.max(0, 120 - overallTarget * 0.8))
        const agingTarget = Math.min(100, Math.max(0, overallTarget))

        // Animate from ideal state at start (Health 100 / Fault 0 / Stress 0 / Aging 100)
        const healthDisplay = 100 - (100 - overallTarget) * p
        const faultDisplay = faultTarget * p
        const stressDisplay = stressTarget * p
        const agingDisplay = 100 - (100 - agingTarget) * p

        setVisualStats({
          overall: healthDisplay,
          fault: faultDisplay,
          stress: stressDisplay,
          aging: agingDisplay,
        })
      } catch {
        setVisualStats(null)
      }
    }, [selectedComponent, activeInputs, playbackProgress])

    useImperativeHandle(
      ref,
      () => ({
        async captureVideo(options) {
          if (!canvasRef.current) {
            throw new Error("Simulation viewer not ready for video capture")
          }
          const duration = options?.duration ?? 15
          if (options?.timeline?.length) {
            startTimelinePlayback(options.timeline, duration)
          } else {
            setIsTimelinePlaybackActive(true)
          }
          try {
            return await captureVideoFromCanvas({
              canvas: canvasRef.current,
              duration,
              onProgress: options?.onProgress,
            })
          } finally {
            if (options?.timeline?.length) {
              stopTimelinePlayback()
            } else {
              setIsTimelinePlaybackActive(false)
            }
          }
        },
      }),
      [startTimelinePlayback, stopTimelinePlayback],
    )

    return (
      <Card className="h-full overflow-hidden flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>3D Model View</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 min-h-0">
          <div className="relative w-full h-full">
            <ModelViewer
              modelPath={modelPath}
              className="w-full h-full"
              componentType={selectedComponent as any}
              useFallback={forceFallbackModel}
              autoRotate={isTimelinePlaybackActive || playbackProgress > 0}
              glowData={glowData}
              showGlow={playbackProgress > 0.2 && Object.keys(glowData).length > 0}
              hudMetrics={visualStats}
              hudVisible={Boolean(visualStats)}
              onCanvasReady={(canvas) => {
                canvasRef.current = canvas
              }}
            />
          </div>
        </CardContent>
      </Card>
    )
  },
)

