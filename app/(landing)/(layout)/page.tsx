import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { LandingHero } from "@/components/shared/LandingHero"

const title = "Master the art of Trading"
const description = `
  your
  gateway to financial empowerment. Join our thriving community,
  engage in live trading sessions, and get hands-on guidance from
  seasoned professionals.
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
    <section className="h-full w-full bg-black">
      {/* big purple-pink circular gradient blur circle */}
      <section className="h-full w-full bg-black">
        <div
          className="fixed bottom-[-130%] left-[10%] mx-auto h-[80rem] w-[80rem] rounded-full bg-gradient-to-br"
          style={{
            background:
              "radial-gradient(closest-side, #fff 40%, hsl(263 76.2 53.9))",
            filter: "blur(80px)",
          }}
        ></div>

        <LandingHero
          title={title}
          description={description}
          image={"/landing/contact.jpg"}
          // imageAlternate={<CardStack />}
          className="relative z-40 pt-40"
        >
          <div className="flex w-full items-start gap-4">
            <Link href={`/purchase`}>
              <Button
                variant={"none"}
                className="w-full bg-purple-color text-white hover:bg-purple-color/40"
              >
                View Details
              </Button>
            </Link>
            <Link href={`${route}`}>
              <Button variant={"outline"} className="w-full text-white">
                Enroll Now
              </Button>
            </Link>
          </div>
        </LandingHero>
      </section>
    </section>
  )
}
