import React from "react"
import Image from "next/image"

import ButtonCard from "./button-card"

const SyllabusSection = ({ url }: { url: string }) => {
  return (
    <section className="flex flex-col items-center gap-40">
      <div>
        <center>
          <h1 className="mb-6 text-4xl font-bold">See what you’ll learn </h1>
        </center>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-muted-foreground text-xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <div className="flex flex-col gap-10">
            <Image
              src="/images/roadmap.webp"
              alt="roadmap"
              width={800}
              height={800}
            />

            <p className="text-muted-foreground text-xl font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quibusdam.
            </p>
            <Image
              src="/images/comparison-chart.webp"
              alt="comparison-chart"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
      <div className="-mt-20" id="course-purchase">
        <ButtonCard scrollTo={url} text="Buy Now" isPurchase={true} />
      </div>
    </section>
  )
}

export default SyllabusSection
