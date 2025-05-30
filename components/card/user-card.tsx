"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

interface UserCardProps {
  id: string
  userId: string
  name: string
  username: string
  image: string
  viewerIsModerator?: boolean
}

const UserCard = ({ id, userId, name, username, image }: UserCardProps) => {
  const router = useRouter()!

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={image}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <div className="flex items-center justify-start gap-1">
            <h4 className="text-base-semibold text-light-1 !mr-6 w-fit">
              {name}
            </h4>
          </div>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button className="user-card_btn" onClick={() => {}}>
        View
      </Button>
      <Button className="user-card_btn" onClick={() => {}}>
        Ban
      </Button>
    </article>
  )
}

export default UserCard
