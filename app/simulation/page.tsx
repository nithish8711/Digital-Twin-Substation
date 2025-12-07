"use client"

import { useEffect, Suspense } from "react"
import { useSimulation } from "@/components/simulation/simulation-context"
import { RunSimulationPage } from "@/components/simulation/run-simulation-page"
import { AnalysisPage } from "@/components/simulation/analysis-page"
import { SolutionPage } from "@/components/simulation/solution-page"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, Lock, BookOpen, ArrowRight } from "lucide-react"
import { useCourse } from "@/components/course/course-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function SimulationPageContent() {
  const { activeTab, setActiveTab } = useSimulation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSimulationUnlocked } = useCourse()
  const unlocked = isSimulationUnlocked()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && (tab === "run" || tab === "analysis" || tab === "solution")) {
      setActiveTab(tab)
    }
  }, [searchParams, setActiveTab])

  if (!unlocked) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-amber-100 p-6">
                <Lock className="h-12 w-12 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulation Locked</h2>
                <p className="text-gray-600">
                  Complete all component courses and pass their quizzes to unlock Real-time Digital Twin Simulation.
                </p>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Course Requirements</AlertTitle>
                <AlertDescription className="text-blue-800">
                  You need to complete courses for all 5 components:
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Transformer</li>
                    <li>Current Transformer (CT)</li>
                    <li>Voltage Transformer (VT/PT)</li>
                    <li>Isolator</li>
                    <li>Circuit Breaker</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => router.push("/resources")}
                size="lg"
                className="bg-sky-600 hover:bg-sky-700"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Go to Courses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
      {activeTab === "run" && <RunSimulationPage />}
      {activeTab === "analysis" && <AnalysisPage />}
      {activeTab === "solution" && <SolutionPage />}
    </div>
  )
}

export default function SimulationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      }
    >
      <SimulationPageContent />
    </Suspense>
  )
}

