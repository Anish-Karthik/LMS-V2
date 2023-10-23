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
