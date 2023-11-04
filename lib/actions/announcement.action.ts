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

export const getEmailsByAnnouncement = async ({
  announcementId,
  announcementType,
  courseId,
  batchId,
}: {
  announcementId: string
  announcementType: string
  courseId?: string
  batchId?: string
}) => {
  try {
    if (announcementType === "general") {
      const emails = await db.user.findMany({
        select: {
          email: true,
        },
      })
      return emails.map((email) => email.email!)
    }
    const emails = await db.user.findMany({
      where: {
        purchases: {
          some: {
            batchId: batchId,
            courseId: courseId,
          },
        },
      },
      select: {
        email: true,
      },
    })
    return emails.map((email) => email.email!)
  } catch (error: any) {
    console.error(error)
    throw new Error("Emails not found", error.message)
  }
}
