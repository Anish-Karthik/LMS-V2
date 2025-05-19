"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, ListChecks, Play } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TRPCProvider from "@/app/_trpc/Provider"
import { trpc } from "@/app/_trpc/client"

interface QuizStartFormProps {
  topicId: string
  courseId: string
  timeLimit?: number
  passingScore?: number
  allowedAttempts?: number
  attemptsUsed: number
  description: string
}

// Inner component that uses TRPC
const QuizStartFormInner = ({
  topicId,
  courseId,
  timeLimit,
  passingScore,
  allowedAttempts,
  attemptsUsed,
  description,
}: QuizStartFormProps) => {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const startQuizAttempt = trpc.quiz.startAttempt.useMutation({
    onSuccess: () => {
      toast.success("Quiz started!")
      router.push(`/student/courses/${courseId}/quiz/${topicId}/attempt`)
    },
    onError: (error) => {
      toast.error(error.message || "Failed to start quiz")
      setIsStarting(false)
    },
  })

  const handleStartQuiz = () => {
    setIsStarting(true)
    startQuizAttempt.mutate({ topicId })
  }

  return (
    <div className="rounded-md p-4 shadow">
      <div className="mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Quiz Information</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {timeLimit && (
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2 py-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <CardTitle className="text-sm">Time Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{timeLimit} minutes</p>
              </CardContent>
            </Card>
          )}

          {passingScore && (
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2 py-2">
                <ListChecks className="text-muted-foreground h-4 w-4" />
                <CardTitle className="text-sm">Passing Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{passingScore}%</p>
              </CardContent>
            </Card>
          )}

          {allowedAttempts && (
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2 py-2">
                <Play className="text-muted-foreground h-4 w-4" />
                <CardTitle className="text-sm">Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {attemptsUsed} / {allowedAttempts}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6">
          <Button
            onClick={handleStartQuiz}
            className="w-full"
            size="lg"
            disabled={
              isStarting ||
              (allowedAttempts ? attemptsUsed >= allowedAttempts : false)
            }
          >
            {isStarting ? "Starting..." : "Start Quiz"}
          </Button>

          {allowedAttempts && attemptsUsed >= allowedAttempts && (
            <p className="mt-2 text-center text-sm text-red-500">
              You have used all allowed attempts for this quiz.
            </p>
          )}

          <p className="text-muted-foreground mt-2 text-center text-sm">
            Once you start, the timer will begin and cannot be paused.
          </p>
        </div>
      </div>
    </div>
  )
}

// Wrapper component that provides TRPC context
export const QuizStartForm = (props: QuizStartFormProps) => {
  return (
    <TRPCProvider>
      <QuizStartFormInner {...props} />
    </TRPCProvider>
  )
}
