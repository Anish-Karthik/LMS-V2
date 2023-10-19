"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Announcement, Attachment } from "@prisma/client"
import { Pencil, TrashIcon } from "lucide-react"

import { deleteAnnouncement } from "@/lib/actions/announcement.action"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AnnouncementsListProps {
  items: (Announcement & { attachments?: Attachment[] })[]
}

export const AnnouncementsList = ({ items }: AnnouncementsListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [batches, setBatches] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setBatches(items)
  }, [items])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      {batches.map((announcement, index) => (
        <div
          className={cn(
            "mb-4 flex items-center justify-between gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
            announcement && "border-sky-200 bg-sky-100 text-sky-700"
          )}
        >
          <div className="max-xs:max-w-[160px] sm:max-w-[60vw]">
            <p className="overflow-hidden text-ellipsis pl-2">
              {announcement.title}
            </p>
          </div>

          <div className="flex items-center justify-normal">
            <div className="ml-auto flex items-center gap-2 pr-2 max-xs:flex-col max-xs:py-1">
              <span className="rounded-sm bg-slate-500 p-1 text-xs text-primary">
                {announcement.courseId && announcement.batchId
                  ? "Batch"
                  : announcement.courseId
                  ? "Course"
                  : "General"}
              </span>
              {announcement.isPublished ? (
                <span className="text-xs text-green-500">Published</span>
              ) : (
                <span className="text-xs text-slate-500">Unpublished</span>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2 pr-2 max-xs:flex-col max-xs:py-1">
              <Link href={`/teacher/announcements/${announcement.id}`}>
                <Button variant={"ghost"}>
                  <Pencil className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant={"destructive"}
                onClick={async () => {
                  await deleteAnnouncement(announcement.id)
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
