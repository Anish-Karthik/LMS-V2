import React from "react"
import { redirect } from "next/navigation"

import { getCourses } from "@/lib/actions/course.actions"
import LandingNavbar from "@/components/shared/LandingNavbar"

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const courses = await getCourses()
  if (!courses || !courses.length) {
    redirect("/create-course")
  }
  return (
    <div className="h-full w-full">
      <LandingNavbar
        courses={courses}
        className="fixed inset-x-0 top-0 z-50 bg-white"
      />
      <main className="mt-12 h-full w-full">{children}</main>
    </div>
  )
}

export default LandingLayout
