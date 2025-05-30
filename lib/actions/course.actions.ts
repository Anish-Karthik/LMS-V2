import { db } from "../db"
import { randomString } from "../format"
import { createBatch, getBatchById } from "./batch.action"

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
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}

export const getCourses = async (isTeacherOrAdmin: boolean = false) => {
  try {
    const courses = await db.course.findMany({
      where: isTeacherOrAdmin ? {} : { isPublished: true },
      include: {
        batches: true,
        Purchase: true,
      },
    })
    if (!courses || !courses.length) return null
    return courses
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
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
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
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
    let res: string
    if (!course) throw new Error("Course not found")
    if (!course.batches.length) {
      // create a new batch and make it isCurrent true
      res = (await createBatch({ name: "Batch 1", courseId, isCurrent: true }))
        .id
    } else {
      let currentBatch = course.batches.find((b) => b.isCurrent && !b.isClosed)

      if (currentBatch) {
        // if there is a current batch that is not closed, use it
        res = currentBatch.id
      } else {
        currentBatch = course.batches.find((b) => !b.isClosed)
        if (currentBatch) {
          // if there is a batch that is not closed, update it as current batch
          await db.batch.update({
            where: { id: currentBatch.id },
            data: {
              isCurrent: true,
            },
          })
          res = currentBatch.id
        } else {
          // if all batches are closed, create a new batch with isCurrent property true
          res = (
            await createBatch({
              name: "Batch " + randomString(4),
              courseId,
              isCurrent: true,
            })
          ).id
        }
      }
    }
    const ans = await getBatchById(res)
    if (!ans) throw new Error("Batch not found")
    return ans
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message || "Course not found")
  }
}
