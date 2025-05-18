import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { createBatch } from "@/lib/actions/batch.action"
import { addBatchToCourse } from "@/lib/actions/course.actions"
import { purchaseCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const courseRouter = router({
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Find the course to get teacher ids
        const course = await db.course.findUnique({
          where: { id: input.id },
          include: {
            teachers: true,
          },
        })

        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          })
        }

        // Delete the course and all related records
        await db.course.delete({
          where: { id: input.id },
        })

        return { success: true }
      } catch (e: any) {
        console.error(e)
        throw new Error(e.message)
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        price: z.number(),
        type: z.enum(["batch-based", "self-paced"]).default("batch-based"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const course = await db.course.create({
          data: {
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            price: input.price,
            type: input.type,
          },
        })

        // Only create batch for batch-based courses
        if (input.type === "batch-based") {
          // Use a unique batch name by including the course ID
          const batchName = `Batch 1 - ${course.id.substring(0, 5)}`

          const batch = await createBatch({
            name: batchName,
            courseId: course.id,
            isCurrent: true,
          })

          if (!batch) throw new Error("Batch creation failed")
          await addBatchToCourse(batch.id, course.id)
        }

        return course
      } catch (e: any) {
        console.error(e)
        throw new Error(e.message)
      }
    }),

  publish: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isPublished: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const course = await db.course.update({
          where: { id: input.id },
          data: {
            isPublished: input.isPublished,
          },
        })
        return course
      } catch (e: any) {
        console.error(e)
        throw new Error(e.message)
      }
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        price: z.number().optional(),
        type: z.enum(["batch-based", "self-paced"]).optional(),
        isPublished: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const course = await db.course.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            price: input.price,
            type: input.type,
          },
        })
        return course
      } catch (e: any) {
        console.error(e)
        throw new Error(e.message)
      }
    }),

  performPurchaseAsFree: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
        price: z.number(),
        batchId: z.string().optional(),
        promoId: z.string().optional(),
        referred: z.boolean().optional(),
        promo: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db.promo.delete({
          where: {
            id: input.promoId,
          },
        })
        await purchaseCourse({
          userId: input.userId,
          courseId: input.courseId,
          batchId: input.batchId,
          price: input.price,
          referred: false,
          promo: false,
        })
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
      }
    }),
})
