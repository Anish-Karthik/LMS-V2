"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { ComplexBatch } from "@/types/nav"
import { updateBatch } from "@/lib/actions/server/batch.server.action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1),
})

export const BatchNameForm = ({
  batch,
  courseId,
}: {
  batch: ComplexBatch
  courseId: string
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: batch.name },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateBatch({ batchId: batch.id, name: values.name, courseId })
      toast.success("Batch updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative mt-6 rounded-md border bg-secondary p-4">
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex items-center gap-x-2 rounded-md bg-slate-300 px-4 py-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            <p className="text-sm">Updating...</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Batch name
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit name
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{batch.name}</p>}
      {isEditing && (
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
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
