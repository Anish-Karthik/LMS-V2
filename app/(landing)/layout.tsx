import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import LandingFooter from "@/components/shared/LandingFooter"
import LandingNavbar from "@/components/shared/LandingNavbar"

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  let route: string | undefined = undefined

  if (user) {
    const userInfo = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    })
    if (userInfo) {
      if (userInfo.role === "student") route = "/student/dashboard"
      if (userInfo.role === "teacher" || userInfo.role === "admin")
        route = "/teacher/dashboard"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar
        route={route}
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm"
      />
      <main className="grow">{children}</main>
      <LandingFooter />
    </div>
  )
}

export default LandingLayout
