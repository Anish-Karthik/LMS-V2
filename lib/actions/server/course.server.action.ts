"use server"

import { db } from "@/lib/db"

import { createBatch } from "../batch.action"
import { addBatchToCourse } from "../course.actions"

export const createCourse = async ({
  title,
  description,
  imageUrl,
  price,
}: {
  title: string
  description: string
  imageUrl: string
  price: number
}) => {
  try {
    const course = await db.course.create({
      data: {
        title,
        description,
        imageUrl,
        price,
      },
    })
    const batch = await createBatch({
      name: "Batch 1",
      courseId: course.id,
      isCurrent: true,
    })
    if (!batch) throw new Error("Batch creation failed")

    await addBatchToCourse(batch.id, course.id)

    return course
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}

export const editCourse = async ({
  id,
  title,
  description,
  imageUrl,
  price,
}: {
  id: string
  title?: string
  description?: string
  imageUrl?: string
  price?: number
}) => {
  try {
    const course = await db.course.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        price,
      },
    })
    return course
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}
