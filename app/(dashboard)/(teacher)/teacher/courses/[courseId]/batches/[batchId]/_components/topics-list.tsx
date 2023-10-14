"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { Chapter, Topic } from "@prisma/client"
import { GripVertical, Loader2, Pencil, PlusCircle } from "lucide-react"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TopicsListProps {
  items: Topic[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (id: string) => void
}

export const TopicsList = ({ items, onReorder, onEdit }: TopicsListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [topics, setTopics] = useState(items)
  const pathname = usePathname()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setTopics(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    // If there is no destination, return
    if (!result.destination) return
    const items = Array.from(topics)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedTopics = items.slice(startIndex, endIndex + 1)

    setTopics(items)

    const bulkUpdateData = updatedTopics.map((chapter) => ({
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
      <Droppable droppableId="topics">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {topics.map((topic, index) => (
              <Draggable key={topic.id} draggableId={topic.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
                      topic && "border-sky-200 bg-sky-100 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
                        topic && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    {topic.title}

                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      {topic.isPublished ? (
                        <span className="text-xs text-green-500">
                          Published
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">
                          Unpublished
                        </span>
                      )}
                      <Pencil
                        onClick={() => onEdit(topic.id)}
                        className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                      />
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
