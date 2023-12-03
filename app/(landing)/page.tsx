import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import ContactUs from "@/components/landing/contact-us"
import { LandingHero } from "@/components/shared/LandingHero"
import LandingNavbar from "@/components/shared/LandingNavbar"

export default async function LandingPage() {
  const courses = await db.course.findMany()
  if (!courses) redirect("/create-course")
  const course = courses[0]
  const user = await currentUser()
  let route: string | undefined = undefined
  if (user) {
    const userInfo = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    })
    if (userInfo) {
      if (userInfo.role === "student") route = "/student/announcements"
      else if (userInfo.role === "teacher" || userInfo.role === "admin")
        route = "/teacher/dashboard"
      else route = `/purchase/${course.id}`
    }
  }
  return (
    <div className="relative flex flex-col justify-center bg-quaternary-color lg:min-h-[85vh]">
      <LandingHero courses={courses} route={route} />
      <ContactUs className="fixed inset-x-0 -bottom-1 bg-secondary-color" />
      {/* <LandingContent /> */}
    </div>
  )
}
