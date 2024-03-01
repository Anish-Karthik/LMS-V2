import React from "react"

import LandingNavbar from "@/components/shared/LandingNavbar"
import ContactUs from "@/app/(landing)/_components/landing/contact-us"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <main className="h-full w-full">{children}</main>
      <ContactUs className="w-full text-white" />
    </div>
  )
}

export default layout
