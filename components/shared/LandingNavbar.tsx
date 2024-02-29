"use client"

import { useMemo } from "react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Course } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/animation/moving-border"
import { landingRoutes } from "@/app/constants"

import { ThemeToggle } from "../theme-toggle"
import LandingNavbarMobile from "./LandingNavbarMobile"

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

const LandingNavbar = ({
  courses,
  route,
  className,
}: {
  className?: string
  courses: Course[]
  route?: string
}) => {
  const { userId } = useAuth()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const queryString = useMemo(
    () =>
      searchParams?.get("promo") ? `?promo=${searchParams?.get("promo")}` : "",
    [searchParams]
  )
  return (
    <nav
      className={cn(
        "flex items-center justify-between p-4 text-white",
        className
      )}
    >
      <div className="flex items-center gap-5 font-semibold">
        <Link href="/" className="flex items-center">
          <div className="relative mr-4 h-12 w-12">
            <Image fill alt="Logo" src="/images/logo1.png" />
          </div>
          <div>
            <h1 className={cn("text-2xl font-bold", font.className)}>
              PRAGLIS
            </h1>
          </div>
        </Link>
        {landingRoutes.map((landingRoute) => (
          <Link
            href={landingRoute.href}
            key={landingRoute.href}
            className={cn(
              "text-text-secondary text-lg hover:text-blue-400 max-md:hidden",
              pathname === landingRoute.href && "text-blue-500"
            )}
          >
            {landingRoute.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {/* <ThemeToggle /> */}
        <Link href={route || `/purchase/${courses[0].id}` || "/purchase"}>
          <Button variant="outline" className="rounded-full">
            {!route ||
            !(route?.includes("teacher") || route?.includes("student"))
              ? "Purchase Now"
              : "Get Started"}
          </Button>
        </Link>
        {pathname.split("/").length < 2 && (
          <Link
            href={
              !userId
                ? `/sign-in`
                : pathname.includes("purchase")
                ? `/purchase/${courses[0]?.id}${queryString}`
                : route ?? `/purchase${queryString}`
            }
          >
            <Button containerClassName="!h-11 !max-h-11">
              {pathname.includes("purchase") ? "Purchase Now" : "Get Started"}
            </Button>
          </Link>
        )}
        {/* <ThemeToggle /> */}
        <div className="max-sm:hidden">
          <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />
        </div>
        <LandingNavbarMobile />
      </div>
    </nav>
  )
}

export default LandingNavbar
