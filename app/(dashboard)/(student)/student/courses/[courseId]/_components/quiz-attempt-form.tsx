"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Preview } from "@/components/preview"
import { trpc } from "@/app/_trpc/client"

// Define the interface for quiz questions and options
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

interface QuizAttemptFormProps {
  topicId: string
  courseId: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore?: number
  allowedAttempts?: number
  userId: string
  attemptId: string
  attemptStartTime: Date
}

// Dynamic form schema that will adapt to the questions
const createFormSchema = (questions: QuizQuestion[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {}

  questions.forEach((question) => {
    const fieldName = `question_${question.id}`

    if (question.type === "single") {
      schemaFields[fieldName] = z
        .string()
        .min(1, { message: "Please select an answer" })
    } else if (question.type === "multiple") {
      schemaFields[fieldName] = z
        .array(z.string())
        .min(1, { message: "Please select at least one answer" })
    } else if (question.type === "text") {
      schemaFields[fieldName] = z
        .string()
        .min(1, { message: "Please provide an answer" })
    }
  })

  return z.object(schemaFields)
}

export const QuizAttemptForm = ({
  topicId,
  courseId,
  questions,
  timeLimit,
  passingScore,
  allowedAttempts,
  userId,
  attemptId,
  attemptStartTime,
}: QuizAttemptFormProps) => {
  const router = useRouter()
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [autoSubmitting, setAutoSubmitting] = useState(false)

  // Calculate initial remaining time
  useEffect(() => {
    if (!timeLimit) return

    // Calculate elapsed time in seconds
    const startTime = new Date(attemptStartTime)
    const now = new Date()
    const elapsedSeconds = Math.floor(
      (now.getTime() - startTime.getTime()) / 1000
    )

    // Calculate remaining time
    const totalSeconds = timeLimit * 60
    const remaining = Math.max(0, totalSeconds - elapsedSeconds)

    setTimeRemaining(remaining)
  }, [timeLimit, attemptStartTime])

  // Create form schema based on questions
  const formSchema = createFormSchema(questions)
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {} as FormValues,
  })

  const submitQuizAttempt = trpc.quiz.submitAttempt.useMutation({
    onSuccess: (data) => {
      toast.success(
        data.passed ? "Quiz passed!" : "Quiz submitted, but you didn't pass."
      )
      router.push(`/student/courses/${courseId}/quiz/${topicId}`)
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit quiz")
      console.error(error)
    },
  })

  const onSubmit = (values: FormValues) => {
    // Calculate time taken based on original time limit and remaining time
    const timeTaken = timeLimit ? timeLimit * 60 - (timeRemaining || 0) : 0

    // Format answers
    const answers: Record<string, any> = {}

    questions.forEach((question) => {
      const fieldName = `question_${question.id}`
      answers[question.id] = values[fieldName as keyof FormValues]
    })

    // Submit attempt
    submitQuizAttempt.mutate({
      topicId,
      answers,
      timeTaken,
    })
  }

  // Setup timer if there's a time limit
  useEffect(() => {
    if (!timeLimit || timeRemaining === null) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (!prev || prev <= 1) {
          // Auto-submit when time runs out
          clearInterval(timer)
          if (!autoSubmitting) {
            setAutoSubmitting(true)
            toast.error("Time's up! Submitting your quiz automatically.")
            form.handleSubmit(onSubmit)()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLimit, timeRemaining, form, onSubmit, autoSubmitting])

  // Format the time remaining for display
  const formattedTimeRemaining = timeRemaining
    ? `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
        .toString()
        .padStart(2, "0")}`
    : null

  const isSubmitting =
    form.formState.isSubmitting || submitQuizAttempt.isLoading || autoSubmitting

  return (
    <div className="rounded-md p-4 shadow">
      {timeLimit && timeRemaining !== null && (
        <div className="bg-secondary mb-6 flex items-center justify-between rounded p-2">
          <span className="font-medium">Time Remaining:</span>
          <span className="text-lg font-bold">
            {formattedTimeRemaining || "0:00"}
          </span>
        </div>
      )}

      {passingScore && (
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Passing score: {passingScore}%
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="rounded-md border p-4">
              <div className="mb-4">
                <h3 className="mb-1 text-lg font-medium">
                  Question {index + 1}{" "}
                  {question.points > 1 && `(${question.points} points)`}
                </h3>
                <div className="text-base">
                  <Preview value={question.question} />
                </div>
              </div>

              {question.type === "single" &&
                question.options &&
                question.options.length > 0 && (
                  <FormField
                    control={form.control}
                    name={`question_${question.id}` as any}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {(question.options as QuizOption[]).map(
                              (option) => (
                                <FormItem
                                  key={option.id}
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={option.id} />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer font-normal">
                                    {option.text}
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              {question.type === "multiple" &&
                question.options &&
                question.options.length > 0 && (
                  <FormField
                    control={form.control}
                    name={`question_${question.id}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Select all that apply</FormLabel>
                        </div>
                        <div className="space-y-2">
                          {(question.options as QuizOption[]).map((option) => (
                            <FormItem
                              key={option.id}
                              className="flex items-center space-x-3 space-y-0 rounded-md border p-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || []
                                    if (checked) {
                                      field.onChange([
                                        ...currentValues,
                                        option.id,
                                      ])
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          (value: string) => value !== option.id
                                        )
                                      )
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">
                                {option.text}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              {question.type === "text" && (
                <FormField
                  control={form.control}
                  name={`question_${question.id}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Type your answer here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {autoSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
