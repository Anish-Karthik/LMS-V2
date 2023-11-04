"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { sidebarLinksTeacherMobile } from "@/app/constants"

function MobileNav({ isAdmin = false }: { isAdmin?: boolean }) {
  // const { userId } = useAuth()
  // const router = useRouter()
  const pathname = usePathname()
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinksTeacherMobile.map((link, ind) => {
          const isActive = pathname.includes(link.route.toLowerCase())

          if (isAdmin && !link.role.includes("teacher")) return null
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
