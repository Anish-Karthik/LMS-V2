import { db } from "../db"

export const isUserRazorpayCustomer = async (userId: string) => {
  try {
    const razorpayCustomer = await db.razorpayCustomer.findUnique({
      where: {
        userId,
      },
    })
    return !!razorpayCustomer
  } catch (e) {
    console.log(e)
    return false
  }
}

export const createRazorpayCustomer = async (
  userId: string,
  razorpayCustomerId: string
) => {
  try {
    const razorpayCustomer = await db.razorpayCustomer.create({
      data: {
        userId,
        razorpayCustomerId,
      },
    })
    return razorpayCustomer
  } catch (e: any) {
    console.error(e)
    throw new Error("Stripe customer creation failed", e.message)
  }
}

export const getRazorpayCustomer = async (userId: string) => {
  try {
    const razorpayCustomer = await db.razorpayCustomer.findUnique({
      where: {
        userId,
      },
    })
    return razorpayCustomer
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}
