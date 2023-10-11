"use server"
import { Batch } from "@prisma/client";
import { db } from "../db"
import { string } from "zod";
import { getCourseById } from "./course.actions";

export const createBatch = async ({
  name,
  courseId,
}: {
  name: string;
  courseId: string;
} ) => {
  try {
    const batch = await db.batch.create({
      data: {
        name,
        courseId,
      },
    });
    return batch;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const getBatchById = async (batchId: string, courseId?: string) => {
  try {
    const batch = await db.batch.findUnique({
      where: { id:batchId },
      include: {
        purchases: true,
        teachers: true,
      }
    });
    return batch;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const getBatches = async (courseId: string) => {
  try {
    const batches = await db.batch.findMany({
      where: { courseId },
    });
    return batches;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export const deleteBatch = async (courseId: string, batchId: string) => {
  try {
    const course = await getCourseById(courseId);
    if (!course) throw new Error("Course not found");
    if (course.batches.length === 1) throw new Error("Cannot delete the last batch");
    const defaultBatch = course.batches[0];
    // transfer all purchases to default batch
    await db.purchase.updateMany({
      where: { batchId },
      data: { batchId: defaultBatch.id },
    });
    // delete the batch
    const batch = await db.batch.delete({
      where: { id: batchId },
    });
    return batch;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export const getBatchByName = async (courseId: string,name: string) => {
  try {
    const batch = await db.batch.findFirst({
      where: { courseId, name },
    });
    return batch;
  } catch (e) {
    console.log(e);
    return null;
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