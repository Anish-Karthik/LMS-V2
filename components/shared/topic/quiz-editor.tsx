"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Topic } from "@prisma/client"
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  PlusCircle,
  Trash2,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { cn } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/app/_trpc/client"

interface QuizEditorProps {
  topicId: string
  initialData: Topic
}

// Define the question type options
type QuestionType = "single" | "multiple" | "text"

// Define the schema for a question
const questionSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["single", "multiple", "text"]),
  question: z.string().min(1, { message: "Question is required" }),
  options: z
    .array(
      z.object({
        id: z.string().optional(),
        text: z.string().min(1, { message: "Option text is required" }),
        isCorrect: z.boolean().default(false),
      })
    )
    .optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  points: z.coerce.number().int().positive().default(1),
})

// Define the form schema
const formSchema = z.object({
  questions: z.array(questionSchema),
})

export const QuizEditor = ({ topicId, initialData }: QuizEditorProps) => {
  const [isLoading, setIsLoading] = useState(false)

  // Parse the initial quiz questions from JSON if they exist
  const parseInitialQuestions = () => {
    if (initialData.questions) {
      try {
        return JSON.parse(initialData.questions as string)
      } catch (e) {
        console.error("Failed to parse quiz questions:", e)
      }
    }
    return []
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: parseInitialQuestions() || [],
    },
  })

  const {
    fields: questions,
    append,
    remove,
    move,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  })

  const updateQuizMutation = trpc.topic.updateQuizQuestions.useMutation({
    onSuccess: () => {
      toast.success("Quiz questions saved successfully")
      setIsLoading(false)
    },
    onError: (error) => {
      toast.error("Failed to save quiz questions")
      console.error(error)
      setIsLoading(false)
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    updateQuizMutation.mutate({
      id: topicId,
      questions: JSON.stringify(values.questions),
    })
  }

  const addQuestion = (type: QuestionType) => {
    const newQuestion = {
      id: `question_${Date.now()}`,
      type: type,
      question: "",
      options:
        type !== "text"
          ? [
              { id: `option_${Date.now()}_1`, text: "", isCorrect: false },
              { id: `option_${Date.now()}_2`, text: "", isCorrect: false },
            ]
          : undefined,
      correctAnswer: type === "text" ? "" : undefined,
      explanation: "",
      points: 1,
    }
    append(newQuestion as any)
  }

  const addOption = (questionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`) || []
    form.setValue(`questions.${questionIndex}.options`, [
      ...options,
      {
        id: `option_${Date.now()}_${options.length + 1}`,
        text: "",
        isCorrect: false,
      },
    ])
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`) || []
    if (options.length <= 2) {
      toast.error("A question must have at least 2 options")
      return
    }
    const newOptions = [...options]
    newOptions.splice(optionIndex, 1)
    form.setValue(`questions.${questionIndex}.options`, newOptions)
  }

  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= questions.length) return
    move(index, newIndex)
  }

  const handleSingleChoiceChange = (
    questionIndex: number,
    optionIndex: number
  ) => {
    const options = form.getValues(`questions.${questionIndex}.options`) || []

    // Set all options to false first
    options.forEach((_, idx) => {
      form.setValue(
        `questions.${questionIndex}.options.${idx}.isCorrect`,
        false
      )
    })

    // Set the selected option to true
    form.setValue(
      `questions.${questionIndex}.options.${optionIndex}.isCorrect`,
      true
    )
  }

  return (
    <div className="bg-secondary mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <h2 className="text-xl">Quiz Questions</h2>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addQuestion("single")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Single Choice
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addQuestion("multiple")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Multiple Choice
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addQuestion("text")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Text Answer
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {questions.length === 0 && (
            <div className="text-muted-foreground rounded-md border border-dashed py-10 text-center">
              No questions yet. Add a question to get started.
            </div>
          )}

          {questions.map((question, questionIndex) => {
            const questionType = form.watch(`questions.${questionIndex}.type`)

            return (
              <div
                key={question.id}
                className="bg-card relative rounded-md border p-4"
              >
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveQuestion(questionIndex, "up")}
                    disabled={questionIndex === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveQuestion(questionIndex, "down")}
                    disabled={questionIndex === questions.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(questionIndex)}
                  >
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-9">
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question {questionIndex + 1}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your question here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.points`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Points</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {questionType === "single" && (
                  <div className="mt-4">
                    <FormLabel>Options (Select one correct answer)</FormLabel>
                    <div className="mt-2 space-y-3">
                      {form
                        .watch(`questions.${questionIndex}.options`)
                        ?.map((option, optionIndex) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <input
                                      type="radio"
                                      className="text-primary border-primary focus:ring-primary h-4 w-4 rounded-full"
                                      checked={field.value}
                                      onChange={() =>
                                        handleSingleChoiceChange(
                                          questionIndex,
                                          optionIndex
                                        )
                                      }
                                      aria-label={`Select as correct answer for option ${
                                        optionIndex + 1
                                      }`}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.options.${optionIndex}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addOption(questionIndex)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                )}

                {questionType === "multiple" && (
                  <div className="mt-4">
                    <FormLabel>Options (Select all correct answers)</FormLabel>
                    <div className="mt-2 space-y-3">
                      {form
                        .watch(`questions.${questionIndex}.options`)
                        ?.map((option, optionIndex) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      aria-label={`Mark as correct answer for option ${
                                        optionIndex + 1
                                      }`}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.options.${optionIndex}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addOption(questionIndex)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                )}

                {questionType === "text" && (
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.correctAnswer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correct Answer</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the correct answer"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The student's answer must match this text exactly.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.explanation`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Explanation (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explain why this answer is correct"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be shown to students after they answer the
                        question.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )
          })}

          <Button type="submit" disabled={isLoading} className="mt-6">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Questions
          </Button>
        </form>
      </Form>
    </div>
  )
}
