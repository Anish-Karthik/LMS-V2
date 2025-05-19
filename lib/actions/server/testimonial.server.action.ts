"use server"

import { db } from "@/lib/db"

export const createTestimonial = async ({
  description,
  rating,
  userId,
  courseId,
}: {
  description: string
  rating: number
  userId: string
  courseId: string
}) => {
  try {
    const userInfo = await db.user.findUnique({
      where: {
        userId,
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
      // @ts-ignore
      data: {
        description,
        rating,
        courseId,
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const updateTestimonial = async ({
  id,
  description,
  rating,
}: {
  id: string
  description: string
  rating: number
}) => {
  try {
    const testimonial = await db.testimonial.update({
      where: {
        id,
      },
      data: {
        description,
        rating,
      },
    })
    if (!testimonial) {
      throw new Error("Testimonial not found")
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const deleteTestimonial = async (id: string) => {
  try {
    const testimonial = await db.testimonial.delete({
      where: {
        id,
      },
    })
    if (!testimonial) {
      throw new Error("Testimonial not found")
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
