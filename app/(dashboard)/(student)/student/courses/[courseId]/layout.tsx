import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { Header } from "@/components/shared/header"

const DashBoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  if (!params.courseId) redirect("/student/courses")
  const purchased = await isUserPurchasedCourse(user.id, params.courseId)
  if (!purchased) redirect("/course-details/" + params.courseId)

  return <main>{children}</main>
}

export default DashBoardLayout
