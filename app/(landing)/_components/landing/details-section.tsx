"use client"

import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Meteors } from "@/components/animation/meteors"

import { Button } from "../../../../components/ui/button"

const details = [
  {
    heading: "Learn",
    subheading: "Knowledge is power",
    description:
      "Embark on your learning journey with our educational resources. From foundational concepts to advanced strategies, our courses cover it all. Gain the knowledge necessary to make informed trading decisions.",
    image: "/landing/learn.jpg",
    className: "bg-text-secondary/10",
    color: "",
  },
  {
    heading: "Trade",
    subheading: "Put your knowledge into action",
    description:
      "Apply what you've learned in real-world scenarios. Demo trading environments and our live sessions allow you to practise and refine your skills without the risk of actual financial loss.",
    image: "/landing/trade.jpg",
    className: "bg-purple-color/70 !text-pink-color",
    color: "",
  },
  {
    heading: "Earn",
    subheading: "Achieve financial success",
    description:
      "As you progress, witness the transformation of your skills into financial success. Praglis alumni have consistently achieved their earning goals. Join the ranks of successful traders who have turned their education into a profitable venture.",
    image: "/landing/earn.jpg",
    className: "bg-pink-color/90 text-purple-color",
    color: "",
  },
]

const DetailsSection = ({ href }: { href: string }) => {
  return (
    <section
      className="md:min-w-6xl w-full bg-black max-xl:px-5"
      id="main-details"
    >
      {details.map((detail, index) => (
        <DetailCard key={index} {...detail} href={href} />
      ))}
    </section>
  )
}

export default DetailsSection

function DetailCard({
  heading,
  subheading,
  description,
  image,
  className = "dark:bg-quaternary-color/40",
  href,
}: {
  className?: string
  heading: string
  subheading: string
  description: string
  image: string
  href: string
}) {
  return (
    <div className="max-xs:max-w-2xs mx-auto my-8 max-sm:max-w-xs sm:w-full">
      <div className="relative w-full">
        <div className="absolute -inset-0 h-full w-full scale-[0.80] rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
          <div
            className={cn(
              "max-xs:max-w-2xs flex w-full flex-col items-center  rounded-lg p-4 max-lg:gap-6 max-lg:text-center max-sm:max-w-xs sm:w-full md:grid md:grid-cols-2",
              className
            )}
          >
            <div className="flex w-full flex-col items-start justify-center gap-2 max-lg:mx-4 max-lg:max-w-xl max-lg:items-center max-sm:mx-16 max-sm:w-[90vw] lg:pl-16 ">
              <div className="w-full">
                <h1 className="text-2xl font-extrabold md:text-4xl lg:text-5xl">
                  {heading}
                </h1>
                <h2 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
                  {subheading}
                </h2>
              </div>
              <p className="landing-section_description max-xs:max-w-2xs !font-abeezee max-md:px-2 max-sm:max-w-xs">
                {description}
              </p>
              <div className="mt-2 flex w-full gap-4 max-lg:justify-center max-md:hidden">
                <Link href={href}>
                  <button className="animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-[linear-gradient(110deg,#fffefc,45%,#e1d9ce,55%,#fffefc)] bg-[length:200%_100%] px-6 font-medium text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-3 max-lg:mx-4 lg:p-16">
              <Image
                src={image}
                alt="hero"
                width={500}
                height={500}
                className="rounded-md"
              />
            </div>
            <div className="mt-2 flex w-full gap-4 max-lg:justify-center md:hidden">
              <Link href={href}>
                <button className="animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-[linear-gradient(110deg,#fffefc,45%,#e1d9ce,55%,#fffefc)] bg-[length:200%_100%] px-6 font-medium text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
          <Meteors
            number={20}
            className={
              className.includes("bg-pink")
                ? "before:from-purple-color"
                : "before:from-pink-color"
            }
          />
        </div>
      </div>
    </div>
  )
}

// Button code
