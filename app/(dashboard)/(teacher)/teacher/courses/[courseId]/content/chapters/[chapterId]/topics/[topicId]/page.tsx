import dynamic from "next/dynamic"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { ArrowLeft, FileIcon, LayoutDashboard, Video } from "lucide-react"

import { getTopicEmails } from "@/lib/actions/topic.actions"
import { db } from "@/lib/db"
import { Banner } from "@/components/banner"
import { IconBadge } from "@/components/icon-badge"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import { AttachmentForm } from "./_components/attachment-form"
import { TopicActions } from "./_components/topic-actions"
import { TopicDescriptionForm } from "./_components/topic-description-form"
import { TopicTitleForm } from "./_components/topic-title-form"
import { TopicVideoForm } from "./_components/topic-video-form"

const NotifyTopic = dynamic(() => import("./_components/notify-topic"), {
  ssr: false,
})

const topicIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; topicId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const topic = await db.topic.findUnique({
    where: {
      id: params?.topicId,
    },
    include: {
      videoData: true,
    },
  })
  const topicWithAttachments = await db.topic.findUnique({
    where: {
      id: params?.topicId,
    },
    include: {
      attachments: true,
    },
  })

  if (!topic || !topicWithAttachments) {
    return redirect("/")
  }

  const requiredFields = [topic.title, topic.description, topic.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)
  const emails = await getTopicEmails({
    courseId: params?.courseId,
  })

  return (
    <>
      <CurrentPathNavigator />
      {!topic.isPublished && (
        <Banner
          variant="warning"
          label="This topic is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params?.courseId}/content/chapters/${params?.chapterId}/`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to batch setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Topic Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <div className="flex gap-2">
                <NotifyTopic topic={topic} emails={emails} />
                <TopicActions
                  disabled={!isComplete}
                  courseId={params?.courseId}
                  topicId={params?.topicId}
                  chapterId={params?.chapterId}
                  isPublished={topic.isPublished}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your Topic</h2>
              </div>
              <TopicTitleForm
                initialData={topic}
                topicId={params?.topicId}
              />
              <TopicDescriptionForm
                initialData={topic}
                topicId={params?.topicId}
              />
            </div>
            {/* <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <TopicAccessForm
                initialData={topic}
                topicId={params?.topicId}
              />
            </div> */}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FileIcon} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                initialData={topicWithAttachments}
                topicId={topic.id}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <TopicVideoForm
              initialData={topic}
              topicId={params?.topicId} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default topicIdPage
