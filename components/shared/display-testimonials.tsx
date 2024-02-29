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
  // <div className="mx-auto max-w-3xl gap-x-2">
  //           <div className="grid w-full gap-x-2 lg:grid-cols-2">
  //             {testimonials1.map((item) => (
  //               <TestimonialCard {...item} key={item.description} />
  //             ))}
  //           </div>
  //         </div>
  return (
    <div className="max-w-3xl gap-x-2">
      <div className="mx-auto grid w-full gap-x-2 lg:grid-cols-2">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            className="mx-auto w-full"
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
    </div>
  )
}

export default DisplayTestimonials
