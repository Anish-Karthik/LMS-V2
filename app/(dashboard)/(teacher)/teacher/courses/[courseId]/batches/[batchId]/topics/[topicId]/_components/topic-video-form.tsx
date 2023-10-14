"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import MuxPlayer from "@mux/mux-player-react"
import { MuxData, Topic } from "@prisma/client"
import axios from "axios"
import { Pencil, PlusCircle, Video } from "lucide-react"
import toast from "react-hot-toast"
import * as z from "zod"

import { updateTopic } from "@/lib/actions/topic.actions"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

interface TopicVideoFormProps {
  initialData: Topic & { muxData?: MuxData | null }
  batchId: string
  topicId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

export const TopicVideoForm = ({
  initialData,
  batchId,
  topicId,
}: TopicVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTopic({ topicId, videoUrl: values.videoUrl })
      toast.success("Topic updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-secondary p-4">
      <div className="flex items-center justify-between font-medium">
        Topic video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-primary-foreground">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Upload this Topic&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  )
}
