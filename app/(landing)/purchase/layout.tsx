import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { getUser } from "@/lib/actions/user.actions"

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  if (!user) redirect(`/sign-in`)
  const userInfo = await getUser(user.id)
  // if (!userInfo) redirect(`/onboarding?promo=${searchParams?.promo}`)
  const courses = await getCourses()
  if (!courses || !courses.length) return <div>No Courses found</div>
  // Extensiblity: Can show multiple courses if needed
  console.log(userInfo?.purchases)
  const isPurchased =
    !!userInfo?.purchases?.length && userInfo?.role === "student"
  const isAdmin = ["teacher", "admin"].includes(userInfo?.role || "")
  if (isPurchased) {
    redirect("/student/courses")
  }
  if (isAdmin) {
    redirect("/teacher/dashboard")
  }

  return <>{children}</>
}

export default DashBoardLayout
