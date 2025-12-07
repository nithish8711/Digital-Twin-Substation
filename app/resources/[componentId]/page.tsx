"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { ArrowLeft, Play, FileQuestion, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/course/video-player"
import { QuizEngine } from "@/components/course/quiz-engine"
import { useCourse } from "@/components/course/course-context"
import { courseData, getRandomQuizQuestions } from "@/lib/course-data"
import type { ComponentType, VideoType, QuizQuestion } from "@/lib/course-data"
import { Loader2 } from "lucide-react"

function ComponentCourseContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { progress, updateVideoProgress, markVideoComplete, submitQuiz } = useCourse()
  
  const componentId = (params?.componentId as string) as ComponentType | null
  const mode = searchParams?.get("mode") || "videos"
  
  const [showQuiz, setShowQuiz] = useState(mode === "quiz")
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  const course = componentId ? courseData.find((c) => c.id === componentId) : null
  const componentProgress = componentId ? progress[componentId] : null

  useEffect(() => {
    if (componentId && course) {
      // Generate quiz questions when component is loaded
      const questions = getRandomQuizQuestions(componentId, 12)
      setQuizQuestions(questions)
    }
  }, [componentId])

  if (!componentId || !course || !componentProgress) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Component not found</p>
          <Button onClick={() => router.push("/resources")}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  const handleVideoProgress = (videoId: string, progressValue: number) => {
    updateVideoProgress(componentId, videoId, progressValue)
  }

  const handleVideoComplete = (videoId: string) => {
    markVideoComplete(componentId, videoId)
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    submitQuiz(componentId, score, passed)
    setShowQuiz(false)
  }

  const allVideosWatched = componentProgress.videos.length >= course.videos.length &&
    componentProgress.videos.every((v) => v.watched)

  const canTakeQuiz = allVideosWatched || componentProgress.quizAttempts > 0

  // Group videos by type
  const videosByType: Record<VideoType, typeof course.videos> = {
    workingPrinciple: [],
    operation: [],
    faults: [],
    safety: [],
  }

  course.videos.forEach((video) => {
    videosByType[video.type].push(video)
  })

  const getVideoProgress = (videoId: string) => {
    const videoProgress = componentProgress.videos.find((v) => v.videoId === videoId)
    return videoProgress?.progress || 0
  }

  const isVideoWatched = (videoId: string) => {
    const videoProgress = componentProgress.videos.find((v) => v.videoId === videoId)
    return videoProgress?.watched || false
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/resources")}
            className="shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-4xl">{course.icon}</span>
              {course.name}
            </h1>
            <p className="text-gray-600 mt-1">{course.description}</p>
          </div>
        </div>
        {componentProgress.quizPassed && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-2">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Course Completed
          </Badge>
        )}
      </div>

      {/* Main Content */}
      {showQuiz && canTakeQuiz ? (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quiz: {course.name}</CardTitle>
              <p className="text-gray-600">
                Answer the following questions to test your knowledge. You need 70% to pass.
              </p>
            </CardHeader>
            <CardContent>
              {quizQuestions.length > 0 ? (
                <QuizEngine
                  questions={quizQuestions}
                  onComplete={handleQuizComplete}
                  passingScore={70}
                />
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sky-600" />
                  <p className="text-gray-600">Loading quiz questions...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Tabs defaultValue="workingPrinciple" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workingPrinciple">Working Principle</TabsTrigger>
            <TabsTrigger value="operation">Operation</TabsTrigger>
          </TabsList>

          {Object.entries(videosByType).filter(([type]) => type === "workingPrinciple" || type === "operation").map(([type, videos]) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {videos.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No videos available for this category.
                  </CardContent>
                </Card>
              ) : (
                videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {video.title}
                            {isVideoWatched(video.id) && (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                        </div>
                        {isVideoWatched(video.id) && (
                          <Badge className="bg-green-100 text-green-700">Completed</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <VideoPlayer
                        video={video}
                        initialProgress={getVideoProgress(video.id)}
                        onProgress={(progress) => handleVideoProgress(video.id, progress)}
                        onComplete={() => handleVideoComplete(video.id)}
                      />
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Quiz Button */}
      {!showQuiz && (
        <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {allVideosWatched ? "Ready to take the quiz?" : "Complete all videos to unlock the quiz"}
                </h3>
                <p className="text-sm text-gray-600">
                  {allVideosWatched
                    ? "Test your knowledge with our interactive quiz. Pass with 70% to complete this course."
                    : `Watch ${course.videos.length - componentProgress.videos.filter((v) => v.watched).length} more video(s) to unlock the quiz.`}
                </p>
              </div>
              <Button
                onClick={() => setShowQuiz(true)}
                disabled={!canTakeQuiz}
                size="lg"
                className={canTakeQuiz ? "bg-sky-600 hover:bg-sky-700" : ""}
              >
                {canTakeQuiz ? (
                  <>
                    <FileQuestion className="h-5 w-5 mr-2" />
                    Take Quiz
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Locked
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ComponentCoursePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        </div>
      }
    >
      <ComponentCourseContent />
    </Suspense>
  )
}

