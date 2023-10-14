import React from "react"
import { redirect } from "next/navigation"

import { getCourses } from "@/lib/actions/course.actions"

const page = async () => {
  const courses = await getCourses()
  if (!courses || courses.length === 0) redirect("/")

  redirect("/course-details/" + courses[0].id)
  return <div>page</div>
}

export default page
