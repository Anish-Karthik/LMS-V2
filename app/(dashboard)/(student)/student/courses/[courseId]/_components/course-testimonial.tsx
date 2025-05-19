"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Testimonial, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import Stars from "@/components/shared/react-stars"
import TRPCProvider from "@/app/_trpc/Provider"
import { trpc } from "@/app/_trpc/client"

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Please enter a description of at least 10 characters",
  }),
  rating: z
    .number()
    .min(1, {
      message: "Please enter a rating",
    })
    .max(5),
})

interface CourseTestimonialProps {
  courseId: string
  userObjId: string
  existingTestimonial?: Testimonial | null
}

const CourseTestimonialInner = ({
  courseId,
  userObjId,
  existingTestimonial,
}: CourseTestimonialProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  // TRPC mutations
  const createTestimonial = trpc.testimonial.create.useMutation({
    onSuccess: () => {
      toast.success("Testimonial submitted successfully")
      setIsEditing(false)
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit testimonial")
    },
  })

  const updateTestimonial = trpc.testimonial.update.useMutation({
    onSuccess: () => {
      toast.success("Testimonial updated successfully")
      setIsEditing(false)
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update testimonial")
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: existingTestimonial
      ? {
          description: existingTestimonial.description,
          rating: existingTestimonial.rating,
        }
      : {
          description: "",
          rating: 5,
        },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (existingTestimonial) {
      updateTestimonial.mutate({
        id: existingTestimonial.id,
        description: values.description,
        rating: values.rating,
      })
    } else {
      createTestimonial.mutate({
        courseId,
        description: values.description,
        rating: values.rating,
      })
    }
  }

  const isSubmitting =
    form.formState.isSubmitting ||
    createTestimonial.isLoading ||
    updateTestimonial.isLoading

  if (!userId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Review</CardTitle>
          <CardDescription>
            Please sign in to leave a review for this course.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Review</CardTitle>
        <CardDescription>
          Share your experience with this course to help other students
        </CardDescription>
      </CardHeader>

      <CardContent>
        {existingTestimonial && !isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <Stars
                value={existingTestimonial.rating}
                edit={false}
                size={24}
              />
              <span className="ml-2 text-sm text-muted-foreground">
                {new Date(existingTestimonial.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm">{existingTestimonial.description}</p>
          </div>
        ) : isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Stars
                        value={field.value}
                        onChange={(rating: number) => field.onChange(rating)}
                        size={32}
                        half={false}
                      />
                    </FormControl>
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
                      <Textarea
                        placeholder="Share your experience with this course..."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Your review will help other students decide if this course
                      is right for them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {existingTestimonial ? "Update Review" : "Submit Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-center text-muted-foreground mb-4">
              You haven't reviewed this course yet. Share your experience to
              help others!
            </p>
            <Button onClick={() => setIsEditing(true)}>Write a Review</Button>
          </div>
        )}
      </CardContent>

      {existingTestimonial && !isEditing && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit Review
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// Wrapper with TRPC provider
const CourseTestimonial = (props: CourseTestimonialProps) => (

    <CourseTestimonialInner {...props} />

)

export default CourseTestimonial
