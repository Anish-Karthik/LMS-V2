"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Promo, User } from "@prisma/client"

import ProfileComponent from "./profile-component"
import { ProfileForm } from "./profile-form"

const ProfilePage = ({
  userInfo,
  promo,
}: {
  userInfo: User
  promo: Promo | null
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { userId } = useAuth()

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end">
        {userId === userInfo.userId && (
          <button
            className="text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>
      {isEditing ? (
        <ProfileForm userInfo={userInfo} setIsEditing={setIsEditing} />
      ) : (
        <ProfileComponent userInfo={userInfo} promo={promo} />
      )}
    </div>
  )
}

export default ProfilePage
