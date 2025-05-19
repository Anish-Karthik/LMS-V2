"use client"

import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-purple-900/30 bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <CardHeader className="pb-2">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-purple-200">
          {description}
        </CardDescription>
      </CardContent>
      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-x-100"></div>
    </Card>
  )
}
