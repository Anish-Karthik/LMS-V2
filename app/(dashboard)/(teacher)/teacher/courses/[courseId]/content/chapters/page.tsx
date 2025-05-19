import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { ChevronLeft, File, LayoutDashboard, Plus } from "lucide-react"

import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Banner } from "@/components/banner"
import { IconBadge } from "@/components/icon-badge"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import { ChaptersList } from "../_components/chapters-list"

const CourseContentPage = async ({
  params,
}: {
  params: { courseId: string }
}) => {
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
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
        include: {
          topics: true,
        },
      },
    },
  })

  if (!course) {
    return redirect("/teacher/courses")
  }

  // If course is not self-paced, redirect to regular course page
  if (course.type !== "self-paced") {
    return redirect(`/teacher/courses/${params.courseId}`)
  }

  const isComplete =
    course.title &&
    course.description &&
    course.imageUrl &&
    course.price &&
    course.chapters.some((chapter) => chapter.topics.length > 0)

  return (
    <>
      <CurrentPathNavigator />
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is not published. It will not be visible to students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to course setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Course Content</h1>
                <span className="text-sm text-slate-700">
                  Complete all chapters and add topics
                </span>
              </div>
              <Link
                href={`/teacher/courses/${params.courseId}/content/chapters/new`}
              >
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add chapter
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <ChaptersList
              courseId={params.courseId}
              chapters={course.chapters}
            />
            {!course.chapters.length && (
              <div className="text-muted-foreground mt-4 text-center text-sm">
                No chapters yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseContentPage
