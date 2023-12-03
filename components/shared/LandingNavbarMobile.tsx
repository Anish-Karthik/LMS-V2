import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

const LandingNavbarMobile = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild className="!max-w-xs md:hidden">
        <HamburgerMenuIcon className="h-6 w-6" />
      </SheetTrigger>

      <SheetClose asChild>
        <SheetContent className="!max-w-xs md:hidden">
          <div className="flex flex-col flex-wrap gap-2">
            {landingRoutes.map((landingRoute) => (
              <SheetClose asChild>
                <Link
                  href={landingRoute.href}
                  key={landingRoute.href}
                  className={cn(
                    "text-lg text-tertiary-color hover:text-blue-400",
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
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </SheetClose>
    </Sheet>
  )
}

export default LandingNavbarMobile
