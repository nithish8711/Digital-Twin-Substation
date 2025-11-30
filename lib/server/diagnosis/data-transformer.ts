import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"

/**
 * Transforms asset metadata and live readings into the format required by the ML predictor backend.
 * This combines asset specifications from Firebase with live parameter values from diagnosis.
 */
export function transformToMLInput(
  component: DiagnosisComponentKey,
  assetMetadata: Record<string, any>,
  liveReadings: Record<string, any>,
  areaCode: string,
  substationId: string,
  assetId?: string,
): Record<string, any> {
  const timestamp = new Date().toISOString()
  const master = assetMetadata?.master || {}
  const assets = assetMetadata?.assets || {}
  
  // Get installation year from master or assets
  const installationYear = 
    master.installationYear || 
    assets.installationYear || 
    (typeof master.installationYear === 'string' ? parseInt(master.installationYear) : null) ||
    2010

  // Extract assetId from assets collection or use provided/default
  const getAssetId = () => {
    if (assetId) return assetId
    
    // Try to get from component-specific asset collection
    const componentAssetKeys: Record<DiagnosisComponentKey, string[]> = {
      transformer: ["transformers", "transformer"],
      bayLines: ["powerFlowLines", "bayLines", "bayLine"],
      circuitBreaker: ["breakers", "breaker", "circuitBreaker"],
      isolator: ["isolators", "isolator"],
      busbar: ["busbars", "busbar"],
      relay: ["relays", "relay"],
      pmu: ["pmus", "pmu"],
      gis: ["gis"],
      battery: ["batteries", "battery"],
      environment: ["environment"],
    }
    
    const keys = componentAssetKeys[component] || [component]
    for (const key of keys) {
      const asset = assets[key]
      if (asset) {
        if (Array.isArray(asset) && asset[0]?.id) {
          return asset[0].id
        }
        if (asset.id) {
          return asset.id
        }
        if (asset.assetId) {
          return asset.assetId
        }
      }
    }
    
    // Fallback to substation code or default
    return master.substationCode 
      ? `${component.toUpperCase()}-${master.substationCode}` 
      : `${component.toUpperCase()}-1`
  }

  // Base fields common to all components
  const base = {
    timestamp,
    assetType: component === "bayLines" ? "BayLine" : component.charAt(0).toUpperCase() + component.slice(1),
    assetId: getAssetId(),
    installationYear: typeof installationYear === 'number' ? installationYear : parseInt(String(installationYear)) || 2010,
  }

  switch (component) {
    case "transformer": {
      const transformerAsset = assets.transformer || assets.transformers?.[0] || {}
      return {
        ...base,
        assetType: "Transformer",
        spec_ratedMVA: transformerAsset.ratedMVA || transformerAsset.spec_ratedMVA || 315,
        spec_HV_kV: transformerAsset.HV_kV || transformerAsset.spec_HV_kV || 400,
        spec_LV_kV: transformerAsset.LV_kV || transformerAsset.spec_LV_kV || 230,
        spec_vectorGroup: transformerAsset.vectorGroup || transformerAsset.spec_vectorGroup || "YNd11",
        spec_coolingType: transformerAsset.coolingType || transformerAsset.spec_coolingType || "ONAF",
        spec_windingMaterial: transformerAsset.windingMaterial || transformerAsset.spec_windingMaterial || "Cu",
        spec_manufacturer: transformerAsset.manufacturer || transformerAsset.spec_manufacturer || "BHEL",
        live_OilTemperature_C: liveReadings.oilTemp || liveReadings.live_OilTemperature_C || 63.5,
        live_WindingTemperature_C: liveReadings.windingTemp || liveReadings.live_WindingTemperature_C || 78.4,
        live_LoadingPercent: liveReadings.loading || liveReadings.live_LoadingPercent || 92,
        live_Hydrogen_ppm: liveReadings.hydrogen || liveReadings.live_Hydrogen_ppm || 45,
        live_Acetylene_ppm: liveReadings.acetylene || liveReadings.live_Acetylene_ppm || 0.2,
        live_Moisture_ppm: liveReadings.moisture || liveReadings.live_Moisture_ppm || 18,
        live_OilLevelPercent: liveReadings.oilLevel || liveReadings.live_OilLevelPercent || 96,
        live_TapPosition: liveReadings.tapPosition || liveReadings.live_TapPosition || 8,
      }
    }

    case "bayLines": {
      const bayLineAsset = assets.bayLine || assets.powerFlowLines?.[0] || {}
      return {
        ...base,
        assetType: "BayLine",
        spec_ratedVoltage: bayLineAsset.ratedVoltage || bayLineAsset.spec_ratedVoltage || 400,
        spec_conductorType: bayLineAsset.conductorType || bayLineAsset.spec_conductorType || "Moose",
        spec_thermalLimit_A: bayLineAsset.thermalLimit_A || bayLineAsset.spec_thermalLimit_A || 2500,
        live_BusVoltage_kV: liveReadings.busVoltage || liveReadings.live_BusVoltage_kV || 398,
        live_LineCurrent_A: liveReadings.lineCurrent || liveReadings.live_LineCurrent_A || 1780,
        live_ActivePower_MW: liveReadings.mw || liveReadings.live_ActivePower_MW || 640,
        live_ReactivePower_MVAR: liveReadings.mvar || liveReadings.live_ReactivePower_MVAR || 40,
        live_PowerFactor: liveReadings.powerFactor || liveReadings.live_PowerFactor || 0.94,
        live_Frequency_Hz: liveReadings.frequency || liveReadings.live_Frequency_Hz || 50.02,
        live_THD_percent: liveReadings.thd || liveReadings.live_THD_percent || 2.6,
      }
    }

    case "busbar": {
      const busbarAsset = assets.busbar || assets.busbars?.[0] || {}
      return {
        ...base,
        assetType: "Busbar",
        spec_material: busbarAsset.material || busbarAsset.spec_material || "Cu",
        spec_capacity_A: busbarAsset.capacity_A || busbarAsset.spec_capacity_A || 5000,
        spec_busType: busbarAsset.busType || busbarAsset.spec_busType || "Main",
        live_BusVoltage_kV: liveReadings.busVoltage || liveReadings.live_BusVoltage_kV || 402,
        live_BusCurrent_A: liveReadings.busCurrent || liveReadings.live_BusCurrent_A || 3200,
        live_BusTemperature_C: liveReadings.busTemperature || liveReadings.busbarTemperature || liveReadings.live_BusTemperature_C || 66.8,
      }
    }

    case "isolator": {
      const isolatorAsset = assets.isolator || assets.isolators?.[0] || {}
      return {
        ...base,
        assetType: "Isolator",
        spec_type: isolatorAsset.type || isolatorAsset.spec_type || "Vertical",
        spec_driveMechanism: isolatorAsset.driveMechanism || isolatorAsset.spec_driveMechanism || "Motorized",
        spec_manufacturer: isolatorAsset.manufacturer || isolatorAsset.spec_manufacturer || "Crompton",
        live_DriveTorque_Nm: liveReadings.driveTorque || liveReadings.live_DriveTorque_Nm || 95.215,
        live_OperatingTime_ms: liveReadings.operatingTime || liveReadings.live_OperatingTime_ms || 344.292,
        live_ContactResistance_uOhm: liveReadings.contactResistance || liveReadings.live_ContactResistance_uOhm || 86.48,
        live_MotorCurrent_A: liveReadings.motorCurrent || liveReadings.live_MotorCurrent_A || 7.272,
      }
    }

    case "circuitBreaker": {
      const breakerAsset = assets.breaker || assets.breakers?.[0] || {}
      return {
        ...base,
        assetType: "CircuitBreaker",
        spec_ratedVoltage_kV: breakerAsset.ratedVoltage_kV || breakerAsset.spec_ratedVoltage_kV || 220,
        spec_ratedCurrent_A: breakerAsset.ratedCurrent_A || breakerAsset.spec_ratedCurrent_A || 1600,
        spec_mechanismType: breakerAsset.mechanismType || breakerAsset.spec_mechanismType || "Spring",
        spec_manufacturer: breakerAsset.manufacturer || breakerAsset.spec_manufacturer || "ABB",
        live_OperationTime_ms: liveReadings.operationTime || liveReadings.live_OperationTime_ms || 62,
        live_SF6Pressure_bar: liveReadings.sf6Density || liveReadings.sf6Pressure || liveReadings.live_SF6Pressure_bar || 6.3,
        live_MotorCurrent_A: liveReadings.motorCurrent || liveReadings.live_MotorCurrent_A || 14.6,
      }
    }

    default:
      // Fallback for other components
      return {
        ...base,
        ...liveReadings,
      }
  }
}

