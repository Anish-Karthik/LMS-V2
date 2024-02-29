"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Topic, VideoData } from "@prisma/client"
import { Pencil, PlusCircle, Video } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import toast from "react-hot-toast"
import ReactPlayer from "react-player"
import * as z from "zod"

import { updateTopic } from "@/lib/actions/server/topic.server.action"
import { Button } from "@/components/ui/button"

interface TopicVideoFormProps {
  initialData: Topic & { videoData?: VideoData | null }
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
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()!
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.patch(`/api/courses/${batchId}/Topics/${topicId}`, values);
      await updateTopic({ topicId, videoUrl: values.videoUrl })
      toast.success("Topic updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="mt-6 rounded-md  border p-4">
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
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="w-1/1 relative mt-2 aspect-video">
            {/* <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              removed mux and added VideoPlayer
            /> */}
            <ReactPlayer url={initialData.videoUrl} controls />
          </div>
        ))}
      {isEditing && (
        <div>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={(url: any) => {
              if (url) {
                onSubmit({ videoUrl: url.info?.secure_url })
              }
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
          />
          <div className="text-muted-foreground mt-4 text-xs">
            Upload this Topic&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-muted-foreground mt-2 text-xs">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  )
}
