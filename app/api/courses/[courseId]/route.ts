import { NextResponse } from "next/server"

import { getCourseById } from "@/lib/actions/course.actions"

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await getCourseById(params.courseId)

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSE_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
