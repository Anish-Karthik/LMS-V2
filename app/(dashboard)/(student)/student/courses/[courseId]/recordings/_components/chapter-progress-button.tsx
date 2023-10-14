"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { CheckCircle, XCircle } from "lucide-react"
import toast from "react-hot-toast"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { Button } from "@/components/ui/button"

interface ChapterProgressButtonProps {
  chapterId: string
  topicId: string
  courseId: string
  isCompleted?: boolean
  nextTopicId?: string
  nextTopicType?: string
}

export const ChapterProgressButton = ({
  chapterId,
  topicId,
  courseId,
  isCompleted,
  nextTopicId,
  nextTopicType,
}: ChapterProgressButtonProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      // await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
      //   isCompleted: !isCompleted
      // });

      if (!isCompleted && !nextTopicId) {
        confetti.onOpen()
      }

      if (!isCompleted && nextTopicId && nextTopicType) {
        router.push(
          `/courses/${courseId}/recordings/${nextTopicType}/${nextTopicId}`
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
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  )
}
