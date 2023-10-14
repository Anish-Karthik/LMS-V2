import React from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { UserButton, clerkClient, currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Trole,
  sidebarLinksTeacher,
  sidebarLinksTeacherMobile,
} from "@/app/constants"

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
  if (!userInfo) redirect("/sign-in")
  if (userInfo.role === "student") redirect("/")
  // form an object where

  return (
    <div className="relative h-full">
      {/* desktop view */}
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <Image
              src={"/images/logo.png"}
              alt="Alfaq"
              width={50}
              height={50}
            />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
        <main>
          {/* <CurrentPathNavigator /> */}
          <div>{children}</div>
        </main>
        <MobileNav />
      </div>
    </div>
  )
}

export default DashBoardLayout
