// import { chapters } from '@/app/constants';

import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import ChapterBar from "@/components/shared/chapter-bar"

const DashBoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const user = await currentUser()
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
  // what is type of chapters?
  // type chapterType = typeof chapters;

  return (
    <div className="relative h-full">
      {/* desktop view */}
      {/* <Header /> */}
      {/* <AdminTabs />  */}
      <div className="flex">
        <ChapterBar
          chapters={chapters}
          courseId={params.courseId}
          userId={user.id}
        />
        <main className="w-full">{children}</main>
      </div>
    </div>
  )
}
// export type of chapters as chapterType

export default DashBoardLayout
