"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import {
  deleteAnnouncement,
  publishAnnouncement,
  unpublishAnnouncement,
} from "@/lib/actions/server/announcement.server.action"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

interface AnnouncementActionsProps {
  disabled: boolean
  batchId: string
  announcementId: string
  courseId: string
  isPublished: boolean
}

export const AnnouncementActions = ({
  disabled,
  batchId,
  announcementId,
  courseId,
  isPublished,
}: AnnouncementActionsProps) => {
  const router = useRouter()!
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await unpublishAnnouncement(announcementId)
        toast.success("Chapter unpublished")
      } else {
        await publishAnnouncement(announcementId, batchId, courseId)
        toast.success("Chapter published")
      }

      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await deleteAnnouncement(announcementId)

      toast.success("Chapter deleted")
      router.refresh()
      router.push(`/teacher/announcements`)
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete} typeDelete>
        <Button size="sm" disabled={isLoading} variant={"destructive"}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
