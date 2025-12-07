"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Video } from "@/lib/course-data"

interface VideoPlayerProps {
  video: Video
  onProgress?: (progress: number) => void
  onComplete?: () => void
  initialProgress?: number
  className?: string
}

export function VideoPlayer({
  video,
  onProgress,
  onComplete,
  initialProgress = 0,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
      if (initialProgress > 0) {
        videoElement.currentTime = (initialProgress / 100) * videoElement.duration
        setCurrentTime(videoElement.currentTime)
      }
    }

    const handleTimeUpdate = () => {
      const progress = (videoElement.currentTime / videoElement.duration) * 100
      setCurrentTime(videoElement.currentTime)

      if (onProgress) {
        onProgress(progress)
      }

      // Check if video is complete (95% threshold)
      if (progress >= 95 && !isCompleted) {
        setIsCompleted(true)
        if (onComplete) {
          onComplete()
        }
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setIsCompleted(true)
      if (onComplete) {
        onComplete()
      }
    }

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [initialProgress, onProgress, onComplete, isCompleted])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoElement = videoRef.current
    if (!videoElement || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newVolume = parseFloat(e.target.value)
    videoElement.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoElement.requestFullscreen()
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={cn("relative w-full bg-black rounded-lg overflow-hidden", className)}>
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
          <iframe
            src={video.url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <video
            ref={videoRef}
            src={video.url}
            className="w-full h-full"
            poster={video.thumbnail}
            onClick={togglePlay}
          />
        )}

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </div>
        )}

        {/* Custom Controls Overlay (for non-YouTube videos) */}
        {!video.url.includes("youtube.com") && !video.url.includes("youtu.be") && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-16 w-16 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Custom Controls (for non-YouTube videos) */}
      {!video.url.includes("youtube.com") && !video.url.includes("youtu.be") && (
        <div className="bg-gray-900 text-white p-4 space-y-3">
          {/* Progress Bar */}
          <div
            className="relative h-2 bg-gray-700 rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute h-full w-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progressPercentage}%` }}
            >
              <div className="h-4 w-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-gray-800"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-gray-800"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              <span className="text-sm text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-gray-800"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Video Info */}
      <div className="p-4 bg-white border-t">
        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600">{video.description}</p>
        {duration > 0 && (
          <p className="text-xs text-gray-500 mt-2">Duration: {formatTime(duration)}</p>
        )}
      </div>
    </div>
  )
}

