import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const MiniDetailCard = ({
  detail,
  headingStyle = "text-secondary-color",
  descriptionStyle = "text-text-secondary",
  backgroundStyle = "bg-tertiary-color/40",
}: {
  headingStyle?: string
  descriptionStyle?: string
  backgroundStyle?: string
  detail: {
    heading: string
    description: string
    image: string
  }
}) => {
  return (
    <div
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
      <p className={cn("text-lg text-text-secondary", descriptionStyle)}>
        {detail.description}
      </p>
    </div>
  )
}

export default MiniDetailCard
