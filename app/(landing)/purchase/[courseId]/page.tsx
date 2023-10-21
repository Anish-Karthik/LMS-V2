import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import PurchaseCourseForm from "@/components/form/PurchaseCourseForm"

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const userInfo = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (userInfo) {
    if (userInfo.role === "student") redirect("/student/announcements")
    if (userInfo.role === "teacher" || userInfo.role === "admin")
      redirect("/teacher/dashboard")
  } else {
    redirect("/onboarding")
  }

  return <PurchaseCourseForm courseId={params.courseId} course={course!} />
}

export default page
