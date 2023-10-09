"use client"
import * as React from "react"

import { ChevronsUpDown, FileQuestion, GrabIcon, Pen, Plus, Video, VideoIcon, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CollapsibleTopics } from "./collapsible-topics"
import { Tchapters } from "@/app/(dashboard)/(routes)/(recordings)/layout"
import { Quiz } from "@mui/icons-material"



const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.123456789123456789-sssssss0-beta.${a.length - i}`
)

export default function ChapterBar({chapters}: {chapters: Tchapters}) {

  return (
    <ScrollArea className="h-[83vh] w-64 rounded-md border">
      <br />
      {chapters.map((tag) => (
        <>
          <CollapsibleTopics trigger={
            <div key={tag.id} className="cursor-pointer px-3">
              <p className="text-sm">
                {tag.title} 
              </p>
            </div>
          }>
            <div>
              {tag.subTopics.map((subTopic) =>(
                <div className="pl-2 flex items-center justify-start gap-2 hover:bg-secondary">
                  {subTopic.type === "video" && <VideoIcon className="w-6 h-6"/>}
                  {subTopic.type === "quiz" && <Quiz className="w-4 h-4"/>}
                  {subTopic.type === "lab" && <Pen className="w-6 h-6"/>}
                  {subTopic.type === "assignment" && <FileQuestion className="w-6 h-6"/>}
                  <div className="cursor-pointer p-2">{subTopic.title}</div>
                </div>
              ))}
            </div>
          </CollapsibleTopics>
          <Separator className="my-2" />
        </>
      ))}
    </ScrollArea>
  )
}
