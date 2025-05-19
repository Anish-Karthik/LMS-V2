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
      className="relative w-full aspect-square max-w-md mx-auto"
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
        <div className="w-[500px] h-[400px] bg-purple-800/30 rounded-xl shadow-2xl border border-purple-800/30" />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-10 -left-16 z-20"
      >
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-4 rounded-lg shadow-xl border border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
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
        <div className="bg-gradient-to-br from-pink-900 to-pink-800 p-4 rounded-lg shadow-xl border border-pink-700/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center">
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
        className="absolute top-20 -right-16 z-20"
      >
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-4 rounded-lg shadow-xl border border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
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
