import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import LandingNavbar from "@/components/shared/LandingNavbar"

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const courses = await db.course.findMany()
  if (!courses) redirect("/create-course")
  const user = await currentUser()
  let route: string | undefined = undefined
  if (user) {
    const userInfo = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    })
    if (userInfo) {
      if (userInfo.role === "student") route = "/student/dashboard"
      if (userInfo.role === "teacher" || userInfo.role === "admin")
        route = "/teacher/dashboard"
    }
  }
  return (
    <div className="h-full w-full">
      <LandingNavbar
        courses={courses}
        route={route}
        className="fixed inset-x-0 top-0 z-50 bg-black"
      />
      <main className="h-screen w-full">{children}</main>
    </div>
  )
}

export default LandingLayout
