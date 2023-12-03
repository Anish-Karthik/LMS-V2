import React from "react"

import ContactUs from "@/components/landing/contact-us"
import LandingNavbar from "@/components/shared/LandingNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <main className="h-full w-full">{children}</main>
      <ContactUs className="absolute inset-x-0 -bottom-2 bg-secondary-color" />
    </div>
  )
}

export default layout
