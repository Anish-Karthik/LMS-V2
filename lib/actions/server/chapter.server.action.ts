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

export const getChapterByIdClient = async (chapterId: string) => {
  return await getChapterById(chapterId)
}
