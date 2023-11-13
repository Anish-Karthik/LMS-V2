import React from "react"

import LandingNavbar from "@/components/shared/LandingNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div>
        <LandingNavbar courses={[]} />
      </div>
      <main>{children}</main>
    </div>
  )
}

export default layout
