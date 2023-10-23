import { db } from "../db"
import {
  addBatchToCourse,
  getCourseById,
  getDefaultBatch,
} from "./course.actions"

export const createBatch = async ({
  name,
  courseId,
  isCurrent = false,
}: {
  isCurrent?: boolean
  name: string
  courseId: string
}) => {
  try {
    const batch = await db.batch.create({
      data: {
        name,
        courseId,
        isCurrent,
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
        attachments: true,
        chapters: {
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
        },
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
  } catch (e: any) {
    console.error(e)
    throw new Error("Batches not found", e.message)
  }
}

export const getAllBatches = async () => {
  try {
    const batches = await db.batch.findMany()
    return batches
  } catch (e: any) {
    console.error(e)
    throw new Error("Batches not found", e.message)
  }
}

export const getBatchByName = async (courseId: string, name: string) => {
  try {
    const batch = await db.batch.findFirst({
      where: { courseId, name },
    })
    return batch
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
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
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
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
