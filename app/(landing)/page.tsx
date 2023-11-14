import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { LandingContent } from "@/components/shared/LandingContent"
import { LandingHero } from "@/components/shared/LandingHero"
import LandingNavbar from "@/components/shared/LandingNavbar"

import { trpc } from "../_trpc/client"

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
      if (userInfo.role === "teacher" || userInfo.role === "admin")
        route = "/teacher/dashboard"
    }
  }
  return (
    <div className="h-full">
      <LandingNavbar courses={courses} route={route} />
      <LandingHero courses={courses} route={route} />
      <LandingContent />
    </div>
  )
}
