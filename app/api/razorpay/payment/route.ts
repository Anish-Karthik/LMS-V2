import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"

import { getCourseById, getDefaultBatch } from "@/lib/actions/course.actions"
import { afterReferral } from "@/lib/actions/promo.action"
import { purchaseCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const user = await currentUser()
  const body: {
    userId: string
    courseId: string
    batchId?: string
    courseType?: "self-paced" | "batch-based"
    price: number
    referred: boolean
    promoCode: string | undefined | null
    paymentId: string
    orderId: string
    signature: string
  } = await req.json()

  const { userId, courseId, batchId, price, referred, promoCode, courseType } =
    body

  if (!userId || !courseId) {
    return new NextResponse(`Webhook Error: Missing metadata`, {
      status: 400,
    })
  }

  if (!user || user.id !== userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Get course to check its type
    const course = await getCourseById(courseId)
    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // For batch-based courses, require a batchId
    let batchIdToUse: string | undefined = batchId

    if (course.type === "batch-based") {
      // If no batchId was provided, get the default batch
      if (!batchIdToUse) {
        const defaultBatch = await getDefaultBatch(courseId)
        batchIdToUse = defaultBatch.id
      }
    } else {
      // For self-paced courses, batchId should be undefined
      batchIdToUse = undefined
    }

    await purchaseCourse({
      userId,
      courseId,
      batchId: batchIdToUse,
      price: price || 0,
      referred,
      promo: !!promoCode,
    })
  } catch (error) {
    console.error("Error in purchaseCourse", error)
    return new NextResponse("Error in purchaseCourse", { status: 500 })
  }

  // Handle promo code if provided
  if (!!promoCode) {
    try {
      afterReferral(promoCode, userId).catch((err) =>
        console.log("Error in afterReferral", err)
      )
    } catch (error) {
      console.log("Error in afterReferral", error)
    }
  }

  // Record the Razorpay purchase details
  try {
    await db.razorpayPurchase.create({
      data: {
        paymentId: body.paymentId,
        orderId: body.orderId,
        signature: body.signature,
        userId: userId || user.id,
      },
    })
  } catch (error: any) {
    console.error("Error recording Razorpay purchase", error)
  }

  return new NextResponse("success", { status: 200 })
}
