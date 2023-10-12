"use server"

import { Batch, Purchase } from "@prisma/client"
import { string } from "zod"

import { db } from "../db"
import { addBatchToCourse, getCourseById } from "./course.actions"

export const createBatch = async ({
  name,
  courseId,
}: {
  name: string
  courseId: string
}) => {
  try {
    const batch = await db.batch.create({
      data: {
        name,
        courseId,
      },
    })
    await addBatchToCourse(batch.id, courseId)
    return batch
  } catch (e: any) {
    console.error(e)
    throw new Error("Batch creation failed", e.message)
  }
}

export const getBatchById = async (batchId: string, courseId?: string) => {
  try {
    const batch = await db.batch.findUnique({
      where: { id: batchId },
      include: {
        purchases: {
          include: {
            user: true,
          },
        },
        teachers: true,
      },
    })
    return batch
  } catch (e: any) {
    console.error(e)
    throw new Error("Batch not found", e.message)
  }
}

export const getBatches = async (courseId: string) => {
  try {
    const batches = await db.batch.findMany({
      where: { courseId },
    })
    return batches
  } catch (e) {
    console.log(e)
    return null
  }
}
export const deleteBatch = async (courseId: string, batchId: string) => {
  try {
    const course = await getCourseById(courseId)
    if (!course) throw new Error("Course not found")
    if (course.batches.length === 1)
      throw new Error("Cannot delete the last batch")
    const defaultBatch = course.batches[0]
    // transfer all purchases to default batch
    await db.purchase.updateMany({
      where: { batchId },
      data: { batchId: defaultBatch.id },
    })
    // delete the batch
    const batch = await db.batch.delete({
      where: { id: batchId },
    })
    return batch
  } catch (e) {
    console.log(e)
    return null
  }
}
export const getBatchByName = async (courseId: string, name: string) => {
  try {
    const batch = await db.batch.findFirst({
      where: { courseId, name },
    })
    return batch
  } catch (e) {
    console.log(e)
    return null
  }
}

export const addStudentToBatch = async (
  batchId: string,
  purchaseId: string
) => {
  try {
    const batch = await db.batch.update({
      where: { id: batchId },
      data: {
        purchases: {
          connect: { id: purchaseId },
        },
      },
    })
    return batch
  } catch (e) {
    console.error(e)
    return null
  }
}

export const swapUserBatch = async (
  prevBatchId: string,
  newBatchId: string,
  purchaseId: string
) => {
  console.log("swapUserBatch", prevBatchId, newBatchId, purchaseId)
  try {
    const batch = await db.batch.update({
      where: { id: prevBatchId },
      data: {
        purchases: {
          disconnect: { id: purchaseId },
        },
      },
    })
    await db.batch.update({
      where: { id: newBatchId },
      data: {
        purchases: {
          connect: { id: purchaseId },
        },
      },
    })
    return batch
  } catch (e: any) {
    console.error(e)
    throw new Error("Batch swap failed", e.message)
  }
}

// export const addStudentToBatch = async (batchId: string, studentId: string) => {
//   try {
//     const batch = await db.batch.update({
//       where: { id: batchId },
//       data: {
//         students: {
//           connect: { id: studentId },
//         },
//       },
//     });
//     return batch;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }
