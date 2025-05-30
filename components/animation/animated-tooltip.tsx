"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

import { socials } from "@/lib/socials"

export const AnimatedTooltip = ({
  items = socials,
}: {
  items?: typeof socials
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  // translate the tooltip
  const translateX = useSpring(useTransform(x, [-1, 1], [-5, 5]), springConfig)
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }
  console.log(items)
  return (
    <>
      {items.map((item, idx) => (
        <Link
          href={item.href || ""}
          className="group  relative -mr-4"
          key={item.href}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Render tooltip conditionally based on hover state */}
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2  flex-col items-center justify-center bg-black px-4 py-2 text-xs shadow-xl"
            >
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent " />
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent " />
              <div className="relative z-30 text-base font-bold text-white">
                {item.title}
              </div>
              <div className="text-xs text-white">{item.href}</div>
            </motion.div>
          )}
          <item.icon
            onMouseMove={handleMouseMove}
            height={40}
            width={40}
            className="relative  mx-1  object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </Link>
      ))}
    </>
  )
}
