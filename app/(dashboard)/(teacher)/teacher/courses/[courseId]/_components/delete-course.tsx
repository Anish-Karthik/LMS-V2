"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

interface DeleteCourseButtonProps {
  courseId: string
}

export const DeleteCourseButton = ({ courseId }: DeleteCourseButtonProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteCourse = trpc.course.delete.useMutation({
    onSuccess: () => {
      toast.success("Course deleted")
      router.push("/teacher/courses")
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
      setIsDeleting(false)
    },
  })

  const onDelete = () => {
    setIsDeleting(true)
    deleteCourse.mutate({ id: courseId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={isDeleting}>
          <Trash className="h-4 w-4 mr-2" /> Delete Course
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            course, all its batches, topics, and remove all student enrollments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
