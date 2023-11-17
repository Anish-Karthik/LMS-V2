import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { getAnnouncementByid } from "@/lib/actions/announcement.action"
import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/format"

import { publicProcedure, router } from "../trpc"

export const announcementRouter = router({
  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const announcement = await getAnnouncementByid(input)
      return announcement
    } catch (error: any) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Announcement not found",
      })
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const userInfo = await getUser(input.userId)
        if (!userInfo) {
          throw new Error("User not found")
        }

        const announcement = await db.announcement.create({
          data: { title: input.title, userObjId: userInfo.id },
        })

        if (!announcement) {
          throw new Error("Announcement not created")
        }

        return announcement
      } catch (error: any) {
        console.error(error)
        throw new Error("Announcement not created", error.message)
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        courseId: z.string().optional(),
        batchId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, title, description, type, courseId, batchId } = input
        if (type === "course") {
          return await db.announcement.update({
            where: { id },
            data: { title, description, type, courseId, batchId: null },
          })
        }
        if (type === "batch") {
          return await db.announcement.update({
            where: { id },
            data: { title, description, type, courseId, batchId },
          })
        }
        const announcement = await db.announcement.update({
          where: { id },
          data: { title, description, type, courseId: null, batchId: null },
        })
        return announcement
      } catch (error: any) {
        console.error(error)
        throw new Error("Announcement not updated", error.message)
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const announcement = await db.announcement.delete({
        where: { id: input },
      })
      return announcement
    } catch (error: any) {
      console.error(error)
      throw new Error("Announcement not deleted", error.message)
    }
  }),

  publish: publicProcedure
    .input(
      z.object({
        id: z.string(),
        batchId: z.string().optional(),
        courseId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, batchId, courseId } = input
        const announcement = await getAnnouncementByid(id)
        const values = {
          createdAt:
            formatDate(announcement.createdAt) ==
            formatDate(announcement.updatedAt)
              ? new Date()
              : announcement.createdAt,
          updatedAt:
            formatDate(announcement.createdAt) ==
            formatDate(announcement.updatedAt)
              ? new Date()
              : undefined,
        }
        return await db.announcement.update({
          where: { id },
          data: {
            isPublished: true,
            isNotified: false,
            courseId,
            batchId,
            ...values,
          },
        })
      } catch (error: any) {
        console.error(error)
        throw new Error("Announcement not published", error.message)
      }
    }),

  unpublish: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const announcement = await db.announcement.update({
        where: { id: input },
        data: {
          isPublished: false,
          isNotified: false,
          courseId: null,
          batchId: null,
        },
      })
      return announcement
    } catch (error: any) {
      console.error(error)
      throw new Error("Announcement not unpublished", error.message)
    }
  }),

  addAttachment: publicProcedure
    .input(
      z.object({
        announcementId: z.string(),
        attachmentUrl: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { announcementId, attachmentUrl, name } = input
        const attachment = await db.attachment.create({
          data: {
            announcementId,
            url: attachmentUrl,
            name: name || attachmentUrl.split("/").pop() || attachmentUrl,
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
        announcementId: z.string(),
        attachmentId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { announcementId, attachmentId } = input
        await db.attachment.delete({
          where: {
            id: attachmentId,
            announcementId: announcementId,
          },
        })
      } catch (error: any) {
        console.error(error)
        throw new Error("Attachment deletion failed: ", error.message)
      }
    }),

  notify: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const announcement = await db.announcement.update({
        where: {
          id: input,
          isPublished: true,
        },
        data: {
          isNotified: true,
        },
      })
      console.log("announcement notified: ", announcement)
      return !!(
        announcement &&
        announcement.isNotified &&
        announcement.isPublished
      )
    } catch (error: any) {
      console.log(error.message)
      throw new Error("Announcement Error: ", error.message)
    }
  }),
})
