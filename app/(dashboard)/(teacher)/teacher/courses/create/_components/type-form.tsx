"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { trpc } from "@/app/_trpc/client"

interface TypeFormProps {
  initialData: {
    type: string
  }
}

const formSchema = z.object({
  type: z.enum(["batch-based", "self-paced"]),
})

export const CreateCourseTypeForm = ({ initialData }: TypeFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: (initialData.type as "batch-based" | "self-paced") || "batch-based",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const createCourse = trpc.course.create.useMutation({
    onSuccess: (data) => {
      toast.success("Course created!")
      toggleEdit()
      router.push(`/teacher/courses/${data.id}`)
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createCourse.mutate({
      title: "Untitled Course",
      description: "",
      imageUrl: "",
      price: 0,
      type: values.type,
    })
  }

  const courseTypeLabels = {
    "batch-based": "Batch-based (Instructor-led with batches)",
    "self-paced": "Self-paced (No batches, learn at your own pace)",
  }

  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Course type
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              {initialData.type ? "Edit type" : "Select type"}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {initialData.type
            ? courseTypeLabels[initialData.type as "batch-based" | "self-paced"]
            : "No type selected"}
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
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="batch-based" id="batch-based" />
                        <FormLabel
                          htmlFor="batch-based"
                          className="font-normal"
                        >
                          Batch-based (Instructor-led with batches)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self-paced" id="self-paced" />
                        <FormLabel htmlFor="self-paced" className="font-normal">
                          Self-paced (No batches, learn at your own pace)
                        </FormLabel>
                      </div>
                    </RadioGroup>
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
