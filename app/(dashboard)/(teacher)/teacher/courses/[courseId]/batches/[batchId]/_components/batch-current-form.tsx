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
  FormDescription,
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
  isCurrent: z.string().min(1),
})

export const BatchCurrentForm = ({
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
    defaultValues: { isCurrent: batch.isCurrent ? "ongoing" : "not ongoing" },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values.isCurrent)
      await updateBatch({
        batchId: batch.id,
        isCurrent: values.isCurrent === "ongoing",
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
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
              Make this batch as ongoing
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {batch.isCurrent ? (
            <span className="text-green-700">{"ongoing"}</span>
          ) : (
            <span className="text-red-700">{"not ongoing"}</span>
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
              name="isCurrent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="">
                        <SelectValue>
                          {field.value === "ongoing" ? (
                            <span className="text-green-700">{"ongoing"}</span>
                          ) : (
                            <span className="text-red-700">
                              {"not ongoing"}
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="not ongoing"
                          defaultChecked={field.value === "not ongoing"}
                        >
                          <span className="text-sm text-red-700">
                            not ongoing
                          </span>
                        </SelectItem>
                        <SelectItem
                          value="ongoing"
                          defaultChecked={field.value === "ongoing"}
                        >
                          <span className="text-sm text-green-700">
                            ongoing
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    {
                      "Students by default be assigned to ongoing batch, there can exist only one ongoing/current/default batch at any given time"
                    }
                  </FormDescription>
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
