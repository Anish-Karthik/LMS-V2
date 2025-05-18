import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userFromDb = await db.user.findUnique({
      where: { userId },
    })

    if (
      !userFromDb ||
      (userFromDb.role !== "teacher" && userFromDb.role !== "admin")
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Find the chapter
    const chapter = await db.chapter.findUnique({
      where: { id: params.chapterId },
    })

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 })
    }

    // Delete the chapter
    await db.chapter.delete({
      where: { id: params.chapterId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[CHAPTER_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
