"use client"

import React from "react"
import { LayoutDashboard } from "lucide-react"

import { ComplexBatch } from "@/types/nav"
import { IconBadge } from "@/components/icon-badge"

import { BatchCloseForm } from "./batch-close-form"
import { BatchCurrentForm } from "./batch-current-form"
import { BatchNameForm } from "./batch-name-form"

const BatchEditForm = ({
  batch,
  courseId,
}: {
  batch: ComplexBatch
  courseId: string
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-x-2">
        <IconBadge icon={LayoutDashboard} />
        <h2 className="text-xl">Customize your Batch</h2>
      </div>
      <BatchNameForm batch={batch} courseId={courseId} />
      <BatchCloseForm batch={batch} courseId={courseId} />
      <BatchCurrentForm batch={batch} courseId={courseId} />
    </div>
  )
}

export default BatchEditForm
