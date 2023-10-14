import React from "react"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: { courseId: string } }) => {
  redirect("/student/courses/" + params.courseId + "/dashboard")
  return <div>page</div>
}

export default page
