"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Topic } from "@prisma/client"
import { Loader2, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import {
  createTopic,
  reorderTopics,
} from "@/lib/actions/server/topic.server.action"
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

import { TopicsList } from "./topics-list"

interface TopicsFormProps {
  initialData: Topic[]
  chapterId: string
  batchId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const TopicsForm = ({
  initialData,
  chapterId,
  batchId,
}: TopicsFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTopic(chapterId, values.title)
      toast.success("Chapter created")
      toggleCreating()
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
      toast.error("Something went wrong")
    }
  }

  const onReorderTopic = async (
    updateData: { id: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true)
      await reorderTopics(chapterId, updateData)
      toast.success("Topics reordered")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }
  const onEditTopic = async (id: string) => {
    router.push(`${pathname}/topics/${id}`)
  }

  return (
    <div className="relative mt-6 rounded-md border bg-secondary p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a topic
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Basics of Trading'"
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
            "mt-2 text-sm",
            !initialData.length && "italic text-slate-500"
          )}
        >
          {!initialData.length && "No Topics"}
          <TopicsList
            onEdit={onEditTopic}
            onReorder={onReorderTopic}
            items={initialData || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to reorder the topics
        </p>
      )}
    </div>
  )
}
