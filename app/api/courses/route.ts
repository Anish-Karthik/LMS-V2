import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs"

import { createCourse } from "@/lib/actions/server/course.server.action"
import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userInfo = await getUser(userId)
    if (
      !userInfo ||
      (userInfo.role !== "teacher" && userInfo.role !== "admin")
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { title, description, imageUrl, price, type } = await req.json()

    if (!title || !description || !imageUrl || !type) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const course = await createCourse({
      title,
      description,
      imageUrl,
      price: price || 0,
      type,
    })

    // Add the teacher to the course
    await db.teacher.update({
      where: {
        userId: userId,
      },
      data: {
        courseIds: {
          push: course.id,
        },
        courses: {
          connect: {
            id: course.id,
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
