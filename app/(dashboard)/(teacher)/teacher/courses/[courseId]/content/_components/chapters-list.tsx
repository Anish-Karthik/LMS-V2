"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { Chapter, Topic } from "@prisma/client"
import { EyeIcon, EyeOffIcon, GripVertical, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

interface ChaptersListProps {
  courseId: string
  chapters: (Chapter & { topics: Topic[] })[]
}

export const ChaptersList = ({ courseId, chapters }: ChaptersListProps) => {
  const [items, setItems] = useState(chapters)
  const [isMounted, setIsMounted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const reorderMutation = trpc.course.updateChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapters reordered")
    },
    onError: (error) => {
      toast.error("Failed to reorder chapters")
      console.error(error)
    },
  })

  const deleteChapter = trpc.course.deleteChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapter deleted")
      router.refresh()
    },
    onError: (error) => {
      toast.error("Failed to delete chapter")
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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setItems(chapters)
  }, [chapters])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedChapters = items.slice(startIndex, endIndex + 1)

    setItems(items)

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }))

    // Update each chapter individually
    bulkUpdateData.forEach((chapter) => {
      reorderMutation.mutate({
        chapterId: chapter.id,
        position: chapter.position,
      })
    })
  }

  const onDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      deleteChapter.mutate({ chapterId: id })
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsDeleting(false)
    }
  }

  const onTogglePublish = (id: string, isPublished: boolean) => {
    togglePublish.mutate({
      chapterId: id,
      isPublished: !isPublished,
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-200 border-sky-200"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-200 rounded-l-md transition",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex w-full items-center justify-between gap-x-2 py-3">
                      <div className="ml-2 flex flex-col">
                        <div className="font-medium">{chapter.title}</div>
                        <div className="flex items-center gap-x-2 text-muted-foreground">
                          {!!chapter.topics?.length && (
                            <div className="flex items-center gap-x-1 text-xs">
                              <span className="text-xs">
                                {chapter.topics.length} topics
                              </span>
                            </div>
                          )}
                          <div className="text-xs text-slate-500">
                            {chapter.description || "No description"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2 pr-2">
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            chapter.isPublished && "bg-sky-700"
                          )}
                        >
                          {chapter.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Button
                          onClick={() =>
                            onTogglePublish(chapter.id, chapter.isPublished)
                          }
                          variant="ghost"
                          size="sm"
                        >
                          {chapter.isPublished ? (
                            <EyeOffIcon className="h-4 w-4 mr-2" />
                          ) : (
                            <EyeIcon className="h-4 w-4 mr-2" />
                          )}
                          {chapter.isPublished ? "Unpublish" : "Publish"}
                        </Button>
                        <a
                          href={`/teacher/courses/${courseId}/content/chapters/${chapter.id}`}
                        >
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </a>
                        <Button
                          disabled={isDeleting}
                          onClick={() => onDelete(chapter.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash className="h-4 w-4 mr-2" />
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
