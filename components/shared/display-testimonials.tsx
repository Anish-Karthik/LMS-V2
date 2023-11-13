import { randomInt } from "crypto"
import React from "react"
import Image from "next/image"
import { Testimonial, User } from "@prisma/client"

import { getSvg } from "@/lib/stars"

import TestimonialCard from "../card/testimonial-card"

const DisplayTestimonials = ({
  testimonials,
  userInfo,
}: {
  testimonials: (Testimonial & { user: User })[]
  userInfo?: (User & { testimonials: Testimonial[] }) | null
}) => {
  return (
    <div
      className="flex flex-wrap justify-between gap-1"
      style={{ flexBasis: "50%" }}
    >
      {testimonials.map((testimonial, i) => (
        <TestimonialCard
          className="w-full md:w-[49.5%]"
          key={testimonial.id}
          testimonial={testimonial}
          svg={getSvg(testimonial.rating, i + 1)}
          description={testimonial.description}
          userInfo={userInfo}
          avatar={
            <Image
              src={testimonial.user.image!}
              alt={testimonial.user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          }
          name={testimonial.user.name}
          title={testimonial.user.employmentStatus || testimonial.user.role}
        />
      ))}
    </div>
  )
}

export default DisplayTestimonials
