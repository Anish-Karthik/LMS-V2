import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { File } from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { getDetailedTopicClient } from "@/lib/actions/topic.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@/components/banner"
import { Preview } from "@/components/preview"

import { ChapterProgressButton } from "../../_components/chapter-progress-button"
import { VideoPlayer } from "../../_components/video-player"

const TopicIdPage = async ({
  params,
}: {
  params: { courseId: string; topicId: string }
}) => {
  const { userId } = auth()
  const userInfo = await getUser(userId || "")

  if (!userId || !userInfo) {
    return redirect("/")
  }

  // Check if user has purchased this course
  const userPurchaseInfoForThisCourse = userInfo.purchases.find(
    (purchase) => purchase.courseId === params?.courseId
  )

  if (!userPurchaseInfoForThisCourse) {
    return redirect("/")
  }

  // Get course to check if it's self-paced or batch-based
  const course = await getCourseById(params.courseId)
  if (!course) {
    return redirect("/student/courses")
  }

  const {
    topic,
    chapter,
    batch,
    videoData,
    attachments,
    nextTopic,
    userProgressTopic,
    purchase,
  } = await getDetailedTopicClient({
    userId,
    topicId: params?.topicId,
    courseId: params?.courseId,
  })

  console.log("*************************************")
  console.log(nextTopic?.id, params?.topicId, nextTopic?.type)
  console.log("*************************************")

  if (!topic || !chapter) {
    return (
      <>
        <h1>Topic not found{JSON.stringify(topic)}</h1>
        <h1>Chapter not found{JSON.stringify(chapter)}</h1>
      </>
    )
  }

  // For batch-based courses, validate batch access
  if (course.type === "batch-based") {
    if (!batch) {
      return (
        <>
          <h1>Batch not found{JSON.stringify(batch)}</h1>
        </>
      )
    }

    console.log(userPurchaseInfoForThisCourse.batchId, batch.id)
    if (userPurchaseInfoForThisCourse.batchId !== batch.id) {
      return (
        <>
          <h1>
            Batch mismatch, you are not authorized to access this batch content,
            contact your mentor
          </h1>
        </>
      )
    }
  }
  // For self-paced courses, we don't need to validate batch

  const isLocked = false //!topic.isFree && !purchase;
  const completeOnEnd = !!purchase && !!userProgressTopic?.isCompleted

  return (
    <div>
      {userProgressTopic?.isCompleted && (
        <Banner variant="success" label="You already completed this topic." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this topic."
        />
      )}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          {videoData?.url ? <VideoPlayer
            userId={userId}
            topicId={params?.topicId}
            title={topic.title}
            courseId={params?.courseId}
            nextTopicId={nextTopic?.id}
            nextTopicType={nextTopic?.type}
            playbackId={videoData?.url!}
            isLocked={isLocked}
            isCompleted={!!userProgressTopic?.isCompleted}
            completeOnEnd={completeOnEnd}
          /> : (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Banner variant="warning" label="No video content available for this topic." />
              <h1 className="text-xl font-semibold text-gray-700">Video content unavailable</h1>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{topic.title}</h2>

            <ChapterProgressButton
              userId={userId}
              chapterId={chapter.id}
              topicId={params?.topicId}
              courseId={params?.courseId}
              nextTopicId={nextTopic?.id}
              nextTopicType={nextTopic?.type}
              isCompleted={!!userProgressTopic?.isCompleted}
            />
          </div>
          <Separator />
          <div>
            <Preview value={topic.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopicIdPage
