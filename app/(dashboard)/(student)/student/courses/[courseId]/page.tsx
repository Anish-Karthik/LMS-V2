import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourseById } from "@/lib/actions/course.actions"
import { db } from "@/lib/db"

const RecordingPage = async ({ params }: { params: { courseId: string } }) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  // First, get the course to check its type
  const course = await getCourseById(params.courseId)
  if (!course) redirect("/student/courses")

  let firstTopic = null

  if (course.type === "self-paced") {
    // For self-paced courses, get the first topic directly from chapters
    const firstChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
      orderBy: {
        position: "asc",
      },
      include: {
        topics: {
          where: {
            position: 1,
            isPublished: true,
          },
          select: {
            id: true,
            type: true,
          },
          take: 1,
        },
      },
    })

    firstTopic = firstChapter?.topics[0]
  } else {
    // For batch-based courses, use the existing query
    const userData = await db.user.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        purchases: {
          where: {
            Batch: {
              courseId: params.courseId,
            },
          },
          select: {
            Batch: {
              select: {
                chapters: {
                  where: {
                    position: 1,
                  },
                  select: {
                    topics: {
                      where: {
                        position: 1,
                      },
                      select: {
                        id: true,
                        type: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    firstTopic = userData?.purchases[0]?.Batch?.chapters[0]?.topics[0]
  }

  console.log("First topic:", firstTopic)

  if (firstTopic) {
    redirect(
      `/student/courses/${params.courseId}/${firstTopic.type}/${firstTopic.id}`
    )
  }

  return (
    <div className="my-auto flex h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-xl">
          No content available yet. Please contact support if you believe this
          is an error.
        </h1>
      </div>
    </div>
  )
}

export default RecordingPage
