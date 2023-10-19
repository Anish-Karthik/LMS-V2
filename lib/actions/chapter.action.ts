"use server"

import { db } from "../db"

export const createChapter = async (batchId: string, title: string) => {
  try {
    const lastChapter = await db.chapter.findFirst({
      where: {
        batchId: batchId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastChapter ? lastChapter.position + 1 : 1

    const chapter = await db.chapter.create({
      data: {
        title,
        batchId,
        position: newPosition,
      },
    })
    return chapter
  } catch (error) {
    console.error(error)
    throw new Error("Chapter creation failed")
  }
}

export const editChapter = async (chapterId: string, title: string) => {
  try {
    const chapter = await db.chapter.update({
      where: { id: chapterId },
      data: { title },
    })
    return chapter
  } catch (error) {
    console.error(error)
    throw new Error("Chapter edit failed")
  }
}

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

export const reorderChapters = async (
  batchId: string,
  chapters: { id: string; position: number }[]
) => {
  try {
    for (let item of chapters) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }
    return { sucess: true }
  } catch (error) {
    console.error(error)
    throw new Error("Chapter reorder failed")
  }
}
