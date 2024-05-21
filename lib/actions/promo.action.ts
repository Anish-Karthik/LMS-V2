import { db } from "../db"
import { sendmail } from "../mailing/mailer"

export type CreateOrUpdatePromoProps = {
  id?: string
  code: string
  discount: number
  expiresAt?: Date
  userId: string
  referralBonus?: number
}

export const createOrUpdatePromo = async ({
  id,
  code,
  discount,
  expiresAt,
  userId,
  referralBonus = 100,
}: CreateOrUpdatePromoProps) => {
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
    const STUDENT_REFERRAL_DURATION_MONTHS =
      parseInt(process.env.STUDENT_REFERRAL_DURATION_MONTHS || "0") || 6
    const TEACHER_REFERRAL_DURATION_YEARS =
      parseInt(process.env.TEACHER_REFERRAL_DURATION_YEARS || "0") || 1
    const STUDENT_REFERRAL_DISCOUNT =
      parseInt(process.env.STUDENT_REFERRAL_DISCOUNT || "0") || 10
    const TEACHER_REFERRAL_DISCOUNT =
      parseInt(process.env.TEACHER_REFERRAL_DISCOUNT || "0") || 15
    const promo = await db.promo.create({
      data: {
        code,
        discount:
          userInfo.role === "teacher"
            ? TEACHER_REFERRAL_DISCOUNT
            : userInfo.role === "student"
            ? STUDENT_REFERRAL_DISCOUNT
            : discount,
        expiresAt:
          userInfo.role === "student"
            ? new Date(
                Date.now() +
                  1000 * 60 * 60 * 24 * 30 * STUDENT_REFERRAL_DURATION_MONTHS
              )
            : userInfo.role === "teacher"
            ? new Date(
                Date.now() +
                  1000 *
                    60 *
                    60 *
                    24 *
                    30 *
                    12 *
                    TEACHER_REFERRAL_DURATION_YEARS
              )
            : expiresAt,
        type: ["student", "teacher"].includes(userInfo.role)
          ? "referral"
          : "promo",
        amountToUser: userInfo.role === "student" ? referralBonus : 0,
        userObjId: userInfo.id,
      },
    })

    await db.user.update({
      where: {
        userId,
      },
      data: {
        promos: {
          connect: {
            id: promo.id,
          },
        },
      },
    })

    return promo
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

export const afterReferral = async (promoCode: string, userId: string) => {
  try {
    console.log(`afterReferral`, promoCode)
    const userInfo = await db.user.findUnique({ where: { userId } })
    if (!userInfo) {
      throw new Error("User not found")
    }
    console.log(`userInfo`, userInfo)
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

    const creatorInfo = await db.user.update({
      where: {
        id: promo.userObjId,
      },
      data: {
        // FIXBUG: notworking
        referralBonus: {
          increment: Number(promo.amountToUser),
        },
        referralCount: {
          increment: 1,
        },
      },
    })

    if (!creatorInfo) {
      throw new Error("User not found")
    }

    if (promo.type === "promo") {
      sendmail({
        to: [creatorInfo.email],
        subject: "Promo Code Used",
        html: `<p>${userInfo.name} with email ${userInfo.email} has used promo code ${promo.code}</p>`,
      })
    } else {
      sendmail({
        to: [creatorInfo.email],
        subject: "Referral Used",
        html: `<p>${userInfo.name} with email ${userInfo.email} has used referral code ${promo.code}</p>`,
      })
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
