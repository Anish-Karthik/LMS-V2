"use client"

import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  number: string
  label: string
}

export function StatsCard({ number, label }: StatsCardProps) {
  return (
    <Card className="bg-black/50 border-0 overflow-hidden">
      <CardContent className="p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
        >
          {number}
        </motion.div>
        <div className="text-purple-200 mt-2">{label}</div>
      </CardContent>
    </Card>
  )
}
