/**
 * Video capture utility for 3D simulation playback
 * Captures canvas frames and creates a 15-second summary video
 */

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"

export interface VideoCaptureOptions {
  canvas: HTMLCanvasElement
  duration: number // seconds
  fps?: number
  onProgress?: (progress: number) => void
}

/**
 * Capture frames from canvas and create video blob
 */
export async function captureVideoFromCanvas({
  canvas,
  duration,
  fps = 30,
  onProgress,
}: VideoCaptureOptions): Promise<Blob> {
  const frames: ImageData[] = []
  const totalFrames = Math.floor(duration * fps)
  const frameInterval = 1000 / fps

  return new Promise((resolve, reject) => {
    let frameCount = 0
    const startTime = Date.now()

    const captureFrame = () => {
      try {
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        frames.push(imageData)

        frameCount++
        const progress = (frameCount / totalFrames) * 100
        onProgress?.(progress)

        if (frameCount < totalFrames) {
          const elapsed = Date.now() - startTime
          const nextFrameTime = frameCount * frameInterval
          const delay = Math.max(0, nextFrameTime - elapsed)
          setTimeout(captureFrame, delay)
        } else {
          // Convert frames to video using MediaRecorder API
          const stream = canvas.captureStream(fps)
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm;codecs=vp9",
            videoBitsPerSecond: 2500000,
          })

          const chunks: Blob[] = []
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data)
            }
          }

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" })
            resolve(blob)
          }

          mediaRecorder.start()
          setTimeout(() => {
            mediaRecorder.stop()
            stream.getTracks().forEach((track) => track.stop())
          }, duration * 1000)
        }
      } catch (error) {
        reject(error)
      }
    }

    // Start capturing
    captureFrame()
  })
}

/**
 * Upload video to Firebase Storage and return download URL
 */
export async function uploadSimulationVideo(
  videoBlob: Blob,
  simulationId: string,
  componentType: string
): Promise<string> {
  const timestamp = Date.now()
  const fileName = `simulations/${componentType}/${simulationId}_${timestamp}.webm`
  const storageRef = ref(storage, fileName)

  try {
    await uploadBytes(storageRef, videoBlob, {
      contentType: "video/webm",
    })

    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    console.error("Error uploading simulation video:", error)
    throw new Error("Failed to upload simulation video to Firebase")
  }
}

/**
 * Capture video from canvas element and upload to Firebase
 */
export async function captureAndUploadSimulationVideo(
  canvas: HTMLCanvasElement,
  simulationId: string,
  componentType: string,
  duration: number = 15,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const videoBlob = await captureVideoFromCanvas({
      canvas,
      duration,
      fps: 30,
      onProgress,
    })

    const downloadURL = await uploadSimulationVideo(videoBlob, simulationId, componentType)
    return downloadURL
  } catch (error) {
    console.error("Error capturing/uploading video:", error)
    throw error
  }
}

