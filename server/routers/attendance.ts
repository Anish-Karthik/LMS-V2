import { publicProcedure, router } from "@/server/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { db } from "@/lib/db"

export const attendanceRouter = router({
  // Get all students for a topic (for marking attendance)
  getStudentsForTopicAttendance: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log(
          "Looking up students for topic:",
          input.topicId,
          "in course:",
          input.courseId
        )

        // Get topic to determine if it's from a batch or self-paced course
        const topic = await db.topic.findUnique({
          where: { id: input.topicId },
          include: {
            chapter: true,
          },
        })

        if (!topic) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Topic not found",
          })
        }

        console.log("Found topic:", topic.id, "in chapter:", topic.chapterId)

        // Determine if this is from a batch-based course or self-paced course
        const isSelfPaced = topic.chapter.courseId !== null
        const batchId = topic.chapter.batchId

        console.log(
          "Course type:",
          isSelfPaced ? "self-paced" : "batch-based",
          "Batch ID:",
          batchId || "N/A"
        )

        // Get all students enrolled in the course
        let students

        if (isSelfPaced) {
          // For self-paced courses, look for students who have purchased the course directly
          students = await db.user.findMany({
            where: {
              purchases: {
                some: {
                  courseId: input.courseId,
                },
              },
            },
            select: {
              id: true,
              userId: true,
              name: true,
              email: true,
              image: true,
              attendances: {
                where: {
                  topicId: input.topicId,
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          })
          console.log("Found", students.length, "students")
        } else if (batchId) {
          // For batch-based courses, look for students who have purchased the specific batch
          students = await db.user.findMany({
            where: {
              purchases: {
                some: {
                  batchId: batchId,
                },
              },
            },
            select: {
              id: true,
              userId: true,
              name: true,
              email: true,
              image: true,
              attendances: {
                where: {
                  topicId: input.topicId,
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          })
        } else {
          // Fallback to course purchase if no batch is found (should be rare)
          students = await db.user.findMany({
            where: {
              purchases: {
                some: {
                  courseId: input.courseId,
                },
              },
            },
            select: {
              id: true,
              userId: true,
              name: true,
              email: true,
              image: true,
              attendances: {
                where: {
                  topicId: input.topicId,
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          })
        }

        console.log("Found", students.length, "students")
        return students
      } catch (error) {
        console.error("Error fetching students for attendance:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch students",
        })
      }
    }),

  // Get attendance records for a student
  getStudentAttendance: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        // Get all topics for the course
        const course = await db.course.findUnique({
          where: { id: input.courseId },
          include: {
            chapters: true,
          },
        })

        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          })
        }

        // Get attendance for all topics in the course
        const chapterIds = course.chapters.map((chapter) => chapter.id)

        const topics = await db.topic.findMany({
          where: {
            chapter: {
              id: {
                in: chapterIds,
              },
            },
          },
          select: {
            id: true,
            title: true,
            type: true,
            startTime: true,
            duration: true,
            attendances: {
              where: {
                user: {
                  userId: input.userId,
                },
              },
            },
          },
        })

        return topics
      } catch (error) {
        console.error("Error fetching student attendance:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance records",
        })
      }
    }),

  // Mark attendance for a student
  markAttendance: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userObjId: z.string(),
        topicId: z.string(),
        markedById: z.string(),
        status: z.enum(["present", "absent", "excused", "late"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Check if attendance record already exists
        const existingAttendance = await db.attendance.findUnique({
          where: {
            userId_topicId: {
              userId: input.userId,
              topicId: input.topicId,
            },
          },
        })

        if (existingAttendance) {
          // Update existing attendance
          const updatedAttendance = await db.attendance.update({
            where: {
              id: existingAttendance.id,
            },
            data: {
              status: input.status,
              notes: input.notes,
              markedById: input.markedById,
            },
          })
          return updatedAttendance
        } else {
          // Create new attendance record
          const attendance = await db.attendance.create({
            data: {
              userId: input.userId,
              userObjId: input.userObjId,
              topicId: input.topicId,
              markedById: input.markedById,
              status: input.status,
              notes: input.notes,
            },
          })
          return attendance
        }
      } catch (error) {
        console.error("Error marking attendance:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to mark attendance",
        })
      }
    }),

  // Bulk mark attendance for multiple students
  bulkMarkAttendance: publicProcedure
    .input(
      z.object({
        attendances: z.array(
          z.object({
            userId: z.string(),
            userObjId: z.string(),
            topicId: z.string(),
            status: z.enum(["present", "absent", "excused", "late"]),
            notes: z.string().optional(),
          })
        ),
        markedById: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create a transaction for bulk updates
        const operations = input.attendances.map((attendance) => {
          return db.attendance.upsert({
            where: {
              userId_topicId: {
                userId: attendance.userId,
                topicId: attendance.topicId,
              },
            },
            update: {
              status: attendance.status,
              notes: attendance.notes,
              markedById: input.markedById,
            },
            create: {
              userId: attendance.userId,
              userObjId: attendance.userObjId,
              topicId: attendance.topicId,
              markedById: input.markedById,
              status: attendance.status,
              notes: attendance.notes,
            },
          })
        })

        await db.$transaction(operations)

        return { success: true, count: operations.length }
      } catch (error) {
        console.error("Error bulk marking attendance:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to bulk mark attendance",
        })
      }
    }),

  // Get attendance statistics for a course
  getCourseAttendanceStats: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        // Get all students in the course
        const students = await db.user.findMany({
          where: {
            purchases: {
              some: {
                courseId: input.courseId,
              },
            },
          },
          select: {
            id: true,
            userId: true,
            name: true,
            attendances: {
              where: {
                topic: {
                  chapter: {
                    OR: [
                      { courseId: input.courseId },
                      {
                        batch: {
                          courseId: input.courseId,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        })

        // Calculate attendance stats per student
        const stats = students.map((student) => {
          const totalAttendances = student.attendances.length
          const presentCount = student.attendances.filter(
            (a) => a.status === "present"
          ).length
          const excusedCount = student.attendances.filter(
            (a) => a.status === "excused"
          ).length
          const lateCount = student.attendances.filter(
            (a) => a.status === "late"
          ).length
          const absentCount = student.attendances.filter(
            (a) => a.status === "absent"
          ).length

          const attendanceRate = totalAttendances
            ? ((presentCount + excusedCount + lateCount) / totalAttendances) *
              100
            : 0

          return {
            studentId: student.id,
            userId: student.userId,
            name: student.name,
            totalSessions: totalAttendances,
            presentCount,
            excusedCount,
            lateCount,
            absentCount,
            attendanceRate: Math.round(attendanceRate),
          }
        })

        return stats
      } catch (error) {
        console.error("Error fetching attendance stats:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance statistics",
        })
      }
    }),
})
