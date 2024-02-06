import React from "react"

import ContactUs from "@/components/landing/contact-us"

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <main className="mt-12 h-full w-full">
        <div className="relative flex flex-col justify-center gap-0 bg-text-primary lg:min-h-[85vh]">
          <div className="h-full">{children}</div>
          <ContactUs className="bg-text-primary lg:fixed lg:inset-x-0 lg:-bottom-1" />
        </div>
      </main>
    </div>
  )
}

export default LandingLayout
