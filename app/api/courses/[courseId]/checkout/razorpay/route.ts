import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import Razorpay from "razorpay"
import { Orders } from "razorpay/dist/types/orders"
import shortid from "shortid"

import { getCourseById } from "@/lib/actions/course.actions"
import {
  createRazorpayCustomer,
  getRazorpayCustomer,
} from "@/lib/actions/razorpay.action"
import { getUser, isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import {
  CreateOrderRequest,
  CreateOrderResponse,
  RazorpayCheckoutRequestBody,
} from "@/lib/make-payment"
import { razorpay } from "@/lib/razorpay"

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser()
    const body: RazorpayCheckoutRequestBody = await req.json()
    const { price, promoCode, batchId } = body
    console.log("price", price)
    console.log("user", user)
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userData = await getUser(user?.id)
    if (!userData) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await getCourseById(params?.courseId)

    const purchase = await isUserPurchasedCourse(user.id, params?.courseId)

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 })
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const options:
      | Orders.RazorpayOrderCreateRequestBody
      | Orders.RazorpayTransferCreateRequestBody
      | Orders.RazorpayAuthorizationCreateRequestBody = {
      amount: (price * 100).toString(),
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: true,
    }

    try {
      let razorpayCustomer = await getRazorpayCustomer(user.id)
      if (!razorpayCustomer) {
        const customer = await razorpay.customers.create({
          email: userData.email,
          contact:
            user?.phoneNumbers[0]?.phoneNumber || userData.phoneNo || undefined,
          name: userData.name || user.firstName + " " + user.lastName,
        })
        razorpayCustomer = await createRazorpayCustomer(user.id, customer.id)
      }

      const referred =
        !!(
          await db.promo.findFirst({
            where: {
              code: promoCode || "",
              user: {
                OR: [{ role: "student" }, { role: "teacher" }],
              },
            },
          })
        )?.code ?? false
      console.log("referred", referred)
      const response: CreateOrderResponse = await razorpay.orders.create(
        options
      )
      console.log(response)
      const data: CreateOrderResponse & CreateOrderRequest = {
        id: response.id,
        currency: response.currency,
        amount: Number(response.amount), // Convert the amount to a number
        courseId: course.id,
        userId: user.id,
        promoCode: promoCode,
        price: price || course.price!,
        batchId: batchId,
        referred: referred,
      }
      return NextResponse.json(data)
    } catch (err: any) {
      console.log(err)
      return new NextResponse(err?.message, { status: 400 })
    }
  } catch (e) {
    console.error(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
