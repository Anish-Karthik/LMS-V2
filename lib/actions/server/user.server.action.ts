"use server"

import { db } from "@/lib/db"

import { getUser } from "../user.actions"

type CreateUserProps = {
  userId: string
  phoneNo: string
  name: string
  image: string
  gender?: string
  dob?: Date
  country?: string
  state?: string
  city?: string
  email?: string
  employmentStatus?: string
  howDidHear?: string
}
// Has Replaced by TRPC in client
export const createUser = async ({
  userId,
  email,
  phoneNo,
  name,
  image,
  gender,
  dob,
  country,
  state,
  city,
  employmentStatus,
  howDidHear,
}: CreateUserProps) => {
  try {
    if (!userId) throw new Error("Unauthorized user")
    const user = await db.user.findFirst({
      where: {
        userId: userId,
      },
    })
    if (user) throw new Error("Unauthorized user")
    await db.user.create({
      data: {
        userId,
        role: "user",
        email: email!,
        phoneNo,
        image,
        name,
        gender: gender!.toLowerCase(),
        dob: dob!,
        country: country!,
        state,
        city,
        employmentStatus,
        howDidHear,
        isBanned: false,
        referralBonus: 0,
        referralCount: 0,
      },
    })

    return true
  } catch (e: any) {
    console.log(e)
    throw new Error(e.message || "Unauthorized user")
  }
}

// Has Replaced by TRPC in client
export const updateUser = async ({
  userId,
  phoneNo,
  name,
  image,
  gender,
  dob,
  country,
  state,
  city,
}: CreateUserProps) => {
  try {
    if (!userId) throw new Error("Unauthorized user")
    await db.user.update({
      where: {
        userId,
      },
      data: {
        phoneNo,
        image,
        name,
        gender,
        dob,
        country,
        state,
        city,
        referralBonus: {
          increment: 1000,
        },
        referralCount: {
          increment: 1,
        },
      },
    })
    return true
  } catch (err: any) {
    console.error(err)
    throw new Error(err.message)
  }
}
// Has Replaced by TRPC in client
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
