import React from "react"

import ContactUs from "@/components/landing/contact-us"
import LandingNavbar from "@/components/shared/LandingNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div>
        <LandingNavbar courses={[]} />
      </div>
      <main>{children}</main>
      <ContactUs />
    </div>
  )
}

export default layout
