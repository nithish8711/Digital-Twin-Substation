(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/dummy-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Dummy data service for substations
__turbopack_context__.s([
    "DUMMY_SUBSTATIONS",
    ()=>DUMMY_SUBSTATIONS,
    "getAllSubstations",
    ()=>getAllSubstations,
    "getSubstationById",
    ()=>getSubstationById
]);
const DUMMY_SUBSTATIONS = [
    {
        id: "1",
        master: {
            name: "Chennai North Substation",
            areaName: "Chennai",
            substationCode: "CHN-482153",
            latitude: 13.0827,
            longitude: 80.2707,
            installationYear: 2010,
            voltageClass: "400kV",
            operator: "TANTRANSCO",
            notes: "Critical load center feeding North Chennai."
        },
        assets: {
            transformers: [
                {
                    id: "TRF-1",
                    manufacturer: "BHEL",
                    model: "BHEL-400/230",
                    installationYear: 2010,
                    maintenanceHistory: [
                        {
                            date: "2023-06-11T09:30:00.000Z",
                            vendor: "BHEL Services",
                            technician: "R. Kumar",
                            notes: "Full oil processing & tightening checks",
                            documents: [
                                {
                                    url: "https://storage/dga_report_trf1.pdf",
                                    name: "dga_report_trf1.pdf",
                                    uploadedAt: "2023-06-11T10:00:00.000Z"
                                }
                            ]
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "HV Bushing",
                            reason: "Insulation cracks",
                            date: "2021-03-10T08:00:00.000Z",
                            vendor: "BHEL Spares",
                            cost: 145000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2022-09-05T14:12:00.000Z",
                            eventType: "Tap Change",
                            description: "Automatic tap change triggered",
                            comtradeUrl: null
                        }
                    ],
                    documents: [
                        {
                            url: "https://storage/nameplate_trf1.jpg",
                            name: "nameplate_trf1.jpg",
                            uploadedAt: "2010-03-01T12:00:00.000Z"
                        }
                    ],
                    conditionAssessment: {
                        status: "Good",
                        notes: "No abnormal heating detected"
                    },
                    ratedMVA: 315,
                    HV_kV: 400,
                    LV_kV: 230,
                    vectorGroup: "YNd11",
                    coolingType: "ONAF",
                    coreMaterial: "CRGO",
                    windingMaterial: "Cu",
                    oilType: "Mineral",
                    lastOilChangeDate: "2023-06-10T00:00:00.000Z",
                    oltc: {
                        type: "Resistive",
                        steps: 17,
                        lastService: "2023-03-15T00:00:00.000Z"
                    },
                    DGA: {
                        H2: 45,
                        CH4: 32,
                        C2H2: 0,
                        C2H4: 18,
                        CO: 220
                    },
                    oilMoisture_ppm: 18,
                    buchholzInstalled: true,
                    oltcOpsCount: 5400
                }
            ],
            breakers: [
                {
                    id: "CB-1",
                    manufacturer: "ABB",
                    model: "HPL-400",
                    installationYear: 2011,
                    maintenanceHistory: [
                        {
                            date: "2024-01-18T11:00:00.000Z",
                            vendor: "ABB Services",
                            technician: "S. Iyer",
                            notes: "Mechanism lubrication & SF6 refill",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Spring Mechanism",
                            reason: "Wear & fatigue",
                            date: "2023-05-11T08:00:00.000Z",
                            vendor: "ABB",
                            cost: 85000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2022-12-18T07:45:00.000Z",
                            eventType: "Trip",
                            description: "Line fault cleared",
                            comtradeUrl: "https://storage/cb_trip1.zip"
                        }
                    ],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "SF6 steady"
                    },
                    type: "SF6",
                    ratedVoltage_kV: 400,
                    ratedCurrent_A: 2000,
                    shortCircuitBreaking_kA: 40,
                    makingCapacity_kA: 100,
                    mechanismType: "Spring",
                    opCount: 860,
                    operatingTime_ms: 68,
                    sf6Pressure: 6.2
                }
            ],
            ctvt: [
                {
                    id: "CT-1",
                    manufacturer: "L&T",
                    model: "LNT-CT-2000",
                    installationYear: 2010,
                    maintenanceHistory: [
                        {
                            date: "2023-09-10T10:30:00.000Z",
                            vendor: "L&T Field",
                            technician: "V. Arun",
                            notes: "Secondary wiring inspected",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Terminal Block",
                            reason: "Loose contacts",
                            date: "2022-02-11T07:00:00.000Z",
                            vendor: "L&T",
                            cost: 5000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    ratio: "2000/1",
                    accuracyClass: "0.5",
                    burdenVA: 15,
                    lastCalibrationDate: "2023-08-10T09:00:00.000Z"
                }
            ],
            busbars: [
                {
                    id: "BB-1",
                    manufacturer: "Tata",
                    model: "TATA-BB400",
                    installationYear: 2011,
                    maintenanceHistory: [
                        {
                            date: "2024-02-01T10:00:00.000Z",
                            vendor: "Tata Maintenance",
                            technician: "S. Mani",
                            notes: "IR scan done",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Spacer Clamp",
                            reason: "Corrosion",
                            date: "2022-10-05T09:00:00.000Z",
                            vendor: "Tata",
                            cost: 12000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    busType: "Main",
                    material: "Cu",
                    capacity_A: 5000,
                    lastIRScanDate: "2023-11-10T09:45:00.000Z"
                }
            ],
            relays: [
                {
                    id: "REL-1",
                    manufacturer: "Schneider",
                    model: "MICOM-P442",
                    installationYear: 2012,
                    maintenanceHistory: [
                        {
                            date: "2024-03-12T12:00:00.000Z",
                            vendor: "Schneider",
                            technician: "T. Prakash",
                            notes: "Firmware update",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "LCD Screen",
                            reason: "Dark spots",
                            date: "2021-11-22T10:00:00.000Z",
                            vendor: "Schneider",
                            cost: 10000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    relayType: "Line Differential",
                    firmwareVersion: "v3.4.2",
                    enabledFunctions: [
                        "21",
                        "50",
                        "87L"
                    ],
                    ctPtMappings: {
                        CT1: "CT-1",
                        PT1: "PT-1"
                    },
                    lastConfigUpload: "2024-03-12T11:50:00.000Z"
                }
            ],
            pmu: [
                {
                    id: "PMU-1",
                    manufacturer: "SEL",
                    model: "SEL-3379",
                    installationYear: 2016,
                    maintenanceHistory: [
                        {
                            date: "2024-08-18T08:00:00.000Z",
                            vendor: "SEL India",
                            technician: "Harish",
                            notes: "Time sync precision test",
                            documents: []
                        }
                    ],
                    componentsReplaced: [],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    gpsSyncStatus: "Locked",
                    accuracy: 0.02,
                    lastSync: "2024-10-01T05:20:00.000Z"
                }
            ],
            battery: [
                {
                    id: "BAT-1",
                    manufacturer: "Exide",
                    model: "EXD-220V150",
                    installationYear: 2015,
                    maintenanceHistory: [
                        {
                            date: "2024-06-25T09:00:00.000Z",
                            vendor: "Exide",
                            technician: "Mohan",
                            notes: "Specific gravity check",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Cell #14",
                            reason: "Low capacity",
                            date: "2023-12-10T09:30:00.000Z",
                            vendor: "Exide",
                            cost: 15000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Fair",
                        notes: "Ageing signs"
                    },
                    batteryType: "VRLA",
                    ratedVoltage_V: 220,
                    capacity_Ah: 150,
                    floatVoltage: 2.25,
                    internalResistance: 0.015
                }
            ],
            gis: [
                {
                    id: "GIS-1",
                    manufacturer: "Hitachi",
                    model: "HIT-GIS-400",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-01-20T10:00:00.000Z",
                            vendor: "Hitachi Field",
                            technician: "Senthil",
                            notes: "PD Test done",
                            documents: []
                        }
                    ],
                    componentsReplaced: [],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    sf6Compartment: [
                        {
                            compartmentId: "C1",
                            pressure: 7.2
                        },
                        {
                            compartmentId: "C2",
                            pressure: 7.1
                        }
                    ],
                    pdMonitoringInstalled: true,
                    lastPDTest: "2024-01-20T09:00:00.000Z"
                }
            ],
            isolators: [
                {
                    id: "ISO-1",
                    manufacturer: "Kirloskar",
                    model: "KIR-ISO-400",
                    installationYear: 2011,
                    maintenanceHistory: [
                        {
                            date: "2023-07-20T09:00:00.000Z",
                            vendor: "Kirloskar",
                            technician: "Vimal",
                            notes: "Lubrication & rotation test",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Drive Gear",
                            reason: "Wear",
                            date: "2022-03-18T08:00:00.000Z",
                            vendor: "Kirloskar",
                            cost: 9000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    type: "Vertical",
                    driveMechanism: "Manual",
                    interlockInfo: "Linked with CB-1"
                }
            ],
            powerFlowLines: [
                {
                    id: "LINE-1",
                    manufacturer: "N/A",
                    model: "Quad Moose",
                    installationYear: 2010,
                    maintenanceHistory: [
                        {
                            date: "2024-04-10T09:00:00.000Z",
                            vendor: "LineTech",
                            technician: "Praveen",
                            notes: "Patrolling completed",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Insulator Disc",
                            reason: "Flashover marks",
                            date: "2023-01-11T09:00:00.000Z",
                            vendor: "LineTech",
                            cost: 6000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    lineVoltage_kV: 400,
                    length_km: 12.5,
                    conductorType: "AAAC",
                    thermalLimit_A: 2500,
                    impedance_R_X: {
                        R: 0.12,
                        X: 0.85
                    }
                }
            ],
            earthing: [
                {
                    id: "EAR-1",
                    manufacturer: "EarthGrid",
                    model: "EG-400",
                    installationYear: 2010,
                    maintenanceHistory: [
                        {
                            date: "2024-02-05T07:30:00.000Z",
                            vendor: "EarthGrid",
                            technician: "Rajan",
                            notes: "Earth pit refilled",
                            documents: []
                        }
                    ],
                    componentsReplaced: [],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    gridResistance: 0.32,
                    soilType: "Sandy clay",
                    lastTestDate: "2024-02-05T07:00:00.000Z"
                }
            ],
            environment: [
                {
                    id: "ENV-1",
                    manufacturer: "EnviroSense",
                    model: "ES-THFW",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-07-30T06:30:00.000Z",
                            vendor: "EnviroSense",
                            technician: "Venkat",
                            notes: "Sensor calibration",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Humidity Sensor",
                            reason: "Drift observed",
                            date: "2023-04-12T07:00:00.000Z",
                            vendor: "EnviroSense",
                            cost: 9000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    sensors: [
                        {
                            type: "temp",
                            threshold: 55
                        },
                        {
                            type: "humidity",
                            threshold: 80
                        },
                        {
                            type: "fire",
                            threshold: 1
                        },
                        {
                            type: "wind",
                            threshold: 40
                        }
                    ],
                    lastCalibration: "2024-07-30T06:00:00.000Z"
                }
            ]
        }
    },
    {
        id: "2",
        master: {
            name: "Coimbatore East Substation",
            areaName: "Coimbatore",
            substationCode: "CBE-912744",
            latitude: 11.0168,
            longitude: 76.9558,
            installationYear: 2015,
            voltageClass: "220kV",
            operator: "TANGEDCO",
            notes: "Feeds major industrial segments of Eastern Coimbatore."
        },
        assets: {
            transformers: [
                {
                    id: "TRF-2",
                    manufacturer: "Siemens",
                    model: "SIE-230/110",
                    installationYear: 2015,
                    maintenanceHistory: [
                        {
                            date: "2023-10-12T10:00:00.000Z",
                            vendor: "Siemens Field",
                            technician: "A. Ragu",
                            notes: "Oil filtration and DGA sample collection.",
                            documents: [
                                {
                                    url: "https://storage/reports/trf2_dga_oct23.pdf",
                                    name: "trf2_dga_oct23.pdf",
                                    uploadedAt: "2023-10-12T11:00:00.000Z"
                                }
                            ]
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Oil Level Gauge",
                            reason: "Incorrect readings",
                            date: "2022-07-15T09:00:00.000Z",
                            vendor: "Siemens Spares",
                            cost: 33000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2023-02-10T08:15:00.000Z",
                            eventType: "Overload Event",
                            description: "Load touched 96% for 17 minutes.",
                            comtradeUrl: null
                        }
                    ],
                    documents: [
                        {
                            url: "https://storage/docs/trf2_nameplate.jpg",
                            name: "trf2_nameplate.jpg",
                            uploadedAt: "2015-03-01T10:00:00.000Z"
                        }
                    ],
                    conditionAssessment: {
                        status: "Good",
                        notes: "Oil acidity slightly rising but within limits."
                    },
                    ratedMVA: 160,
                    HV_kV: 230,
                    LV_kV: 110,
                    vectorGroup: "Dyn11",
                    coolingType: "ONAN",
                    coreMaterial: "CRGO",
                    windingMaterial: "Al",
                    oilType: "Mineral",
                    lastOilChangeDate: "2022-11-20T00:00:00.000Z",
                    oltc: {
                        type: "Inductive",
                        steps: 19,
                        lastService: "2022-09-01T00:00:00.000Z"
                    },
                    DGA: {
                        H2: 22,
                        CH4: 9,
                        C2H2: 0,
                        C2H4: 6,
                        CO: 140
                    },
                    oilMoisture_ppm: 12,
                    buchholzInstalled: true,
                    oltcOpsCount: 3100
                }
            ],
            breakers: [
                {
                    id: "CB-2",
                    manufacturer: "GE",
                    model: "GL-230",
                    installationYear: 2016,
                    maintenanceHistory: [
                        {
                            date: "2024-04-11T09:00:00.000Z",
                            vendor: "GE Grid Field Services",
                            technician: "R. Gopinath",
                            notes: "Operating mechanism checked & lubrication completed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Trip Coil A",
                            reason: "Slow response",
                            date: "2022-12-01T08:00:00.000Z",
                            vendor: "GE Spares",
                            cost: 28000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2023-04-14T11:45:00.000Z",
                            eventType: "Trip",
                            description: "Earth fault on 110kV feeder",
                            comtradeUrl: "https://storage/comtrade/cb2_trip_20230414.zip"
                        }
                    ],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "SF6 pressure stable"
                    },
                    type: "SF6",
                    ratedVoltage_kV: 230,
                    ratedCurrent_A: 1600,
                    shortCircuitBreaking_kA: 31.5,
                    makingCapacity_kA: 80,
                    mechanismType: "Hydraulic",
                    opCount: 510,
                    operatingTime_ms: 74,
                    sf6Pressure: 5.8
                }
            ],
            ctvt: [
                {
                    id: "CT-2",
                    manufacturer: "BHEL",
                    model: "BHEL-CT-110",
                    installationYear: 2015,
                    maintenanceHistory: [
                        {
                            date: "2023-06-21T10:00:00.000Z",
                            vendor: "BHEL",
                            technician: "Manikandan",
                            notes: "Primary injection test completed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Jumper Cable",
                            reason: "Loose termination",
                            date: "2021-05-12T07:00:00.000Z",
                            vendor: "BHEL",
                            cost: 3000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: "Accuracy class maintained"
                    },
                    ratio: "1000/1",
                    accuracyClass: "0.2",
                    burdenVA: 10,
                    lastCalibrationDate: "2023-06-22T09:00:00.000Z"
                }
            ],
            busbars: [
                {
                    id: "BB-2",
                    manufacturer: "Tata",
                    model: "TATA-BB-230",
                    installationYear: 2016,
                    maintenanceHistory: [
                        {
                            date: "2024-02-12T08:30:00.000Z",
                            vendor: "Tata Power Services",
                            technician: "Vignesh",
                            notes: "Thermal scanning at joints",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Clamp Bolt",
                            reason: "Corrosion",
                            date: "2023-01-11T09:00:00.000Z",
                            vendor: "Tata Hardware",
                            cost: 1800,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    busType: "Double",
                    material: "Al",
                    capacity_A: 3200,
                    lastIRScanDate: "2023-05-15T10:00:00.000Z"
                }
            ],
            relays: [
                {
                    id: "REL-2",
                    manufacturer: "ABB",
                    model: "RET-615",
                    installationYear: 2017,
                    maintenanceHistory: [
                        {
                            date: "2024-03-18T11:00:00.000Z",
                            vendor: "ABB Protection",
                            technician: "S. Bala",
                            notes: "Settings verification & firmware patch",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Relay Push Button",
                            reason: "Non-responsive",
                            date: "2022-10-08T08:00:00.000Z",
                            vendor: "ABB",
                            cost: 1500,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    relayType: "Feeder Protection",
                    firmwareVersion: "7.5.1",
                    enabledFunctions: [
                        "Overcurrent",
                        "Earthfault",
                        "Directional"
                    ],
                    ctPtMappings: {
                        CT_A: "CT-2",
                        PT_A: "PT-1"
                    },
                    lastConfigUpload: "2024-01-04T09:30:00.000Z"
                }
            ],
            pmu: [
                {
                    id: "PMU-2",
                    manufacturer: "GE",
                    model: "GE-PMU200",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-07-24T10:00:00.000Z",
                            vendor: "GE Synchrophasor Lab",
                            technician: "R. Karthik",
                            notes: "GPS sync and frequency drift test",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "GPS Antenna",
                            reason: "Weak signal",
                            date: "2023-02-11T07:00:00.000Z",
                            vendor: "GE",
                            cost: 17000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    gpsSyncStatus: "Locked",
                    accuracy: 0.01,
                    lastSync: "2024-09-12T08:00:00.000Z"
                }
            ],
            battery: [
                {
                    id: "BAT-2",
                    manufacturer: "Amara Raja",
                    model: "AR-220V100",
                    installationYear: 2016,
                    maintenanceHistory: [
                        {
                            date: "2024-05-16T09:00:00.000Z",
                            vendor: "Amara Raja Service",
                            technician: "G. Murali",
                            notes: "Electrolyte top-up & load test",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Cell #7",
                            reason: "Low voltage",
                            date: "2023-06-18T08:00:00.000Z",
                            vendor: "Amara Raja",
                            cost: 14000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "Uniform charging"
                    },
                    batteryType: "Lead-Acid",
                    ratedVoltage_V: 220,
                    capacity_Ah: 100,
                    floatVoltage: 2.20,
                    internalResistance: 0.020
                }
            ],
            gis: [
                {
                    id: "GIS-2",
                    manufacturer: "Hyosung",
                    model: "HYO-GIS230",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-02-18T09:00:00.000Z",
                            vendor: "Hyosung GIS Team",
                            technician: "K. Sanjay",
                            notes: "PD measurement done.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "SF6 Nozzle",
                            reason: "Minor leakage",
                            date: "2022-11-21T07:00:00.000Z",
                            vendor: "Hyosung",
                            cost: 25000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    sf6Compartment: [
                        {
                            compartmentId: "C1",
                            pressure: 6.5
                        }
                    ],
                    pdMonitoringInstalled: true,
                    lastPDTest: "2024-02-18T09:00:00.000Z"
                }
            ],
            isolators: [
                {
                    id: "ISO-2",
                    manufacturer: "L&T",
                    model: "LNT-ISO-230",
                    installationYear: 2016,
                    maintenanceHistory: [
                        {
                            date: "2024-06-14T10:00:00.000Z",
                            vendor: "L&T",
                            technician: "S. Varun",
                            notes: "Drive motor check & greasing",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Limit Switch",
                            reason: "Failure to sense end position",
                            date: "2022-03-19T09:00:00.000Z",
                            vendor: "L&T",
                            cost: 3500,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    type: "Horizontal",
                    driveMechanism: "Motorized",
                    interlockInfo: "Interlocked with CB-2"
                }
            ],
            powerFlowLines: [
                {
                    id: "LINE-2",
                    manufacturer: "N/A",
                    model: "Panther",
                    installationYear: 2015,
                    maintenanceHistory: [
                        {
                            date: "2024-03-12T08:00:00.000Z",
                            vendor: "LineTech",
                            technician: "Naveen",
                            notes: "Annual patrolling & insulator cleaning",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Jumper Clamp",
                            reason: "Arcing marks",
                            date: "2023-04-21T08:00:00.000Z",
                            vendor: "LineTech",
                            cost: 2400,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    lineVoltage_kV: 230,
                    length_km: 18.2,
                    conductorType: "ACSR",
                    thermalLimit_A: 1800,
                    impedance_R_X: {
                        R: 0.15,
                        X: 0.70
                    }
                }
            ],
            earthing: [
                {
                    id: "EAR-2",
                    manufacturer: "EarthTech",
                    model: "EAR-230",
                    installationYear: 2015,
                    maintenanceHistory: [
                        {
                            date: "2024-03-04T07:00:00.000Z",
                            vendor: "EarthTech",
                            technician: "Syed",
                            notes: "Earth resistance check completed",
                            documents: []
                        }
                    ],
                    componentsReplaced: [],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    gridResistance: 0.45,
                    soilType: "Red soil",
                    lastTestDate: "2024-03-04T07:30:00.000Z"
                }
            ],
            environment: [
                {
                    id: "ENV-2",
                    manufacturer: "Siemens",
                    model: "ENV-PACK",
                    installationYear: 2020,
                    maintenanceHistory: [
                        {
                            date: "2024-06-12T11:00:00.000Z",
                            vendor: "Siemens",
                            technician: "Martyn",
                            notes: "Calibration completed",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Temp Sensor",
                            reason: "Erratic reading",
                            date: "2023-05-11T09:00:00.000Z",
                            vendor: "Siemens",
                            cost: 7500,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    sensors: [
                        {
                            type: "temp",
                            threshold: 60
                        },
                        {
                            type: "humidity",
                            threshold: 75
                        }
                    ],
                    lastCalibration: "2024-06-12T12:00:00.000Z"
                }
            ]
        }
    },
    {
        id: "3",
        master: {
            name: "Madurai Substation",
            areaName: "Madurai",
            substationCode: "MDU-332129",
            latitude: 9.9252,
            longitude: 78.1198,
            installationYear: 2018,
            voltageClass: "440kV",
            operator: "TANTRANSCO",
            notes: "Strategic GIS installation improving southern Tamil Nadu reliability."
        },
        assets: {
            transformers: [
                {
                    id: "TRF-3",
                    manufacturer: "ABB",
                    model: "ABB-440/230",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-05-19T10:00:00.000Z",
                            vendor: "ABB Field Services",
                            technician: "N. Farook",
                            notes: "OFAF cooling fan servicing & oil circulation completed.",
                            documents: [
                                {
                                    url: "https://storage/docs/trf3_cooling_report.pdf",
                                    name: "trf3_cooling_report.pdf",
                                    uploadedAt: "2024-05-19T11:00:00.000Z"
                                }
                            ]
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Cooling Fan 2",
                            reason: "Bearing noise & overheating",
                            date: "2023-08-10T08:00:00.000Z",
                            vendor: "ABB Motors",
                            cost: 62000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2023-11-25T07:50:00.000Z",
                            eventType: "Tap Change",
                            description: "Voltage regulation under high load.",
                            comtradeUrl: null
                        }
                    ],
                    documents: [
                        {
                            url: "https://storage/docs/trf3_nameplate.jpg",
                            name: "trf3_nameplate.jpg",
                            uploadedAt: "2018-02-10T08:00:00.000Z"
                        }
                    ],
                    conditionAssessment: {
                        status: "Good",
                        notes: "Minor moisture increase during monsoon; no action required."
                    },
                    ratedMVA: 500,
                    HV_kV: 440,
                    LV_kV: 230,
                    vectorGroup: "YNd11",
                    coolingType: "OFAF",
                    coreMaterial: "CRGO",
                    windingMaterial: "Cu",
                    oilType: "Naphthenic",
                    lastOilChangeDate: "2023-03-12T00:00:00.000Z",
                    oltc: {
                        type: "Resistive",
                        steps: 21,
                        lastService: "2023-02-10T00:00:00.000Z"
                    },
                    DGA: {
                        H2: 60,
                        CH4: 40,
                        C2H2: 1,
                        C2H4: 25,
                        CO: 260
                    },
                    oilMoisture_ppm: 22,
                    buchholzInstalled: true,
                    oltcOpsCount: 8900
                }
            ],
            breakers: [
                {
                    id: "CB-3",
                    manufacturer: "ABB",
                    model: "HDVC-440",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-03-10T09:00:00.000Z",
                            vendor: "ABB HV Services",
                            technician: "S. Murugan",
                            notes: "Operating mechanism verified and SF6 top-up.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Trip Coil B",
                            reason: "High pick-up time",
                            date: "2022-11-15T08:00:00.000Z",
                            vendor: "ABB Spares",
                            cost: 32000,
                            documents: []
                        }
                    ],
                    operationHistory: [
                        {
                            date: "2023-12-18T06:45:00.000Z",
                            eventType: "Trip",
                            description: "Transient line-to-ground fault cleared.",
                            comtradeUrl: "https://storage/comtrade/cb3_trip_20231218.zip"
                        }
                    ],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: "Fast response"
                    },
                    type: "SF6",
                    ratedVoltage_kV: 440,
                    ratedCurrent_A: 3150,
                    shortCircuitBreaking_kA: 50,
                    makingCapacity_kA: 125,
                    mechanismType: "Spring",
                    opCount: 210,
                    operatingTime_ms: 58,
                    sf6Pressure: 6.9
                }
            ],
            ctvt: [
                {
                    id: "CT-3",
                    manufacturer: "Hyosung",
                    model: "HY-CT-400",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-01-20T10:00:00.000Z",
                            vendor: "Hyosung Calibration Team",
                            technician: "K. Gani",
                            notes: "Primary injection test and accuracy verification.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Terminal Lug",
                            reason: "Hotspot observed",
                            date: "2022-06-15T09:00:00.000Z",
                            vendor: "Hyosung",
                            cost: 2500,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    ratio: "2500/1",
                    accuracyClass: "0.2",
                    burdenVA: 20,
                    lastCalibrationDate: "2024-01-20T09:30:00.000Z"
                }
            ],
            busbars: [
                {
                    id: "BB-3",
                    manufacturer: "ABB",
                    model: "ABB-BB-440",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-04-01T08:00:00.000Z",
                            vendor: "ABB Bus Diagnostics",
                            technician: "P. Ilango",
                            notes: "Full thermal scan completed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Phase Spacer",
                            reason: "Mechanical fatigue",
                            date: "2022-12-10T07:00:00.000Z",
                            vendor: "ABB",
                            cost: 18000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    busType: "Main",
                    material: "Cu",
                    capacity_A: 6300,
                    lastIRScanDate: "2024-04-01T08:00:00.000Z"
                }
            ],
            relays: [
                {
                    id: "REL-3",
                    manufacturer: "Schneider",
                    model: "MICOM-P741",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-02-15T10:00:00.000Z",
                            vendor: "Schneider Electric",
                            technician: "T. Jaya",
                            notes: "Communication port test & firmware validation.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Front Panel Keypad",
                            reason: "Faulty keys",
                            date: "2022-09-14T09:00:00.000Z",
                            vendor: "Schneider",
                            cost: 4200,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    relayType: "Line Distance Relay",
                    firmwareVersion: "v5.2",
                    enabledFunctions: [
                        "21",
                        "21N",
                        "50",
                        "87L"
                    ],
                    ctPtMappings: {
                        CT_MAIN: "CT-3",
                        PT_MAIN: "PT-1"
                    },
                    lastConfigUpload: "2024-02-15T09:20:00.000Z"
                }
            ],
            pmu: [
                {
                    id: "PMU-3",
                    manufacturer: "SEL",
                    model: "SEL-351S",
                    installationYear: 2020,
                    maintenanceHistory: [
                        {
                            date: "2024-09-10T10:00:00.000Z",
                            vendor: "SEL India",
                            technician: "L. Rohit",
                            notes: "Timestamp drift analysis performed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "IRIG-B Receiver",
                            reason: "Intermittent sync loss",
                            date: "2023-01-13T08:00:00.000Z",
                            vendor: "SEL",
                            cost: 9000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    gpsSyncStatus: "Locked",
                    accuracy: 0.015,
                    lastSync: "2024-09-10T10:30:00.000Z"
                }
            ],
            battery: [
                {
                    id: "BAT-3",
                    manufacturer: "Exide",
                    model: "EXD-220V200",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-08-12T09:00:00.000Z",
                            vendor: "Exide Service",
                            technician: "D. Surya",
                            notes: "Full discharge test completed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Cell #5",
                            reason: "Reduced backup time",
                            date: "2023-04-21T08:00:00.000Z",
                            vendor: "Exide",
                            cost: 16000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "Stable charge distribution"
                    },
                    batteryType: "VRLA",
                    ratedVoltage_V: 220,
                    capacity_Ah: 200,
                    floatVoltage: 2.25,
                    internalResistance: 0.018
                }
            ],
            gis: [
                {
                    id: "GIS-3",
                    manufacturer: "Hitachi Energy",
                    model: "HIT-GIS-440",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-01-22T10:00:00.000Z",
                            vendor: "Hitachi GIS Support",
                            technician: "S. Thameem",
                            notes: "SF6 quality analysis performed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Pressure Sensor",
                            reason: "Erratic values",
                            date: "2023-07-12T07:00:00.000Z",
                            vendor: "Hitachi",
                            cost: 30000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "PD levels normal"
                    },
                    sf6Compartment: [
                        {
                            compartmentId: "A1",
                            pressure: 7.3
                        },
                        {
                            compartmentId: "A2",
                            pressure: 7.2
                        }
                    ],
                    pdMonitoringInstalled: true,
                    lastPDTest: "2024-01-22T09:00:00.000Z"
                }
            ],
            isolators: [
                {
                    id: "ISO-3",
                    manufacturer: "Kirloskar",
                    model: "KIR-ISO-440",
                    installationYear: 2019,
                    maintenanceHistory: [
                        {
                            date: "2024-04-09T08:00:00.000Z",
                            vendor: "Kirloskar Tech",
                            technician: "R. Divakar",
                            notes: "Drive mechanism inspection & lubrication.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Drive Rod",
                            reason: "Bent due to mechanical stress",
                            date: "2022-09-10T09:00:00.000Z",
                            vendor: "Kirloskar",
                            cost: 11000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    type: "Vertical",
                    driveMechanism: "Motorized",
                    interlockInfo: "Interlocked with GIS Section A"
                }
            ],
            powerFlowLines: [
                {
                    id: "LINE-3",
                    manufacturer: "N/A",
                    model: "Zebra Conductor",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-02-11T07:00:00.000Z",
                            vendor: "LineTech",
                            technician: "A. Balaji",
                            notes: "Line patrolling completed. Birds nests cleared.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Insulator Disc",
                            reason: "Tracking marks",
                            date: "2023-03-15T09:00:00.000Z",
                            vendor: "LineTech",
                            cost: 5500,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: ""
                    },
                    lineVoltage_kV: 440,
                    length_km: 15.4,
                    conductorType: "ACSR Zebra",
                    thermalLimit_A: 3100,
                    impedance_R_X: {
                        R: 0.09,
                        X: 0.65
                    }
                }
            ],
            earthing: [
                {
                    id: "EAR-3",
                    manufacturer: "EarthGrid",
                    model: "EG-440",
                    installationYear: 2018,
                    maintenanceHistory: [
                        {
                            date: "2024-03-01T08:00:00.000Z",
                            vendor: "EarthGrid Services",
                            technician: "T. Manohar",
                            notes: "Earth res testing and pit refilling",
                            documents: []
                        }
                    ],
                    componentsReplaced: [],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Excellent",
                        notes: ""
                    },
                    gridResistance: 0.28,
                    soilType: "Black cotton soil",
                    lastTestDate: "2024-03-01T07:30:00.000Z"
                }
            ],
            environment: [
                {
                    id: "ENV-3",
                    manufacturer: "EnviroSense",
                    model: "ES-HYBRID",
                    installationYear: 2020,
                    maintenanceHistory: [
                        {
                            date: "2024-05-17T10:00:00.000Z",
                            vendor: "EnviroSense",
                            technician: "S. Venkatesh",
                            notes: "Calibration & threshold tuning completed.",
                            documents: []
                        }
                    ],
                    componentsReplaced: [
                        {
                            componentName: "Fire Sensor",
                            reason: "False alarms detected",
                            date: "2023-10-13T08:00:00.000Z",
                            vendor: "EnviroSense",
                            cost: 5000,
                            documents: []
                        }
                    ],
                    operationHistory: [],
                    documents: [],
                    conditionAssessment: {
                        status: "Good",
                        notes: "All sensors operational"
                    },
                    sensors: [
                        {
                            type: "temp",
                            threshold: 60
                        },
                        {
                            type: "humidity",
                            threshold: 75
                        },
                        {
                            type: "fire",
                            threshold: 1
                        },
                        {
                            type: "wind",
                            threshold: 45
                        }
                    ],
                    lastCalibration: "2024-05-17T09:00:00.000Z"
                }
            ]
        }
    }
];
function getSubstationById(id) {
    return DUMMY_SUBSTATIONS.find((s)=>s.id === id);
}
function getAllSubstations() {
    return DUMMY_SUBSTATIONS;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>Accordion,
    "AccordionContent",
    ()=>AccordionContent,
    "AccordionItem",
    ()=>AccordionItem,
    "AccordionTrigger",
    ()=>AccordionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Accordion({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "accordion",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Accordion;
function AccordionItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "accordion-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-b last:border-b-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = AccordionItem;
function AccordionTrigger({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "accordion-trigger",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180', className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/components/ui/accordion.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/accordion.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = AccordionTrigger;
function AccordionContent({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "accordion-content",
        className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('pt-0 pb-4', className),
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/accordion.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c3 = AccordionContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Accordion");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger");
__turbopack_context__.k.register(_c3, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/asset-details.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetDetails",
    ()=>AssetDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}
function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function AssetDetailsView({ asset, assetType }) {
    if (!asset) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-4 bg-slate-50 rounded-lg border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold",
                                children: [
                                    assetType,
                                    " - ",
                                    asset.id
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    asset.manufacturer,
                                    " ",
                                    asset.model
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    asset.conditionAssessment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: asset.conditionAssessment.status === "Good" ? "default" : "secondary",
                        children: asset.conditionAssessment.status
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
                children: [
                    asset.installationYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Installation Year"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: asset.installationYear
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    Object.entries(asset).map(([key, value])=>{
                        if ([
                            "id",
                            "manufacturer",
                            "model",
                            "maintenanceHistory",
                            "operationHistory",
                            "documents",
                            "componentsReplaced",
                            "conditionAssessment",
                            "installationYear"
                        ].includes(key)) return null;
                        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                            if (key === "DGA") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-2 font-medium",
                                            children: "Dissolved Gas Analysis (DGA)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 67,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-5 gap-2 p-3 bg-white rounded border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "H2:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 69,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                value.H2,
                                                                " ppm"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 69,
                                                            columnNumber: 85
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "CH4:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                value.CH4,
                                                                " ppm"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 86
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "C2H2:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                value.C2H2,
                                                                " ppm"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 87
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "C2H4:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 72,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                value.C2H4,
                                                                " ppm"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 72,
                                                            columnNumber: 87
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "CO:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                value.CO,
                                                                " ppm"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 85
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 66,
                                    columnNumber: 17
                                }, this);
                            }
                            if (key === "oltc") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-2 font-medium",
                                            children: "OLTC (On-Load Tap Changer)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2 p-3 bg-white rounded border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Type:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 83,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: value.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 83,
                                                            columnNumber: 87
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Steps:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: value.steps
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 88
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Last Service:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: formatDate(value.lastService)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 95
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this);
                            }
                            if (key === "impedance_R_X") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Impedance (R/X)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 93,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: [
                                                value.R,
                                                " / ",
                                                value.X
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 94,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this);
                            }
                            if (key === "sf6Compartment") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-2 font-medium",
                                            children: "SF6 Compartments"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: value.map((comp, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-white rounded border text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: [
                                                                comp.compartmentId,
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 105,
                                                            columnNumber: 25
                                                        }, this),
                                                        " ",
                                                        comp.pressure,
                                                        " bar"
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this);
                            }
                            if (key === "sensors") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-2 font-medium",
                                            children: "Sensors"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-4 gap-2",
                                            children: value.map((sensor, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-white rounded border text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "capitalize font-medium",
                                                            children: [
                                                                sensor.type,
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 25
                                                        }, this),
                                                        " Threshold: ",
                                                        sensor.threshold
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 114,
                                    columnNumber: 17
                                }, this);
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground capitalize",
                                        children: key.replace(/_/g, " ")
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: Object.entries(value).map(([subKey, subValue])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-sm",
                                                children: [
                                                    subKey,
                                                    ": ",
                                                    String(subValue)
                                                ]
                                            }, subKey, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this);
                        }
                        if (Array.isArray(value)) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground capitalize",
                                    children: key.replace(/_/g, " ")
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium",
                                    children: String(value)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/components/dashboard/asset-details.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            asset.conditionAssessment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 bg-white rounded border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium mb-2",
                        children: "Condition Assessment"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: asset.conditionAssessment.status === "Good" ? "default" : "secondary",
                                children: asset.conditionAssessment.status
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            asset.conditionAssessment.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: asset.conditionAssessment.notes
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this),
            asset.maintenanceHistory && asset.maintenanceHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            "Maintenance History"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: asset.maintenanceHistory.map((maintenance, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 bg-white rounded border text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: formatDate(maintenance.date)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                children: maintenance.vendor
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground text-xs",
                                        children: [
                                            "Technician: ",
                                            maintenance.technician
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: maintenance.notes
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    maintenance.documents && maintenance.documents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex items-center gap-2 text-xs text-blue-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 182,
                                                columnNumber: 21
                                            }, this),
                                            maintenance.documents.length,
                                            " document(s)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 181,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            asset.operationHistory && asset.operationHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            "Operation History"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: asset.operationHistory.map((operation, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 bg-white rounded border text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: formatDateTime(operation.date)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                children: operation.eventType
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 204,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1",
                                        children: operation.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, this),
                                    operation.comtradeUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "link",
                                        size: "sm",
                                        className: "mt-2 p-0 h-auto text-xs",
                                        children: "View COMTRADE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 208,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 201,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/asset-details.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = AssetDetailsView;
function AssetDetails({ substation }) {
    _s();
    const [selectedAsset, setSelectedAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAssetType, setSelectedAssetType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [expandedAssets, setExpandedAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Collect all maintenance and operation history
    const allMaintenanceHistory = [];
    const allOperationHistory = [];
    // Collect from all asset types
    Object.values(substation.assets).forEach((assetArray)=>{
        assetArray.forEach((asset)=>{
            if (asset.maintenanceHistory) {
                asset.maintenanceHistory.forEach((maint)=>{
                    allMaintenanceHistory.push({
                        ...maint,
                        assetId: asset.id,
                        assetType: asset.manufacturer + " " + asset.model
                    });
                });
            }
            if (asset.operationHistory) {
                asset.operationHistory.forEach((op)=>{
                    allOperationHistory.push({
                        ...op,
                        assetId: asset.id,
                        assetType: asset.manufacturer + " " + asset.model
                    });
                });
            }
        });
    });
    // Sort by date (newest first)
    allMaintenanceHistory.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    allOperationHistory.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    const handleAssetClick = (asset, assetType)=>{
        const assetKey = `${assetType}-${asset.id}`;
        if (expandedAssets.has(assetKey)) {
            setExpandedAssets((prev)=>{
                const newSet = new Set(prev);
                newSet.delete(assetKey);
                return newSet;
            });
            setSelectedAsset(null);
            setSelectedAssetType("");
        } else {
            setExpandedAssets((prev)=>new Set(prev).add(assetKey));
            setSelectedAsset(asset);
            setSelectedAssetType(assetType);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "icon",
                                asChild: true,
                                className: "h-9 w-9 rounded-full bg-transparent",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/view-substations",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold tracking-tight",
                                        children: substation.master.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: substation.master.areaName
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 289,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "ID: ",
                                                    substation.master.substationCode
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 290,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "bg-green-50 text-green-700 border-green-200",
                                                children: "Operational"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            className: "bg-blue-600 hover:bg-blue-700 text-white border-0",
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/edit-substation/${substation.id}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    "Edit Substation"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/asset-details.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 md:col-span-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base font-medium",
                                            children: "Master Information"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "grid gap-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Voltage Class"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-right",
                                                        children: substation.master.voltageClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 317,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Installation Year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-right",
                                                        children: substation.master.installationYear
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Operator"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-right",
                                                        children: substation.master.operator
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 325,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Coordinates"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-right truncate",
                                                        children: [
                                                            substation.master.latitude.toFixed(4),
                                                            "° N, ",
                                                            substation.master.longitude.toFixed(4),
                                                            "° E"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this),
                                            substation.master.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 gap-1 pt-2 border-t",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Notes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm",
                                                        children: substation.master.notes
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 336,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base font-medium",
                                            children: "Asset Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "grid gap-3 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Transformers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.transformers.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Breakers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.breakers.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 353,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "CT/VT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.ctvt.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 357,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Busbars"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.busbars.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 361,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Relays"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.relays.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 365,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "PMU"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.pmu.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 369,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Battery"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.battery.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 373,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "GIS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.gis.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Isolators"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.isolators.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 381,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Power Flow Lines"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.powerFlowLines.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 385,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Earthing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.earthing.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 389,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Environment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        children: substation.assets.environment.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 393,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-2 space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            defaultValue: "assets",
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "w-full justify-start border-b rounded-none h-auto p-0 bg-transparent",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "assets",
                                            className: "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2",
                                            children: "Assets & Equipment"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 405,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "maintenance",
                                            className: "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2",
                                            children: [
                                                "Maintenance History (",
                                                allMaintenanceHistory.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 411,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "operation",
                                            className: "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2",
                                            children: [
                                                "Operation History (",
                                                allOperationHistory.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 417,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "assets",
                                    className: "pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                                        type: "single",
                                        collapsible: true,
                                        className: "w-full space-y-2",
                                        children: [
                                            substation.assets.transformers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "transformers",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 433,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 432,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Transformers"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 436,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.transformers.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 437,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 435,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.transformers.map((transformer)=>{
                                                                const assetKey = `Transformer-${transformer.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    transformer.id,
                                                                                                    " - ",
                                                                                                    transformer.manufacturer,
                                                                                                    " ",
                                                                                                    transformer.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 453,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    transformer.ratedMVA,
                                                                                                    " MVA • ",
                                                                                                    transformer.HV_kV,
                                                                                                    "kV/",
                                                                                                    transformer.LV_kV,
                                                                                                    "kV • ",
                                                                                                    transformer.installationYear
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 454,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 452,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: transformer.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: transformer.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 459,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(transformer, "Transformer"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 469,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 471,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 462,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 458,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 451,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 450,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === transformer.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: transformer,
                                                                                assetType: "Transformer"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 479,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 478,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, transformer.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this),
                                            substation.assets.breakers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "breakers",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-orange-100 flex items-center justify-center text-orange-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Circuit Breakers"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 499,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.breakers.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 500,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 498,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.breakers.map((breaker)=>{
                                                                const assetKey = `Circuit Breaker-${breaker.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    breaker.id,
                                                                                                    " - ",
                                                                                                    breaker.manufacturer,
                                                                                                    " ",
                                                                                                    breaker.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 514,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    breaker.type,
                                                                                                    " • ",
                                                                                                    breaker.ratedVoltage_kV,
                                                                                                    "kV • ",
                                                                                                    breaker.ratedCurrent_A,
                                                                                                    "A"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 515,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 513,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: breaker.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: breaker.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 520,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(breaker, "Circuit Breaker"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 530,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 532,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 523,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 519,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 512,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 511,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === breaker.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: breaker,
                                                                                assetType: "Circuit Breaker"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 540,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 539,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, breaker.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 510,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 492,
                                                columnNumber: 17
                                            }, this),
                                            substation.assets.ctvt.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "ctvt",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "CT/VT"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 560,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.ctvt.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 561,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 559,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.ctvt.map((ctvt)=>{
                                                                const assetKey = `CT/VT-${ctvt.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    ctvt.id,
                                                                                                    " - ",
                                                                                                    ctvt.manufacturer,
                                                                                                    " ",
                                                                                                    ctvt.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 575,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    "Ratio: ",
                                                                                                    ctvt.ratio,
                                                                                                    " • Accuracy: ",
                                                                                                    ctvt.accuracyClass
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 576,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 574,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: ctvt.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: ctvt.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 581,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(ctvt, "CT/VT"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 591,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 593,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 584,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 580,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 573,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 572,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === ctvt.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: ctvt,
                                                                                assetType: "CT/VT"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 601,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 600,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, ctvt.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 571,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 553,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.busbars.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "busbars",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 618,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 617,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Busbars"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 621,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.busbars.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 622,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 620,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.busbars.map((busbar)=>{
                                                                const assetKey = `Busbar-${busbar.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    busbar.id,
                                                                                                    " - ",
                                                                                                    busbar.manufacturer,
                                                                                                    " ",
                                                                                                    busbar.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 636,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    busbar.busType,
                                                                                                    " • ",
                                                                                                    busbar.material,
                                                                                                    " • ",
                                                                                                    busbar.capacity_A,
                                                                                                    "A"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 637,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 635,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: busbar.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: busbar.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 642,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(busbar, "Busbar"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 652,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 654,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 645,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 641,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 634,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 633,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === busbar.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: busbar,
                                                                                assetType: "Busbar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 662,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 661,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, busbar.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 632,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 627,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 614,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.relays.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "relays",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 679,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Protection Relays"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 682,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.relays.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 683,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.relays.map((relay)=>{
                                                                const assetKey = `Protection Relay-${relay.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    relay.id,
                                                                                                    " - ",
                                                                                                    relay.manufacturer,
                                                                                                    " ",
                                                                                                    relay.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 697,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: relay.relayType
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 698,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 696,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: relay.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: relay.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 701,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(relay, "Protection Relay"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 711,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 713,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 704,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 700,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 695,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 694,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === relay.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: relay,
                                                                                assetType: "Protection Relay"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 721,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 720,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, relay.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 693,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 688,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 675,
                                                columnNumber: 17
                                            }, this),
                                            substation.assets.pmu.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "pmu",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-teal-100 flex items-center justify-center text-teal-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 738,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 737,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "PMU"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 741,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.pmu.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 742,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 740,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 736,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.pmu.map((pmu)=>{
                                                                const assetKey = `PMU-${pmu.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    pmu.id,
                                                                                                    " - ",
                                                                                                    pmu.manufacturer,
                                                                                                    " ",
                                                                                                    pmu.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 756,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    "GPS: ",
                                                                                                    pmu.gpsSyncStatus
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 757,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 755,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: pmu.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: pmu.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 760,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(pmu, "PMU"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 770,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 772,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 763,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 759,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 754,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 753,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === pmu.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: pmu,
                                                                                assetType: "PMU"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 780,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 779,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, pmu.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 752,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 747,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 746,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 734,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.battery.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "battery",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-yellow-100 flex items-center justify-center text-yellow-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 797,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 796,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Battery"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 800,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.battery.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 801,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 799,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.battery.map((battery)=>{
                                                                const assetKey = `Battery-${battery.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    battery.id,
                                                                                                    " - ",
                                                                                                    battery.manufacturer,
                                                                                                    " ",
                                                                                                    battery.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 815,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    battery.batteryType,
                                                                                                    " • ",
                                                                                                    battery.ratedVoltage_V,
                                                                                                    "V • ",
                                                                                                    battery.capacity_Ah,
                                                                                                    "Ah"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 816,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 814,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: battery.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: battery.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 821,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(battery, "Battery"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 831,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 833,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 824,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 820,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 813,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 812,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === battery.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: battery,
                                                                                assetType: "Battery"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 841,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 840,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, battery.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 811,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 806,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 793,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.gis.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "gis",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 858,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 857,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "GIS"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 861,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.gis.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 862,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 860,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 855,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.gis.map((gis)=>{
                                                                const assetKey = `GIS-${gis.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    gis.id,
                                                                                                    " - ",
                                                                                                    gis.manufacturer,
                                                                                                    " ",
                                                                                                    gis.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 876,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    "PD Monitoring: ",
                                                                                                    gis.pdMonitoringInstalled ? "Yes" : "No"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 877,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 875,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: gis.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: gis.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 880,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(gis, "GIS"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 890,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 892,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 883,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 879,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 874,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 873,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === gis.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: gis,
                                                                                assetType: "GIS"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 900,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 899,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, gis.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 872,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 867,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 866,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 854,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.isolators.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "isolators",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-cyan-100 flex items-center justify-center text-cyan-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 917,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 916,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Isolators"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 920,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.isolators.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 921,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 919,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 915,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 914,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.isolators.map((isolator)=>{
                                                                const assetKey = `Isolator-${isolator.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    isolator.id,
                                                                                                    " - ",
                                                                                                    isolator.manufacturer,
                                                                                                    " ",
                                                                                                    isolator.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 935,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    isolator.type,
                                                                                                    " • ",
                                                                                                    isolator.driveMechanism
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 936,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 934,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: isolator.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: isolator.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 941,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(isolator, "Isolator"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 951,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 953,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 944,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 940,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 933,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 932,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === isolator.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: isolator,
                                                                                assetType: "Isolator"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 961,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 960,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, isolator.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 931,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 926,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 925,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 913,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.powerFlowLines.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "powerFlowLines",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-pink-100 flex items-center justify-center text-pink-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 978,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 977,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Power Flow Lines"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 981,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.powerFlowLines.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 982,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 980,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 976,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 975,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.powerFlowLines.map((line)=>{
                                                                const assetKey = `Power Flow Line-${line.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    line.id,
                                                                                                    " - ",
                                                                                                    line.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 996,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    line.lineVoltage_kV,
                                                                                                    "kV • ",
                                                                                                    line.length_km,
                                                                                                    "km • ",
                                                                                                    line.conductorType
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 997,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 995,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: line.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: line.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1002,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(line, "Power Flow Line"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1012,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1014,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1005,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 1001,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 994,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 993,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === line.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: line,
                                                                                assetType: "Power Flow Line"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1022,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1021,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, line.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 992,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 987,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 986,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 974,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.earthing.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "earthing",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-amber-100 flex items-center justify-center text-amber-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1039,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1038,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Earthing"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1042,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.earthing.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1043,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1041,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1037,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.earthing.map((earthing)=>{
                                                                const assetKey = `Earthing-${earthing.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    earthing.id,
                                                                                                    " - ",
                                                                                                    earthing.manufacturer,
                                                                                                    " ",
                                                                                                    earthing.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1057,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    "Resistance: ",
                                                                                                    earthing.gridResistance,
                                                                                                    "Ω • ",
                                                                                                    earthing.soilType
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1058,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 1056,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: earthing.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: earthing.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1063,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(earthing, "Earthing"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1073,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1075,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1066,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 1062,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1055,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1054,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === earthing.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: earthing,
                                                                                assetType: "Earthing"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1083,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1082,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, earthing.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1053,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1048,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1047,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 19
                                            }, this),
                                            substation.assets.environment.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                                value: "environment",
                                                className: "border rounded-lg px-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                        className: "hover:no-underline py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1100,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1099,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Environment"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1103,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                substation.assets.environment.length,
                                                                                " Units"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1104,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1102,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1098,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1097,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 pb-4 space-y-3",
                                                            children: substation.assets.environment.map((env)=>{
                                                                const assetKey = `Environment-${env.id}`;
                                                                const isExpanded = expandedAssets.has(assetKey);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-3 rounded-lg bg-slate-50 border",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "font-medium",
                                                                                                children: [
                                                                                                    env.id,
                                                                                                    " - ",
                                                                                                    env.manufacturer,
                                                                                                    " ",
                                                                                                    env.model
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1118,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-muted-foreground",
                                                                                                children: [
                                                                                                    "Sensors: ",
                                                                                                    env.sensors?.length || 0,
                                                                                                    " configured"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1119,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 1117,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: env.conditionAssessment?.status === "Good" ? "default" : "secondary",
                                                                                                children: env.conditionAssessment?.status || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1124,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleAssetClick(env, "Environment"),
                                                                                                className: "h-8 w-8 p-0",
                                                                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1134,
                                                                                                    columnNumber: 41
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                    lineNumber: 1136,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                                lineNumber: 1127,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                        lineNumber: 1123,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1116,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1115,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        isExpanded && selectedAsset?.id === env.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetailsView, {
                                                                                asset: env,
                                                                                assetType: "Environment"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1144,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                            lineNumber: 1143,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, env.id, true, {
                                                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                    lineNumber: 1114,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 1096,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "maintenance",
                                    className: "pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: allMaintenanceHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground text-center py-8",
                                            children: "No maintenance history available"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 19
                                        }, this) : allMaintenanceHistory.map((maintenance, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 pb-4 border-b last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1166,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1165,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1164,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: maintenance.assetType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1171,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        children: "Completed"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1172,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1170,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-muted-foreground",
                                                                children: maintenance.notes
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1174,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 text-xs text-gray-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1177,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            " ",
                                                                            formatDate(maintenance.date)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1176,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "Vendor: ",
                                                                            maintenance.vendor
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1179,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "Technician: ",
                                                                            maintenance.technician
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1180,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1175,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1169,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 1163,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 1158,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 1157,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "operation",
                                    className: "pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: allOperationHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground text-center py-8",
                                            children: "No operation history available"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                            lineNumber: 1192,
                                            columnNumber: 19
                                        }, this) : allOperationHistory.map((operation, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 pb-4 border-b last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1198,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/asset-details.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1196,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: operation.assetType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1203,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        children: operation.eventType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1204,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1202,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-muted-foreground",
                                                                children: operation.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 text-xs text-gray-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                                lineNumber: 1209,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            " ",
                                                                            formatDateTime(operation.date)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1208,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    operation.comtradeUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "link",
                                                                        size: "sm",
                                                                        className: "p-0 h-auto text-xs",
                                                                        children: "View COMTRADE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                        lineNumber: 1212,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                                lineNumber: 1207,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                                        lineNumber: 1201,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/components/dashboard/asset-details.tsx",
                                                lineNumber: 1195,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/asset-details.tsx",
                                        lineNumber: 1190,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/asset-details.tsx",
                                    lineNumber: 1189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/asset-details.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/asset-details.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/asset-details.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/asset-details.tsx",
        lineNumber: 276,
        columnNumber: 5
    }, this);
}
_s(AssetDetails, "ZiYAxkRXC3jpbAjtj3x4jnyvX8g=");
_c1 = AssetDetails;
var _c, _c1;
__turbopack_context__.k.register(_c, "AssetDetailsView");
__turbopack_context__.k.register(_c1, "AssetDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/asset-details/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetDetailsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dummy-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$asset$2d$details$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/asset-details.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function AssetDetailsPage({ params }) {
    const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const substation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dummy$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSubstationById"])(resolvedParams.id);
    if (!substation) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "Substation Not Found"
                }, void 0, false, {
                    fileName: "[project]/app/asset-details/[id]/page.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground",
                    children: "The substation you're looking for doesn't exist."
                }, void 0, false, {
                    fileName: "[project]/app/asset-details/[id]/page.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/asset-details/[id]/page.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$asset$2d$details$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetDetails"], {
        substation: substation
    }, void 0, false, {
        fileName: "[project]/app/asset-details/[id]/page.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c = AssetDetailsPage;
var _c;
__turbopack_context__.k.register(_c, "AssetDetailsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4cd198f6._.js.map