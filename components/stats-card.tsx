"use client"

import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  number: string
  label: string
}

export function StatsCard({ number, label }: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-black/50">
      <CardContent className="p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent"
        >
          {number}
        </motion.div>
        <div className="mt-2 text-purple-200">{label}</div>
      </CardContent>
    </Card>
  )
}
