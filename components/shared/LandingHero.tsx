"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

const classNames = [
  "from-pink-color to-purple-color",
  "from-white to-white",
  "from-white to-white",
  "from-white to-white",
  "from-white to-white",
]

export const LandingHero = ({
  title,
  description,
  image,
  children,
  className,
  imageAlternate,
}: {
  title: string
  description: string
  image: string
  children?: React.ReactNode
  imageAlternate?: React.ReactNode
  className?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {})
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }
  return (
    <section className={cn("w-full py-20", className)}>
      <div className="max-sm:max-w-screen-xs mx-auto flex max-w-7xl flex-col items-center space-y-5 py-3 max-lg:gap-6 lg:flex-row">
        <div
          className="flex flex-1 flex-col items-start justify-center gap-6 max-lg:mx-4 max-lg:max-w-xl max-sm:mx-16 max-sm:w-[90vw] md:px-5 lg:pl-6"
          ref={ref}
          style={{
            flex: 1.5,
            flexGrow: 1.5,
            flexShrink: 0,
          }}
        >
          <div>
            <motion.div
              key={0}
              viewport={{ once: true }}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.3, delay: 0 * 0.2 }}
            >
              <h1 className="text-6xl font-extrabold text-white">
                {title.split(" ").map((word, i) => (
                  <span
                    className={cn(
                      "bg-gradient-to-r bg-clip-text text-transparent",
                      classNames[i % classNames.length]
                    )}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
            </motion.div>
          </div>
          <motion.div
            key={1}
            viewport={{ once: true }}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.3, delay: 1 * 0.2 }}
          >
            <h6 className="text-md max-w-xl text-slate-300">{description}</h6>
          </motion.div>
          <motion.div
            key={2}
            viewport={{ once: true }}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.3, delay: 3 * 0.2 }}
          >
            {children}
          </motion.div>
        </div>
        <div className="flex-1">
          {imageAlternate ? (
            imageAlternate
          ) : (
            <div className="max-lg:mx-4 max-lg:hidden max-sm:mx-16">
              <Image src={image} alt="hero" width={500} height={500} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
