"use server"
import { Batch } from "@prisma/client";
import { db } from "../db"
import { string } from "zod";

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