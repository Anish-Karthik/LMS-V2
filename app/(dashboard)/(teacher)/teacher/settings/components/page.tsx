import React from "react"
import { redirect } from "next/navigation"

const page = () => {
  redirect("/student/courses")
  return <div>page</div>
}

export default page
