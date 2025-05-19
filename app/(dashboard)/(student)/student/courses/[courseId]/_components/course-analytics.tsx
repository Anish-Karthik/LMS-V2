"use client"

import { useMemo } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Award, BarChart, Clock, XCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseAnalytics {
  courseId: string
  courseName: string
  // Completion stats
  completionPercentage: number
  completedModules: number
  totalModules: number
  purchaseDate: Date
  // Quiz stats
  quizAttempts: {
    topicId: string
    topicTitle: string
    attempts: {
      id: string
      score: number
      passed: boolean
      timeTaken?: number | null
      createdAt: Date
    }[]
  }[]
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, val) => acc + val, 0)
  return sum / numbers.length
}

export function CourseAnalytics({ analytics }: { analytics: CourseAnalytics }) {
  // Calculate overall quiz stats
  const quizStats = useMemo(() => {
    // All quiz scores across all topics
    const allScores: number[] = []
    // Failed attempt count
    let failedAttempts = 0
    // Average time taken per quiz (in seconds)
    const timeTaken: number[] = []
    // Pass rate percentage
    let passedAttempts = 0
    let totalAttempts = 0

    analytics.quizAttempts.forEach((topic) => {
      topic.attempts.forEach((attempt) => {
        allScores.push(attempt.score)
        if (!attempt.passed) failedAttempts++
        if (attempt.passed) passedAttempts++
        if (attempt.timeTaken) timeTaken.push(attempt.timeTaken)
        totalAttempts++
      })
    })

    // Calculate average attempts needed to pass
    const attemptsToPass = analytics.quizAttempts.map((topic) => {
      const firstPassIndex = topic.attempts.findIndex(
        (attempt) => attempt.passed
      )
      return firstPassIndex >= 0 ? firstPassIndex + 1 : topic.attempts.length
    })

    return {
      averageScore: calculateAverage(allScores).toFixed(1),
      failedAttempts,
      averageTimeTaken: calculateAverage(timeTaken),
      passRate: totalAttempts
        ? ((passedAttempts / totalAttempts) * 100).toFixed(1)
        : "0",
      averageAttemptsToPass: calculateAverage(attemptsToPass).toFixed(1),
    }
  }, [analytics.quizAttempts])

  const timeElapsed = formatDistanceToNow(analytics.purchaseDate)

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Course Progress
              </CardTitle>
              <BarChart className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.completionPercentage.toFixed(0)}%
              </div>
              <Progress
                value={analytics.completionPercentage}
                className="mt-2 h-2"
              />
              <p className="text-muted-foreground mt-2 text-xs">
                {analytics.completedModules} of {analytics.totalModules} modules
                completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Time Enrolled
              </CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timeElapsed}</div>
              <p className="text-muted-foreground mt-2 text-xs">
                Since {analytics.purchaseDate.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quiz Performance
              </CardTitle>
              <Award className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quizStats.averageScore}%
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Average score across all quizzes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Failed Attempts
              </CardTitle>
              <XCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quizStats.failedAttempts}
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Total quiz attempts that didn't pass
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Average Quiz Score
                </span>
                <span className="font-medium">{quizStats.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Quiz Pass Rate
                </span>
                <span className="font-medium">{quizStats.passRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Avg. Attempts to Pass
                </span>
                <span className="font-medium">
                  {quizStats.averageAttemptsToPass}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Avg. Time per Quiz
                </span>
                <span className="font-medium">
                  {quizStats.averageTimeTaken
                    ? `${Math.floor(
                        quizStats.averageTimeTaken / 60
                      )}m ${Math.floor(quizStats.averageTimeTaken % 60)}s`
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="quizzes" className="mt-4 space-y-4">
        {analytics.quizAttempts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                You haven't attempted any quizzes yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          analytics.quizAttempts.map((quizTopic) => (
            <Card key={quizTopic.topicId}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {quizTopic.topicTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizTopic.attempts.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">
                            Best Score
                          </span>
                          <span className="font-medium">
                            {Math.max(
                              ...quizTopic.attempts.map((a) => a.score)
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">
                            Attempts
                          </span>
                          <span className="font-medium">
                            {quizTopic.attempts.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">
                            Status
                          </span>
                          <span
                            className={`font-medium ${
                              quizTopic.attempts.some((a) => a.passed)
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {quizTopic.attempts.some((a) => a.passed)
                              ? "Passed"
                              : "Not Passed"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/student/courses/${analytics.courseId}/quiz/${quizTopic.topicId}`}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View Quiz Details
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No attempts yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
