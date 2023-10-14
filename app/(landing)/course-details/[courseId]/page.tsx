import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourseById } from "@/lib/actions/course.actions"
import {
  getUser,
  isTeacher,
  isUserPurchasedCourse,
} from "@/lib/actions/user.actions"
import { Button } from "@/components/ui/button"
import { CourseEnrollButton } from "@/components/shared/course-enroll-button"

const CourseDetailspage = async ({
  params,
}: {
  params: { courseId: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const courseDetails = await getCourseById(params.courseId)
  if (!params.courseId || courseDetails) <div>Course not found</div>
  const userInfo = await getUser(user.id)
  if (!userInfo) redirect("/onboarding")
  const isUserTeacher = await isTeacher(user.id)
  const purchased = await isUserPurchasedCourse(user.id, params.courseId)
  if (purchased) redirect(`/student/courses/${params.courseId}/dashboard`)

  // if(["teacher", "admin", "moderator"].includes(userInfo.role)) redirect('/teacher');
  return (
    <div>
      <h1>Course Details Page</h1>
      {userInfo.role === "student" && (
        <CourseEnrollButton
          price={courseDetails?.price!}
          courseId={courseDetails?.id!}
        />
      )}
      {userInfo.role === "teacher" &&
        (isUserTeacher ? (
          <Link href={"/teacher"}>
            <Button>Teacher dashboard</Button>
          </Link>
        ) : (
          <Link href={"/verify"}>
            <Button>Verify</Button>
          </Link>
        ))}
    </div>
  )
}

export default CourseDetailspage
