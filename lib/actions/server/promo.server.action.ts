"use server"

import { db } from "@/lib/db"

import {
  CreateOrUpdatePromoProps,
  createOrUpdatePromo,
  getPromoByCode,
  isUniquePromoCode,
} from "../promo.action"

export const createOrUpdatePromoClient = async ({
  id,
  code,
  discount,
  expiresAt,
  userId,
  referralBonus,
}: CreateOrUpdatePromoProps) => {
  return createOrUpdatePromo({
    id,
    code,
    discount,
    expiresAt,
    userId,
    referralBonus,
  })
}

export async function isUniquePromoCodeClient(code: string) {
  return await isUniquePromoCode(code)
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

export const getPromoByCodeClient = async (code: string) => {
  return await getPromoByCode(code)
}
