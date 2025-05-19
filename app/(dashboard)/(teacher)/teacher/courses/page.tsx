import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { PlusCircle } from "lucide-react"

import { getCourses } from "@/lib/actions/course.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Button } from "@/components/ui/button"

import CurrentPathNavigator from "../../../../../components/shared/current-pathname"

const CoursesPage = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const userInfo = await getUser(user.id)
  if (!userInfo || (userInfo.role !== "teacher" && userInfo.role !== "admin")) {
    redirect("/")
  }

  const courses = await getCourses(true)

  return (
    <>
      <CurrentPathNavigator />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Courses</h1>
          <Link href="/teacher/courses/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Course
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          {!courses || courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h2 className="text-lg font-medium">No courses found</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                You don&apos;t have any courses yet. Create your first course to
                get started.
              </p>
              <Link href="/teacher/courses/create" className="mt-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {courses.map((course) => (
                <Link
                  href={`/teacher/courses/${course.id}`}
                  key={course.id}
                  className="group relative overflow-hidden rounded-lg border transition hover:shadow-md"
                >
                  <div className="absolute right-2 top-2 z-10">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        course.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="aspect-video w-full overflow-hidden bg-slate-100">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-200">
                        <span className="text-slate-500">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-1 font-medium">{course.title}</h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {course.description || "No description"}
                    </p>
                    <div className="text-muted-foreground mt-2 flex flex-col gap-1 text-sm">
                      <div className="flex items-center">
                        <span className="mr-2">Type:</span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium">
                          {course.type === "self-paced"
                            ? "Self-paced"
                            : "Batch-based"}
                        </span>
                      </div>
                      {course.type === "batch-based" && (
                        <span>
                          {course.batches?.length || 0}{" "}
                          {course.batches?.length === 1 ? "batch" : "batches"}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CoursesPage
