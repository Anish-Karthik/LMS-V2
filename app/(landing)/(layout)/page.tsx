import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { LandingHero } from "@/components/shared/LandingHero"

const image = "https://picsum.photos/id/237/900/800"

export default async function LandingPage() {
  redirect("/purchase")
  const courses = await db.course.findMany()
  if (!courses) redirect("/create-course")
  const course = courses[0]
  const user = await currentUser()
  let route: string = "/purchase"
  // if (user) {
  //   const userInfo = await db.user.findUnique({
  //     where: {
  //       userId: user.id,
  //     },
  //   })
  //   if (userInfo) {
  //     if (userInfo.role === "student") route = "/student/announcements"
  //     else if (userInfo.role === "teacher" || userInfo.role === "admin")
  //       route = "/teacher/dashboard"
  //     else route = `/purchase/${course.id}`
  //   }
  // }

  return (
    <section className="h-full w-full bg-black">
      {/* big purple-pink circular gradient blur circle */}
    </section>
  )
}
