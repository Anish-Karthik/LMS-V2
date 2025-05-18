"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { trpc } from "@/app/_trpc/client"

interface PriceFormProps {
  initialData: {
    price: number
  }
}

const formSchema = z.object({
  price: z.coerce.number(),
})

export const CreateCoursePriceForm = ({ initialData }: PriceFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || 0,
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
      price: values.price,
      type: "batch-based",
    })
  }

  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              {initialData.price ? "Edit price" : "Add price"}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {initialData.price ? formatPrice(initialData.price) : "No price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
