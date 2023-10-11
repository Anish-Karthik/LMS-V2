"use client";

import { Batch, Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DeleteIcon, GripVertical, Pencil, TrashIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteBatch } from "@/lib/actions/batch.action";

interface BatchesListProps {
  items: Batch[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  courseId: string;
};

export const BatchesList = ({
  items,
  onReorder,
  onEdit,
  courseId
}: BatchesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [batches, setBatches] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setBatches(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(batches);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setBatches(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {batches.map((batch, index) => (
              <Draggable 
                key={batch.id} 
                draggableId={batch.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      batch && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        batch && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical
                        className="h-5 w-5"
                      />
                    </div>
                    {batch.name}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      
                    </div>
                    <div>
                      <Link href={`/teacher/course/${courseId}/batches/${batch.id}`}>
                        <Button variant={"ghost"}>
                          <Pencil className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                    {batch.name !== "unassigned" && (
                      <div>
                      <Button variant={"destructive"} onClick={async () => {
                        await deleteBatch(courseId, batch.id);
                      }}>
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                    )}
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