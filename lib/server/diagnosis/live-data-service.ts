import { generateSyntheticReadings } from "@/lib/diagnosis/realtime-generator"
import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"
import { DUMMY_SUBSTATIONS } from "@/lib/dummy-data"
import { getAdminFirestore, getAdminRealtimeDB } from "@/lib/server/firebase-admin"

const REALTIME_KEY_MAP: Record<DiagnosisComponentKey, string> = {
  bayLines: "bayLines",
  transformer: "transformer",
  circuitBreaker: "breaker",
  busbar: "busbar",
  isolator: "isolator",
  relay: "relay",
  pmu: "pmu",
  gis: "gis",
  battery: "battery",
  environment: "environment",
}

export async function fetchLiveSnapshot(
  areaCode: string,
  substationId: string | null | undefined,
  component: DiagnosisComponentKey,
) {
  const realtime = getAdminRealtimeDB()
  const componentKey = REALTIME_KEY_MAP[component]

  if (realtime) {
    try {
      const candidatePaths = [
        `${areaCode}/${componentKey}`,
        substationId ? `${areaCode}/${substationId}/${componentKey}` : null,
        `${areaCode}/${componentKey}/live`,
      ].filter(Boolean) as string[]

      for (const path of candidatePaths) {
        const ref = realtime.ref(`/${path}`)
        const snapshot = await ref.get()
        if (snapshot.exists()) {
          const readings = snapshot.val()
          return {
            timestamp: new Date().toISOString(),
            readings,
            history: {},
            source: "firebase",
          }
        }
      }
    } catch (error) {
      console.warn("Realtime fetch failed, falling back to synthetic data", error)
    }
  }

  const synthetic = generateSyntheticReadings(component)
  return {
    ...synthetic,
    source: "synthetic",
  }
}

async function querySubstationByField(
  firestore: ReturnType<typeof getAdminFirestore>,
  fieldPath: string,
  rawValue: string,
) {
  if (!firestore || !rawValue) return null
  const candidates = Array.from(
    new Set(
      [rawValue, rawValue.trim(), rawValue.trim().toUpperCase(), rawValue.trim().toLowerCase()].filter(Boolean),
    ),
  ) as string[]
  for (const candidate of candidates) {
    if (!candidate) continue
    const snapshot = await firestore.collection("substations").where(fieldPath, "==", candidate).limit(1).get()
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
  }
  return null
}

export async function fetchAssetMetadata(identifier?: string | null) {
  const firestore = getAdminFirestore()
  if (firestore && identifier) {
    try {
      const directCollections = ["substations", "areas"]
      for (const collectionName of directCollections) {
        const doc = await firestore.collection(collectionName).doc(identifier).get()
        if (doc.exists) {
          return { id: doc.id, ...doc.data() }
        }
      }

      const lookupOrder = [
        "master.substationCode",
        "master.areaName",
        "master.name",
      ]
      for (const fieldPath of lookupOrder) {
        const record = await querySubstationByField(firestore, fieldPath, identifier)
        if (record) {
          return record
        }
      }
    } catch (error) {
      console.warn("Firestore fetch failed, falling back to dummy data", error)
    }
  }

  if (identifier) {
    const matchId = identifier.toLowerCase()
    const fallback = DUMMY_SUBSTATIONS.find(
      (item) =>
        item.id === identifier ||
        item.master.substationCode?.toLowerCase() === matchId ||
        item.master.areaName?.toLowerCase() === matchId,
    )
    if (fallback) {
      return fallback
    }
  }

  return {
    master: {
      areaName: identifier ?? "Unknown Area",
      installationYear: "—",
    },
  }
}

