import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { format } from "date-fns"
import { Calendar, Clock, ExternalLink, File } from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { getDetailedTopicClient } from "@/lib/actions/topic.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@/components/banner"
import { Preview } from "@/components/preview"

import { ChapterProgressButton } from "../../_components/chapter-progress-button"

const LiveTopicPage = async ({
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
    attachments,
    nextTopic,
    userProgressTopic,
    purchase,
  } = await getDetailedTopicClient({
    userId,
    topicId: params?.topicId,
    courseId: params?.courseId,
  })

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

  const isLocked = false // !topic.isFree && !purchase;
  const hasStartTime = !!topic.startTime
  const hasLiveLink = !!topic.liveLink
  const hasDuration = !!topic.duration

  // Format start time if available
  const formattedStartTime = hasStartTime
    ? format(new Date(topic.startTime as Date), "MMMM d, yyyy 'at' h:mm a")
    : null

  return (
    <div>
      {userProgressTopic?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this live session."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to access this live session."
        />
      )}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
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

        {/* Live session information */}
        <div className="bg-secondary mx-4 my-6 rounded-md p-6 shadow-sm">
          <div className="space-y-6">
            <h3 className="mb-4 text-center text-xl font-semibold">
              Live Session Details
            </h3>

            {hasStartTime ? (
              <div className="flex items-center space-x-3">
                <Calendar className="text-primary h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Scheduled Time</p>
                  <p className="text-base">{formattedStartTime}</p>
                </div>
              </div>
            ) : (
              <Banner
                variant="warning"
                label="No start time scheduled for this live session."
              />
            )}

            {hasDuration && (
              <div className="flex items-center space-x-3">
                <Clock className="text-primary h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-base">{topic.duration} minutes</p>
                </div>
              </div>
            )}

            {hasLiveLink ? (
              <div className="pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link
                    href={topic.liveLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join Live Session
                  </Link>
                </Button>
              </div>
            ) : (
              <Banner
                variant="warning"
                label="No meeting link available for this live session yet."
              />
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <Preview value={topic.description || "No description available."} />
        </div>

        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold">Resources</h3>
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                  >
                    <File className="mr-2 h-4 w-4" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LiveTopicPage
