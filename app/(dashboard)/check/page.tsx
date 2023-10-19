"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chapter, VideoData } from "@prisma/client"
import { CldUploadButton } from "next-cloudinary"
import toast from "react-hot-toast"
import * as z from "zod"

import { CloudinaryContext } from "@/components/providers/cloudinary-context"

interface ChapterVideoFormProps {
  initialData: Chapter & { videoData?: VideoData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [link, setLink] = useState(null)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // //await axios.patch(/api/courses/${courseId}/chapters/${chapterId}, values);
      toast.success("Chapter updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="mt-6 rounded-md  border p-4">
      <div className="flex items-center justify-between font-medium">
        <CloudinaryContext>
          <>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
            />
          </>
        </CloudinaryContext>
      </div>
    </div>
  )
}

export default ChapterVideoForm
