"use client"

import { useMemo } from "react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs"
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
  const router = useRouter()!
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
      <div className="flex items-center gap-5 font-light">
        <Link href="/" className="flex items-center ">
          <div className="relative mr-4 h-12 w-12">
            <Image fill alt="Logo" src="/images/logo2.jpg" />
          </div>
          <div className="max-sm:hidden">
            <h1 className={cn("text-2xl font-bold", font.className)}>
              CLOVERS
            </h1>
          </div>
        </Link>
        {landingRoutes.map((landingRoute) => (
          <Link
            href={landingRoute.href}
            key={landingRoute.href}
            className={cn(
              "bg-gradient-to-r from-white via-white to-white bg-clip-text text-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent max-md:hidden",
              pathname === landingRoute.href
                ? "bg-gradient-to-r from-pink-500 via-pink-500 to-pink-500 bg-clip-text text-transparent"
                : "font-extralight"
            )}
          >
            {landingRoute.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {/* <ThemeToggle /> */}
        {courses.length > 0 && (
          <Link href={route || `/purchase/${courses[0].id}` || "/purchase"}>
            <Button variant="outline" className="rounded-full">
              {!route ||
              !(route?.includes("teacher") || route?.includes("student"))
                ? "Purchase Now"
                : "Dashboard"}
            </Button>
          </Link>
        )}
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
            <Button
              containerClassName="!h-11 !max-h-11 hover:!text-pink-color"
              className="hover:!text-pink-color"
            >
              {!route || route.includes("purchase")
                ? "Purchase Now"
                : "Dashboard"}
            </Button>
          </Link>
        )}
        {/* <ThemeToggle /> */}
        <div className="flex items-center gap-1">
          {!!!userId && (
            <SignInButton>
              <div className="hover:text-pink-color relative h-10 !max-h-11 rounded-full border border-purple-600/30 bg-slate-700/30 px-4 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-pink-400/[0.3] sm:px-8">
                <div className="via-pink-color absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl" />
                <span className="font-abeezee relative z-20">Sign In</span>
              </div>
            </SignInButton>
          )}

          <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />
        </div>
        <LandingNavbarMobile />
      </div>
    </nav>
  )
}

export default LandingNavbar
