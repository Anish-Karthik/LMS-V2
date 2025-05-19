"use client"

import Image from "next/image"
import { Testimonial } from "@prisma/client"

import { Card, CardContent } from "@/components/ui/card"
import Stars from "@/components/shared/react-stars"
import { trpc } from "@/app/_trpc/client"

interface TestimonialWithUser extends Testimonial {
  user: {
    name: string
    image: string | null
  }
}

interface CourseReviewsInnerProps {
  courseId: string
  initialTestimonials?: TestimonialWithUser[]
}

const CourseReviewsInner = ({
  courseId,
  initialTestimonials = [],
}: CourseReviewsInnerProps) => {
  // Fetch course testimonials directly if we didn't get them server-side
  const { data: testimonials = initialTestimonials } =
    trpc.testimonial.getByCourse.useQuery(courseId, {
      refetchOnMount: false,
    })

  if (testimonials.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            No reviews yet. Be the first to review this course!
          </p>
        </CardContent>
      </Card>
    )
  }

  // Calculate average rating
  // @ts-ignore
  const sumRatings = testimonials.reduce(
    (total: number, testimonial: any) => total + testimonial.rating,
    0
  )
  const averageRating = sumRatings / testimonials.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {/* @ts-ignore */}
          <Stars value={averageRating} edit={false} size={24} />
          <span className="ml-2 font-medium">{averageRating.toFixed(1)}</span>
        </div>
        <span className="text-muted-foreground">
          ({testimonials.length} reviews)
        </span>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  {testimonial.user.image ? (
                    <Image
                      src={testimonial.user.image}
                      alt={testimonial.user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center text-xl uppercase">
                      {testimonial.user.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-medium">{testimonial.user.name}</h4>
                    <div className="flex items-center">
                      <Stars
                        // @ts-ignore
                        value={testimonial.rating}
                        edit={false}
                        size={16}
                      />
                      <span className="text-muted-foreground ml-2 text-sm">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{testimonial.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const CourseReviews = (props: CourseReviewsInnerProps) => (
  <CourseReviewsInner {...props} />
)

export default CourseReviews
