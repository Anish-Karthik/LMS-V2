import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"

import { getDefaultBatch } from "@/lib/actions/course.actions"
import { afterReferral } from "@/lib/actions/promo.action"
import { purchaseCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const user = await currentUser()
  const body: {
    userId: string
    courseId: string
    batchId: string
    price: number
    referred: boolean
    promoCode: string | undefined | null
    paymentId: string
    orderId: string
    signature: string
  } = await req.json()
  const { userId, courseId, batchId, price, referred, promoCode } = body
  if (!userId || !courseId) {
    return new NextResponse(`Webhook Error: Missing metadata`, {
      status: 400,
    })
  }
  if (!user || user.id !== userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const defaultBatch = await getDefaultBatch(courseId)
  await purchaseCourse({
    userId,
    courseId,
    batchId: batchId || defaultBatch.id,
    price: price || 0,
    referred,
    promo: !!promoCode,
  })
  console.log("purchaseCourse", userId, courseId)
  if (promoCode) {
    console.log("afterReferral from route", promoCode)
    await afterReferral(promoCode, userId)
  }
  await db.razorpayPurchase.create({
    data: {
      paymentId: body.paymentId,
      orderId: body.orderId,
      signature: body.signature,
      userId,
    },
  })
  console.log("******", promoCode)
  redirect(`/student/dashboard`)
}
