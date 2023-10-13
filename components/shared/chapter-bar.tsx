"use client"
import * as React from "react"

import { ChevronsUpDown, FileQuestion, GrabIcon, Pen, Plus, Video, VideoIcon, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CollapsibleTopics } from "./collapsible-topics"

import { Quiz } from "@mui/icons-material"
import { Tchapters } from "@/app/constants"
import { Chapter, Topic } from "@prisma/client"
import Link from "next/link"




const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.123456789123456789-sssssss0-beta.${a.length - i}`
)

export default function ChapterBar({chapters, courseId}: {chapters: (Chapter & {topics: Topic[]})[], courseId: string}) {

  return (
    <ScrollArea className="h-[655px] w-64 rounded-md border">
      <br />
      {chapters.map((chapter) => (
        <>
          <CollapsibleTopics trigger={
            <div key={chapter.id} className="cursor-pointer px-3">
              <p className="text-sm">
                {chapter.title} 
              </p>
            </div>
          }>
            <div>
              {chapter.topics.map((topic) =>(
                <Link href={`/student/courses/${courseId}/recordings/${topic.type}/${topic.id}`} className="flex items-center justify-start gap-2 pl-2 hover:bg-secondary">
                  {topic.type === "video" && <VideoIcon className="h-6 w-6"/>}
                  {topic.type === "quiz" && <Quiz className="h-4 w-4"/>}
                  {topic.type === "lab" && <Pen className="h-6 w-6"/>}
                  {topic.type === "assignment" && <FileQuestion className="h-6 w-6"/>}
                  <div className="cursor-pointer p-2">{topic.title}</div>
                </Link>
              ))}
            </div>
          </CollapsibleTopics>
          <Separator className="my-2" />
        </>
      ))}
    </ScrollArea>
  )
}
