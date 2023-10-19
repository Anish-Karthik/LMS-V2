"use server"

import { db } from "../db"
import { addStudentToBatch } from "./batch.action"
import { getDefaultBatch } from "./course.actions"

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
        userId: userId,
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
    console.error(e)
    throw new Error(e.message)
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
    })
    let defaultBatch = await getDefaultBatch(courseId)
    await addStudentToBatch(defaultBatch.id, purchase.id)
    return purchase
  } catch (e: any) {
    console.error("purchaseCourse", e)
    throw new Error(e.message || "Unauthorized user")
  }
}

export const getUsersWhoHaveRoles = async ({
  courseId,
  batchId,
  searchText,
  role,
  pageNumber = 1,
  pageSize = 20,
  sortBy = "asc",
}: {
  courseId?: string
  batchId?: string
  searchText?: string
  role?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: "asc" | "desc"
}) => {
  try {
    const skipAmount = (pageNumber - 1) * pageSize

    const students = (
      await db.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchText || "",
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: searchText || "",
                mode: "insensitive",
              },
            },
            {
              phoneNo: {
                contains: searchText || "",
              },
            },
          ],
          role: "student",
        },
        include: {
          purchases: true,
        },
        orderBy: {
          name: sortBy,
        },
        skip: skipAmount,
        take: pageSize,
      })
    ).filter((student) => student.purchases.length > 0)

    const teacherIds = (
      await db.teacher.findMany({
        select: {
          userId: true,
        },
      })
    ).map((teacher) => teacher.userId)

    const teachers = await db.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            phoneNo: {
              contains: searchText || "",
            },
          },
        ],
        userId: {
          in: teacherIds,
        },
      },
      orderBy: {
        name: sortBy,
      },
      skip: skipAmount,
      take: pageSize,
    })

    const adminIds = (
      await db.admin.findMany({
        select: {
          userId: true,
        },
      })
    ).map((admin) => admin.userId)

    const admins = await db.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            phoneNo: {
              contains: searchText || "",
            },
          },
        ],
        userId: {
          in: adminIds,
        },
      },
      orderBy: {
        name: sortBy,
      },
      skip: skipAmount,
      take: pageSize,
    })

    const notEnrolleds = await db.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchText || "",
              mode: "insensitive",
            },
          },
          {
            phoneNo: {
              contains: searchText || "",
            },
          },
        ],
        role: {
          notIn: ["admin", "teacher", "student"],
        },
      },
      orderBy: {
        name: sortBy,
      },
      skip: skipAmount,
      take: pageSize,
    })
    if (role === "admin") {
      return { users: admins }
    }
    if (role === "teacher") {
      return { users: teachers }
    }
    if (role === "student") {
      return { users: students }
    }
    if (role === "notEnrolled") {
      return { users: notEnrolleds }
    }

    return {
      users: [...students, ...teachers, ...admins, ...notEnrolleds],
    }
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}

export const banUser = async (userId: string) => {
  try {
    const user = await db.user.update({
      where: {
        userId,
      },
      data: {
        isBanned: true,
      },
    })
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}

export const unBanUser = async (userId: string) => {
  try {
    const user = await db.user.update({
      where: {
        userId,
      },
      data: {
        isBanned: false,
      },
    })
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}

export const toTeacher = async (userId: string) => {
  try {
    const user = (await getUser(userId))!
    await db.user.update({
      where: {
        userId,
      },
      data: {
        role: "teacher",
      },
    })
    await db.teacher.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        userObjId: user.id,
      },
    })
    if (user.role === "admin")
      await db.admin.delete({
        where: {
          userId,
        },
      })
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}

export const toAdmin = async (userId: string) => {
  try {
    const user = (await getUser(userId))!
    await db.user.update({
      where: {
        userId,
      },
      data: {
        role: "admin",
      },
    })
    await db.admin.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        userObjId: user.id,
      },
    })
    if (user.role === "teacher")
      await db.teacher.delete({
        where: {
          userId,
        },
      })
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}

export const toUser = async (userId: string) => {
  try {
    const user = (await getUser(userId))!
    await db.user.update({
      where: {
        userId,
      },
      data: {
        role: "user",
      },
    })
    if (user.role === "teacher")
      await db.teacher.delete({
        where: {
          userId,
        },
      })
    if (user.role === "admin")
      await db.admin.delete({
        where: {
          userId,
        },
      })
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}
