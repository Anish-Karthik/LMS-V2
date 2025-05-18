import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import { Banner } from "@/components/banner"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import { ChapterForm } from "../_components/chapter-form"

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  const isTeacher = userInfo!.role === "teacher" || userInfo!.role === "admin"

  if (!user || !isTeacher) {
    return redirect("/")
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      topics: {
        orderBy: {
          position: "asc",
        },
      },
    },
  })

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  if (!chapter || !course) {
    return redirect(`/teacher/courses/${params.courseId}/content`)
  }

  // If course is not self-paced, redirect to regular course page
  if (course.type !== "self-paced") {
    return redirect(`/teacher/courses/${params.courseId}`)
  }

  return (
    <>
      <CurrentPathNavigator />
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is not published. It will not be visible to students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-medium">Chapter Setup</h1>
          </div>
        </div>
        <ChapterForm courseId={params.courseId} initialData={chapter} />
      </div>
    </>
  )
}

export default ChapterPage
