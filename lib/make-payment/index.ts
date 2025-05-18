import axios from "axios"
import toast from "react-hot-toast"

import { getUserClient } from "../actions/server/user.server.action"

export interface RazorpayCheckoutRequestBody {
  gst: number
  price: number
  promoCode: string | undefined | null
  batchId?: string
  courseType?: "self-paced" | "batch-based"
}

export interface PaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface CreateOrderResponse {
  id: string
  currency: string
  amount: number | string
}

export interface CreateOrderRequest extends RazorpayCheckoutRequestBody {
  courseId: string
  userId: string
  referred?: boolean
}

export const makePayment = async ({
  courseId,
  userId,
  promoCode,
  gst,
  price,
  batchId,
  courseType,
  setPurchasing,
}: CreateOrderRequest & {
  setPurchasing: (purchasing: boolean) => void
  courseType?: "self-paced" | "batch-based"
}) => {
  //console.log("here...");
  if (!userId) return Promise.reject("Unauthorized")
  const userData = await getUserClient(userId)
  if (!userData) return Promise.reject("Unauthorized")
  const res = await initializeRazorpay()
  if (!res) {
    alert("Razorpay SDK Failed to load")
    return
  }

  // Prepare request payload
  const payload: any = {
    price,
    gst,
    promoCode,
    courseType,
  }

  // Only add batchId for batch-based courses
  if (courseType !== "self-paced" && batchId) {
    payload.batchId = batchId
  }
  console.log(payload)
  // Make API call to the serverless API
  const { data }: { data: CreateOrderRequest & CreateOrderResponse } =
    await axios.post(`/api/courses/${courseId}/checkout/razorpay`, payload)
  console.log(data)
  const { currency, amount, id, ...rest } = data

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!, // Enter the Key ID generated from the Dashboard
    name: "localhost:3000",
    currency: currency,
    amount: amount,
    order_id: id,
    description: "Thank you for purchasing the course",
    image: "/images/logo2.jpg",
    handler: async function (response: PaymentResponse) {
      // Validate payment at server - using webhooks is a better idea.
      setPurchasing(true)
      toast.loading("Purchasing Course")
      try {
        await axios.post("/api/razorpay/payment", {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          ...rest,
          courseType,
        })
        toast.remove()
        toast.success("Purchase Successful")
      } catch (error: any) {
        // refund the payment
        toast.remove()
        if (error.code === 504) {
          toast.success("Purchase Successful")
        } else if (error.code === 500) {
          toast.error(
            "Payment success, some error occurred in adding you to course. Don't worry, admin can add you to course manually. Contact them."
          )
        } else {
          toast.success("Purchase Successful")
        }
        console.error(error)
      }
      setPurchasing(false)
    },
    prefill: {
      name: userData.name,
      email: userData.email,
      contact: userData.phoneNo,
    },
  }

  const paymentObject = new (window as any).Razorpay(options)
  paymentObject.open()
}

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    // document.body.appendChild(script);

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script)
  })
}
