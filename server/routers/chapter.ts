import { TRPCError } from "@trpc/server"
import { z } from "zod"

import {
  getChapterById,
  getChaptersByCourseId,
} from "@/lib/actions/chapter.action"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const chapterRouter = router({
  create: publicProcedure
    .input(
      z.object({
        batchId: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const batch = await db.batch.findUnique({
          where: {
            id: input.batchId,
          },
        })
        if (!batch) {
          throw new Error("Batch not found")
        }
        const lastChapter = await db.chapter.findFirst({
          where: {
            batchId: input.batchId,
          },
          orderBy: {
            position: "desc",
          },
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1

        const chapter = await db.chapter.create({
          data: {
            title: input.title,
            batchId: input.batchId,
            courseId: batch.courseId,
            position: newPosition,
          },
        })
        return chapter
      } catch (error: any) {
        console.error(error)
        throw new Error("Chapter creation failed")
      }
    }),

  edit: publicProcedure
    .input(
      z.object({
        chapterId: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const chapter = await db.chapter.update({
          where: { id: input.chapterId },
          data: { title: input.title },
        })
        return chapter
      } catch (error: any) {
        console.error(error)
        throw new Error("Chapter edit failed")
      }
    }),

  reorder: publicProcedure
    .input(
      z.object({
        batchId: z.string(),
        chapters: z.array(
          z.object({
            id: z.string(),
            position: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      try {
        for (let item of input.chapters) {
          await db.chapter.update({
            where: { id: item.id },
            data: { position: item.position },
          })
        }
        return { success: true }
      } catch (error: any) {
        console.error(error)
        throw new Error("Chapter reorder failed")
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const chapter = await db.chapter.findUnique({
        where: { id: input },
      })
      if (!chapter) {
        throw new Error("Chapter not found")
      }
      await db.chapter.updateMany({
        where: {
          batchId: chapter.batchId,
          position: {
            gt: chapter.position,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      })
      await db.chapter.delete({
        where: { id: input },
      })

      return { success: true }
    } catch (error: any) {
      console.error(error)
      throw new Error("Chapter deletion failed")
    }
  }),

  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getChapterById(input)
  }),

  publish: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const chapter = await db.chapter.update({
        where: { id: input },
        data: { isPublished: true },
      })
      return chapter
    } catch (error: any) {
      console.error(error)
      throw new Error("Failed to publish chapter")
    }
  }),

  unpublish: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const chapter = await db.chapter.update({
        where: { id: input },
        data: { isPublished: false },
      })
      return chapter
    } catch (error: any) {
      console.error(error)
      throw new Error("Failed to unpublish chapter")
    }
  }),

  getChaptersByCourseId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await getChaptersByCourseId(input)
    }),
})
