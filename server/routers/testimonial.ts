import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const testimonialRouter = router({
  create: publicProcedure
    .input(
      z.object({
        description: z.string(),
        rating: z.number(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const userInfo = await db.user.findUnique({
          where: {
            userId: input.userId,
          },
          include: {
            testimonials: true,
          },
        })
        if (!userInfo) {
          throw new Error("User not found")
        }
        if (userInfo.role === "user") {
          throw new Error("You can't add testimonial as a not a student")
        }
        if (
          userInfo.testimonials.length >= 1 &&
          ["student"].includes(userInfo.role)
        ) {
          throw new Error("You can't add more than 1 testimonial")
        }
        const testimonial = await db.testimonial.create({
          data: {
            description: input.description,
            rating: input.rating,
            user: {
              connect: {
                id: userInfo.id,
              },
            },
          },
        })
        return testimonial
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        })
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
        rating: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const testimonial = await db.testimonial.update({
          where: {
            id: input.id,
          },
          data: {
            description: input.description,
            rating: input.rating,
          },
        })
        if (!testimonial) {
          throw new Error("Testimonial not found")
        }
        return testimonial
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        })
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const testimonial = await db.testimonial.delete({
        where: {
          id: input,
        },
      })
      if (!testimonial) {
        throw new Error("Testimonial not found")
      }
      return testimonial
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      })
    }
  }),
})
