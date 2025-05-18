import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const topicRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const lastTopic = await db.topic.findFirst({
          where: {
            chapterId: input.chapterId,
          },
          orderBy: {
            position: "desc",
          },
        })

        const newPosition = lastTopic ? lastTopic.position + 1 : 1

        const topic = await db.topic.create({
          data: {
            title: input.title,
            chapterId: input.chapterId,
            position: newPosition,
          },
        })

        return topic
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message || "Failed to create topic")
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        videoUrl: z.string().optional(),
        isFree: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const topic = await db.topic.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
            videoUrl: input.videoUrl,
            isFree: input.isFree,
          },
        })

        return topic
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message || "Failed to update topic")
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      await db.topic.delete({
        where: { id: input },
      })

      return { success: true }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message || "Failed to delete topic")
    }
  }),

  reorder: publicProcedure
    .input(
      z.object({
        list: z.array(
          z.object({
            id: z.string(),
            position: z.number(),
          })
        ),
        chapterId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const transactions = input.list.map((item) =>
          db.topic.update({
            where: { id: item.id },
            data: { position: item.position },
          })
        )

        await db.$transaction(transactions)

        return { success: true }
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message || "Failed to reorder topics")
      }
    }),

  togglePublish: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isPublished: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const topic = await db.topic.update({
          where: { id: input.id },
          data: { isPublished: input.isPublished },
        })

        return topic
      } catch (error: any) {
        console.error(error)
        throw new Error(
          error.message || "Failed to toggle topic publish status"
        )
      }
    }),

  getTopicsByChapterId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const topics = await db.topic.findMany({
          where: { chapterId: input },
          orderBy: {
            position: "asc",
          },
        })
        return topics
      } catch (error: any) {
        console.error(error)
        throw new Error("Topics not found")
      }
    }),

  publish: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const updatedTopic = await db.topic.update({
        where: {
          id: input,
        },
        data: {
          isPublished: true,
          isNotified: false,
        },
      })

      return updatedTopic
    } catch (error: any) {
      console.error(error)
      throw new Error("Topic publish failed: ", error.message)
    }
  }),

  unpublish: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const updatedTopic = await db.topic.update({
        where: {
          id: input,
        },
        data: {
          isPublished: false,
          isNotified: false,
        },
      })

      return updatedTopic
    } catch (error: any) {
      console.error(error)
      throw new Error("Topic unpublish failed: ", error.message)
    }
  }),

  updateUserProgress: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        topicId: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db.userProgressTopic.upsert({
          where: {
            userId_topicId: {
              userId: input.userId,
              topicId: input.topicId,
            },
          },
          update: {
            isCompleted: input.isCompleted,
          },
          create: {
            userId: input.userId,
            topicId: input.topicId,
            isCompleted: input.isCompleted,
          },
        })
      } catch (error: any) {
        console.error(error)
        throw new Error("User progress update failed: ", error.message)
      }
    }),

  addAttachment: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
        attachmentUrl: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const attachment = await db.attachment.create({
          data: {
            topicId: input.topicId,
            url: input.attachmentUrl,
            name:
              input.name ||
              input.attachmentUrl.split("/").pop() ||
              input.attachmentUrl,
          },
        })

        return attachment
      } catch (error: any) {
        console.error(error)
        throw new Error("Attachment upload failed: ", error.message)
      }
    }),

  removeAttachment: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
        attachmentId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const deletedAttachment = await db.attachment.delete({
          where: {
            id: input.attachmentId,
            topicId: input.topicId,
          },
        })
      } catch (error: any) {
        console.error(error)
        throw new Error("Attachment deletion failed: ", error.message)
      }
    }),

  notify: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const topic = await db.topic.update({
        where: {
          id: input,
          isPublished: true,
        },
        data: {
          isNotified: true,
        },
      })
      console.log("Topic notified: ", topic)
      return !!(topic && topic.isNotified && topic.isPublished)
    } catch (error: any) {
      console.log(error.message)
      throw new Error("Topic not found: ", error.message)
    }
  }),
})
