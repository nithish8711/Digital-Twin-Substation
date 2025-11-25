"use client"

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { applyGlow, removeGlow, getGlowColor } from "@/lib/live-trend/glow-utils"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { createFallbackModel } from "@/components/simulation/fallback-models"

type ViewerComponentType =
  | "transformer"
  | "bayLines"
  | "circuitBreaker"
  | "isolator"
  | "busbar"
  | "substation"

interface ModelViewerProps {
  modelPath: string | null
  glowData?: Record<string, number | string>
  showGlow?: boolean
  className?: string
  componentType?: ViewerComponentType
  useFallback?: boolean
  autoRotate?: boolean
}

type ViewPreset = "iso" | "top" | "side" | "front" | "back"

export function ModelViewer({
  modelPath,
  glowData = {},
  showGlow = false,
  className = "",
  componentType,
  useFallback = false,
  autoRotate = false,
}: ModelViewerProps) {
  const canUseFallback = (type: ViewerComponentType | undefined): type is ViewerComponentType => Boolean(type)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null)
  const cameraDistanceRef = useRef(6)
  const autoRotateRef = useRef(autoRotate)
  const mountedRef = useRef(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasModel, setHasModel] = useState(Boolean(useFallback))
  const [sceneReady, setSceneReady] = useState(false)
  const glowDataRef = useRef(glowData)
  const showGlowRef = useRef(showGlow)

  useEffect(() => {
    glowDataRef.current = glowData
  }, [glowData])

  useEffect(() => {
    showGlowRef.current = showGlow
  }, [showGlow])

  useEffect(() => {
    if (useFallback) {
      setHasModel(true)
      setIsLoading(false)
      setError(null)
    }
  }, [useFallback])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const syncCameraDistance = () => {
    if (!cameraRef.current || !cameraTargetRef.current) return
    cameraDistanceRef.current = cameraRef.current.position.distanceTo(cameraTargetRef.current)
  }

  const disposeCurrentModel = (options: { skipState?: boolean } = {}) => {
    if (!sceneRef.current || !modelRef.current) {
      return
    }

    sceneRef.current.remove(modelRef.current)
    removeGlow(modelRef.current)
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose())
        } else if (child.material) {
          child.material.dispose()
        }
      }
    })
    modelRef.current = null
    if (!options.skipState && mountedRef.current) {
      setHasModel(false)
    }
  }

  const positionCameraToModel = (model: THREE.Object3D) => {
    if (!cameraRef.current || !controlsRef.current) return
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const distance = Math.max(4, maxDim * 1.8)
    const offset = new THREE.Vector3(distance, distance * 0.6, distance)

    cameraRef.current.position.copy(center.clone().add(offset))
    cameraRef.current.lookAt(center)
    controlsRef.current.target.copy(center)
    controlsRef.current.minDistance = Math.max(1, maxDim * 0.4)
    controlsRef.current.maxDistance = Math.max(10, maxDim * 4)
    controlsRef.current.update()
    cameraTargetRef.current = center.clone()
    cameraDistanceRef.current = distance
  }

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)
    sceneRef.current = scene

    // Camera - will be adjusted when model loads
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(6, 4, 6)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.domElement.style.touchAction = "none"
    renderer.domElement.style.cursor = "grab"
    const handlePointerDown = () => {
      renderer.domElement.style.cursor = "grabbing"
    }
    const handlePointerUp = () => {
      renderer.domElement.style.cursor = "grab"
    }
    renderer.domElement.addEventListener("pointerdown", handlePointerDown)
    renderer.domElement.addEventListener("pointerup", handlePointerUp)
    renderer.domElement.addEventListener("pointerleave", handlePointerUp)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 20
    controls.enablePan = true
    controls.screenSpacePanning = true
    controls.enableZoom = true
    controls.enableRotate = true
    controls.enableKeys = false
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    controls.autoRotate = autoRotateRef.current
    controls.autoRotateSpeed = autoRotateRef.current ? 0.5 : 0
    controlsRef.current = controls
    const handleControlChange = () => syncCameraDistance()
    const handleControlStart = () => {
      controls.autoRotate = false
    }
    const handleControlEnd = () => {
      controls.autoRotate = autoRotateRef.current
    }
    controls.addEventListener("change", handleControlChange)
    controls.addEventListener("start", handleControlStart)
    controls.addEventListener("end", handleControlEnd)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    queueMicrotask(() => setSceneReady(true))

    return () => {
      window.removeEventListener("resize", handleResize)
      disposeCurrentModel({ skipState: true })
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown)
      renderer.domElement.removeEventListener("pointerup", handlePointerUp)
      renderer.domElement.removeEventListener("pointerleave", handlePointerUp)
      controls.removeEventListener("change", handleControlChange)
      controls.removeEventListener("start", handleControlStart)
      controls.removeEventListener("end", handleControlEnd)
      controls.dispose()
    }
  }, [])

  // Load model (decoupled from realtime glow updates to keep controls responsive)
  useEffect(() => {
    if (!sceneReady || !sceneRef.current) {
      return
    }

    let didCancel = false

    const safeSetState = <T,>(setter: Dispatch<SetStateAction<T>>, value: SetStateAction<T>) => {
      if (mountedRef.current && !didCancel) {
        setter(value)
      }
    }

    const loadFallbackModel = () => {
      if (didCancel) return

      if (!canUseFallback(componentType) || !sceneRef.current) {
        safeSetState(setError, "3D model not available")
        safeSetState(setHasModel, false)
        safeSetState(setIsLoading, false)
        return
      }

      disposeCurrentModel()
      const model = createFallbackModel(componentType, glowDataRef.current, showGlowRef.current)
      sceneRef.current.add(model)
      modelRef.current = model
      positionCameraToModel(model)
      safeSetState(setHasModel, true)
      safeSetState(setIsLoading, false)
      safeSetState(setError, null)
    }

    const resolveUrl = (path: string) => {
      if (/^(https?:)?\/\//i.test(path)) {
        return path
      }
      const normalized = path.startsWith("/") ? path : `/${path}`
      return `${window.location.origin}${normalized}`
    }

    const checkModelAvailability = async (path: string) => {
      try {
        const url = resolveUrl(path)
        const response = await fetch(url, { method: "HEAD" })
        return response.ok
      } catch (error) {
        console.warn("Unable to verify 3D model availability", error)
        return false
      }
    }

    const clearLoaderTimeout = (timeoutId: number | null) => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }

    const startLoading = async () => {
      const trimmedPath = modelPath?.trim() ?? ""
      let shouldUseFallback = useFallback || !trimmedPath

      if (!shouldUseFallback && trimmedPath) {
        const exists = await checkModelAvailability(trimmedPath)
        shouldUseFallback = !exists
      }

      if (didCancel) return

      if (shouldUseFallback) {
        loadFallbackModel()
        return
      }

      safeSetState(setIsLoading, true)
      safeSetState(setError, null)

      let timeoutId: number | null = window.setTimeout(() => {
        console.warn(`Timed out loading model ${trimmedPath}. Showing fallback instead.`)
        loadFallbackModel()
      }, 8000)

      const loader = new GLTFLoader()
      loader.load(
        trimmedPath,
        (gltf) => {
          if (didCancel || !sceneRef.current) return
          clearLoaderTimeout(timeoutId)
          timeoutId = null

          disposeCurrentModel()

          const model = gltf.scene
          model.scale.set(1, 1, 1)
          model.position.set(0, 0, 0)

          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          model.position.sub(center)

          sceneRef.current.add(model)
          modelRef.current = model
          positionCameraToModel(model)
          safeSetState(setHasModel, true)
          safeSetState(setIsLoading, false)
        },
        undefined,
        () => {
          if (didCancel) return
          clearLoaderTimeout(timeoutId)
          timeoutId = null
          loadFallbackModel()
        }
      )

      return timeoutId
    }

    let pendingTimeout: number | null = null
    startLoading()
      .then((timeoutId) => {
        pendingTimeout = timeoutId ?? null
      })
      .catch((error) => {
        console.error("Failed to start model viewer", error)
        loadFallbackModel()
      })

    return () => {
      didCancel = true
      clearLoaderTimeout(pendingTimeout)
    }
  }, [modelPath, componentType, useFallback, sceneReady])

  // Apply glow effects
  useEffect(() => {
    if (!modelRef.current || !sceneRef.current) {
      return
    }

    // Remove all existing glows first
    if (modelRef.current) {
      removeGlow(modelRef.current)
    }

    // Apply glow based on data if showGlow is true
    if (showGlow && Object.keys(glowData).length > 0 && modelRef.current) {
      Object.entries(glowData).forEach(([key, value]) => {
        const glowColor = getGlowColor(key, value)
        if (glowColor && modelRef.current) {
          applyGlow(modelRef.current, glowColor)
        }
      })
    }

    return () => {
      if (modelRef.current) {
        removeGlow(modelRef.current)
      }
    }
  }, [glowData, showGlow])

  useEffect(() => {
    autoRotateRef.current = autoRotate
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
      controlsRef.current.autoRotateSpeed = autoRotate ? 0.6 : 0
      controlsRef.current.update()
    }
  }, [autoRotate])

  const handleResetCamera = () => {
    if (modelRef.current) {
      positionCameraToModel(modelRef.current)
    }
  }

  const zoomCamera = (scale: number) => {
    if (!cameraRef.current || !cameraTargetRef.current) return
    const direction = cameraRef.current.position.clone().sub(cameraTargetRef.current)
    direction.multiplyScalar(scale)
    cameraRef.current.position.copy(cameraTargetRef.current.clone().add(direction))
    controlsRef.current?.update()
    syncCameraDistance()
  }

  const handleZoomIn = () => zoomCamera(0.85)
  const handleZoomOut = () => zoomCamera(1.15)

  const moveCameraToPreset = (direction: THREE.Vector3) => {
    if (!cameraRef.current || !cameraTargetRef.current) return
    const distance = cameraDistanceRef.current || direction.length() || 6
    const offset = direction.clone().normalize().multiplyScalar(distance)
    cameraRef.current.position.copy(cameraTargetRef.current.clone().add(offset))
    cameraRef.current.lookAt(cameraTargetRef.current)
    controlsRef.current?.update()
    syncCameraDistance()
  }

  const handleViewChange = (preset: ViewPreset) => {
    const directions: Record<ViewPreset, THREE.Vector3> = {
      iso: new THREE.Vector3(1, 0.8, 1),
      top: new THREE.Vector3(0, 1, 0.0001),
      side: new THREE.Vector3(1, 0.2, 0),
      front: new THREE.Vector3(0, 0.3, 1),
      back: new THREE.Vector3(0, 0.3, -1),
    }
    moveCameraToPreset(directions[preset])
  }

  const viewButtons: Array<{ id: ViewPreset; label: string }> = [
    { id: "iso", label: "Isometric" },
    { id: "front", label: "Front" },
    { id: "side", label: "Side" },
    { id: "top", label: "Top" },
  ]

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full" />

      {/* View buttons */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
        {viewButtons.map((button) => (
          <Button
            key={button.id}
            variant="secondary"
            size="sm"
            onClick={() => handleViewChange(button.id)}
            className="bg-white/90 hover:bg-white text-gray-900 border-gray-200 shadow-md backdrop-blur-sm"
          >
            {button.label}
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleResetCamera}
          title="Reset Camera"
          className="bg-white/90 hover:bg-white border-gray-300 shadow-md backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          title="Zoom In"
          className="bg-white/90 hover:bg-white border-gray-300 shadow-md backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="bg-white/90 hover:bg-white border-gray-300 shadow-md backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading 3D Model...</div>
        </div>
      )}

      {/* Error - only show for actual errors, not missing models */}
      {error && error !== "Failed to load 3D model and no fallback available" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {/* No model message - show when model fails to load and no fallback */}
      {!useFallback && !isLoading && !error && !hasModel && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
          <div className="text-gray-400 text-center">
            <p className="text-lg mb-2">3D Model Not Available</p>
            <p className="text-sm">Model will be available soon</p>
          </div>
        </div>
      )}

      <div className="absolute left-4 bottom-4 z-10 rounded-full bg-black/60 text-white text-xs px-4 py-1.5 pointer-events-none">
        Drag to rotate | Scroll to zoom
      </div>
    </div>
  )
}

