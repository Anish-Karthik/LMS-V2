import { db } from "../db"

export const getChapterById = async (chapterId: string) => {
  try {
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
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
