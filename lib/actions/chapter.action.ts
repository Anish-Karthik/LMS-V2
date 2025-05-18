import { currentUser } from "@clerk/nextjs"
import { db } from "../db"
import { getUser } from "./user.actions"

export const getChapterById = async (chapterId: string) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not found")
    const userInfo = await getUser(user.id)
    if (!userInfo) throw new Error("User not found")
    const isShowOnlyPublishedChapters = !(userInfo.role === "teacher" || userInfo.role === "admin")
    const whereClause = isShowOnlyPublishedChapters ? { isPublished: true } : {}
    const chapter = await db.chapter.findUnique({
      where: { ...whereClause, id: chapterId },
      include: {
        topics: true,
      },
    })
    if (!chapter) throw new Error("Chapter not found")
    return chapter
  } catch (error) {
    console.error(error)
    throw new Error("Chapter not found")
  }
}

export const getChaptersByBatchId = async (batchId: string) => {
  try {
    return await db.chapter.findMany({
      where: {
        batchId,
      },
      include: {
        topics: {
          orderBy: {
            position: "asc",
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Chapter reorder failed")
  }
}
