import { redirect } from "next/navigation"

import { getCourses } from "@/lib/actions/course.actions"

const page = async () => {
  const courses = await getCourses()
  if (!courses || !courses.length) {
    redirect("/create-course")
  }
  const courseId = courses[0].id
  console.log(courseId)
  redirect(`/purchase/${courseId}`)
  return <div>page</div>
}

export default page
