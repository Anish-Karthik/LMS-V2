import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import DisplayTestimonials from "@/components/shared/display-testimonials"
import TestimonialForm from "@/components/shared/testimonial-form"

const page = async () => {
  const testimonials = await db.testimonial.findMany({
    include: { user: true },
  })
  const user = await currentUser()
  const userInfo = user?.id
    ? await db.user.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          testimonials: true,
        },
      })
    : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div className="mt-6">
          <TestimonialForm userInfo={userInfo} />
        </div>
        <div className="mt-8">
          <DisplayTestimonials
            testimonials={testimonials}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  )
}

export default page
