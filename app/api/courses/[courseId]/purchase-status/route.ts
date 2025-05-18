import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { isUserPurchasedCourse } from "@/lib/actions/user.actions"

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const isPurchased = await isUserPurchasedCourse(userId, params.courseId)

    return NextResponse.json({ isPurchased })
  } catch (error) {
    console.error("[PURCHASE_STATUS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
