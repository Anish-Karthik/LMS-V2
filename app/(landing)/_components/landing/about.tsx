import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { LandingHero } from "@/components/shared/LandingHero"

import { BackgroundBeams } from "../../../../components/animation/background-beams"

const title = "Master the art of trading"
const description = `
  your
  gateway to financial empowerment. Join our thriving community,
  engage in live trading sessions, and get hands-on guidance from
  seasoned professionals.
`
const image = "https://picsum.photos/id/237/900/800"

const About = ({ href }: { href: string }) => {
  return (
    <LandingHero
      title={title}
      description={description}
      image={"/artwork-1.png"}
      // imageAlternate={<CardStack />}
      className="relative z-40 bg-black pt-40"
    >
      <BackgroundBeams />
      <div className="flex w-full items-start gap-4">
        <Link href={href}>
          <Button
            variant={"none"}
            className="bg-purple-color hover:bg-purple-color/40 w-full text-white"
          >
            View Details
          </Button>
        </Link>
        <Link href={href}>
          <Button variant={"outline"} className="w-full text-white">
            Enroll Now
          </Button>
        </Link>
      </div>
    </LandingHero>
  )
}

export default About
