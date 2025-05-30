"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

import { TypewriterEffectSmooth } from "@/components/animation/typewriter-effect"

import MiniDetailCard from "../../../../components/card/mini-detail-card"

const reasons = [
  {
    heading: "Learn faster together",
    description:
      "Gain insights from fellow traders, turbocharging your learning with shared experiences and wisdom.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Mentor magic",
    description:
      "Get personalized guidance from pros, supercharging your growth as a trader.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Stay in the know, instantly",
    description:
      "Be ahead of the game with real-time chats on market trends, ensuring you're always in the loop.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Buddies in trading",
    description:
      "Connect with trading pals, creating opportunities for teamwork, partnerships, and a solid support system.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Goal Power",
    description:
      "Achieve your trading goals with the community's encouragement, turning aspirations into consistent actions.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Solve Hurdles Together",
    description:
      "Tackle challenges collectively, transforming problems into lessons and growing stronger as a community.",
    image: "/landing/brain.svg",
  },
]

const words = [
  {
    text: "6",
    className:
      "rounded-md bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent landing-section_header",
  },
  {
    text: "Reasons",
    className:
      "rounded-md bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent landing-section_header",
  },
]
const ReasonsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {})
  return (
    <section
      className="flex flex-col items-center bg-black py-16 max-xl:px-4"
      id="why"
    >
      <div className="max-w-3xl">
        <center>
          <div className="landing-section_header_description relative mb-16">
            <TypewriterEffectSmooth
              words={words}
              className="font-orbitron mx-auto justify-center text-center tracking-widest"
              cursorClassName="landing-section_cursor"
            />
            <h1>
              <span>
                why you need a{" "}
                <span className="rounded-md bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  trading
                </span>{" "}
                <span className="rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  community
                </span>{" "}
                to master the art of Trading
              </span>
            </h1>
          </div>
        </center>
      </div>
      <div className="max-w-6xl">
        <div
          className="max-xs:px-1 grid items-center gap-10 max-sm:px-20 sm:grid-cols-2 lg:grid-cols-3"
          ref={ref}
        >
          {reasons.map((reason, index) => (
            <MiniDetailCard
              detail={{ ...reason, image: `/clip-art/${index + 1}.png` }}
              key={index + 6}
              isInView={isInView}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReasonsSection
