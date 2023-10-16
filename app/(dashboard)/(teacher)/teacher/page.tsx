import React from "react"
import { redirect } from "next/navigation"

const page = () => {
  redirect("/teacher/dashboard")
  return <div>page</div>
}

export default page
