"use server"

import { db } from "@/lib/db"

import { createBatch, getBatches } from "../batch.action"
import { getCourseById, getDefaultBatch } from "../course.actions"

export async function createBatchFromClient({
  name,
  courseId,
  isCurrent = false,
}: {
  isCurrent?: boolean
  name: string
  courseId: string
}) {
  return await createBatch({ name, courseId, isCurrent })
}

export async function getBatchesClient(courseId: string) {
  return await getBatches(courseId)
}

export const updateBatch = async ({
  batchId,
  name,
  isCurrent,
  isClosed,
  courseId,
}: {
  batchId: string
  courseId: string
  name?: string
  isCurrent?: boolean
  isClosed?: boolean
}) => {
  try {
    const updateData: any = { name, isCurrent, isClosed }
    if (isCurrent === true) {
      updateData.isClosed = false
      await db.batch.updateMany({
        where: { courseId },
        data: { isCurrent: false },
      })
    }
    if (isClosed === true) {
      updateData.isCurrent = false
    }
    const res = await db.batch.update({
      where: { courseId, id: batchId },
      data: updateData,
    })
    await getDefaultBatch(courseId)

    return res
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}

export const switchManyUserBatches = async (
  prevBatchId: string,
  newBatchId: string,
  purchaseIds: string[]
) => {
  try {
    const batch1 = await db.batch.update({
      where: { id: prevBatchId },
      data: {
        purchases: {
          disconnect: purchaseIds.map((id) => ({ id })),
        },
      },
      include: {
        purchases: {
          include: {
            user: true,
          },
        },
      },
    })
    const batch2 = await db.batch.update({
      where: { id: newBatchId },
      data: {
        purchases: {
          connect: purchaseIds.map((id) => ({ id })),
        },
      },
      include: {
        purchases: {
          include: {
            user: true,
          },
        },
      },
    })
    return {
      batch1,
      batch2,
    }
  } catch (e: any) {
    console.error(e)
    throw new Error("Batch swap failed", e.message)
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
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}
