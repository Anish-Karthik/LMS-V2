"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { Announcement, Attachment, Batch, Chapter } from "@prisma/client"
import { DeleteIcon, GripVertical, Pencil, TrashIcon } from "lucide-react"

import { deleteAnnouncement } from "@/lib/actions/announcement.action"
import { deleteBatch } from "@/lib/actions/batch.action"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AnnouncementsListProps {
  items: (Announcement & { attachments?: Attachment[] })[]
}

export const AnnouncementsList = ({ items }: AnnouncementsListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [batches, setBatches] = useState(items)
  const router = useRouter()

  const onEdit = (id: string) => {
    console.log(id)
    // router.push(`/teacher/announcements/${id}/edit`)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setBatches(items)
  }, [items])

  if (!isMounted) {
    return null
  }
  console.log(batches)

  return (
    <div>
      {batches.map((announcement, index) => (
        <div
          className={cn(
            "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
            announcement && "border-sky-200 bg-sky-100 text-sky-700"
          )}
        >
          <div
            className={cn(
              "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
              announcement && "border-r-sky-200 hover:bg-sky-200"
            )}
          >
            <GripVertical className="h-5 w-5" />
          </div>
          {announcement.title}
          <div className="ml-auto flex items-center gap-x-2 pr-2"></div>
          {announcement.title !== "unassigned" && (
            <div>
              <Link href={`/teacher/announcements/${announcement.id}`}>
                <Button variant={"ghost"}>
                  <Pencil className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
          {announcement.title !== "unassigned" && (
            <div>
              <Button
                variant={"destructive"}
                onClick={async () => {
                  await deleteAnnouncement(announcement.id)
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
