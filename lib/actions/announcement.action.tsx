"use server"

import { db } from "../db"

export const getAnnouncementByid = async (id: string) => {
  try {
    const announcement = await db.announcement.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    })
    if (!announcement) {
      throw new Error("Announcement not found")
    }
    return announcement
  } catch (error: any) {
    console.error(error)
    throw new Error("Announcement not found", error.message)
  }
}

export const getAnnouncements = async () => {
  try {
    const announcements = await db.announcement.findMany({
      include: {
        attachments: true,
      },
    })
    return announcements
  } catch (error: any) {
    console.error(error)
    throw new Error("Announcements not found", error.message)
  }
}

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
}: {
  id: string
  title?: string
  description?: string
}) => {
  try {
    const announcement = await db.announcement.update({
      where: { id },
      data: { title, description },
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
    const announcement = await db.announcement.update({
      where: { id },
      data: { isPublished: true, courseId, batchId },
    })
    return announcement
  } catch (error: any) {
    console.error(error)
    throw new Error("Announcement not published", error.message)
  }
}

export const unpublishAnnouncement = async (id: string) => {
  try {
    const announcement = await db.announcement.update({
      where: { id },
      data: { isPublished: false },
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
