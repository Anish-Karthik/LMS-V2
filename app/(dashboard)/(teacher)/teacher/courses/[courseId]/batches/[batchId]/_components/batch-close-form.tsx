"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { ComplexBatch } from "@/types/nav"
import { updateBatch } from "@/lib/actions/batch.action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  isClosed: z.string().min(1),
})

export const BatchCloseForm = ({
  batch,
  courseId,
}: {
  batch: ComplexBatch
  courseId: string
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isClosed: batch.isClosed ? "closed" : "open" },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values.isClosed)
      await updateBatch({
        batchId: batch.id,
        isClosed: values.isClosed === "closed",
        courseId,
      })
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
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center gap-x-2 rounded-md bg-slate-300 px-4 py-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            <p className="text-sm">Updating...</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Close this batch?
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Close or Open this batch
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {batch.isClosed ? (
            <span className="text-red-600">{"Closed"}</span>
          ) : (
            <span className="text-green-600">{"Open"}</span>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="isClosed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      value={field.value}
                      // defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="">
                        <SelectValue>
                          {field.value === "closed" ? (
                            <span className="text-red-600">{"Closed"}</span>
                          ) : (
                            <span className="text-green-600">{"Open"}</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="open"
                          defaultChecked={field.value === "open"}
                        >
                          <span className="text-sm text-green-600">Open</span>
                        </SelectItem>
                        <SelectItem
                          value="closed"
                          defaultChecked={field.value === "closed"}
                        >
                          <span className="text-sm text-red-600">Closed</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
