"use client"

import { useEffect, useState } from "react"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { Topic } from "@prisma/client"
import { EyeIcon, EyeOffIcon, GripVertical, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

interface TopicsListProps {
  items: Topic[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  courseId: string
  chapterId: string
}

export const TopicsList = ({
  items,
  onReorder,
  courseId,
  chapterId,
}: TopicsListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [topics, setTopics] = useState(items)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteTopic = trpc.topic.delete.useMutation({
    onSuccess: () => {
      toast.success("Topic deleted")
      window.location.reload()
    },
    onError: (error) => {
      toast.error("Failed to delete topic")
      console.error(error)
    },
  })

  const togglePublish = trpc.topic.togglePublish.useMutation({
    onSuccess: (data) => {
      toast.success(data.isPublished ? "Topic published" : "Topic unpublished")
      window.location.reload()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setTopics(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(topics)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedTopics = items.slice(startIndex, endIndex + 1)

    setTopics(items)

    const bulkUpdateData = updatedTopics.map((topic) => ({
      id: topic.id,
      position: items.findIndex((item) => item.id === topic.id),
    }))

    onReorder(bulkUpdateData)
  }

  const onDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      deleteTopic.mutate(id)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsDeleting(false)
    }
  }

  const onTogglePublish = (id: string, isPublished: boolean) => {
    togglePublish.mutate({
      id,
      isPublished: !isPublished,
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="topics">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {topics.map((topic, index) => (
              <Draggable key={topic.id} draggableId={topic.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-100 text-sm text-slate-700",
                      topic.isPublished &&
                        "border-sky-200 bg-sky-100 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-200",
                        topic.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex w-full items-center justify-between gap-x-2 py-3">
                      <div className="ml-2 flex flex-col">
                        <div className="font-medium">
                          {topic.title}
                          {topic.isFree && (
                            <Badge className="ml-2 bg-emerald-700">Free</Badge>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {topic.description || "No description"}
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2 pr-2">
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            topic.isPublished && "bg-sky-700"
                          )}
                        >
                          {topic.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Button
                          onClick={() =>
                            onTogglePublish(topic.id, topic.isPublished)
                          }
                          variant="ghost"
                          size="sm"
                        >
                          {topic.isPublished ? (
                            <EyeOffIcon className="mr-2 h-4 w-4" />
                          ) : (
                            <EyeIcon className="mr-2 h-4 w-4" />
                          )}
                          {topic.isPublished ? "Unpublish" : "Publish"}
                        </Button>
                        <a
                          href={`/teacher/courses/${courseId}/content/chapters/${chapterId}/topics/${topic.id}`}
                        >
                          <Button variant="ghost" size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </a>
                        <Button
                          disabled={isDeleting}
                          onClick={() => onDelete(topic.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
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
