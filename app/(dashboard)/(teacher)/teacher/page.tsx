import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

const page = async () => {
  // const user = await currentUser()
  // if (!user) redirect("/sign-in")
  redirect("/teacher/dashboard")
  return <div>page</div>
}

export default page
