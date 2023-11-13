import React from "react"
import Image from "next/image"

import LandingNavbar from "@/components/shared/LandingNavbar"

const page = () => {
  return (
    <div>
      <LandingNavbar courses={[]} />
      <div className="mx-20 my-6">
        <div className="grid w-full items-center gap-4 max-lg:grid-rows-2 lg:grid-cols-2">
          <div className="flex !h-full flex-1 bg-text-secondary text-background">
            <div className="!py-auto !my-auto flex flex-col items-center gap-2">
              <h1 className="px-20 text-xl font-extrabold md:text-3xl lg:text-4xl">
                About Us
              </h1>
              <p className="lg:text-md px-20 text-center text-xs font-bold md:text-sm">
                In 2019, we established a community in which college students
                joined forces to deepen their understanding and share insights
                on the stock market and various financial markets. Over time,
                our community burgeoned, attracting members and expanding our
                areas of expertise. Our members engage in trading stocks,
                options, futures, derivatives, forex, and cryptocurrencies. We
                are dedicated to assisting fellow traders in acquiring sound
                knowledge about financial markets and ensuring they approach
                trading in a prudent manner.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/landing/about.png"
              alt="about author"
              width={850}
              height={850}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
