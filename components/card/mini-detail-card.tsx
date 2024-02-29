"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/animation/3d-card"

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
      className="h-full"
    >
      <CardContainer containerClassName={cn("!h-full", backgroundStyle)}>
        {" "}
        <CardBody className="group/card relative !h-full  w-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
          <div className="flex flex-col items-center gap-4">
            <CardItem translateZ="120" className="mt-4 w-full">
              <Image
                className="mx-auto text-white"
                src={detail.image}
                alt="landing-image-1"
                width={80}
                height={80}
              />
            </CardItem>
            <CardItem
              translateZ="110"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              <h3 className={cn("text-xl font-semibold", headingStyle)}>
                {detail.heading}
              </h3>
            </CardItem>
          </div>
          <CardItem
            translateZ="80"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            <p className={cn("text-text-secondary text-lg", descriptionStyle)}>
              {detail.description}
            </p>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  )
}

export default MiniDetailCard
