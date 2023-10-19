"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowDropDownCircle } from "@mui/icons-material"
import { Chapter, Topic } from "@prisma/client"
import { GripVertical, Pencil, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { createTopic } from "@/lib/actions/topic.actions"
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
import { CollapsibleTopics } from "@/components/shared/collapsible-topics"

import { TopicsForm } from "./topics-form"

interface ChaptersListProps {
  items: (Chapter & { topics: Topic[] })[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (id: string) => void
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [chapters, setChapters] = useState(items)
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setChapters(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    // If there is no destination, return
    if (!result.destination) return
    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedChapters = items.slice(startIndex, endIndex + 1)

    setChapters(items)

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }))

    onReorder(bulkUpdateData)
  }

  if (!isMounted) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <CollapsibleTopics
                    trigger={
                      <div
                        className={cn(
                          "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700  ",
                          chapter && "border-sky-200 bg-sky-100 text-sky-700"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
                            chapter && "border-r-sky-200 hover:bg-sky-200"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                        {chapter.title}

                        <div className="ml-auto flex items-center gap-x-2 pr-2">
                          <Pencil
                            onClick={() => onEdit(chapter.id)}
                            className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                          />

                          {/* <Link href={pathname+`/chapter/${chapter.id}`} className="flex items-center">
                          <PlusCircle className="mr-2 h-4 w-4" />
                            Add a topic
                        </Link> */}
                          <ArrowDropDownCircle className="h-4 w-4 cursor-pointer transition hover:opacity-75" />
                        </div>
                      </div>
                    }
                  >
                    <div>
                      <TopicsForm
                        batchId={chapter.batchId}
                        chapterId={chapter.id}
                        initialData={chapter.topics}
                      />
                      {/* {chapter.topics.map((topic) =>(
                          <div className="flex items-center justify-start gap-2 pl-2 hover:bg-secondary">
                            <div className="cursor-pointer p-2">{topic.title}</div>
                            <Link href={pathname+`/topic/${topic.id}`} className="flex items-center">
                              <Pencil className="mr-2 h-4 w-4" />
                            </Link>
                          </div>
                        ))} */}
                    </div>
                  </CollapsibleTopics>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

function CreateTopicForm({ chapterId }: { chapterId: string }) {
  const [isCreating, setIsCreating] = useState(false)
  const formSchema = z.object({
    title: z.string().min(1),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTopic(chapterId, values.title)
      toast.success("Topic created")
      toggleCreating()
      // router.refresh();
    } catch (error: any) {
      toast.error(error.message)
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="flex items-center justify-between font-medium">
      Course topics
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
      {isCreating && (
        <div className="w-full">
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
        </div>
      )}
    </div>
  )
}
