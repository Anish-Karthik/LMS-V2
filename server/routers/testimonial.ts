import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { db } from "@/lib/db"

import { publicProcedure, router } from "../trpc"

export const testimonialRouter = router({
  create: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        description: z.string().min(10),
        rating: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a testimonial",
        })
      }

      try {
        const user = await db.user.findUnique({
          where: { userId: ctx.userId },
          select: {
            id: true,
            role: true,
            purchases: {
              where: { courseId: input.courseId },
            },
          },
        })

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          })
        }

        if (user.purchases.length === 0) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only review courses you are enrolled in",
          })
        }

        const existingTestimonial = await db.testimonial.findFirst({
          where: {
            userObjId: user.id,
            courseId: input.courseId,
          },
        })

        if (existingTestimonial) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You have already reviewed this course",
          })
        }

        const testimonial = await db.testimonial.create({
          data: {
            description: input.description,
            rating: input.rating,
            userObjId: user.id,
            courseId: input.courseId,
          },
        })

        return testimonial
      } catch (error) {
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create testimonial",
        })
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string().min(10),
        rating: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to update a testimonial",
        })
      }

      try {
        const user = await db.user.findUnique({
          where: { userId: ctx.userId },
          select: { id: true },
        })

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          })
        }

        const testimonial = await db.testimonial.findUnique({
          where: { id: input.id },
        })

        if (!testimonial) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Testimonial not found",
          })
        }

        if (testimonial.userObjId !== user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only update your own testimonials",
          })
        }

        const updatedTestimonial = await db.testimonial.update({
          where: { id: input.id },
          data: {
            description: input.description,
            rating: input.rating,
          },
        })

        return updatedTestimonial
      } catch (error) {
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update testimonial",
        })
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    if (!ctx.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to delete a testimonial",
      })
    }

    try {
      const user = await db.user.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        })
      }

      const testimonial = await db.testimonial.findUnique({
        where: { id: input },
      })

      if (!testimonial) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        })
      }

      if (testimonial.userObjId !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own testimonials",
        })
      }

      await db.testimonial.delete({
        where: { id: input },
      })

      return { success: true }
    } catch (error) {
      if (error instanceof TRPCError) throw error

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete testimonial",
      })
    }
  }),

  getByCourse: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const testimonials = await db.testimonial.findMany({
        where: {
          courseId: input,
          isPublished: true,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return testimonials
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch testimonials",
      })
    }
  }),

  getUserTestimonialForCourse: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const user = await db.user.findUnique({
          where: { userId: input.userId },
          select: { id: true },
        })

        if (!user) {
          return null
        }

        const testimonial = await db.testimonial.findFirst({
          where: {
            userObjId: user.id,
            courseId: input.courseId,
          },
        })

        return testimonial
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch testimonial",
        })
      }
    }),
})
