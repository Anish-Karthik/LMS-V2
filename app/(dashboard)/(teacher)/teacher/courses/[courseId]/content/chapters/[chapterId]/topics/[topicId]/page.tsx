import dynamic from "next/dynamic"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import {
  ArrowLeft,
  Calendar,
  FileIcon,
  FileText,
  LayoutDashboard,
  ListChecks,
  Video,
} from "lucide-react"

import { getTopicEmails } from "@/lib/actions/topic.actions"
import { db } from "@/lib/db"
import { Banner } from "@/components/banner"
import { Editor } from "@/components/editor"
import { IconBadge } from "@/components/icon-badge"
import { Preview } from "@/components/preview"
import CurrentPathNavigator from "@/components/shared/current-pathname"
import { AttachmentForm } from "@/components/shared/topic/attachment-form"
import { QuizEditor } from "@/components/shared/topic/quiz-editor"
import { TopicActions } from "@/components/shared/topic/topic-actions"
import { TopicDescriptionForm } from "@/components/shared/topic/topic-description-form"
import { TopicForm } from "@/components/shared/topic/topic-form"
import { TopicTitleForm } from "@/components/shared/topic/topic-title-form"
import { TopicVideoForm } from "@/components/shared/topic/topic-video-form"

const NotifyTopic = dynamic(
  () => import("@/components/shared/topic/notify-topic"),
  {
    ssr: false,
  }
)

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

  // Determine which fields to check based on topic type
  const getRequiredFields = (topic: any) => {
    const baseFields = [topic.title, topic.description]

    switch (topic.type) {
      case "video":
        return [...baseFields, topic.videoUrl]
      case "quiz":
        // For quizzes, we check if questions exist and if they're valid JSON
        try {
          const questions = topic.questions ? JSON.parse(topic.questions) : null
          return [
            ...baseFields,
            questions && questions.length > 0 ? "questions" : null,
          ]
        } catch (e) {
          return [...baseFields, null]
        }
      case "article":
        return [...baseFields, topic.content]
      case "live":
        return [...baseFields, topic.startTime, topic.liveLink]
      default:
        return baseFields
    }
  }

  const requiredFields = getRequiredFields(topic)
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  const emails = await getTopicEmails({
    courseId: params?.courseId,
  })

  // Helper function to render the appropriate content section based on topic type
  const renderTopicContentSection = () => {
    switch (topic.type) {
      case "video":
        return (
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Video Content</h2>
            </div>
            <TopicVideoForm initialData={topic} topicId={params?.topicId} />
          </div>
        )
      case "quiz":
        return (
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Quiz Content</h2>
            </div>
            <QuizEditor initialData={topic} topicId={params?.topicId} />
          </div>
        )
      case "article":
        return (
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={FileText} />
              <h2 className="text-xl">Article Content</h2>
            </div>
            {/* The content is managed in the main topic form */}
            {/* The Markdown content should be rendered here */}
            <div className="mt-6">
              <Preview value={topic.content || ""} />
            </div>
          </div>
        )
      case "live":
        return (
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Calendar} />
              <h2 className="text-xl">Live Session</h2>
            </div>
            {/* The live session data is managed in the main topic form */}
          </div>
        )
      default:
        return null
    }
  }

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
                <h2 className="text-xl">Basic Information</h2>
              </div>
              <TopicForm
                initialData={topic}
                courseId={params?.courseId}
                chapterId={params?.chapterId}
              />
            </div>
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
          <div>{renderTopicContentSection()}</div>
        </div>
      </div>
    </>
  )
}

export default topicIdPage
