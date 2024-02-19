import React from "react"
import Image from "next/image"

import MiniDetailCard from "../card/mini-detail-card"

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
      "Stay ahead of the curve with access to cutting-edge tools and resources. Praglis provides you with the latest market analysis, research reports, and trading software to sharpen your skills.",
    image: "/landing/brain.svg",
  },
  {
    heading: "Community support",
    description:
      "Join a community of traders to share ideas, experiences, and insights. Our community is a safe space for traders to learn, grow, and support each other.",
    image: "/landing/brain.svg",
  },
]

const AdvantagesSection = () => {
  return (
    <section
      className="bg-background-color/30 flex flex-col items-center py-16 max-xl:px-4"
      id="benefits"
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
        <div className="max-xs:px-1 grid items-center gap-10 max-sm:px-20 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <MiniDetailCard detail={advantage} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection
