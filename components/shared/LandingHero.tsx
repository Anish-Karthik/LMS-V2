import Image from "next/image"
import Link from "next/link"
import { Course } from "@prisma/client"

import { Button } from "@/components/ui/button"

export const LandingHero = ({
  courses,
  route,
}: {
  courses: Course[]
  route?: string
}) => {
  return (
    <section className="w-full bg-quaternary-color">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 space-y-5 py-3 max-lg:gap-6 lg:grid lg:grid-cols-2">
        <div className="flex min-h-[32rem] flex-col items-start justify-center gap-2 max-lg:mx-4 max-lg:max-w-xl max-lg:items-center max-sm:mx-16 max-sm:w-[90vw] md:px-5">
          <div>
            <h1 className="text-md font-extrabold sm:text-xl md:text-2xl lg:text-4xl">
              Master the art of Trading with Praglis - The #1 trading community
            </h1>
          </div>
          <p className="text-slate-700 max-sm:text-sm">
            Dive into the world of trading with Praglis Trading Community - your
            gateway to financial empowerment. Join our thriving community,
            engage in live trading sessions, and get hands-on guidance from
            seasoned professionals. No prior knowledge needed, we&apos;ll guide
            you from the basics to expert-level trading. Your journey to
            financial success begins now.
          </p>
          <div className="flex w-full gap-4">
            <Link href={`/purchase`}>
              <Button variant={"outline"} className="w-full">
                View Details
              </Button>
            </Link>
            <Link href={`${route}`}>
              <Button className="w-full">Enroll Now</Button>
            </Link>
          </div>
        </div>
        <div
          className="max-lg:mx-4 
max-sm:mx-16"
        >
          <Image
            src="https://picsum.photos/id/237/900/800"
            alt="hero"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  )
}
