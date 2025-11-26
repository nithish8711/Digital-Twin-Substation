"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSimulation } from "./simulation-context"
import { SubstationSearchBar } from "./substation-search-bar"
import { ComponentSelectorNav } from "./component-selector-nav"
import { SimulationInputFields } from "./simulation-input-fields"
import { SimulationModelViewer, type SimulationModelViewerHandle } from "./simulation-model-viewer"
import { RunSimulationButton } from "./run-simulation-button"
import type { DummySubstation } from "@/lib/dummy-data"
import { runSimulation } from "@/lib/simulation-engine"
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { COMPONENT_RATED_SPECS, COMPONENT_VIDEO_LIBRARY, type ComponentType } from "@/lib/analysis-config"
import { uploadSimulationVideo } from "@/lib/video-capture"
import { generateSolutionPackage } from "@/lib/simulation-solution"
import type { SimulationData } from "./analysis-page"

const ASSET_COLLECTION_LOOKUP: Record<ComponentType, keyof DummySubstation["assets"]> = {
  transformer: "transformers",
  bayLines: "powerFlowLines",
  circuitBreaker: "breakers",
  isolator: "isolators",
  busbar: "busbars",
}

const toNumberOr = (value: unknown, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function removeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => removeUndefined(item))
      .filter((item) => item !== undefined)
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>((acc, [key, val]) => {
      const cleaned = removeUndefined(val)
      if (cleaned !== undefined) {
        acc[key] = cleaned
      }
      return acc
    }, {})
  }
  return value === undefined ? undefined : value
}

