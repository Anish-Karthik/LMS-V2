import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const userRouter = router({
  get: publicProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input: userId } = opts
      const userInfo = await getUser(userId)
      return userInfo
    } catch (error: any) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
    }
  }),
  getAll: publicProcedure.query(async () => {
    try {
      const users = await db.user.findMany()
      return users
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to get users",
      })
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        phoneNo: z.string(),
        name: z.string(),
        image: z.string(),
        gender: z.string().optional(),
        dob: z.coerce.date().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        email: z.string().optional(),
        employmentStatus: z.string().optional(),
        howDidHear: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!input.userId)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User id is required",
          })
        const user = await db.user.findFirst({
          where: {
            userId: input.userId,
          },
        })
        if (user)
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          })
        await db.user.create({
          data: {
            userId: input.userId,
            role: "user",
            email: input.email!,
            phoneNo: input.phoneNo,
            image: input.image,
            name: input.name,
            gender: input.gender?.toLowerCase(),
            dob: input.dob!,
            country: input.country!,
            state: input.state,
            city: input.city,
            employmentStatus: input.employmentStatus,
            howDidHear: input.howDidHear,
            isBanned: false,
            referralBonus: 0,
            referralCount: 0,
          },
        })
        return { message: "User created successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to create user",
        })
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        phoneNo: z.string().optional(),
        name: z.string().optional(),
        image: z.string().optional(),
        gender: z.string().optional(),
        dob: z.coerce.date().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        email: z.string().optional(),
        employmentStatus: z.string().optional(),
        howDidHear: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!input.userId)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User id is required",
          })
        await db.user.update({
          where: {
            userId: input.userId,
          },
          data: {
            phoneNo: input.phoneNo,
            image: input.image,
            name: input.name,
            gender: input.gender,
            dob: input.dob,
            country: input.country,
            state: input.state,
            city: input.city,
          },
        })

        return { message: "User updated successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user",
        })
      }
    }),

  ban: publicProcedure.input(z.string()).mutation(async ({ input: userId }) => {
    try {
      await db.user.update({
        where: {
          userId,
        },
        data: {
          isBanned: true,
        },
      })
      return { message: "User banned successfully", success: true }
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to ban user",
      })
    }
  }),

  unBan: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
      try {
        await db.user.update({
          where: {
            userId,
          },
          data: {
            isBanned: false,
          },
        })
        return { message: "User unbanned successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to unban user",
        })
      }
    }),

  toTeacher: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
      try {
        const user = (await getUser(userId))!
        await db.user.update({
          where: {
            userId,
          },
          data: {
            role: "teacher",
          },
        })
        await db.teacher.upsert({
          where: {
            userId,
          },
          update: {},
          create: {
            userId,
            userObjId: user.id,
          },
        })
        if (user.role === "admin")
          await db.admin.delete({
            where: {
              userId,
            },
          })
        return { message: "User role updated to teacher", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),

  toAdmin: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
      try {
        const user = (await getUser(userId))!
        await db.user.update({
          where: {
            userId,
          },
          data: {
            role: "admin",
          },
        })
        await db.admin.upsert({
          where: {
            userId,
          },
          update: {},
          create: {
            userId,
            userObjId: user.id,
          },
        })
        if (user.role === "teacher")
          await db.teacher.delete({
            where: {
              userId,
            },
          })
        return { message: "User role updated to admin", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),

  toUser: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
      try {
        const user = (await getUser(userId))!
        await db.user.update({
          where: {
            userId,
          },
          data: {
            role: "user",
          },
        })
        if (user.role === "teacher")
          await db.teacher.delete({
            where: {
              userId,
            },
          })
        if (user.role === "admin")
          await db.admin.delete({
            where: {
              userId,
            },
          })
        return { message: "User role updated to user", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),
  purchasedCourses: publicProcedure
    .input(z.string())
    .query(async ({ input: userId }) => {
      try {
        const courses = await db.user.findUnique({
          where: {
            userId,
          },
          select: {
            purchases: {
              select: {
                course: true,
              },
            },
          },
        })
        if (!courses)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No courses found",
          })
        const coursesPurchased = courses.purchases.map(
          (purchase) => purchase.course
        )

        return coursesPurchased
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get purchased courses",
        })
      }
    }),
  calculateCourseProgress: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { userId, courseId } = input
        const allTopics = await db.user.findUnique({
          where: {
            userId,
          },
          select: {
            purchases: {
              where: {
                courseId,
              },
              select: {
                Batch: {
                  select: {
                    chapters: {
                      select: {
                        topics: {
                          select: {
                            userProgressTopic: {
                              select: {
                                isCompleted: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        const totalModules = allTopics?.purchases[0].Batch?.chapters
          ?.map((ch) =>
            ch.topics.map((topic) =>
              topic.userProgressTopic.map((progress) => progress.isCompleted)
            )
          )
          .flat()
          .flatMap((x) => x)
        console.log(totalModules)
        if (!totalModules || !totalModules.length)
          return {
            progress: 0,
            completedModules: 0,
            totalModules: 0,
          }
        const completedModules = totalModules.filter((x) => x === true)
        const progress = (completedModules.length / totalModules.length) * 100
        return {
          progress,
          completedModules: completedModules.length,
          totalModules: totalModules.length,
        }
        //
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get course progress",
        })
      }
    }),
  getCourseAnalytics: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { userId, courseId } = input

        // Get course progress
        const progressResult = await db.user.findUnique({
          where: {
            userId,
          },
          select: {
            purchases: {
              where: {
                courseId,
              },
              select: {
                createdAt: true,
                Batch: {
                  select: {
                    chapters: {
                      select: {
                        topics: {
                          select: {
                            id: true,
                            userProgressTopic: {
                              where: {
                                userId,
                              },
                              select: {
                                isCompleted: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        // Get the course chapters directly (for self-paced courses)
        const courseChapters = await db.chapter.findMany({
          where: {
            courseId,
            isPublished: true,
          },
          select: {
            topics: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
                userProgressTopic: {
                  where: {
                    userId,
                  },
                  select: {
                    isCompleted: true,
                  },
                },
              },
            },
          },
        })

        // Get all topics, either from batch or directly from course
        let allTopics: {
          id: string
          userProgressTopic: { isCompleted: boolean }[]
        }[] = []

        if (progressResult?.purchases[0]?.Batch) {
          // For batch-based courses
          allTopics = progressResult.purchases[0].Batch.chapters.flatMap(
            (ch) => ch.topics
          )
        } else {
          // For self-paced courses
          allTopics = courseChapters.flatMap((ch) => ch.topics)
        }

        // Calculate progress
        const totalTopics = allTopics.length
        const completedTopics = allTopics.filter((topic) =>
          topic.userProgressTopic.some((progress) => progress.isCompleted)
        ).length

        const completionPercentage =
          totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

        // Get purchase date
        const purchaseDate =
          progressResult?.purchases[0]?.createdAt || new Date()

        // Get quiz attempts
        const quizTopics = await db.topic.findMany({
          where: {
            OR: [
              {
                chapter: {
                  courseId,
                },
              },
              {
                chapter: {
                  batch: {
                    courseId,
                  },
                },
              },
            ],
            type: "quiz",
            isPublished: true,
          },
          select: {
            id: true,
            title: true,
            quizAttempts: {
              where: {
                userId,
                answers: { not: null }, // Only completed attempts
              },
              select: {
                id: true,
                score: true,
                passed: true,
                timeTaken: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })

        // Format quiz attempts data
        const quizAttempts = quizTopics.map((topic) => ({
          topicId: topic.id,
          topicTitle: topic.title,
          attempts: topic.quizAttempts,
        }))

        return {
          completionPercentage,
          completedModules: completedTopics,
          totalModules: totalTopics,
          purchaseDate,
          quizAttempts,
        }
      } catch (error: any) {
        console.error("Error fetching course analytics:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get course analytics",
        })
      }
    }),

  // Get analytics for all courses
  getAllCourseAnalytics: publicProcedure
    .input(z.string()) // userId
    .query(async ({ input: userId }) => {
      try {
        // Get all purchased courses with their related data
        const purchasedCourses = await db.purchase.findMany({
          where: {
            user: {
              userId,
            },
          },
          select: {
            courseId: true,
            createdAt: true,
            course: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                type: true,
                price: true,
                chapters: {
                  where: {
                    isPublished: true,
                  },
                  select: {
                    id: true,
                    topics: {
                      where: {
                        isPublished: true,
                      },
                      select: {
                        id: true,
                        title: true,
                        type: true,
                        userProgressTopic: {
                          where: {
                            userId,
                          },
                          select: {
                            isCompleted: true,
                          },
                        },
                        quizAttempts: {
                          where: {
                            userId,
                            answers: { not: null }, // Only completed attempts
                          },
                          select: {
                            id: true,
                            score: true,
                            passed: true,
                            timeTaken: true,
                            createdAt: true,
                          },
                          orderBy: {
                            createdAt: "desc",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            batchId: true,
            Batch: {
              select: {
                chapters: {
                  where: {
                    isPublished: true,
                  },
                  select: {
                    id: true,
                    topics: {
                      where: {
                        isPublished: true,
                      },
                      select: {
                        id: true,
                        title: true,
                        type: true,
                        userProgressTopic: {
                          where: {
                            userId,
                          },
                          select: {
                            isCompleted: true,
                          },
                        },
                        quizAttempts: {
                          where: {
                            userId // Only completed attempts
                          },
                          select: {
                            id: true,
                            score: true,
                            passed: true,
                            timeTaken: true,
                            createdAt: true,
                          },
                          orderBy: {
                            createdAt: "desc",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        // Type for topic data
        type TopicData = {
          id: string
          title: string
          type: string
          userProgressTopic: { isCompleted: boolean }[]
          quizAttempts: {
            id: string
            score: number
            passed: boolean
            timeTaken?: number | null
            createdAt: Date
          }[]
        }

        // Format the response
        const coursesWithAnalytics = purchasedCourses.map((purchase) => {
          // Get topics either from course chapters or batch chapters
          let allTopics: TopicData[] = []
          let quizTopics: TopicData[] = []

          if (purchase.batchId && purchase.Batch) {
            // For batch-based courses
            allTopics = purchase.Batch.chapters.flatMap((ch) => ch.topics)
          } else if (purchase.course?.chapters) {
            // For self-paced courses
            allTopics = purchase.course.chapters.flatMap((ch) => ch.topics)
          }

          // Calculate progress
          const totalTopics = allTopics.length
          const completedTopics = allTopics.filter((topic) =>
            topic.userProgressTopic.some((progress) => progress.isCompleted)
          ).length

          const percentage =
            totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

          // Format quiz attempts
          quizTopics = allTopics.filter((topic) => topic.type === "quiz")
          const quizAttempts = quizTopics.map((topic) => ({
            topicId: topic.id,
            topicTitle: topic.title,
            attempts: topic.quizAttempts,
          }))

          const courseName = purchase.course?.title || "Untitled Course"
          const courseId = purchase.course?.id || purchase.courseId
          const imageUrl = purchase.course?.imageUrl || null
          const price = purchase.course?.price || 0
          const chaptersCount = purchase.course?.chapters?.length || 0

          return {
            id: courseId,
            title: courseName,
            imageUrl,
            category: purchase.course?.type || "unknown",
            chaptersCount,
            topicsCount: totalTopics,
            price,
            progress: {
              completedTopics,
              totalTopics,
              percentage,
            },
            quizAttempts,
            purchaseDate: purchase.createdAt,
          }
        })

        return coursesWithAnalytics
      } catch (error: any) {
        console.error("Error fetching all course analytics:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get all course analytics",
        })
      }
    }),
})
