import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { LandingHero } from "@/components/shared/LandingHero"

const title =
  "Master the art of Trading with Praglis - The #1 trading community"
const description = `
  Dive into the world of trading with Praglis Trading Community - your
  gateway to financial empowerment. Join our thriving community,
  engage in live trading sessions, and get hands-on guidance from
  seasoned professionals. No prior knowledge needed, we&apos;ll guide
  you from the basics to expert-level trading. Your journey to
  financial success begins now.
`
const image = "https://picsum.photos/id/237/900/800"

export default async function LandingPage() {
  const courses = await db.course.findMany()
  if (!courses) redirect("/create-course")
  const course = courses[0]
  const user = await currentUser()
  let route: string = "/purchase"
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
    <LandingHero
      title={title}
      description={description}
      image={"/landing/contact.jpg"}
      className="bg-text-primary lg:-mt-10"
    >
      <div className="flex w-full gap-4">
        <Link href={`/purchase`}>
          <Button variant={"outline"} className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`${route}`}>
          <Button className="w-full">Enroll Now</Button>
        </Link>
      </div>
    </LandingHero>
  )
}
