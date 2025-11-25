/**
 * API route to migrate dummy data to Firebase
 * POST /api/migrate
 */

import { NextResponse } from "next/server"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
// @ts-ignore - Importing for migration only
import { DUMMY_SUBSTATIONS } from "@/lib/dummy-data"

export async function POST() {
  try {
    console.log("Starting migration of dummy data to Firebase...")

    // Check if data already exists
    const existingDocs = await getDocs(collection(db, "substations"))
    if (existingDocs.size > 0) {
      return NextResponse.json({
        success: false,
        error: `Found ${existingDocs.size} existing substations. Migration skipped to avoid duplicates.`,
      })
    }

    let successCount = 0
    let skippedCount = 0

    // Add each dummy substation to Firebase
    for (const substation of DUMMY_SUBSTATIONS) {
      try {
        // Check if substation with same code already exists
        const q = query(
          collection(db, "substations"),
          where("master.substationCode", "==", substation.master.substationCode)
        )
        const existing = await getDocs(q)

        if (existing.empty) {
          // Remove the id field as Firebase will generate it
          const { id, ...substationData } = substation
          const docRef = await addDoc(collection(db, "substations"), {
            ...substationData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          console.log(`✓ Added substation: ${substation.master.name} (ID: ${docRef.id})`)
          successCount++
        } else {
          console.log(`⊘ Skipped (already exists): ${substation.master.name}`)
          skippedCount++
        }
      } catch (error) {
        console.error(`✗ Error adding substation ${substation.master.name}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed! Added ${successCount} substations. ${skippedCount} skipped.`,
    })
  } catch (error: any) {
    console.error("Migration error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Migration failed" },
      { status: 500 }
    )
  }
}
