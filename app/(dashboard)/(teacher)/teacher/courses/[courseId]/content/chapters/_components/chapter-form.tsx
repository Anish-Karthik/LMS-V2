"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, Topic } from "@prisma/client"
import { EyeIcon, EyeOffIcon, Loader2, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/app/_trpc/client"

import { TopicsForm } from "./topics-form"

interface ChapterFormProps {
  courseId: string
  initialData: (Chapter & { topics?: Topic[] }) | null
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
})

export const ChapterForm = ({ courseId, initialData }: ChapterFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const addChapter = trpc.course.addChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapter created")
      toggleEdit()
      router.refresh()
      router.push(`/teacher/courses/${courseId}/content`)
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const updateChapter = trpc.course.updateChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapter updated")
      toggleEdit()
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const togglePublish = trpc.course.updateChapter.useMutation({
    onSuccess: (data) => {
      toast.success(
        data.isPublished ? "Chapter published" : "Chapter unpublished"
      )
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      // Update existing chapter
      updateChapter.mutate({
        chapterId: initialData.id,
        title: values.title,
        description: values.description,
      })
    } else {
      // Create new chapter for this course
      addChapter.mutate({
        courseId,
        title: values.title,
        description: values.description,
        position: 0, // Will be ordered at the end
      })
    }
  }

  const onTogglePublish = () => {
    if (!initialData) return

    togglePublish.mutate({
      chapterId: initialData.id,
      isPublished: !initialData.isPublished,
    })
  }

  const isLoading =
    isSubmitting ||
    addChapter.isLoading ||
    updateChapter.isLoading ||
    togglePublish.isLoading

  return (
    <div>
      <div className="mt-6 border rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Chapter details
          {initialData && (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={onTogglePublish}
                disabled={isLoading}
                variant="outline"
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
              <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                  <>Cancel</>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        {!isEditing && initialData ? (
          <div className="mt-4">
            <div className="text-xl font-medium">{initialData.title}</div>
            <div className="text-sm mt-2">
              {initialData.description || "No description provided"}
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="e.g. 'Introduction to the course'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="e.g. 'In this chapter we will cover...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isLoading} type="submit">
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {initialData ? "Save changes" : "Create chapter"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
      {initialData && (
        <TopicsForm
          initialData={initialData.topics || []}
          courseId={courseId}
          chapterId={initialData.id}
        />
      )}
    </div>
  )
}
