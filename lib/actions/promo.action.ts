"use server"

import { db } from "../db"

export const createOrUpdatePromo = async ({
  id,
  code,
  discount,
  expiresAt,
  userId,
  referralBonus = 100,
}: {
  id?: string
  code: string
  discount: number
  expiresAt?: Date
  userId: string
  referralBonus?: number
}) => {
  try {
    const userInfo = await db.user.findUnique({
      where: { userId },
    })
    if (!userInfo) {
      throw new Error("User not found")
    }

    if (id) {
      const promo = await db.promo.findUnique({
        where: { id },
      })
      if (promo) {
        return db.promo.update({
          where: { id: promo.id },
          data: {
            code,
            discount,
            expiresAt,
          },
        })
      }
    }

    return db.promo.create({
      data: {
        code,
        discount,
        expiresAt,
        amountToUser: userInfo.role === "student" ? referralBonus : 0,
        userObjId: userInfo.id,
      },
    })
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }
}

export const isUniquePromoCode = async (code: string) => {
  try {
    const promo = await db.promo.findUnique({
      where: { code },
    })
    return !!!promo
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const isValidPromoCode = async (code: string) => {
  try {
    const promo = await db.promo.findUnique({
      where: { code },
    })
    if (!promo) {
      return false
    }
    return true
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const isPromoExpired = async (code: string) => {
  try {
    const promo = await db.promo.findUnique({
      where: { code },
    })
    if (!promo) {
      return false
    }
    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return true
    }
    return false
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const getPromoByCode = async (code: string) => {
  try {
    const promo = await db.promo.findUnique({
      where: { code },
    })
    if (!promo) {
      throw new Error("Promo not found")
    }
    return promo
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const afterReferral = async (promoCode: string) => {
  try {
    console.log(`afterReferral`, promoCode)

    const promo = await db.promo.update({
      where: {
        code: promoCode,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    })

    await db.user.update({
      where: {
        id: promo.userObjId,
      },
      data: {
        name: "Anish Promo",
        // FIXBUG: notworking
        referralBonus: {
          increment: Number(promo.amountToUser),
        },
        referralCount: {
          increment: 1,
        },
      },
    })
  } catch (error: any) {
    console.log(error.message)
  }
}
