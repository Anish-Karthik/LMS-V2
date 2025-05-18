import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const chapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
      include: {
        topics: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    })

    return NextResponse.json(chapters)
  } catch (error) {
    console.error("[CHAPTERS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
