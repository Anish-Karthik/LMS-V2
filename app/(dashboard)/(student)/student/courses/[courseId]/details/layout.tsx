import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"

const CourseDetailsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const userInfo = await getUser(user.id)
  if (!userInfo) redirect("/")

  return (
    <div className="relative h-full">
      <main className="w-full">{children}</main>
    </div>
  )
}

export default CourseDetailsLayout
