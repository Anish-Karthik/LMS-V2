import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getBatchById } from "@/lib/actions/batch.action"
import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"

const RecordingPage = async ({ params }: { params: { courseId: string } }) => {
  const user = await currentUser()
  // const userInfo = await getUser(user!.id);
  // const batch = await getBatchById(userInfo?.purchases[0].batchId!)
  // const firstTopic = await db.topic.findFirst({
  //   where: {
  //     chapterId: batch?.chapters[0].id
  //   }
  // })
  const firstTopic = (
    await db.user.findUnique({
      where: {
        userId: user!.id,
      },
      select: {
        // get 1st purchase from user.purchases
        purchases: {
          where: {
            Batch: {
              courseId: params.courseId,
            },
          },
          select: {
            Batch: {
              where: {
                courseId: params.courseId,
              },
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
  )?.purchases[0]?.Batch?.chapters[0]?.topics[0]
  console.log(firstTopic)
  if (firstTopic)
    redirect(
      `/student/courses/${params.courseId}/${firstTopic!.type}/${
        firstTopic!.id
      }`
    )
  return (
    <div className="my-auto flex h-screen flex-col items-center justify-center">
      {/* no videos yet */}
      <div>
        <h1 className="text-xl">
          No videos yet. Please contact your instructor to add videos to this
          course.
        </h1>
      </div>
    </div>
  )
}

export default RecordingPage
