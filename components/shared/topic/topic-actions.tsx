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
  topicId: string
  courseId: string
  batchId?: string
  isPublished: boolean
  chapterId?: string
}

export const TopicActions = ({
  disabled,
  topicId,
  courseId,
  batchId,
  isPublished,
  chapterId,
}: TopicActionsProps) => {
  const router = useRouter()!
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
      if (batchId) {
        router.push(
          `/teacher/courses/${courseId}/batches/${batchId}/topics/${topicId}`
        )
      } else {
        router.push(`/teacher/courses/${courseId}/content/chapters/${chapterId}`)
      }
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
        <Button variant={"destructive"} size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
