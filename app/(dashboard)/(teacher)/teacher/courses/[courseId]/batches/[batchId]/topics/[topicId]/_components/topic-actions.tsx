"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import {
  deleteTopic,
  publishTopic,
  unpublishTopic,
} from "@/lib/actions/server/topic.server.action"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

interface TopicActionsProps {
  disabled: boolean
  batchId: string
  topicId: string
  courseId: string
  isPublished: boolean
}

export const TopicActions = ({
  disabled,
  batchId,
  topicId,
  courseId,
  isPublished,
}: TopicActionsProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await unpublishTopic(topicId)
        toast.success("Chapter unpublished")
      } else {
        await publishTopic(topicId)
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

      await deleteTopic(topicId)

      toast.success("Chapter deleted")
      router.refresh()
      router.push(`/teacher/courses/${courseId}/batches/${batchId}`)
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
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
