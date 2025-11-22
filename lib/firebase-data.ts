// Firebase data service - fetches from Firestore instead of dummy data
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore"
import { db } from "./firebase"
import type { DummySubstation } from "./dummy-data"
import { DUMMY_SUBSTATIONS } from "./dummy-data"

// Fetch all substations from Firebase
export async function getAllSubstationsFromFirebase(): Promise<DummySubstation[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "substations"))
    const substations: DummySubstation[] = []
    
    querySnapshot.forEach((docSnapshot) => {
      substations.push({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as DummySubstation)
    })
    
    return substations.length > 0 ? substations : DUMMY_SUBSTATIONS
  } catch (error) {
    console.error("Error fetching from Firebase, using dummy data:", error)
    return DUMMY_SUBSTATIONS
  }
}

// Fetch substation by ID from Firebase
export async function getSubstationByIdFromFirebase(id: string): Promise<DummySubstation | undefined> {
  try {
    const docRef = doc(db, "substations", id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as DummySubstation
    }
    
    // Fallback to dummy data
    return DUMMY_SUBSTATIONS.find((s) => s.id === id)
  } catch (error) {
    console.error("Error fetching from Firebase, using dummy data:", error)
    return DUMMY_SUBSTATIONS.find((s) => s.id === id)
  }
}

// Export both functions for use in components
export { getAllSubstationsFromFirebase as getAllSubstations }
export { getSubstationByIdFromFirebase as getSubstationById }



