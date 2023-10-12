"use server"

import { User } from "@prisma/client"

import { db } from "../db"
import { addStudentToBatch, createBatch } from "./batch.action"
import { addBatchToCourse, getDefaultBatch } from "./course.actions"

export const isTeacher = async (userId: string | null) => {
  try {
    if (!userId) throw new Error("Unauthorized user")
    const teacher = await db.teacher.findFirst({
      where: {
        userId,
      },
    })
    return !!teacher
  } catch (e: any) {
    console.error(e)
    throw new Error("Unauthorized user")
  }
}
export const isTeacherOrHigher = async (userId: string | null) => {
  try {
    if (!userId) throw new Error("Unauthorized user")
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    })
    if (!user) throw new Error("User not found")

    return ["teacher", "admin", "moderator"].includes(user.role)
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message || "Unauthorized user")
  }
}

export const createUser = async ({
  userId,
  email,
  phoneNo,
  name,
  image,
  role = "student",
}: {
  userId: string
  email: string
  phoneNo: string
  name: string
  image: string
  role: string
}) => {
  try {
    if (!userId) throw new Error("Unauthorized user")
    if (!["student", "teacher"].includes(role)) throw new Error("Invalid role")
    const user = await db.user.findFirst({
      where: {
        userId: userId,
      },
    })
    if (user) throw new Error("Unauthorized user")
    await db.user.create({
      data: {
        userId,
        role,
        email,
        phoneNo,
        image,
        name,
      },
    })
    return true
  } catch (e: any) {
    console.log(e)
    throw new Error(e.message || "Unauthorized user")
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        userId: userId,
      },
      include: {
        purchases: true,
      },
    })
    return user
  } catch (e: any) {
    console.log(e)
    return null
  }
}

export const isUserPurchasedCourse = async (
  userId: string,
  courseId: string
) => {
  try {
    console.log("isUserPurchasedCourse", userId, courseId)
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })
    return !!purchase
  } catch (e: any) {
    console.log(e)
    throw new Error(e.message || "Unauthorized user")
  }
}

export const purchaseCourse = async (userId: string, courseId: string) => {
  try {
    console.log(
      "**********************purchaseCourse**********************",
      userId,
      courseId
    )
    const user = await getUser(userId)
    if (!courseId || !userId || !user) throw new Error("Invalid data")

    const isPurchased = await isUserPurchasedCourse(userId, courseId)

    if (isPurchased) throw new Error("Already purchased")

    const purchase = await db.purchase.create({
      data: {
        courseId,
        userId,
        userObjId: user.id,
      },
    });
    let defaultBatch = await getDefaultBatch(courseId);
    await addStudentToBatch(defaultBatch.id, purchase.id);
    return purchase
  } catch (e: any) {
    console.error("purchaseCourse", e)
    throw new Error(e.message || "Unauthorized user")
  }
}
