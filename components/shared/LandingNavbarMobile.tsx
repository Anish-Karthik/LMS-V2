import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignOutButton, UserButton, useAuth } from "@clerk/nextjs"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { landingRoutes } from "@/app/constants"

import { Separator } from "../ui/separator"

const LandingNavbarMobile = () => {
  const pathname = usePathname()!
  const { userId } = useAuth()
  return (
    <Sheet>
      <SheetTrigger asChild className="!max-w-xs md:hidden">
        <HamburgerMenuIcon className="h-6 w-6" />
      </SheetTrigger>

      <SheetClose asChild>
        <SheetContent className="!max-w-xs md:hidden">
          <div className="flex h-full flex-col justify-between gap-2">
            <div className="flex flex-col flex-wrap gap-2">
              <div className="mb-2">
                <SheetHeader>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/logo2.jpg"
                      alt="landing-logo"
                      width={40}
                      height={40}
                    />
                    <SheetTitle>Landing Page</SheetTitle>
                  </div>
                  <SheetDescription>
                    <p>Explore the landing page</p>
                  </SheetDescription>
                </SheetHeader>
              </div>
              {landingRoutes.map((landingRoute) => (
                <SheetClose asChild>
                  <div className="">
                    <Link
                      href={landingRoute.href}
                      key={landingRoute.href}
                      className={cn(
                        "text-lg text-pink-500 hover:text-blue-400",
                        pathname === landingRoute.href && "text-blue-500",
                        "rounded-md px-4 py-2",
                        "transition-colors duration-300 ease-in-out"
                      )}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {landingRoute.label}
                    </Link>
                    <Separator className="mt-1" />
                  </div>
                </SheetClose>
              ))}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-end gap-1 p-2">
                {!!!userId ? (
                  <SignInButton>
                    <div className="hover:text-pink-color relative flex h-10 !max-h-11 !w-full justify-center rounded-full border border-purple-600/30 bg-slate-700/30 px-4 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-pink-400/[0.3] sm:px-8">
                      <div className="via-pink-color absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl" />
                      <span className="font-abeezee relative z-20 !w-full text-center">
                        Sign In
                      </span>
                    </div>
                  </SignInButton>
                ) : (
                  <SignOutButton>
                    <div className="hover:text-pink-color relative flex h-10 !max-h-11 !w-full justify-center rounded-full border border-purple-600/30 bg-slate-700/30 px-4 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-pink-400/[0.3] sm:px-8">
                      <div className="via-pink-color absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl" />
                      <span className="font-abeezee relative z-20 !w-full text-center">
                        Sign Out
                      </span>
                    </div>
                  </SignOutButton>
                )}
              </div>
              <SheetFooter>
                <p className="text-sm text-gray-500">
                  © 2024 Landing Page. All rights reserved.
                </p>
              </SheetFooter>
            </div>
          </div>
        </SheetContent>
      </SheetClose>
    </Sheet>
  )
}

export default LandingNavbarMobile
