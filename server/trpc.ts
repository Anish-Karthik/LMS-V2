import { auth } from "@clerk/nextjs"
import { initTRPC } from "@trpc/server"

import { db } from "@/lib/db"

export const createContext = async () => {
  const { userId } = auth()

  let userObjId = ""
  if (userId) {
    const user = await db.user.findUnique({
      where: {
        userId,
      },
    })
    userObjId = user?.id || ""
  }

  return {
    userId,
    userObjId,
  }
}

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createContext>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
