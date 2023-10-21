import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import AccountProfile from "@/components/form/AccountProfile"

async function Page() {
  const user = await currentUser()
  if (!user) redirect("/sigin")
  const userInfo = await getUser(user.id)
  const courses = await db.course.findMany()
  if (!courses) redirect("/create-course")
  const course = courses[0]
  if (userInfo && userInfo.role === "student")
    redirect("/student/announcements")
  if (userInfo && (userInfo.role === "teacher" || userInfo.role === "admin"))
    redirect("/teacher/dashboard")
  if (userInfo) redirect(`/purchase/${course.id}`)

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base">
        Complete your profile now, to Buy Course.
      </p>

      <section className="mt-9 bg-secondary p-10">
        <AccountProfile user={user} route={`/purchase/${course.id}`} />
      </section>
    </main>
  )
}

export default Page
