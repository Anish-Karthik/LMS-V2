"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Batch, Chapter, Course } from "@prisma/client"
import axios from "axios"
import { Loader2, PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { createBatch } from "@/lib/actions/batch.action"
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

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createBatch({
        courseId,
        ...values,
      })
      toast.success("Batche created")
      toggleCreating()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/Batches/${id}`)
  }

  return (
    <div className="relative mt-6 rounded-md border bg-secondary p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course batches
        <Button onClick={toggleCreating} variant="ghost">
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
      {isCreating && (
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
      {!isCreating && (
        <div
          className={cn(
            "mt-2 text-sm",
            !initialData.batches.length && "italic text-slate-500"
          )}
        >
          {!initialData.batches.length && "No batches"}
          <BatchesList
            onEdit={onEdit}
            onReorder={() => {}}
            items={initialData.batches || []}
            courseId={courseId}
          />
        </div>
      )}
    </div>
  )
}
