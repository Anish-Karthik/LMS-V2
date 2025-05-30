import Image from "next/image"
import { Course } from "@prisma/client"

import { CourseProgress } from "../course-progress"

const CourseDetailCard = ({
  course,
  userProgression,
}: {
  userProgression: {
    progress: number
    completedModules: number
    totalModules: number
  }
  course: Course
}) => {
  const progress = userProgression
  return (
    <div className="flex !max-w-3xl flex-col gap-2">
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
      <p className="text-pink-color text-sm">{course.description}</p>
    </div>
  )
}

export default CourseDetailCard
