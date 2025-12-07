"use client"

import { useRouter } from "next/navigation"
import { Trophy, Lock, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ComponentCard } from "@/components/course/component-card"
import { useCourse } from "@/components/course/course-context"
import { courseData } from "@/lib/course-data"
import type { ComponentType } from "@/lib/course-data"

export default function CoursePage() {
  const router = useRouter()
  const { progress, isSimulationUnlocked, getOverallProgress } = useCourse()

  const overallProgress = getOverallProgress()
  const simulationUnlocked = isSimulationUnlocked()

  const handleWatchCourse = (componentId: ComponentType) => {
    router.push(`/resources/${componentId}`)
  }

  const handleTakeQuiz = (componentId: ComponentType) => {
    router.push(`/resources/${componentId}?mode=quiz`)
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Overall Progress Card */}
        <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
                <p className="text-sm text-gray-600">Complete all courses to unlock Real-time Digital Twin Simulation</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-sky-600">{overallProgress}%</div>
                <div className="text-sm text-gray-600">
                  {Object.values(progress).filter((p) => p.status === "completed").length} / {Object.keys(progress).length} Completed
                </div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Simulation Unlock Alert */}
        {simulationUnlocked ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Congratulations! You've unlocked Real-time Digital Twin Simulation.</span>
                <Button
                  onClick={() => router.push("/simulation")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Go to Simulation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-amber-50 border-amber-200">
            <Lock className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Complete all component courses and pass their quizzes to unlock Real-time Digital Twin Simulation.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course) => {
          const componentProgress = progress[course.id]
          return (
            <ComponentCard
              key={course.id}
              course={course}
              progress={componentProgress}
              onWatchCourse={() => handleWatchCourse(course.id)}
              onTakeQuiz={() => handleTakeQuiz(course.id)}
            />
          )
        })}
      </div>

      {/* Course Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Course Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Working principles of each component</li>
                <li>• Operational procedures and best practices</li>
                <li>• Fault identification and troubleshooting</li>
                <li>• Safety protocols and maintenance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Course Structure</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 2 videos per component (Working Principle, Operation)</li>
                <li>• Interactive quiz after completing videos</li>
                <li>• 10-15 questions per quiz</li>
                <li>• 70% passing score required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

