"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
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
import { FileUpload } from "@/components/file-upload"
import { trpc } from "@/app/_trpc/client"

interface ImageFormProps {
  initialData: {
    imageUrl: string
  }
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
})

export const CreateCourseImageForm = ({ initialData }: ImageFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
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
      imageUrl: values.imageUrl,
      price: 0,
      type: "batch-based",
    })
  }

  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              {initialData.imageUrl ? "Edit image" : "Add image"}
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="courseImage"
                        onChange={field.onChange}
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
        </div>
      )}
    </div>
  )
}
