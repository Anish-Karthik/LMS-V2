"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

import { TypewriterEffectSmooth } from "../../../../components/animation/typewriter-effect"
import MiniDetailCard from "../../../../components/card/mini-detail-card"

const advantages = [
  {
    heading: "Expert guidance",
    description:
      "Learn from seasoned professionals who have successfully navigated the markets. Our expert instructors bring years of experience to guide you through the intricacies of trading.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Multilingual learning experience",
    description:
      "Learn trading in both English and Tamil, ensuring that language is not a barrier to your education, and you can fully grasp the concepts in your preferred language.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Comprehensive curriculum",
    description:
      "Access a well-structured curriculum covering everything from the fundamentals to advanced strategies. Whether you're a beginner or an experienced trader, our courses cater to all levels.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Interactive learning",
    description:
      "Engage in dynamic and interactive learning experiences. Our courses include live trading sessions, case studies, and simulations to enhance your practical understanding of trading.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Cutting-edge resources",
    description:
      "Stay ahead of the curve with access to cutting-edge tools and resources. Clovers provides you with the latest market analysis, research reports, and trading software to sharpen your skills.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Community support",
    description:
      "Join a community of traders to share ideas, experiences, and insights. Our community is a safe space for traders to learn, grow, and support each other.",
    image: "/landing/brain.svg",
  },
]
const words = [
  {
    text: "The",
    className:
      "rounded-md bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent landing-section_header max-sm:!text-2xl",
  },
  {
    text: "Clovers",
    className:
      "rounded-md bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent landing-section_header max-sm:!text-2xl",
  },
  {
    text: "Advantages",
    className:
      "rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent landing-section_header max-sm:!text-2xl",
  },
]

const AdvantagesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {})

  return (
    <section
      className="flex flex-col items-center bg-black py-16 max-xl:px-4"
      id="benefits"
    >
      <div className="max-w-3xl">
        <center>
          <div className="landing-section_header_description relative mb-16 w-full lg:!-ml-[10%] lg:w-[120%]">
            <TypewriterEffectSmooth
              words={words}
              className="font-orbitron mx-auto justify-center text-center tracking-widest"
              cursorClassName="landing-section_cursor max-sm:!h-7 "
            />
          </div>
        </center>
      </div>
      <div className="max-w-6xl">
        <div
          className="max-xs:px-1 grid items-center gap-10 max-sm:px-20 sm:grid-cols-2 lg:grid-cols-3"
          ref={ref}
        >
          {advantages.map((advantage, index) => (
            <MiniDetailCard
              detail={{ ...advantage, image: `/clip-art/${index + 7}.png` }}
              key={index}
              isInView={isInView}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection
