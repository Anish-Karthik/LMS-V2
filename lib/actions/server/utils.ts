"use server"
import { db } from "@/lib/db"
export const doesPhoneNumberAlreadyExist = async (phoneNo: string) => {
  const res = await db.user.findUnique({
    where: {
      phoneNo,
    },
  })
  return !!res
}