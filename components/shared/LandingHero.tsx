"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from "typewriter-effect"

import { Button } from "@/components/ui/button"

export const LandingHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className=" space-y-5 py-36 text-center font-bold">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
        <h1>The Best Trading Course for</h1>
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-2 text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                "Anyone who wants to learn trading",
                "Becoming a successful trader",
                "Making money online",
                "Trade with confidence",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Learn how to trade with our step-by-step video tutorials and live
        webinars.
      </div>
      <div>
        <Link href={isSignedIn ? "/course-details" : "/sign-up"}>
          <Button className="rounded-full p-4 font-semibold md:p-6 md:text-lg">
            Start Learning
          </Button>
        </Link>
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm"></div>
    </div>
  )
}
