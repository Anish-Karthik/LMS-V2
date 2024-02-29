"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const MiniDetailCard = ({
  isInView,
  delay,
  detail,
  headingStyle = "text-secondary-color",
  descriptionStyle = "text-text-secondary",
  backgroundStyle = "bg-tertiary-color/40",
}: {
  isInView: boolean
  delay: number
  headingStyle?: string
  descriptionStyle?: string
  backgroundStyle?: string
  detail: {
    heading: string
    description: string
    image: string
  }
}) => {
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "flex h-full flex-col items-center gap-4 rounded-lg p-6 shadow-md",
        backgroundStyle
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          className="text-white"
          src={detail.image}
          alt="landing-image-1"
          width={80}
          height={80}
        />
        <h3 className={cn("text-xl font-semibold", headingStyle)}>
          {detail.heading}
        </h3>
      </div>
      <p className={cn("text-text-secondary text-lg", descriptionStyle)}>
        {detail.description}
      </p>
    </motion.div>
  )
}

export default MiniDetailCard
