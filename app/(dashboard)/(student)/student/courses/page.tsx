import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { getUser, isUserPurchasedCourse } from "@/lib/actions/user.actions"
import CourseCard from "@/components/shared/course-card"

const CoursesPage = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const courses = await getCourses()
  if (!courses || !courses.length)
    return (
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Courses</h1>
        <div className="rounded-md bg-slate-100 p-6 text-center">
          No courses are currently available
        </div>
      </div>
    )

  // Create an array of promises to check purchase status for each course
  const purchaseStatusPromises = courses.map((course) =>
    isUserPurchasedCourse(user.id, course.id)
  )

  // Wait for all promises to resolve
  const purchaseStatuses = await Promise.all(purchaseStatusPromises)

  // Map courses with purchase status
  const coursesWithPurchaseStatus = courses.map((course, index) => ({
    ...course,
    isPurchased: purchaseStatuses[index],
  }))

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Available Courses</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coursesWithPurchaseStatus.map((course) => (
          <div key={course.id} className="flex h-full flex-col">
            <CourseCard course={course} />
            <div className="mt-2 px-4 pb-4">
              {course.isPurchased ? (
                <a
                  href={`/student/courses/${course.id}`}
                  className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
                >
                  View Course
                </a>
              ) : (
                <a
                  href={`/student/courses/${course.id}/details`}
                  className="block w-full rounded-md bg-slate-700 px-4 py-2 text-center text-white transition hover:bg-slate-800"
                >
                  View Details
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
