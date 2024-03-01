"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"

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
          <h1 className="landing-section_header relative mb-16">
            <Image
              className="absolute -left-0 z-[-1] translate-y-[-25px] scale-75 opacity-50 sm:scale-100"
              src="/landing/brain.svg"
              alt="landing-image-1"
              width={80}
              height={80}
            />
            <span>
              6 reasons why you need a trading community to master the art of
              Trading
            </span>
            <Image
              className="absolute -right-0 z-[-1] translate-y-[-40px] scale-75 opacity-50 max-md:translate-y-[-60px] sm:scale-100"
              src="/landing/brain.svg"
              alt="landing-image-1"
              width={80}
              height={80}
            />
          </h1>
        </center>
      </div>
      <div className="max-w-6xl">
        <div
          className="max-xs:px-1 grid items-center gap-10 max-sm:px-20 sm:grid-cols-2 lg:grid-cols-3"
          ref={ref}
        >
          {reasons.map((reason, index) => (
            <MiniDetailCard
              detail={reason}
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
