import { z } from "zod"

// 1. USER MODEL
export const UserSchema = z.object({
  name: z.string(),
  userId: z.string(),
  email: z.string().email(),
})

// 8. SUBSTATION CREATION FORM - FIELD LIST

// MASTER DETAILS
export const MasterSubstationSchema = z.object({
  name: z.string().min(1, "Substation Name is required"),
  areaName: z.string().min(1, "Area Name is required"),
  substationCode: z.string(), // Auto-generated AREA-RANDOM6
  voltageClass: z.enum(["220kV", "400kV", "440kV"]),
  installationYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  operator: z.string().min(1, "Operator is required"),
  notes: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

// COMMON SCHEMA PARTS
export const DocumentSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  uploadDate: z.date(),
})

export const MaintenanceHistorySchema = z.object({
  date: z.date(),
  vendor: z.string(),
  technician: z.string(),
  notes: z.string().optional(),
  documents: z.array(DocumentSchema).optional(),
})

export const ComponentReplacedSchema = z.object({
  name: z.string(),
  reason: z.string(),
  date: z.date(),
  vendor: z.string(),
  cost: z.coerce.number(),
  documents: z.array(DocumentSchema).optional(),
})

export const OperationHistorySchema = z.object({
  date: z.date(),
  eventType: z.string(),
  description: z.string(),
  comtradeFileUrl: z.string().url().optional(),
})

export const ConditionAssessmentSchema = z.object({
  status: z.enum(["Excellent", "Good", "Fair", "Poor"]),
  notes: z.string().optional(),
  documents: z.array(DocumentSchema).optional(),
})

export const EquipmentBaseSchema = z.object({
  id: z.string().min(1, "Equipment ID is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  installationYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  maintenanceHistory: z.array(MaintenanceHistorySchema).optional(),
  componentsReplaced: z.array(ComponentReplacedSchema).optional(),
  operationHistory: z.array(OperationHistorySchema).optional(),
  documents: z.array(DocumentSchema).optional(),
  conditionAssessment: ConditionAssessmentSchema.optional(),
})

// TRANSFORMER QUESTIONS
export const TransformerSchema = EquipmentBaseSchema.extend({
  ratedMVA: z.coerce.number(),
  HV_kV: z.coerce.number(),
  LV_kV: z.coerce.number(),
  vectorGroup: z.string(),
  coolingType: z.enum(["ONAN", "ONAF", "OFAF", "ODAF", "Other"]),
  coreMaterial: z.enum(["CRGO", "NO", "Other"]),
  windingMaterial: z.enum(["Cu", "Al"]),
  oilType: z.string(),
  lastOilChangeDate: z.date().optional(),
  oltc: z.object({
    type: z.string(),
    steps: z.coerce.number(),
    lastService: z.date().optional(),
  }),
  DGA: z.object({
    H2: z.coerce.number(),
    CH4: z.coerce.number(),
    C2H2: z.coerce.number(),
    C2H4: z.coerce.number(),
    CO: z.coerce.number(),
  }),
  oilMoisture_ppm: z.coerce.number(),
  buchholzInstalled: z.boolean(),
  oltcOpsCount: z.coerce.number(),
})

// BREAKER QUESTIONS
export const BreakerSchema = EquipmentBaseSchema.extend({
  type: z.enum(["SF6", "Oil", "Vacuum"]),
  ratedVoltage_kV: z.coerce.number(),
  ratedCurrent_A: z.coerce.number(),
  shortCircuitBreaking_kA: z.coerce.number(),
  makingCapacity_kA: z.coerce.number(),
  mechanismType: z.string(),
  opCount: z.coerce.number(),
  operatingTime_ms: z.coerce.number(),
  sf6Pressure: z.coerce.number().optional(),
})

// CT / VT / CVT QUESTIONS
export const CTVTSchema = EquipmentBaseSchema.extend({
  ratio: z.string(),
  accuracyClass: z.string(),
  burdenVA: z.coerce.number(),
  lastCalibrationDate: z.date().optional(),
})

// BUSBAR QUESTIONS
export const BusbarSchema = EquipmentBaseSchema.extend({
  busType: z.enum(["Single", "Double", "Main", "Tie"]),
  material: z.string(),
  capacity_A: z.coerce.number(),
  lastIRScanDate: z.date().optional(),
})

// RELAY QUESTIONS
export const RelaySchema = EquipmentBaseSchema.extend({
  relayType: z.string(),
  firmwareVersion: z.string(),
  enabledFunctions: z.array(z.string()),
  ctPtMappings: z.record(z.string()), // object
  lastConfigUpload: z.date().optional(),
})

// PMU QUESTIONS
export const PMUSchema = EquipmentBaseSchema.extend({
  gpsSyncStatus: z.boolean(),
  accuracy: z.coerce.number(),
  lastSync: z.date().optional(),
})

// BATTERY / DC SYSTEM
export const BatterySchema = EquipmentBaseSchema.extend({
  batteryType: z.string(),
  ratedVoltage_V: z.coerce.number(),
  capacity_Ah: z.coerce.number(),
  floatVoltage: z.coerce.number(),
  internalResistance: z.coerce.number(),
})

// GIS QUESTIONS
export const GISSchema = EquipmentBaseSchema.extend({
  sf6Compartments: z.array(
    z.object({
      compartmentId: z.string(),
      pressure: z.coerce.number(),
      pdMonitoringInstalled: z.boolean(),
      lastPDTest: z.date().optional(),
    }),
  ),
})

// ISOLATOR
export const IsolatorSchema = EquipmentBaseSchema.extend({
  type: z.string(),
  driveMechanism: z.string(),
  interlockInfo: z.string(),
})

// POWER FLOW LINES
export const PowerFlowLineSchema = EquipmentBaseSchema.extend({
  lineVoltage_kV: z.coerce.number(),
  length_km: z.coerce.number(),
  conductorType: z.string(),
  thermalLimit_A: z.coerce.number(),
  impedance_R_X: z.object({
    R: z.coerce.number(),
    X: z.coerce.number(),
  }),
})

// EARTHING
export const EarthingSchema = EquipmentBaseSchema.extend({
  gridResistance: z.coerce.number(),
  soilType: z.string(),
  lastTestDate: z.date().optional(),
})

// ENVIRONMENT
export const EnvironmentSchema = EquipmentBaseSchema.extend({
  sensors: z.array(
    z.object({
      type: z.enum(["temp", "humidity", "fire", "wind"]),
      threshold: z.coerce.number(),
      lastCalibration: z.date().optional(),
    }),
  ),
})

// FULL SUBSTATION SCHEMA
export const FullSubstationSchema = z.object({
  master: MasterSubstationSchema,
  assets: z.object({
    transformers: z.array(TransformerSchema).default([]),
    breakers: z.array(BreakerSchema).default([]),
    ctvt: z.array(CTVTSchema).default([]),
    busbars: z.array(BusbarSchema).default([]),
    relays: z.array(RelaySchema).default([]),
    pmu: z.array(PMUSchema).default([]),
    battery: z.array(BatterySchema).default([]),
    gis: z.array(GISSchema).default([]),
    isolators: z.array(IsolatorSchema).default([]),
    powerFlowLines: z.array(PowerFlowLineSchema).default([]),
    earthing: z.array(EarthingSchema).default([]),
    environment: z.array(EnvironmentSchema).default([]),
  }),
})

export type FullSubstation = z.infer<typeof FullSubstationSchema>
