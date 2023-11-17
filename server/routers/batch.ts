import { TRPCError } from "@trpc/server/dist/error/TRPCError"
import { z } from "zod"

import { createBatch } from "@/lib/actions/batch.action"
import { getCourseById, getDefaultBatch } from "@/lib/actions/course.actions"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const batchRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        courseId: z.string(),
        isCurrent: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createBatch(input)
    }),

  update: publicProcedure
    .input(
      z.object({
        batchId: z.string(),
        courseId: z.string(),
        name: z.string().optional(),
        isCurrent: z.boolean().optional(),
        isClosed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { batchId, courseId, name, isCurrent, isClosed } = input
        const updateData: any = { name, isCurrent, isClosed }
        if (isCurrent === true) {
          updateData.isClosed = false
          await db.batch.updateMany({
            where: { courseId },
            data: { isCurrent: false },
          })
        }
        if (isClosed === true) {
          updateData.isCurrent = false
        }
        const res = await db.batch.update({
          where: { courseId, id: batchId },
          data: updateData,
        })
        await getDefaultBatch(courseId)

        return res
      } catch (e: any) {
        console.error(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        })
      }
    }),

  switchUsers: publicProcedure
    .input(
      z.object({
        prevBatchId: z.string(),
        newBatchId: z.string(),
        purchaseIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { prevBatchId, newBatchId, purchaseIds } = input
        const batch1 = await db.batch.update({
          where: { id: prevBatchId },
          data: {
            purchases: {
              disconnect: purchaseIds.map((id) => ({ id })),
            },
          },
          include: {
            purchases: {
              include: {
                user: true,
              },
            },
          },
        })
        const batch2 = await db.batch.update({
          where: { id: newBatchId },
          data: {
            purchases: {
              connect: purchaseIds.map((id) => ({ id })),
            },
          },
          include: {
            purchases: {
              include: {
                user: true,
              },
            },
          },
        })
        return {
          batch1,
          batch2,
        }
      } catch (e: any) {
        console.error(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Batch swap failed",
        })
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        batchId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { courseId, batchId } = input
        const course = await getCourseById(courseId)
        if (!course) throw new Error("Course not found")
        if (course.batches.length === 1)
          throw new Error("Cannot delete the last batch")
        const defaultBatch = course.batches[0]
        // transfer all purchases to default batch
        await db.purchase.updateMany({
          where: { batchId },
          data: { batchId: defaultBatch.id },
        })
        // delete the batch
        const batch = await db.batch.delete({
          where: { id: batchId },
        })
        return batch
      } catch (e: any) {
        console.error(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        })
      }
    }),
})
