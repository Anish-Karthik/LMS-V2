import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import Stripe from "stripe"

import { getCourseById } from "@/lib/actions/course.actions"
import {
  createStripeCustomer,
  getStripeCustomer,
} from "@/lib/actions/stripe.action"
import { isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser()
    const body = await req.json()
    const { price, promo, batchId } = body
    console.log("price", price)
    console.log("promo", promo)
    console.log("user", user)
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await getCourseById(params.courseId)

    const purchase = await isUserPurchasedCourse(user.id, params.courseId)

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 })
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round((price || course.price!) * 100),
        },
      },
    ]

    // let isStripeCustomer = await isUserStripeCustomer(user.id);
    let stripeCustomer = await getStripeCustomer(user.id)

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      })

      stripeCustomer = await createStripeCustomer(user.id, customer.id)
    }

    const referred =
      !!(
        await db.promo.findFirst({
          where: {
            code: promo.code,
            user: {
              OR: [{ role: "student" }, { role: "teacher" }],
            },
          },
        })
      )?.code ?? false
    console.log("referred", referred)
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/student/announcements?success=1&courseId=${course.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/${course.id}/?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
        promoCode: (promo as Promo)?.code,
        price: price || course.price,
        batchId: batchId,
        referred: referred.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
