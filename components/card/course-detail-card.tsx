import React from "react"
import Image from "next/image"
import { Course } from "@prisma/client"

import { CourseProgress } from "../course-progress"
import CourseProgressbar from "../shared/course-progress"

const CourseDetailCard = ({
  courses,
  userProgression,
}: {
  userProgression: {
    progress: number
    completedModules: number
    totalModules: number
  }[]
  courses: Course[]
}) => {
  const course = courses[0]
  const progress = userProgression[0]
  return (
    <div className="flex !max-w-3xl flex-col gap-1">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <Image
        src={course.imageUrl || ""}
        className="rounded-md"
        alt={course.title}
        width={2000}
        height={1000}
      />
      <CourseProgress
        value={progress.progress}
        variant={progress.progress === 100 ? "success" : "default"}
      />
      <p className="text-sm text-[#FAF8F1]">{course.description}</p>
    </div>
  )
}

export default CourseDetailCard
