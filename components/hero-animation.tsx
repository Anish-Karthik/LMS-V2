"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { BarChart3, Calendar, Users } from "lucide-react"

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        {/* <Image
          src="/placeholder.svg?height=400&width=500"
          alt="LMS Dashboard"
          width={500}
          height={400}
          className="rounded-xl shadow-2xl border border-purple-800/30"
        /> */}
        <div className="h-[400px] w-[500px] rounded-xl border border-purple-800/30 bg-purple-800/30 shadow-2xl" />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute -left-16 top-10 z-20"
      >
        <div className="rounded-lg border border-purple-700/50 bg-gradient-to-br from-purple-900 to-purple-800 p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-purple-300">Active Students</div>
              <div className="text-xl font-bold text-white">2,543</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute -bottom-10 left-10 z-20"
      >
        <div className="rounded-lg border border-pink-700/50 bg-gradient-to-br from-pink-900 to-pink-800 p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-pink-300">Completion Rate</div>
              <div className="text-xl font-bold text-white">94%</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute -right-16 top-20 z-20"
      >
        <div className="rounded-lg border border-purple-700/50 bg-gradient-to-br from-purple-900 to-pink-900 p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-purple-300">Courses</div>
              <div className="text-xl font-bold text-white">156</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
