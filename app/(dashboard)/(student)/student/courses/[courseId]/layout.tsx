import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser, isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import ChapterBar from "@/components/shared/chapter-bar"
import MobileChapterBar from "@/components/shared/m-chapter-bar"

const DashBoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  if (!params?.courseId) redirect("/student/courses")
  const purchased = await isUserPurchasedCourse(user.id, params?.courseId)
  const userInfo = await getUser(user?.id || "")
  if (!user || !userInfo) redirect("/")
  const curBatch = userInfo.purchases[0].batchId
  if (!curBatch) redirect("/")
  const chapters = await db.chapter.findMany({
    where: {
      batchId: curBatch,
    },
    include: {
      topics: {
        include: {
          userProgressTopic: {
            where: {
              userId: user.id,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  })
  if (!purchased) redirect("/purchase/" + params?.courseId)

  return (
    <div className="relative h-full">
      {/* desktop view */}
      {/* <Header /> */}
      {/* <AdminTabs />  */}
      <MobileChapterBar
        chapters={chapters}
        courseId={params?.courseId}
        userId={user.id}
      />
      <div className="flex md:grid md:grid-cols-[1fr,7fr]">
        <ChapterBar
          chapters={chapters}
          courseId={params?.courseId}
          userId={user.id}
        />
        <main className="w-full ">{children}</main>
      </div>
    </div>
  )
}

export default DashBoardLayout
