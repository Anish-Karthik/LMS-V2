"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import toast from "react-hot-toast"

import { updateUserProgressTopic } from "@/lib/actions/topic.actions"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import { Button } from "@/components/ui/button"

interface ChapterProgressButtonProps {
  chapterId: string
  topicId: string
  courseId: string
  isCompleted?: boolean
  nextTopicId?: string
  nextTopicType?: string
  userId: string
}

export const ChapterProgressButton = ({
  chapterId,
  topicId,
  courseId,
  isCompleted,
  nextTopicId,
  nextTopicType,
  userId,
}: ChapterProgressButtonProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  const onClick = async () => {
    try {
      setIsLoading(true)
      await updateUserProgressTopic(userId, topicId, !isCompleted)
      console.log(nextTopicId, isCompleted)
      if (!isCompleted && (!nextTopicId || nextTopicId != topicId)) {
        confetti.onOpen()
      }

      if (!isCompleted && nextTopicId && nextTopicType) {
        router.push(
          `/student/courses/${courseId}/${nextTopicType}/${nextTopicId}`
        )
      }

      toast.success("Progress updated")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Mark as Not completed" : "Mark as complete"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  )
}
