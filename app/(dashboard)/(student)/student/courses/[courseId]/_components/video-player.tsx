"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import { toast } from "react-hot-toast"
import ReactPlayer from "react-player"

import { updateUserProgressTopic } from "@/lib/actions/server/topic.server.action"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface VideoPlayerProps {
  userId: string
  playbackId: string
  courseId: string
  topicId: string
  nextTopicId?: string
  nextTopicType?: string
  isCompleted?: boolean
  isLocked: boolean
  completeOnEnd: boolean
  title: string
}

export const VideoPlayer = ({
  userId,
  playbackId,
  courseId,
  topicId,
  nextTopicId,
  nextTopicType,
  isLocked = false,
  isCompleted = false,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()!
  const confetti = useConfettiStore()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        if (!isCompleted) await updateUserProgressTopic(userId, topicId, true)

        if (!nextTopicId) {
          confetti.onOpen()
        }
        console.log("----------------------------")
        console.log(topicId, nextTopicId, completeOnEnd, nextTopicType)
        console.log("----------------------------")
        toast.success("Progress updated")
        router.refresh()

        if (nextTopicId && nextTopicType) {
          router.push(
            `/student/courses/${courseId}/${nextTopicType}/${nextTopicId}`
          )
        }
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="text-secondary h-8 w-8 animate-spin" />
        </div>
      )}
      {isLocked && (
        <div className="text-secondary absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This topic is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={playbackId}
          onEnded={onEnd}
          width="100%"
          height="100%"
          onReady={() => setIsReady(true)}
          controls
          onContextMenu={(e: any) => e.preventDefault()}
          config={{
            file: {
              attributes: {
                disablePictureInPicture: true,
                controlsList: "nodownload",
              },
            },
          }}
        />
      )}
    </div>
  )
}
