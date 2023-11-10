"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Course } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { ThemeToggle } from "../theme-toggle"

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

const LandingNavbar = ({
  courses,
  route,
}: {
  courses: Course[]
  route?: string
}) => {
  return (
    <nav className="flex items-center justify-between bg-transparent p-4">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4 h-8 w-8">
          <Image fill alt="Logo" src="/images/logo.png" />
        </div>
        <div>
          <h1 className={cn("text-2xl font-bold ", font.className)}>ALFAQ</h1>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href={route ?? `/purchase/${courses[0].id}`}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
        {<UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />}
      </div>
    </nav>
  )
}

export default LandingNavbar
