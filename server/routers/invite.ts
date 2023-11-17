import { TRPCError } from "@trpc/server"
import { z } from "zod"

import {
  createOrUpdateInvite,
  getInviteByInvite,
  isUniqueInvite,
} from "@/lib/actions/invite.action"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const inviteRouter = router({
  createOrUpdate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        invite: z.string(),
        uses: z.number(),
        expiresAt: z.date(),
        userId: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await createOrUpdateInvite(input)
      } catch (error: any) {
        console.error(error)
        throw new Error("Invite not created/updated", error.message)
      }
    }),

  isUnique: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      return await isUniqueInvite(input)
    } catch (error: any) {
      console.error(error)
      throw new Error("Error checking uniqueness of invite", error.message)
    }
  }),

  isValidInvite: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const inviteLink = await db.invite.findUnique({
        where: { invite: input },
      })
      return !!inviteLink
    } catch (error: any) {
      console.error(error)
      throw new Error("Error checking validity of invite", error.message)
    }
  }),

  isInviteExpired: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const inviteLink = await db.invite.findUnique({
          where: { invite: input },
        })
        if (!inviteLink) {
          return false
        }
        if (inviteLink.expiresAt && inviteLink.expiresAt < new Date()) {
          return true
        }
        return false
      } catch (error: any) {
        console.error(error)
        throw new Error("Error checking expiration of invite", error.message)
      }
    }),

  getByInvite: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      return await getInviteByInvite(input)
    } catch (error: any) {
      console.error(error)
      throw new Error("Error getting invite by invite code", error.message)
    }
  }),
})
