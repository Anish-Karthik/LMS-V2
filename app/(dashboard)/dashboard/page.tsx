import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"

const page = async ({
  searchParams,
}: {
  searchParams: { promo: string; invite: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const userInfo = await getUser(user.id)
  if (!userInfo) redirect("/onboarding")
  const searchParamsUrl =
    (searchParams.promo ? `promo=${searchParams.promo}` : "") +
    (searchParams.invite ? `invite=${searchParams.invite}` : "")
  if (userInfo.role === "student") {
    redirect("/student/dashboard?" + searchParamsUrl)
  }
  if (userInfo.role === "teacher" || userInfo.role === "admin") {
    redirect("/teacher/dashboard?" + searchParamsUrl)
  }
  redirect("/")
  return (
    <div className="h-full w-full bg-black">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
    </div>
  )
}

export default page
