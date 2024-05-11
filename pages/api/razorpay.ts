import { NextApiRequest, NextApiResponse } from "next"
import Razorpay from "razorpay"
import shortid from "shortid"

interface CreateOrderResponse {
  id: string
  currency: string
  amount: number | string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taxAmt }: { taxAmt: number } = req.body

  console.log(req.body)
  console.log(taxAmt)
  //console.log('taxAmt',taxAmt*100)
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET!,
    })

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture: number = 1
    const amount: number = taxAmt
    const currency: string = "INR"
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    }

    try {
      const response: CreateOrderResponse = await razorpay.orders.create(
        options
      )
      console.log(response)
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: Number(response.amount), // Convert the amount to a number
      })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    // Handle any other HTTP method
  }
}
