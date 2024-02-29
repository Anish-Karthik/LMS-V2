"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Testimonial, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import {
  createTestimonial,
  updateTestimonial,
} from "@/lib/actions/server/testimonial.server.action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Stars from "@/components/shared/react-stars"

import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Please enter a description",
  }),
  rating: z
    .number()
    .min(1, {
      message: "Please enter a rating",
    })
    .max(5),
})
const defaultValues = {
  rating: 5,
}
const TestimonialForm = ({
  userInfo,
  edit = false,
  defaultValue,
  id,
}: {
  userInfo: (User & { testimonials: Testimonial[] }) | null
  edit?: boolean
  defaultValue?: z.infer<typeof formSchema>
  id?: string
}) => {
  const [isEditing, setIsEditing] = React.useState(edit)
  const router = useRouter()!
  const { userId } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue || defaultValues,
    mode: "onChange",
  })
  const { isValid, isSubmitting } = form.formState
  useEffect(() => {
    if (!isEditing && edit) {
      router.push("/testimonials")
    }
    if (isEditing && !userInfo) {
      router.push("/onBoarding")
    }
  }, [edit, isEditing, router, userInfo])
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (edit && id) {
        await updateTestimonial({
          id,
          description: values.description,
          rating: Number(values.rating),
        })
      } else {
        await createTestimonial({
          userId: userInfo?.userId || "",
          description: values.description,
          rating: Number(values.rating),
        })
        toast.success("Testimonial created")
      }
      router.push("/testimonials")
    } catch (error) {
      toast.error("Something went wrong")
    }
    router.refresh()
    setIsEditing(false)
  }
  return (
    <div className="relative">
      {(!isEditing && edit) ||
        (isSubmitting && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-500 opacity-50">
            <div className="loader h-32 w-32 rounded-full border-8 border-gray-200 ease-linear"></div>
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Stars
                      // @ts-ignore
                      // @ts-nocheck
                      value={field.value}
                      onChange={(rating: number) => {
                        return field.onChange(rating)
                      }}
                      size={40}
                      half={false}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea placeholder="This course is ..." {...field} />
                  </FormControl>
                  <FormDescription>Write a review.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isEditing && (
        <Button
          onClick={() => {
            if (userId) {
              setIsEditing(true)
            } else {
              toast.error("Please login to add a testimonial")
              router.push("/sign-in")
            }
          }}
        >
          Add Testimonial
        </Button>
      )}
    </div>
  )
}

export default TestimonialForm
