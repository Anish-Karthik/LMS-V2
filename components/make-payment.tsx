//components->MakePaymentComponent.js

import React from "react"
import Image from "next/image"

interface PaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

const MakePaymentComponent = () => {
  const makePayment = async () => {
    //console.log("here...");
    const res = await initializeRazorpay()
    if (!res) {
      alert("Razorpay SDK Failed to load")
      return
    }
    // Make API call to the serverless API
    const data: {
      id: string
      currency: string
      amount: number
      courseId: string
      userId: string
      promoCode: string
      price: number
      referred: boolean
      batchId: string
    } = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taxAmt: 100,
      }),
    }).then((t) => t.json())
    console.log(data)
    const { currency, amount, id, ...rest } = data
    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "www.praglis.in",
      currency: currency,
      amount: amount,
      order_id: id,
      description: "Thankyou for your test donation",
      image: "/images/logo2.jpg",
      handler: async function (response: PaymentResponse) {
        console.log(response)
        // Validate payment at server - using webhooks is a better idea.
        alert("Razorpay Response: " + response.razorpay_payment_id)
        fetch("/api/razorpay/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            ...rest,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
      },
      prefill: {
        name: "Siddarth Praveer",
        email: "media.praglis@gmail.com",
        contact: "9853785519",
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()
  }
  const initializeRazorpay = () => {
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
  return (
    <div>
      <button onClick={() => makePayment()}>Pay 100 now</button>
    </div>
  )
}

export default MakePaymentComponent
