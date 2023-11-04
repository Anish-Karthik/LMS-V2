"use server"

import { db } from "@/lib/db"
import { formatDate } from "@/lib/format"

import { getAnnouncementByid } from "../announcement.action"

export const createAnnouncement = async (title: string) => {
  try {
    const announcement = await db.announcement.create({
      data: { title },
    })
    return announcement
  } catch (error: any) {
    console.error(error)
    throw new Error("Announcement not created", error.message)
  }
}

export const updateAnnouncement = async ({
  id,
  title,
  description,
  type,
  courseId,
  batchId,
}: {
  id: string
  title?: string
  type?: string
  description?: string
  courseId?: string
  batchId?: string
}) => {
  try {
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
}

export const deleteAnnouncement = async (id: string) => {
  try {
    const announcement = await db.announcement.delete({
      where: { id },
    })
    return announcement
  } catch (error: any) {
    console.error(error)
    throw new Error("Announcement not deleted", error.message)
  }
}

export const publishAnnouncement = async (
  id: string,
  batchId?: string,
  courseId?: string
) => {
  try {
    const announcement = await getAnnouncementByid(id)
    const values = {
      createdAt:
        formatDate(announcement.createdAt) == formatDate(announcement.updatedAt)
          ? new Date()
          : announcement.createdAt,
      updatedAt:
        formatDate(announcement.createdAt) == formatDate(announcement.updatedAt)
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
}

export const unpublishAnnouncement = async (id: string) => {
  try {
    const announcement = await db.announcement.update({
      where: { id },
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
}

export const addAttachmentToAnnouncement = async (
  announcementId: string,
  attachmentUrl: string,
  name = "Attachment"
) => {
  try {
    const attachment = await db.attachment.create({
      data: {
        announcementId,
        url: attachmentUrl,
        name: attachmentUrl.split("/").pop() || name,
      },
    })

    return attachment
  } catch (error: any) {
    console.error(error)
    throw new Error("Attachment upload failed: ", error.message)
  }
}

export const removeAttachmentFromAnnouncement = async (
  announcementId: string,
  attachmentId: string
) => {
  try {
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
}

export async function notifyAnnouncement(annoucementId: string) {
  try {
    const announcement = await db.announcement.update({
      where: {
        id: annoucementId,
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
}
