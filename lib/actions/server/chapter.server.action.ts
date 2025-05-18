"use server"

import { db } from "@/lib/db"

import { getChapterById } from "../chapter.action"

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

export const deleteChapter = async (chapterId: string) => {
  try {
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
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
      where: { id: chapterId },
    })

    return { sucess: true }
  } catch (error) {
    console.error(error)
    throw new Error("Chapter deletion failed")
  }
}

export const getChapterByIdClient = async (chapterId: string) => {
  return await getChapterById(chapterId)
}

export const deleteChapterClient = async (id: string) => {
  try {
    const response = await fetch(`/api/chapters/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete chapter")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting chapter:", error)
    throw error
  }
}
