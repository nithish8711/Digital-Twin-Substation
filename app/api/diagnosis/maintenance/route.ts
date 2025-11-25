import { randomUUID } from "node:crypto"

import { NextResponse } from "next/server"

import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"
import { getAdminRealtimeDB } from "@/lib/server/firebase-admin"

const validActions = ["notify", "markFixed"] as const

type ActionType = (typeof validActions)[number]

export async function POST(request: Request) {
  const payload = await request.json()
  const action: ActionType = validActions.includes(payload.action) ? payload.action : "notify"
  const areaCode = payload.areaCode?.trim()
  const substationId = payload.substationId?.trim() || areaCode
  const component: DiagnosisComponentKey =
    [
      "bayLines",
      "transformer",
      "circuitBreaker",
      "busbar",
      "isolator",
      "relay",
      "pmu",
      "gis",
      "battery",
      "environment",
    ].includes(payload.component)
      ? payload.component
      : "bayLines"

  if (!areaCode) {
    return NextResponse.json({ error: "areaCode required" }, { status: 400 })
  }

  const db = getAdminRealtimeDB()
  if (!db) {
    return NextResponse.json({ ok: false, reason: "Realtime DB not configured" }, { status: 200 })
  }

  const entryId = randomUUID()
  const ref = db.ref(`/maintenance/workflows/${entryId}`)
  await ref.set({
    entryId,
    areaCode,
    substationId,
    component,
    action,
    notes: payload.notes ?? "",
    attachments: payload.attachments ?? [],
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true, entryId })
}

