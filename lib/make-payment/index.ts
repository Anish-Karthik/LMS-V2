import axios from "axios"
import toast from "react-hot-toast"

import { getUserClient } from "../actions/server/user.server.action"

export interface RazorpayCheckoutRequestBody {
  price: number
  promoCode: string | undefined | null
  batchId: string
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

export interface CreateOrderRequest {
  courseId: string
  userId: string
  promoCode: string | null | undefined
  price: number
  referred?: boolean
  batchId: string
}

export const makePayment = async ({
  courseId,
  userId,
  promoCode,
  price,
  batchId,
  setPurchasing,
}: CreateOrderRequest & {
  setPurchasing: (purchasing: boolean) => void
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
  // Make API call to the serverless API
  const { data }: { data: CreateOrderRequest & CreateOrderResponse } =
    await axios.post(`/api/courses/${courseId}/checkout/razorpay`, {
      price,
      promoCode,
      batchId,
    })
  console.log(data)
  const { currency, amount, id, ...rest } = data
  console.log(rest)
  console.log(currency, amount, id)
  console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY)
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!, // Enter the Key ID generated from the Dashboard
    name: "www.praglis.in",
    currency: currency,
    amount: amount,
    order_id: id,
    description: "Thank you for purchasing the course",
    image: "/images/logo2.jpg",
    handler: async function (response: PaymentResponse) {
      console.log(response)
      // Validate payment at server - using webhooks is a better idea.
      setPurchasing(true)
      toast.loading("Purchasing Course")
      try {
        await axios.post("/api/razorpay/payment", {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          ...rest,
        })
        toast.remove()
        toast.success("Purchase Successful")
      } catch (error) {
        // refund the payment
        toast.remove()
        toast.error(
          "Purchase Failed, your money will be refunded in 1-2 hours or contact support."
        )
        console.error(error)
        console.log(error)
      }
      setPurchasing(false)
    },
    prefill: {
      name: userData.name || "Siddarth Praveer",
      email: userData.email || "media.praglis@gmail.com",
      contact: userData.phoneNo || "9853785519",
    },
  }
  console.log(options)
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
