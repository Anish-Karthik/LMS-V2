"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Topic } from "@prisma/client"
import { EyeIcon, EyeOffIcon, Loader2, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/app/_trpc/client"

interface TopicFormProps {
  initialData: Topic
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().default(false),
})

export const TopicForm = ({
  initialData,
  courseId,
  chapterId,
}: TopicFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const updateTopic = trpc.topic.update.useMutation({
    onSuccess: () => {
      toast.success("Topic updated")
      toggleEdit()
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const togglePublish = trpc.topic.togglePublish.useMutation({
    onSuccess: (data) => {
      toast.success(data.isPublished ? "Topic published" : "Topic unpublished")
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
      title: initialData.title,
      description: initialData.description || "",
      videoUrl: initialData.videoUrl || "",
      isFree: initialData.isFree,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateTopic.mutate({
      id: initialData.id,
      title: values.title,
      description: values.description,
      videoUrl: values.videoUrl,
      isFree: values.isFree,
    })
  }

  const onTogglePublish = () => {
    togglePublish.mutate({
      id: initialData.id,
      isPublished: !initialData.isPublished,
    })
  }

  const isLoading =
    isSubmitting || updateTopic.isLoading || togglePublish.isLoading

  return (
    <div className="relative mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Topic details
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
      </div>
      {!isEditing && (
        <div className="mt-4">
          <div className="text-xl font-medium">{initialData.title}</div>
          {initialData.description && (
            <div className="text-sm mt-2">{initialData.description}</div>
          )}
          {initialData.videoUrl && (
            <div className="text-sm text-sky-500 mt-2">
              Video URL: {initialData.videoUrl}
            </div>
          )}
          <div className="text-sm mt-2">
            {initialData.isFree ? (
              <p className="text-emerald-500">This is a free topic</p>
            ) : (
              <p className="text-slate-500">This is a premium topic</p>
            )}
          </div>
        </div>
      )}
      {isEditing && (
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
                  <FormLabel>Topic title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. 'Introduction to the topic'"
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
                  <FormLabel>Topic description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="e.g. 'In this topic we will cover...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. 'https://www.youtube.com/watch?v=...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Free topic</FormLabel>
                    <FormDescription>
                      Check this box if you want to make this topic free for
                      preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isLoading} type="submit">
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
