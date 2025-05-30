import React from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { UserButton, currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { ThemeToggle } from "@/components/theme-toggle"

import CurrentPathNavigator from "../../../components/shared/current-pathname"
import { MainNav } from "./_components/main-nav"
import MobileNav from "./_components/mobile-nav"

const DashBoardLayout = async ({
  params,
  children,
}: {
  params: { courseId: string; batchId: string; TopicId: string }
  children: React.ReactNode
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const userInfo = await getUser(user.id)
  if (!userInfo) redirect("/onboarding")
  if (userInfo.role === "student") redirect("/student/dashboard")
  if (userInfo.role === "user") redirect("/")
  // form an object where

  return (
    <div className="relative h-full pb-16 sm:pb-40 md:pb-2">
      {/* desktop view */}
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <Image
              src={"/images/logo2.jpg"}
              alt="CLOVERS"
              width={50}
              height={50}
            />
            <MainNav
              isAdmin={userInfo.role == "admin" || userInfo.isSuperAdmin}
            />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <ThemeToggle /> */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
        <main>
          {/* <CurrentPathNavigator /> */}
          <div>{children}</div>
        </main>
        <MobileNav isAdmin={userInfo.role == "admin"} />
      </div>
    </div>
  )
}

export default DashBoardLayout