export function RunSimulationPage() {
  const { selectedComponent, setActiveTab } = useSimulation()
  const [substation, setSubstation] = useState<DummySubstation | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const router = useRouter()
  const modelViewerRef = useRef<SimulationModelViewerHandle | null>(null)

  // Input states for each component type
  const [transformerInputs, setTransformerInputs] = useState({
    va: 400, vb: 400, vc: 400,
    ampa: 1000, ampb: 1000, ampc: 1000,
    frequency: 50,
    loadUnbalancePercent: 5,
    neutralCurrent: 50,
    windingTemperature: 75,
    hotspotTemperature: 85,
    oilTemperature: 65,
    ambientTemperature: 35,
    oilLevel: 80,
    oilMoisture: 15,
    oilAcidity: 0.2,
    dielectricStrength: 50,
    hydrogenPPM: 100,
    methanePPM: 50,
    acetylenePPM: 10,
    ethylenePPM: 30,
    CO_PPM: 200,
    transformerLoading: 85,
    oltcTapPosition: 17,
    oltcDeviation: 2,
    oltcMotorStatus: "ON",
    oltcOpsCount: 5000,
    vibrationLevel: 3,
    noiseLevel: 65,
    buchholzAlarm: "NORMAL",
    gasAccumulationRate: 5,
    timeOfSimulation: 24,
  })

  const [bayLinesInputs, setBayLinesInputs] = useState({
    ctBurdenPercent: 60,
    ctPrimaryCurrent: 1000,
    ctSecondaryCurrent: 5,
    ctTemperature: 40,
    vtVoltageDriftPercent: 100,
    vtOutputVoltage: 100,
    vtTemperature: 35,
    frequencyHz: 50,
    powerFactor: 0.98,
    lineCurrent: 800,
    harmonicsTHDPercent: 3,
    timeOfSimulation: 24,
  })

  const [circuitBreakerInputs, setCircuitBreakerInputs] = useState({
    sf6DensityPercent: 95,
    sf6LeakRatePercentPerYear: 2,
    sf6MoisturePPM: 100,
    operationCountPercent: 50,
    lastTripTimeMs: 45,
    closeCoilResistance: 10,
    poleTemperature: 35,
    mechanismWearLevel: 30,
    timeOfSimulation: 24,
  })

  const [isolatorInputs, setIsolatorInputs] = useState({
    status: "CLOSED",
    bladeAngleDeg: 0,
    contactResistanceMicroOhm: 50,
    motorTorqueNm: 200,
    positionMismatchPercent: 1,
    timeOfSimulation: 24,
  })

  const [busbarInputs, setBusbarInputs] = useState({
    busbarTemperature: 55,
    ambientTemperature: 35,
    busbarLoadPercent: 70,
    busbarCurrentA: 2000,
    jointHotspotTemp: 65,
    impedanceMicroOhm: 50,
    timeOfSimulation: 24,
  })

  const selectedAsset = useMemo(() => {
    if (!substation) return null
    const collectionKey = ASSET_COLLECTION_LOOKUP[selectedComponent]
    const assets = substation.assets?.[collectionKey]
    if (!Array.isArray(assets) || assets.length === 0) return null
    return assets[0]
  }, [selectedComponent, substation])

  const buildSpecsFromAsset = (asset: any) => {
    if (!asset) return COMPONENT_RATED_SPECS[selectedComponent] || []
    const specs: Array<{ label: string; value: string }> = []

    switch (selectedComponent) {
      case "transformer":
        if (asset.ratedMVA) specs.push({ label: "Rated MVA", value: `${asset.ratedMVA} MVA` })
        if (asset.HV_kV && asset.LV_kV) specs.push({ label: "Voltage", value: `${asset.HV_kV}/${asset.LV_kV} kV` })
        if (asset.coolingType) specs.push({ label: "Cooling", value: asset.coolingType })
        if (asset.vectorGroup) specs.push({ label: "Vector Group", value: asset.vectorGroup })
        break
      case "bayLines":
        if (asset.lineVoltage_kV) specs.push({ label: "Line Voltage", value: `${asset.lineVoltage_kV} kV` })
        if (asset.length_km) specs.push({ label: "Length", value: `${asset.length_km} km` })
        if (asset.thermalLimit_A) specs.push({ label: "Thermal Limit", value: `${asset.thermalLimit_A} A` })
        break
      case "circuitBreaker":
        if (asset.ratedVoltage_kV) specs.push({ label: "Rated Voltage", value: `${asset.ratedVoltage_kV} kV` })
        if (asset.ratedCurrent_A) specs.push({ label: "Rated Current", value: `${asset.ratedCurrent_A} A` })
        if (asset.sf6Pressure) specs.push({ label: "SF6 Pressure", value: `${asset.sf6Pressure} bar` })
        if (asset.operatingTime_ms) specs.push({ label: "Operating Time", value: `${asset.operatingTime_ms} ms` })
        break
      case "isolator":
        if (asset.type) specs.push({ label: "Type", value: asset.type })
        if (asset.driveMechanism) specs.push({ label: "Drive", value: asset.driveMechanism })
        if (asset.installationYear) specs.push({ label: "Installed", value: `${asset.installationYear}` })
        break
      case "busbar":
        if (asset.capacity_A) specs.push({ label: "Capacity", value: `${asset.capacity_A} A` })
        if (asset.material) specs.push({ label: "Material", value: asset.material })
        if (asset.lastIRScanDate) specs.push({ label: "Last IR Scan", value: new Date(asset.lastIRScanDate).toLocaleDateString() })
        break
    }

    return specs.length > 0 ? specs : COMPONENT_RATED_SPECS[selectedComponent] || []
  }

  const getCurrentInputs = () => {
    switch (selectedComponent) {
      case "transformer":
        return transformerInputs
      case "bayLines":
        return bayLinesInputs
      case "circuitBreaker":
        return circuitBreakerInputs
      case "isolator":
        return isolatorInputs
      case "busbar":
        return busbarInputs
    }
  }

  const updateInput = (key: string, value: number | string) => {
    switch (selectedComponent) {
      case "transformer":
        setTransformerInputs({ ...transformerInputs, [key]: value })
        break
      case "bayLines":
        setBayLinesInputs({ ...bayLinesInputs, [key]: value })
        break
      case "circuitBreaker":
        setCircuitBreakerInputs({ ...circuitBreakerInputs, [key]: value })
        break
      case "isolator":
        setIsolatorInputs({ ...isolatorInputs, [key]: value })
        break
      case "busbar":
        setBusbarInputs({ ...busbarInputs, [key]: value })
        break
    }
  }

  const buildAssetMetadata = () => {
    if (!substation) return null
    const master = substation.master
    const asset = selectedAsset
    return {
      assetId: asset?.id ?? `${selectedComponent.toUpperCase()}-${master?.substationCode || substation.id}`,
      assetName:
        asset?.assetName ?? asset?.name ?? `${selectedComponent.toUpperCase()} @ ${master?.name || "Substation"}`,
      substationName: master?.name,
      areaName: master?.areaName,
      substationCode: master?.substationCode,
      voltageClass: master?.voltageClass,
      operator: master?.operator,
      latitude: master?.latitude,
      longitude: master?.longitude,
      installationYear: asset?.installationYear ?? master?.installationYear ?? 2012,
      manufacturer: asset?.manufacturer ?? master?.operator ?? "Oceanberg Power Systems",
      model: asset?.model ?? `${selectedComponent.toUpperCase()}-DX`,
      ratedSpecs: buildSpecsFromAsset(asset),
    }
  }

  useEffect(() => {
    if (!selectedAsset) return
    switch (selectedComponent) {
      case "transformer": {
        const dga = selectedAsset.DGA ?? {}
        setTransformerInputs((prev) => {
          const load = selectedAsset.ratedMVA ? Math.min(140, selectedAsset.ratedMVA / 5 + 70) : prev.transformerLoading
          return {
            ...prev,
            transformerLoading: load,
            oilTemperature: Number((toNumberOr(selectedAsset.oilTemperature, prev.oilTemperature) + Math.max(0, load - 75) * 0.4).toFixed(1)),
            windingTemperature: Number((toNumberOr(selectedAsset.windingTemperature, prev.windingTemperature) + Math.max(0, load - 80) * 0.5).toFixed(1)),
            hotspotTemperature: Number((toNumberOr(selectedAsset.hotspotTemperature, prev.hotspotTemperature) + Math.max(0, load - 85) * 0.6).toFixed(1)),
            oilMoisture: toNumberOr(selectedAsset.oilMoisture_ppm, prev.oilMoisture),
            hydrogenPPM: toNumberOr(dga.H2, prev.hydrogenPPM),
            methanePPM: toNumberOr(dga.CH4, prev.methanePPM),
            acetylenePPM: toNumberOr(dga.C2H2, prev.acetylenePPM),
            CO_PPM: toNumberOr(dga.CO, prev.CO_PPM),
            oltcTapPosition: toNumberOr(selectedAsset.oltc?.steps, prev.oltcTapPosition),
            oltcOpsCount: toNumberOr(selectedAsset.oltcOpsCount, prev.oltcOpsCount),
          }
        })
        break
      }
      case "bayLines": {
        setBayLinesInputs((prev) => {
          const estimatedCurrent = toNumberOr(
            selectedAsset.thermalLimit_A ? selectedAsset.thermalLimit_A * 0.4 : NaN,
            prev.lineCurrent,
          )
          const impedanceReactance = toNumberOr(selectedAsset.impedance_R_X?.X, 2)
          return {
            ...prev,
            lineCurrent: Number(estimatedCurrent.toFixed(0)),
            ctBurdenPercent: Number(Math.min(120, Math.max(40, estimatedCurrent / 8)).toFixed(1)),
            vtVoltageDriftPercent: toNumberOr(selectedAsset.lineVoltage_kV, prev.vtVoltageDriftPercent),
            harmonicsTHDPercent: Number(Math.max(1.5, impedanceReactance * 1.5).toFixed(2)),
          }
        })
        break
      }
      case "circuitBreaker": {
        setCircuitBreakerInputs((prev) => {
          const sf6Percent = selectedAsset.sf6Pressure
            ? (selectedAsset.sf6Pressure / 6.5) * 100
            : prev.sf6DensityPercent
          const opPercent = selectedAsset.opCount ? selectedAsset.opCount / 5 : prev.operationCountPercent
          return {
            ...prev,
            sf6DensityPercent: Number(sf6Percent.toFixed(1)),
            operationCountPercent: Number(Math.min(130, Math.max(20, opPercent)).toFixed(1)),
            lastTripTimeMs: toNumberOr(selectedAsset.operatingTime_ms, prev.lastTripTimeMs),
            poleTemperature: toNumberOr(selectedAsset.poleTemperature, prev.poleTemperature),
          }
        })
        break
      }
      case "isolator": {
        setIsolatorInputs((prev) => ({
          ...prev,
          contactResistanceMicroOhm: toNumberOr(selectedAsset.contactResistanceMicroOhm, prev.contactResistanceMicroOhm),
          motorTorqueNm: toNumberOr(selectedAsset.motorTorqueNm, prev.motorTorqueNm),
        }))
        break
      }
      case "busbar": {
        setBusbarInputs((prev) => {
          const capacity = toNumberOr(selectedAsset.capacity_A, prev.busbarCurrentA)
          const loadPercent = selectedAsset.capacity_A
            ? Math.min(140, Number((50 + selectedAsset.capacity_A / 150).toFixed(1)))
            : prev.busbarLoadPercent
          return {
            ...prev,
            busbarCurrentA: capacity,
            busbarLoadPercent: loadPercent,
            jointHotspotTemp: Number((toNumberOr(prev.jointHotspotTemp, 70) + Math.max(0, loadPercent - 85) * 0.5).toFixed(1)),
            impedanceMicroOhm: toNumberOr(
              selectedAsset.impedance_R_X?.R ? selectedAsset.impedance_R_X.R * 100 : NaN,
              prev.impedanceMicroOhm,
            ),
          }
        })
        break
      }
    }
  }, [selectedAsset, selectedComponent])

  const handleRunSimulation = async () => {
    if (!substation) {
      return
    }

    setIsRunning(true)

    try {
      const inputValues = getCurrentInputs()
      const timeOfSimulation = inputValues.timeOfSimulation as number
      const assetContext = selectedAsset

      const result = await runSimulation({
        componentType: selectedComponent,
        inputValues,
        timeOfSimulation,
        assetContext,
      })

      // Save to Firebase / Mongo-backed video API
      const simulationsCollection = collection(db, `substations/${substation.id}/simulations`)
      const docRef = doc(simulationsCollection)

      // Default video URL comes from static library (currently empty), will be overwritten
      // by captured simulation video when available.
      let resolvedVideoUrl = COMPONENT_VIDEO_LIBRARY[selectedComponent] ?? ""

      // Capture and upload simulation playback before we persist the record, so that
      // the analysis page has a ready-to-play videoUrl and does not show "No video available".
      if (modelViewerRef.current) {
        console.log(
          "[Simulation] Starting video capture",
          "simulationId=",
          docRef.id,
          "component=",
          selectedComponent,
        )
        try {
          const captureBlob = await modelViewerRef.current.captureVideo({
            duration: 15,
            timeline: result.timeline,
          })
          if (captureBlob && captureBlob.size > 0) {
            console.log("[Simulation] Capture complete, size(bytes)=", captureBlob.size)
            const uploadedUrl = await uploadSimulationVideo(captureBlob, docRef.id, selectedComponent)
            if (uploadedUrl) {
              resolvedVideoUrl = uploadedUrl
              console.log("[Simulation] Uploaded simulation video URL:", uploadedUrl)
            }
          } else {
            console.warn("[Simulation] Capture returned empty blob – skipping upload")
          }
        } catch (videoErr) {
          console.warn("[Simulation] Video capture/upload failed, proceeding without video:", videoErr)
        }
      }

      const baseSimulationData = {
        substationId: substation.id,
        componentType: selectedComponent,
        assetMetadata: buildAssetMetadata(),
        inputValues,
        assetContext,
        timeline: result.timeline,
        finalState: result.finalState,
        healthScores: result.healthScores,
        detailedScores: result.detailedScores,
        overallHealth: result.overallHealth,
        faultProbability: result.faultProbability,
        stressScore: result.stressScore,
        agingFactor: result.agingFactor,
        transformerHealth: result.transformerHealth,
        bayLineHealth: result.bayLineHealth,
        breakerHealth: result.breakerHealth,
        isolatorHealth: result.isolatorHealth,
        busbarHealth: result.busbarHealth,
        faultPredictions: result.faultPredictions,
        diagnosis: result.diagnosis,
        videoUrl: resolvedVideoUrl,
        timestamp: new Date().toISOString(),
      }

      const simulationForSolution = {
        id: docRef.id,
        ...baseSimulationData,
      } as SimulationData

      const solutionPayload = await generateSolutionPackage(simulationForSolution)

      const simulationRecord = removeUndefined({
        ...baseSimulationData,
        solution: solutionPayload,
      }) as typeof baseSimulationData & { solution: typeof solutionPayload }

      console.log("[Simulation] Saving simulation record with initial videoUrl:", resolvedVideoUrl)
      await setDoc(docRef, simulationRecord)

      // Navigate to analysis page with simulation ID
      setActiveTab("analysis")
      router.push(`/simulation?tab=analysis&simulationId=${docRef.id}&substationId=${substation.id}`)
    } catch (err) {
      console.error("Error running simulation:", err)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Search Bar */}
      <SubstationSearchBar onSubstationSelect={setSubstation} />

      {/* Component Selector Navigation */}
      <ComponentSelectorNav />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Left Column - Inputs */}
        <Card className="h-full flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0 border-b">
            <CardTitle>Simulation Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto pr-2">
              <SimulationInputFields
                inputs={getCurrentInputs()}
                onInputChange={updateInput}
              />
            </div>
            <div className="pt-4 mt-4 border-t flex-shrink-0">
              <RunSimulationButton
                substation={substation}
                isRunning={isRunning}
                onRun={handleRunSimulation}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column - 3D Model */}
        <SimulationModelViewer ref={modelViewerRef} inputValues={getCurrentInputs()} />
      </div>
    </div>
  )
}
