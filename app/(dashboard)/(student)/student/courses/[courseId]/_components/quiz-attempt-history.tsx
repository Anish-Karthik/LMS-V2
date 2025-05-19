"use client"

import { useState } from "react"
import { QuizAttempt } from "@prisma/client"
import { Check, Clock, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Preview } from "@/components/preview"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  type: "single" | "multiple" | "text"
  question: string
  options?: QuizOption[]
  correctAnswer?: string
  explanation?: string
  points: number
}

interface QuizAttemptHistoryProps {
  attempts: QuizAttempt[]
  questions: QuizQuestion[]
}

export const QuizAttemptHistory = ({
  attempts,
  questions,
}: QuizAttemptHistoryProps) => {
  const [selectedAttempt, setSelectedAttempt] = useState<string | null>(
    attempts.length > 0 ? attempts[0].id : null
  )

  // Get the selected attempt
  const currentAttempt = attempts.find(
    (attempt) => attempt.id === selectedAttempt
  )

  if (!currentAttempt) {
    return <div>No attempt data available.</div>
  }

  // Parse the answers from the attempt
  const attemptAnswers = JSON.parse(currentAttempt.answers as string) as Record<
    string,
    any
  >

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {attempts.map((attempt) => (
          <Badge
            key={attempt.id}
            variant={attempt.id === selectedAttempt ? "default" : "outline"}
            className="hover:bg-secondary cursor-pointer"
            onClick={() => setSelectedAttempt(attempt.id)}
          >
            Attempt {new Date(attempt.createdAt).toLocaleDateString()} (
            {attempt.score}%) {attempt.passed && "✓"}
          </Badge>
        ))}
      </div>

      <div className="rounded-md border p-4">
        <div className="mb-4 flex flex-wrap gap-4">
          <div>
            <h3 className="text-muted-foreground text-sm font-medium">Score</h3>
            <p className="text-xl font-bold">{currentAttempt.score}%</p>
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm font-medium">
              Result
            </h3>
            <p className="flex items-center text-xl font-bold">
              {currentAttempt.passed ? (
                <>
                  <Check className="mr-1 h-5 w-5 text-green-500" />
                  Passed
                </>
              ) : (
                <>
                  <X className="mr-1 h-5 w-5 text-red-500" />
                  Failed
                </>
              )}
            </p>
          </div>
          {currentAttempt.timeTaken && (
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">
                Time
              </h3>
              <p className="flex items-center text-xl font-bold">
                <Clock className="text-muted-foreground mr-1 h-5 w-5" />
                {Math.floor(currentAttempt.timeTaken / 60)}m{" "}
                {currentAttempt.timeTaken % 60}s
              </p>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <h3 className="mb-2 font-medium">Quiz Results</h3>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => {
            const userAnswer = attemptAnswers[question.id]
            const isCorrect = checkIfAnswerIsCorrect(question, userAnswer)

            return (
              <AccordionItem key={question.id} value={question.id}>
                <AccordionTrigger className="flex items-start">
                  <div className="flex items-start">
                    <span
                      className={`mr-2 font-medium ${
                        isCorrect ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </span>
                    <div className="text-left">
                      <span className="font-medium">Question {index + 1}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        ({question.points}{" "}
                        {question.points === 1 ? "point" : "points"})
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-2">
                    <div className="mb-4">
                      <Preview value={question.question} />
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-medium">Your Answer:</h4>
                      {renderUserAnswer(question, userAnswer)}
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-medium">
                        Correct Answer:
                      </h4>
                      {renderCorrectAnswer(question)}
                    </div>

                    {question.explanation && (
                      <div className="bg-muted mt-4 rounded-md p-3">
                        <h4 className="mb-1 text-sm font-medium">
                          Explanation:
                        </h4>
                        <Preview value={question.explanation} />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

// Helper function to check if an answer is correct
function checkIfAnswerIsCorrect(
  question: QuizQuestion,
  userAnswer: any
): boolean {
  if (!userAnswer) return false

  if (question.type === "single") {
    const correctOption = question.options?.find((option) => option.isCorrect)
    return correctOption?.id === userAnswer
  }

  if (question.type === "multiple") {
    const correctOptionIds =
      question.options
        ?.filter((option) => option.isCorrect)
        .map((option) => option.id) || []

    const incorrectOptionIds =
      question.options
        ?.filter((option) => !option.isCorrect)
        .map((option) => option.id) || []

    // Check if user selected all correct options and no incorrect ones
    const allCorrectSelected = correctOptionIds.every((id) =>
      userAnswer.includes(id)
    )
    const noIncorrectSelected = !userAnswer.some((id) =>
      incorrectOptionIds.includes(id)
    )

    return allCorrectSelected && noIncorrectSelected
  }

  if (question.type === "text") {
    return (
      question.correctAnswer?.toLowerCase().trim() ===
      userAnswer.toLowerCase().trim()
    )
  }

  return false
}

// Helper function to render user's answer
function renderUserAnswer(question: QuizQuestion, userAnswer: any) {
  if (!userAnswer)
    return <p className="text-muted-foreground">No answer provided</p>

  if (question.type === "single") {
    const selected = question.options?.find(
      (option) => option.id === userAnswer
    )
    return (
      <p
        className={`${selected?.isCorrect ? "text-green-500" : "text-red-500"}`}
      >
        {selected?.text || "Invalid option"}
      </p>
    )
  }

  if (question.type === "multiple") {
    const selectedOptions =
      question.options?.filter((option) => userAnswer.includes(option.id)) || []

    return (
      <ul className="list-disc pl-4">
        {selectedOptions.length === 0 ? (
          <li className="text-muted-foreground">No options selected</li>
        ) : (
          selectedOptions.map((option) => (
            <li
              key={option.id}
              className={`${
                option.isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {option.text}
            </li>
          ))
        )}
      </ul>
    )
  }

  if (question.type === "text") {
    const isCorrect =
      question.correctAnswer?.toLowerCase().trim() ===
      userAnswer.toLowerCase().trim()
    return (
      <p className={`${isCorrect ? "text-green-500" : "text-red-500"}`}>
        {userAnswer}
      </p>
    )
  }

  return <p className="text-muted-foreground">Unknown answer type</p>
}

// Helper function to render the correct answer
function renderCorrectAnswer(question: QuizQuestion) {
  if (question.type === "single") {
    const correctOption = question.options?.find((option) => option.isCorrect)
    return (
      <p className="text-green-500">
        {correctOption?.text || "No correct answer defined"}
      </p>
    )
  }

  if (question.type === "multiple") {
    const correctOptions =
      question.options?.filter((option) => option.isCorrect) || []

    return (
      <ul className="list-disc pl-4">
        {correctOptions.length === 0 ? (
          <li className="text-muted-foreground">No correct options defined</li>
        ) : (
          correctOptions.map((option) => (
            <li key={option.id} className="text-green-500">
              {option.text}
            </li>
          ))
        )}
      </ul>
    )
  }

  if (question.type === "text") {
    return (
      <p className="text-green-500">
        {question.correctAnswer || "No correct answer defined"}
      </p>
    )
  }

  return <p className="text-muted-foreground">Unknown question type</p>
}
