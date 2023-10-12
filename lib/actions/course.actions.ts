"use server"

import { currentUser } from "@clerk/nextjs"
import { Batch, Course } from "@prisma/client"

import { db } from "../db"
import { createBatch, getBatchById } from "./batch.action"

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
      name: "unassigned",
      courseId: course.id,
    })
    if (!batch) throw new Error("Batch creation failed")

    await addBatchToCourse(batch.id, course.id)

    return course
  } catch (e) {
    console.log(e)
    return null
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
  } catch (e) {
    console.log(e)
    return null
  }
}

export const addBatchToCourse = async (batchId: string, courseId: string) => {
  try {
    const course = await db.course.update({
      where: { id: courseId },
      data: {
        batches: {
          connect: {
            id: batchId,
          },
        },
      },
    })
    return course
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getCourses = async () => {
  try {
    const courses = await db.course.findMany({
      include: {
        batches: true,
        Purchase: true,
      },
    })
    if (!courses || !courses.length) return null
    return courses
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getCourseById = async (id: string) => {
  try {
    const course = await db.course.findUnique({
      where: { id },
      include: {
        batches: true,
      },
    })
    return course
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getDefaultBatch = async (courseId: string) => {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        batches: true,
      },
    })
    let res:string;
    if (!course) throw new Error("Course not found")
    if(!course.batches.length) res = (await createBatch({ name: "unassigned", courseId })).id;
    else res = course.batches[0].id
    return await getBatchById(res);
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message || "Course not found");
  }
}
