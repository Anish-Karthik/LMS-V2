import React from "react"
import { redirect } from "next/navigation"

const page = () => {
  redirect("/student/dashboard")
  return <div>page</div>
}

export default page
