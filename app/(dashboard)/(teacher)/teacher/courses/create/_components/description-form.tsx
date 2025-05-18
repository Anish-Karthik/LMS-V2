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
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/app/_trpc/client"

interface DescriptionFormProps {
  initialData: {
    description: string
  }
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
})

export const CreateCourseDescriptionForm = ({
  initialData,
}: DescriptionFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
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
      description: values.description,
      imageUrl: "",
      price: 0,
      type: "batch-based",
    })
  }

  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Course description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Add description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {initialData.description || "No description provided"}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course covers advanced web development concepts...'"
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
