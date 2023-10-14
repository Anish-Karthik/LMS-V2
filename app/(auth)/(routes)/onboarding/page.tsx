import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import AccountProfile from "@/components/form/AccountProfile"

async function Page() {
  const user = await currentUser()
  if (!user) return null // to avoid typescript warnings
  // check if user has onboarded
  const userInfo = await getUser(user.id)
  if (userInfo) redirect("/course-details")

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base">
        Complete your profile now, to Buy Course.
      </p>

      <section className="mt-9 bg-secondary p-10">
        <AccountProfile user={user} />
      </section>
    </main>
  )
}

export default Page
