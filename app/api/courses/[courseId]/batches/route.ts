import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const batches = await db.batch.findMany({
      where: {
        courseId: params.courseId,
        isClosed: false,
      },
    })

    return NextResponse.json(batches)
  } catch (error) {
    console.error("[BATCHES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
