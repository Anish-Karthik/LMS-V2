"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { trpc } from "@/app/_trpc/client"

interface PublishButtonProps {
  initialData: Course
  courseId: string
}

export const PublishButton = ({
  initialData,
  courseId,
}: PublishButtonProps) => {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const isComplete = Boolean(
    initialData.title &&
      initialData.description &&
      initialData.imageUrl &&
      initialData.price
  )

  const publishCourse = trpc.course.publish.useMutation({
    onSuccess: () => {
      toast.success(
        initialData.isPublished ? "Course unpublished" : "Course published"
      )
      setIsPublishing(false)
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
      setIsPublishing(false)
    },
  })

  const onTogglePublish = () => {
    if (!isComplete && !initialData.isPublished) {
      return toast.error("Please complete all course details before publishing")
    }

    setIsPublishing(true)
    publishCourse.mutate({
      id: courseId,
      isPublished: !initialData.isPublished,
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onTogglePublish}
            disabled={isPublishing}
            variant={initialData.isPublished ? "outline" : "default"}
            size="sm"
          >
            {initialData.isPublished ? (
              <>
                <EyeOffIcon className="h-4 w-4 mr-2" />
                Unpublish
              </>
            ) : (
              <>
                <EyeIcon className="h-4 w-4 mr-2" />
                Publish
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {initialData.isPublished
            ? "Hide this course from students"
            : isComplete
            ? "Make this course visible to students"
            : "Complete all course details to publish"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
