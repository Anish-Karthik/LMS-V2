"use client"

import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const EmptyBatchesForm = () => {
  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="font-medium">Course batches</div>
      <Alert className="mt-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Batches are added after course creation</AlertTitle>
        <AlertDescription>
          For batch-based courses, you can add batches after creating the
          course. Batches allow you to organize students into different cohorts
          with their own schedules.
        </AlertDescription>
      </Alert>
      <div className="text-muted-foreground mt-4 text-sm">
        <p>
          Self-paced courses do not require batches. For batch-based courses,
          you&apos;ll be able to:
        </p>
        <ul className="mt-2 list-disc pl-6">
          <li>Create multiple batches</li>
          <li>Set batch start and end dates</li>
          <li>Assign students to specific batches</li>
          <li>Track progress by batch</li>
        </ul>
      </div>
    </div>
  )
}
