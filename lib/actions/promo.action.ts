"use server";

import { db } from "../db";

export const createOrUpdatePromo = async ({
  id,
  code,
  discount,
  expiresAt,
  userId,
  referralBonus = 100,
}: {
  id?: string;
  code: string;
  discount: number;
  expiresAt?: Date;
  userId: string;
  referralBonus?: number;
}) => {
  try {
    const userInfo = await db.user.findUnique({
      where: { userId },
    });
    if (!userInfo) {
      throw new Error("User not found");
    }


    if (id) {
      const promo = await db.promo.findUnique({
        where: { id },
      });
      if (promo) {
        return db.promo.update({
          where: { id: promo.id },
          data: {
            code,
            discount,
            expiresAt,
          },
        });
      }
    }

    return db.promo.create({
      data: {
        code,
        discount,
        expiresAt,
        amountToUser: userInfo.role === 'student'? referralBonus: 0,
        userObjId: userInfo.id,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export const isUniquePromoCode = async (code: string) => {
  try {
    const promo = await db.promo.findUnique({
      where: { code },
    });
    return !!(!promo);
  } catch (error: any) {
    throw new Error(error);
  }
}