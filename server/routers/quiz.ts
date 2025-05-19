import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  type: string
  question: string
  options: QuizOption[]
  correctAnswer?: string
  points: number
}

export const quizRouter = router({
  startAttempt: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.userId

        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          })
        }

        // Get the topic and quiz data
        const topic = await db.topic.findUnique({
          where: {
            id: input.topicId,
          },
        })

        if (!topic) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Topic not found",
          })
        }

        // Check if user has exceeded allowed attempts
        if (topic.allowedAttempts) {
          const attemptCount = await db.quizAttempt.count({
            where: {
              userId,
              topicId: input.topicId,
            },
          })

          if (attemptCount >= topic.allowedAttempts) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "You have reached the maximum number of attempts for this quiz",
            })
          }
        }

        // Check if user has already started an attempt that's not complete
        const pendingAttempt = await db.quizAttempt.findFirst({
          where: {
            userId,
            topicId: input.topicId,
            answers: { equals: null }, // No answers means it's an in-progress attempt
          },
          orderBy: {
            createdAt: "desc",
          },
        })

        // If there's already a pending attempt, return that
        if (pendingAttempt) {
          return {
            id: pendingAttempt.id,
            startTime: pendingAttempt.createdAt,
            timeLimit: topic.timeLimit,
          }
        }

        // Create a new attempt with null answers
        const attempt = await db.quizAttempt.create({
          data: {
            userId,
            userObjId: ctx.userObjId || "",
            topicId: input.topicId,
            answers: null, // Will be filled when submitting
            score: 0,
            passed: false,
          },
        })

        return {
          id: attempt.id,
          startTime: attempt.createdAt,
          timeLimit: topic.timeLimit,
        }
      } catch (error: any) {
        console.error("Quiz start attempt error:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to start quiz attempt",
        })
      }
    }),

  submitAttempt: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
        answers: z.record(z.any()),
        timeTaken: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.userId

        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          })
        }

        // Get the topic and quiz data
        const topic = await db.topic.findUnique({
          where: {
            id: input.topicId,
          },
        })

        if (!topic) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Topic not found",
          })
        }

        if (!topic.questions) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This topic does not have quiz questions",
          })
        }

        // Parse questions
        const questions = JSON.parse(
          topic.questions as string
        ) as QuizQuestion[]

        // Calculate score
        let totalPoints = 0
        let earnedPoints = 0

        for (const question of questions) {
          totalPoints += question.points || 1

          const userAnswer = input.answers[question.id]

          if (!userAnswer) continue

          if (question.type === "single") {
            // Single choice question - check if selected option is correct
            const selectedOption = question.options.find(
              (option: QuizOption) => option.id === userAnswer
            )
            if (selectedOption && selectedOption.isCorrect) {
              earnedPoints += question.points || 1
            }
          } else if (question.type === "multiple") {
            // Multiple choice - check if all correct options are selected and no incorrect ones
            const correctOptions = question.options
              .filter((option: QuizOption) => option.isCorrect)
              .map((option: QuizOption) => option.id)

            const incorrectOptions = question.options
              .filter((option: QuizOption) => !option.isCorrect)
              .map((option: QuizOption) => option.id)

            // Check if user selected all correct options and no incorrect ones
            const allCorrectSelected = correctOptions.every((id: string) =>
              userAnswer.includes(id)
            )

            const noIncorrectSelected = !userAnswer.some((id: string) =>
              incorrectOptions.includes(id)
            )

            if (allCorrectSelected && noIncorrectSelected) {
              earnedPoints += question.points || 1
            }
          } else if (question.type === "text") {
            // Text answer - simple string comparison
            if (
              question.correctAnswer &&
              userAnswer.toLowerCase().trim() ===
                question.correctAnswer.toLowerCase().trim()
            ) {
              earnedPoints += question.points || 1
            }
          }
        }

        // Calculate percentage score
        const scorePercentage =
          totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0

        // Check if passed
        const passingScore = topic.passingScore || 70
        const passed = scorePercentage >= passingScore

        // Check if there's a pending attempt
        const pendingAttempt = await db.quizAttempt.findFirst({
          where: {
            userId,
            topicId: input.topicId,
            answers: { equals: null },
          },
          orderBy: {
            createdAt: "desc",
          },
        })

        let quizAttempt

        if (pendingAttempt) {
          // Update the pending attempt
          quizAttempt = await db.quizAttempt.update({
            where: {
              id: pendingAttempt.id,
            },
            data: {
              answers: JSON.stringify(input.answers),
              score: scorePercentage,
              passed,
              timeTaken: input.timeTaken,
            },
          })
        } else {
          // Create a new attempt (fallback if no pending attempt exists)
          quizAttempt = await db.quizAttempt.create({
            data: {
              userId,
              userObjId: ctx.userObjId || "",
              topicId: input.topicId,
              answers: JSON.stringify(input.answers),
              score: scorePercentage,
              passed,
              timeTaken: input.timeTaken,
            },
          })
        }

        // If passed, mark topic as completed
        if (passed) {
          await db.userProgressTopic.upsert({
            where: {
              userId_topicId: {
                userId,
                topicId: input.topicId,
              },
            },
            update: {
              isCompleted: true,
            },
            create: {
              userId,
              topicId: input.topicId,
              isCompleted: true,
            },
          })
        }

        return {
          id: quizAttempt.id,
          score: scorePercentage,
          passed,
        }
      } catch (error: any) {
        console.error("Quiz attempt submission error:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to submit quiz attempt",
        })
      }
    }),

  getAttempts: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.userId

        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          })
        }

        const attempts = await db.quizAttempt.findMany({
          where: {
            userId,
            topicId: input.topicId,
            answers: { not: { equals: null } }, // Only completed attempts
          },
          orderBy: {
            createdAt: "desc",
          },
        })

        return attempts
      } catch (error: any) {
        console.error("Get quiz attempts error:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get quiz attempts",
        })
      }
    }),
})
