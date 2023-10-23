import { db } from "../db"

export const isUserStripeCustomer = async (userId: string) => {
  try {
    const stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId,
      },
    })
    return !!stripeCustomer
  } catch (e) {
    console.log(e)
    return false
  }
}

export const createStripeCustomer = async (
  userId: string,
  stripeCustomerId: string
) => {
  try {
    const stripeCustomer = await db.stripeCustomer.create({
      data: {
        userId,
        stripeCustomerId,
      },
    })
    return stripeCustomer
  } catch (e: any) {
    console.error(e)
    throw new Error("Stripe customer creation failed", e.message)
  }
}

export const getStripeCustomer = async (userId: string) => {
  try {
    const stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId,
      },
    })
    return stripeCustomer
  } catch (e: any) {
    console.error(e)
    throw new Error(e.message)
  }
}
