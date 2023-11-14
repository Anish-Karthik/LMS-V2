import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const userRouter = router({
  get: publicProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input: userId } = opts
      const userInfo = await getUser(userId)
      return userInfo
    } catch (error: any) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
    }
  }),
  getAll: publicProcedure.query(async () => {
    try {
      const users = await db.user.findMany()
      return users
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to get users",
      })
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        phoneNo: z.string(),
        name: z.string(),
        image: z.string(),
        gender: z.string().optional(),
        dob: z.date().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        email: z.string().optional(),
        employmentStatus: z.string().optional(),
        howDidHear: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!input.userId)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User id is required",
          })
        const user = await db.user.findFirst({
          where: {
            userId: input.userId,
          },
        })
        if (user)
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          })
        await db.user.create({
          data: {
            userId: input.userId,
            role: "user",
            email: input.email!,
            phoneNo: input.phoneNo,
            image: input.image,
            name: input.name,
            gender: input.gender?.toLowerCase(),
            dob: input.dob!,
            country: input.country!,
            state: input.state,
            city: input.city,
            employmentStatus: input.employmentStatus,
            howDidHear: input.howDidHear,
            isBanned: false,
            referralBonus: 0,
            referralCount: 0,
          },
        })
        return { message: "User created successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to create user",
        })
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        phoneNo: z.string().optional(),
        name: z.string().optional(),
        image: z.string().optional(),
        gender: z.string().optional(),
        dob: z.coerce.date().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        email: z.string().optional(),
        employmentStatus: z.string().optional(),
        howDidHear: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!input.userId)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User id is required",
          })
        await db.user.update({
          where: {
            userId: input.userId,
          },
          data: {
            phoneNo: input.phoneNo,
            image: input.image,
            name: input.name,
            gender: input.gender,
            dob: input.dob,
            country: input.country,
            state: input.state,
            city: input.city,
          },
        })

        return { message: "User updated successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user",
        })
      }
    }),

  ban: publicProcedure.input(z.string()).mutation(async ({ input: userId }) => {
    try {
      await db.user.update({
        where: {
          userId,
        },
        data: {
          isBanned: true,
        },
      })
      return { message: "User banned successfully", success: true }
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to ban user",
      })
    }
  }),

  unBan: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
      try {
        await db.user.update({
          where: {
            userId,
          },
          data: {
            isBanned: false,
          },
        })
        return { message: "User unbanned successfully", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to unban user",
        })
      }
    }),

  toTeacher: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
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
        return { message: "User role updated to teacher", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),

  toAdmin: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
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
        return { message: "User role updated to admin", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),

  toUser: publicProcedure
    .input(z.string())
    .mutation(async ({ input: userId }) => {
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
        return { message: "User role updated to user", success: true }
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update user role",
        })
      }
    }),
})
