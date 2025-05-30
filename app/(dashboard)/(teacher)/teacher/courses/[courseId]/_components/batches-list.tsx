"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Batch } from "@prisma/client"
import { GripVertical, Pencil, TrashIcon } from "lucide-react"
import { toast } from "react-hot-toast"

import { deleteBatch } from "@/lib/actions/server/batch.server.action"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

interface BatchesListProps {
  items: Batch[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (id: string) => void
  courseId: string
}

export const BatchesList = ({
  items,
  onReorder,
  onEdit,
  courseId,
}: BatchesListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [batches, setBatches] = useState(items)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setBatches(items)
  }, [items])

  const handleDelete = async (courseId: string, batchId: string) => {
    try {
      setIsUpdating(true)
      await deleteBatch(courseId, batchId)
      setBatches((prev) => prev.filter((batch) => batch.id !== batchId))
      toast.success("Batch deleted successfully")
    } catch (err: any) {
      toast.error("Error deleting batch")
    } finally {
      setIsUpdating(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="relative">
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50">
          <div className="flex items-center gap-x-2 rounded-md bg-slate-300 px-4 py-2">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-sky-500"></div>
            <span>Updating...</span>
          </div>
        </div>
      )}
      {batches.map((batch, index) => (
        <div
          className={cn(
            "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
            batch && "border-sky-200 bg-sky-100 text-sky-700"
          )}
        >
          <div
            className={cn(
              "rounded-l-md border-r border-r-slate-200 px-2 py-3",
              batch && "border-r-sky-200"
            )}
          >
            <GripVertical className="h-5 w-5" />
          </div>
          {batch.name}
          <div className="ml-auto flex items-center gap-x-2 pr-2">
            <div>
              {batch.isCurrent && (
                <span className="rounded-md bg-slate-300 px-2 py-1 text-xs text-slate-700">
                  Current
                </span>
              )}
              {batch.isClosed && (
                <span className="rounded-md bg-slate-300 px-2 py-1 text-xs text-slate-700">
                  Closed
                </span>
              )}
            </div>
            <div>
              <Link href={`/teacher/courses/${courseId}/batches/${batch.id}`}>
                <Button variant={"ghost"}>
                  <Pencil className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            {!batch.isCurrent && (
              <ConfirmModal
                onConfirm={() => handleDelete(courseId, batch.id)}
                typeDelete
              >
                <Button variant={"destructive"}>
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </ConfirmModal>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
