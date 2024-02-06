"use client"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const details = [
  {
    heading: "Learn",
    subheading: "Knowledge is power",
    description:
      "Embark on your learning journey with our educational resources. From foundational concepts to advanced strategies, our courses cover it all. Gain the knowledge necessary to make informed trading decisions.",
    image: "https://picsum.photos/800/800",
    className: "bg-quaternary-color/40",
  },
  {
    heading: "Trade",
    subheading: "Put your knowledge into action",
    description:
      "Apply what you've learned in real-world scenarios. Demo trading environments and our live sessions allow you to practise and refine your skills without the risk of actual financial loss.",
    image: "https://picsum.photos/800/800",
    className: "bg-secondary-color/40",
  },
  {
    heading: "Earn",
    subheading: "Achieve financial success",
    description:
      "As you progress, witness the transformation of your skills into financial success. Praglis alumni have consistently achieved their earning goals. Join the ranks of successful traders who have turned their education into a profitable venture.",
    image: "https://picsum.photos/800/800",
    className: "bg-text-secondary/40",
  },
]

const DetailsSection = ({ courseId }: { courseId: string }) => {
  return (
    <section className="!max-w-screen md:min-w-6xl max-xl:px-5"  id="main-details">
      <Carousel 
        className="max-sm:hidden"
        // plugins={[
        //   Autoplay({
        //     delay: 4000,
        //   }),
        // ]}
      >
      <CarouselContent className="!p-0 !m-0">
        {details.map((detail, index) => (
          <CarouselItem><DetailCard key={index} {...detail} courseId={courseId} /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      <div className="sm:hidden">
        {details.map((detail, index) => (
          <DetailCard key={index} {...detail} courseId={courseId} />
        ))}
      </div>
    </section>
  )
}

export default DetailsSection

function DetailCard({
  heading,
  subheading,
  description,
  image,
  className = "bg-quaternary-color/40",
  courseId,
}: {
  className?: string
  heading: string
  subheading: string
  description: string
  image: string
  courseId: string
}) {
  return (
    <div
      className={cn(
        "mx-auto my-12 flex 2xs:max-w-2xs xs:max-w-xs sm:max-w-6xl flex-col items-center space-y-5 rounded-lg py-12 max-xl:px-4 max-lg:gap-6 max-lg:text-center lg:grid lg:grid-cols-2 lg:py-3",
        className
      )}
    >
      <div className="w-full flex flex-col items-start justify-center gap-2 max-lg:mx-4 max-lg:max-w-xl max-lg:items-center max-sm:mx-16 max-sm:w-[90vw] lg:pl-16 ">
        <div className="w-full">
          <h1 className="text-2xl font-extrabold md:text-4xl lg:text-5xl">
            {heading}
          </h1>
          <h2 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
            {subheading}
          </h2>
        </div>
        <p className="landing-section_description max-xs:max-w-2xs text-slate-700 max-sm:max-w-xs">
          {description}
        </p>
        <div className="mt-2 flex w-full gap-4 max-lg:justify-center">
          {/* <Link href={`/purchase`}>
            <Button variant={"outline"} className="w-full">
              View Details
            </Button>
          </Link> */}
          <Link href={`/purchase/${courseId}`}>
            <Button className="w-full">Enroll Now</Button>
          </Link>
        </div>
      </div>
      <div className="p-3 max-lg:mx-4 max-sm:hidden lg:p-16">
        <Image src={image} alt="hero" width={500} height={500} />
      </div>
    </div>
  )
}
