"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { sidebarLinksTeacher } from "@/app/constants"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 md:flex lg:space-x-6",
        className
      )}
      {...props}
    >
      {sidebarLinksTeacher.map((link, ind) => {
        const isActive = pathname.includes(link.route.toLowerCase())

        return (
          <Link
            href={link.route}
            key={link.label}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-400",
              isActive && "text-blue-500"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
