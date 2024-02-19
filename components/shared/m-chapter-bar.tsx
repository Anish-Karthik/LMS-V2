/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowDropDownCircle } from "@mui/icons-material"
import { Chapter, Topic, UserProgressTopic } from "@prisma/client"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Arrow } from "@radix-ui/react-popover"
import {
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  CheckCircle,
  CroissantIcon,
  DivideCircle,
  FileQuestion,
  HelpCircle,
  LucideIcon,
  Pen,
  PlayCircle,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { CircleProgress } from "../chapter-progress-circle"
import { CollapsibleTopics } from "./collapsible-topics"

export default function MobileChapterBar({
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
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed -left-6 top-[50%] z-40 w-fit rounded-sm bg-slate-100/30 p-3 opacity-40 transition-all ease-in-out hover:-left-2 hover:bg-slate-100/40 hover:opacity-70 md:hidden">
          <ArrowBigRightIcon
            width={30}
            height={30}
            className="z-50 opacity-100"
          />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className=" mb-2 border-b p-2 text-xl font-bold">
            <h2>Chapters</h2>
          </div>
        </SheetHeader>
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
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <div className="flex items-center justify-start gap-1">
                      {completedPublishedTopics === totalPublishedTopics ? (
                        <CheckCircle className="text-emerald-700" />
                      ) : (
                        <CircleProgress
                          value={percentage}
                          variant={
                            completedPublishedTopics === totalPublishedTopics
                              ? "success"
                              : "default"
                          }
                          size="sm"
                        />
                      )}
                      <p className="text-lg">{chapter.title}</p>
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
                      <SheetClose asChild>
                        <Link
                          href={`/student/courses/${courseId}/${topic.type}/${topic.id}`}
                          className={cn(
                            "hover:bg-secondary flex items-center justify-start gap-2 pl-5",
                            params?.topicId === topic.id && "bg-secondary"
                          )}
                        >
                          <Icon
                            size={22}
                            className={cn(
                              "text-slate-500",
                              params?.courseId === courseId &&
                                params?.topicId === topic.id &&
                                "text-slate-700",
                              isCompleted && "text-emerald-700"
                            )}
                          />
                          <div className="cursor-pointer p-2">
                            {topic.title}
                          </div>
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>
              </CollapsibleTopics>
              <Separator className="my-2" />
            </>
          )
        })}
      </SheetContent>
    </Sheet>
  )
}
