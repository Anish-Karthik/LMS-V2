import { TRPCError } from "@trpc/server"
import { z } from "zod"

import {
  createOrUpdatePromo,
  getPromoByCode,
  isUniquePromoCode,
} from "@/lib/actions/promo.action"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const promoRouter = router({
  createOrUpdate: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        code: z.string(),
        discount: z.number(),
        expiresAt: z.date().optional(),
        userId: z.string(),
        referralBonus: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await createOrUpdatePromo(input)
      } catch (error: any) {
        console.error(error)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Promo code already exists",
        })
      }
    }),

  isUnique: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const isUnique = await isUniquePromoCode(input)
      if (!isUnique) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Promo code already exists",
        })
      }
      return isUnique
    } catch (error: any) {
      console.error(error)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Error checking promo code uniqueness",
      })
    }
  }),

  isValid: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const promo = await db.promo.findUnique({
        where: { code: input },
      })
      return !!promo
    } catch (error: any) {
      console.error(error.message)
      throw new TRPCError({
        code: "CONFLICT",
        message: error.message,
      })
    }
  }),

  isExpired: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const promo = await db.promo.findUnique({
        where: { code: input },
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
      throw new Error("Error checking promo code expiration", error.message)
    }
  }),

  getByCode: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      return await getPromoByCode(input)
    } catch (error: any) {
      console.error(error)
      throw new Error("Error getting promo by code", error.message)
    }
  }),
})
