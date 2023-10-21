import React from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { UserButton, currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { isUserPurchasedCourse } from "@/lib/actions/user.actions"
import { ThemeToggle } from "@/components/theme-toggle"

import { MainNav } from "./_components/main-nav"
import MobileNav from "./_components/mobile-nav"

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const courses = await getCourses()
  if (!courses || !courses.length) return <div>No Courses found</div>
  const purchased = await isUserPurchasedCourse(user.id, courses[0].id)
  if (!purchased) redirect("/purchase/" + courses[0].id)

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
