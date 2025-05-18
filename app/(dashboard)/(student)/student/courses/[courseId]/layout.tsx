import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourseById } from "@/lib/actions/course.actions"
import { getUser, isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import ChapterBar from "@/components/shared/chapter-bar"
import CurrentPathNavigator from "@/components/shared/current-pathname"
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

  // Get course to check if it's self-paced or batch-based
  const course = await getCourseById(params.courseId)
  if (!course) redirect("/student/courses")

  // Different chapter fetching logic based on course type
  let chapters = []

  if (course.type === "self-paced") {
    // For self-paced courses, fetch chapters directly associated with the course
    chapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
      include: {
        topics: {
          where: {
            isPublished: true,
          },
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
  } else {
    // For batch-based courses, use the existing logic with batch
    const curBatch = userInfo.purchases?.find(
      (purchase) => purchase.courseId === params.courseId
    )?.batchId

    if (!curBatch) {
      // No batch found for batch-based course
      return (
        <div className="relative h-full">
          <main className="w-full">{children}</main>
        </div>
      )
    }

    chapters = await db.chapter.findMany({
      where: {
        batchId: curBatch,
        isPublished: true,
      },
      include: {
        topics: {
          where: {
            isPublished: true,
          },
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
  }

  if (!purchased) redirect("/student/courses/" + params?.courseId + "/details")

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
