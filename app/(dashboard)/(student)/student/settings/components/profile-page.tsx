"use client"

import { useState } from "react"
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
  const [isEditing, setIsEditing] = useState(true)

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end">
        <button
          className="text-blue-500"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      {isEditing ? (
        <ProfileForm userInfo={userInfo} />
      ) : (
        <ProfileComponent userInfo={userInfo} promo={promo} />
      )}
    </div>
  )
}

export default ProfilePage
