"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { sidebarLinksStudentMobile } from "@/app/constants"

function MobileNav() {
  const pathname = usePathname()!
  return (
    <section className="bottombar sm:hidden">
      <div className="bottombar_container grid grid-cols-4">
        {sidebarLinksStudentMobile.map((link, ind) => {
          const isActive = pathname.includes(link.route.toLowerCase())

          // if(link.route === '/profile') link.route = `/profile/${userId}`

          return (
            <div key={ind}>
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${
                  isActive && "bg-primary-foreground"
                }`}
              >
                {/* <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                /> */}
                <link.icon />
                <p className="text-light-1 text-subtle-medium max-sm:hidden">
                  {link.label.split(" ")[0]}
                </p>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MobileNav
