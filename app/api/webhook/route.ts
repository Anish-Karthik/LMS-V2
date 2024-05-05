import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { getDefaultBatch } from "@/lib/actions/course.actions"
import { afterReferral } from "@/lib/actions/promo.action"
import { purchaseCourse } from "@/lib/actions/user.actions"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId
  const promoCode = session?.metadata?.promoCode
  const price = session?.metadata?.price
  const referred = session?.metadata?.referred
  const batchId = session?.metadata?.batchId

  console.log(referred)
  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      })
    }
    const defaultBatch = await getDefaultBatch(courseId)
    await purchaseCourse({
      userId,
      courseId,
      batchId: batchId || defaultBatch.id,
      price: parseInt(price || "0"),
      referred: referred == "true",
      promo: !!promoCode,
    })
    console.log("purchaseCourse", userId, courseId)
    if (promoCode) {
      console.log("afterReferral from route", promoCode)
      await afterReferral(promoCode, userId)
    }
    console.log("******", promoCode)
    redirect(`/student/dashboard`)
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    )
  }

  return new NextResponse(null, { status: 200 })
}
