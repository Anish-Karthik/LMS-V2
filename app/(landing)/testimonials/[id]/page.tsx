import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import TestimonialForm from "@/components/shared/testimonial-form"

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser()
  if (!user) {
    return redirect("/")
  }
  const userInfo = await db.user.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      testimonials: true,
    },
  })
  if (!userInfo) {
    return redirect("/onBoarding")
  }
  const testimonial = await db.testimonial.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  })
  if (!testimonial) {
    return <>Page Not Found</>
  }
  if (testimonial.userObjId !== userInfo.id) {
    return <>Unauthorized</>
  }

  return (
    <div className="mx-auto max-w-4xl">
      <TestimonialForm
        id={params.id}
        defaultValue={{
          description: testimonial.description,
          rating: testimonial.rating,
        }}
        edit
        userInfo={userInfo}
      />
    </div>
  )
}

export default page
