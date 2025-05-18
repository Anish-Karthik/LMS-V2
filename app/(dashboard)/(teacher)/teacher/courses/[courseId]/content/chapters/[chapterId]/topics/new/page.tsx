import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import { ChapterForm } from "../../../_components/chapter-form"

const NewChapterPage = async ({ params }: { params: { courseId: string } }) => {
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  const isTeacher = userInfo!.role === "teacher" || userInfo!.role === "admin"

  if (!user || !isTeacher) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  if (!course) {
    return redirect("/teacher/courses")
  }

  // If course is not self-paced, redirect to regular course page
  if (course.type !== "self-paced") {
    return redirect(`/teacher/courses/${params.courseId}`)
  }

  return (
    <>
      <CurrentPathNavigator />
      <div className="p-6">
        <h1 className="text-2xl font-medium">Add Chapter</h1>
        <ChapterForm courseId={params.courseId} initialData={null} />
      </div>
    </>
  )
}

export default NewChapterPage
