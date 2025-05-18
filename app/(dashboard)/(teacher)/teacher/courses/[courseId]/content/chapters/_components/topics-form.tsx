"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Topic } from "@prisma/client"
import { Loader2, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { trpc } from "@/app/_trpc/client"

import { TopicsList } from "./topics-list"

interface TopicsFormProps {
  initialData: Topic[]
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const TopicsForm = ({
  initialData,
  courseId,
  chapterId,
}: TopicsFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter()

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const createTopic = trpc.topic.create.useMutation({
    onSuccess: () => {
      toast.success("Topic created")
      toggleCreating()
      router.refresh()
    },
    onError: (error) => {
      toast.error("Failed to create topic")
      console.error(error)
    },
  })

  const reorderTopics = trpc.topic.reorder.useMutation({
    onSuccess: () => {
      toast.success("Topics reordered")
      router.refresh()
    },
    onError: (error) => {
      toast.error("Failed to reorder topics")
      console.error(error)
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createTopic.mutate({
      title: values.title,
      chapterId,
    })
  }

  const onReorder = (updateData: { id: string; position: number }[]) => {
    setIsUpdating(true)

    reorderTopics.mutate(
      {
        list: updateData,
        chapterId,
      },
      {
        onSuccess: () => {
          setIsUpdating(false)
        },
        onError: () => {
          setIsUpdating(false)
        },
      }
    )
  }

  return (
    <div className="relative mt-6 border rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapter topics
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a topic
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the topic'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.length && "text-slate-500 italic"
          )}
        >
          {!initialData.length && "No topics"}
          <TopicsList
            items={initialData || []}
            onReorder={onReorder}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      )}
      {!isCreating && initialData.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the topics
        </p>
      )}
    </div>
  )
}
