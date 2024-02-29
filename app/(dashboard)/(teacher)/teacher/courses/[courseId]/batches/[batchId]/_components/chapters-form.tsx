"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, Topic } from "@prisma/client"
import { Loader2, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import {
  createChapter,
  editChapter,
  getChapterByIdClient,
  reorderChapters,
} from "@/lib/actions/server/chapter.server.action"
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

import { ChaptersList } from "./chapters-list"

interface ChaptersFormProps {
  initialData: (Chapter & { topics: Topic[] })[]
  batchId: string
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const ChaptersForm = ({
  initialData,
  batchId,
  courseId,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState("")
  const [editIdTitle, setEditIdTitle] = useState("")

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const router = useRouter()!

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createChapter(batchId, values.title)
      toast.success("Chapter created")
      toggleCreating()
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
      toast.error("Something went wrong")
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)
      await reorderChapters(batchId, updateData)
      // await axios.put(`/api/courses/${batchId}/chapters/reorder`, {
      //   list: updateData
      // });
      toast.success("Chapters reordered")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }
  const onEditing = async (values: z.infer<typeof formSchema>) => {
    try {
      await editChapter(editId, values.title)
      toast.success("Chapter created")
      setIsEditing(false)
      setEditId("")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
      toast.error("Something went wrong")
    }
  }

  const onEdit = async (id: string) => {
    // router.push(`/teacher/courses/${courseId}/${batchId}/chapters/${id}`);
    const tmpTitle = (await getChapterByIdClient(id)).title
    setEditIdTitle(tmpTitle)
    setIsEditing(true)
    setEditId(id)
  }

  return (
    <div className="bg-secondary relative mt-6 rounded-md border p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a chapter
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
                      placeholder="e.g. 'Introduction to the course'"
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
          {!initialData.length && "No chapters"}
          {isEditing ? (
            <EditForm
              onSubmit={onEditing}
              editIdTitle={editIdTitle}
              setIsEditing={setIsEditing}
            />
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData || []}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      )}
      {!isCreating && !isEditing && (
        <p className="text-muted-foreground mt-4 text-xs">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}

function EditForm({
  onSubmit,
  editIdTitle,
  setIsEditing,
}: {
  onSubmit: any
  editIdTitle: string
  setIsEditing: any
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editIdTitle || "",
    },
  })
  const { isSubmitting, isValid } = form.formState
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    defaultValue={editIdTitle}
                    placeholder={editIdTitle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button disabled={!isValid || isSubmitting} type="submit">
          Edit
        </Button>
        <Button
          type={"button"}
          className="ml-5"
          variant={"ghost"}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
      </form>
    </Form>
  )
}
