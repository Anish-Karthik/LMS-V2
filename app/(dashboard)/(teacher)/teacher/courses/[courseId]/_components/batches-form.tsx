"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Batch, Course } from "@prisma/client"
import { Loader2, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { createBatchFromClient } from "@/lib/actions/server/batch.server.action"
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

import { BatchesList } from "./batches-list"

interface BatchesFormProps {
  initialData: Course & { batches: Batch[] }
  courseId: string
}

const formSchema = z.object({
  name: z.string().min(1),
})
export const BatchesForm = ({ initialData, courseId }: BatchesFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [data, setData] = useState(initialData)

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const router = useRouter()!

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createBatchFromClient({
        courseId,
        ...values,
      })
      toast.success("Batch created")
      toggleCreating()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/Batches/${id}`)
  }

  const isSelfPaced = initialData.type === "self-paced"

  return (
    <div
      className={cn(
        "bg-secondary relative mt-6 rounded-md border p-4",
        isSelfPaced && "opacity-75"
      )}
    >
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      {isSelfPaced && (
        <div className="rounded-md absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/30">
          <div className="rounded-md bg-white p-4 shadow-md">
            <p className="font-semibold text-center">
              Batches not available for self-paced courses
            </p>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Change the course type to batch-based to manage batches
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course batches
        <Button onClick={toggleCreating} variant="ghost" disabled={isSelfPaced}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a batch
            </>
          )}
        </Button>
      </div>
      {isCreating && !isSelfPaced && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
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
      {!isCreating && !isSelfPaced && (
        <div
          className={cn(
            "mt-2 text-sm",
            !data.batches.length && "italic text-slate-500"
          )}
        >
          {!data.batches.length && "No batches"}
          <BatchesList
            onEdit={onEdit}
            onReorder={() => {}}
            items={data.batches || []}
            courseId={courseId}
          />
        </div>
      )}
      {!isCreating && isSelfPaced && data.batches.length > 0 && (
        <div className="mt-2 text-sm">
          <p className="text-amber-600 font-medium">
            Warning: This course has {data.batches.length}{" "}
            {data.batches.length === 1 ? "batch" : "batches"} that will be
            hidden since it's now a self-paced course.
          </p>
        </div>
      )}
    </div>
  )
}
