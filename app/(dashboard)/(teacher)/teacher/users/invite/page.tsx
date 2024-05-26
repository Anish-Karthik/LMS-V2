import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import InvitePage from "../_components/invite-user"

const InviteUser = async () => {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }
  const userInfo = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (!userInfo) {
    redirect("/sign-in")
  }
  const inviteLinks = await db.invite.findMany()
  return (
    <div className="">
      <InvitePage
        userId={user.id}
        userRole={userInfo.role}
        initialData={inviteLinks}
      />
    </div>
  )
}

export default InviteUser
