import React from "react"

import ContactUs from "@/components/landing/contact-us"
import LandingNavbar from "@/components/shared/LandingNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <main className="h-full w-full">{children}</main>
      <ContactUs className="w-full text-white" />
    </div>
  )
}

export default layout
