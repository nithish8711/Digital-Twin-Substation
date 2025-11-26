// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// NOTE:
// - `storageBucket` must be the actual bucket ID (typically `<projectId>.appspot.com`)
//   and NOT the HTTPS download domain (`*.firebasestorage.app`). Using the wrong
//   value here causes Storage operations (upload/getDownloadURL) to hang and
//   eventually fail with `storage/retry-limit-exceeded`.
const firebaseConfig = {
  apiKey: "AIzaSyDAeaXEwDT66UjCe1dqRrHu4cwWoL7vfF4",
  authDomain: "oceanberg-digitaltwin.firebaseapp.com",
  projectId: "oceanberg-digitaltwin",
  storageBucket: "oceanberg-digitaltwin.appspot.com",
  messagingSenderId: "403206405780",
  appId: "1:403206405780:web:6a5581e174f7b084363e81",
  measurementId: "G-5J2SXQ0229",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
    "https://oceanberg-digitaltwin-default-rtdb.firebaseio.com",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Analytics (only in browser)
if (typeof window !== "undefined") {
  getAnalytics(app)
}

export default app



