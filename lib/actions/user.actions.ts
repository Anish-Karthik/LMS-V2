import { db } from "../db"
import { randomString } from "../format"
import { addStudentToBatch } from "./batch.action"
import { getDefaultBatch } from "./course.actions"
import { createOrUpdatePromo, isUniquePromoCode } from "./promo.action"

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
    const purchase = await db.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
    })
    return !!purchase
  } catch (e: any) {
    console.log(e)
    throw new Error(e.message || "Unauthorized user")
  }
}

export const purchaseCourse = async (
  userId: string,
  courseId: string,
  batchId: string
) => {
  try {
    const user = await getUser(userId)
    console.log("user", user)
    if (!courseId || !userId || !user) throw new Error("Invalid data")
    const isPurchased = !!(await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
        batchId,
      },
    }))

    if (isPurchased) throw new Error("Already purchased")
    let defaultBatch = await getDefaultBatch(courseId)
    const purchase = await db.purchase.create({
      data: {
        courseId,
        userId,
        userObjId: user.id,
        batchId: defaultBatch.id,
      },
    })
    await db.user.update({
      where: {
        userId,
      },
      data: {
        role: "student",
      },
    })

    console.log("defaultBatch", defaultBatch)
    await addStudentToBatch(defaultBatch.id, purchase.id)

    let promoCode = randomString(12)
    while (!(await isUniquePromoCode(promoCode))) {
      promoCode = randomString(12)
    }
    await createOrUpdatePromo({
      userId,
      code: promoCode,
      discount: 10,
      referralBonus: 100,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
    return purchase
  } catch (e: any) {
    console.log("purchaseCourse", e.message)
    console.error("purchaseCourse", e.message)
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
