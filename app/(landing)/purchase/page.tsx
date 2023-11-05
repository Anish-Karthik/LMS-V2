import { redirect } from "next/navigation"

import { getCourses } from "@/lib/actions/course.actions"

const page = async ({ searchParams }: { searchParams: { promo: string } }) => {
  const courses = await getCourses()
  if (!courses || !courses.length) {
    redirect("/create-course")
  }
  const courseId = courses[0].id
  console.log(searchParams.promo)
  redirect(`/purchase/${courseId}?promo=${searchParams.promo}`)
  return <div>page</div>
}

export default page
