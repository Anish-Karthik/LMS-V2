"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowDropDownCircle } from "@mui/icons-material"
import { Chapter, Topic, UserProgressTopic } from "@prisma/client"
import {
  CheckCircle,
  FileQuestion,
  HelpCircle,
  LucideIcon,
  Pen,
  PlayCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { CircleProgress } from "../chapter-progress-circle"
import { CollapsibleTopics } from "./collapsible-topics"

export default function ChapterBar({
  chapters,
  courseId,
  userId,
}: {
  chapters: (Chapter & {
    topics: (Topic & { userProgressTopic: UserProgressTopic[] })[]
  })[]
  courseId: string
  userId: string
}) {
  const params = useParams()

  return (
    <ScrollArea className="h-[655px] w-64 rounded-md border">
      <div className=" mb-2 border-b p-2 font-bold">
        <h2>Chapters</h2>
      </div>
      {chapters.map((chapter) => {
        const totalPublishedTopics = chapter.topics.filter(
          (topic) => topic.isPublished
        ).length
        const completedPublishedTopics = chapter.topics
          .filter((topic) => topic.isPublished)
          .filter(
            (topic) =>
              topic.userProgressTopic.find(
                (progress) => progress.userId === userId
              )?.isCompleted
          ).length
        const percentage =
          (completedPublishedTopics / totalPublishedTopics) * 100
        if (!totalPublishedTopics) return null
        return (
          <>
            <CollapsibleTopics
              trigger={
                <div
                  key={chapter.id}
                  className="flex cursor-pointer items-center justify-between px-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <CircleProgress
                      value={percentage}
                      variant={
                        completedPublishedTopics === totalPublishedTopics
                          ? "success"
                          : "default"
                      }
                      size="sm"
                    />
                    <p className="text-sm">{chapter.title}</p>
                  </div>
                  <ArrowDropDownCircle className="cursor-pointer text-sky-700 transition hover:opacity-75" />
                </div>
              }
            >
              <div>
                {chapter.topics.map((topic) => {
                  if (!topic.isPublished) return null
                  const isCompleted = topic.userProgressTopic.find(
                    (progress) => progress.userId === userId
                  )?.isCompleted
                  const notCompleteIcon = new Map<string, LucideIcon>()
                  notCompleteIcon.set("video", PlayCircle)
                  notCompleteIcon.set("quiz", HelpCircle)
                  notCompleteIcon.set("lab", Pen)
                  notCompleteIcon.set("assignment", FileQuestion)
                  const Icon = isCompleted
                    ? CheckCircle
                    : notCompleteIcon.get(topic.type)!
                  return (
                    <Link
                      href={`/student/courses/${courseId}/recordings/${topic.type}/${topic.id}`}
                      className="flex items-center justify-start gap-2 pl-5 hover:bg-secondary"
                    >
                      <Icon
                        size={22}
                        className={cn(
                          "text-slate-500",
                          params.courseId === courseId &&
                            params.topicId === topic.id &&
                            "text-slate-700",
                          isCompleted && "text-emerald-700"
                        )}
                      />
                      <div className="cursor-pointer p-2">{topic.title}</div>
                    </Link>
                  )
                })}
              </div>
            </CollapsibleTopics>
            <Separator className="my-2" />
          </>
        )
      })}
    </ScrollArea>
  )
}
