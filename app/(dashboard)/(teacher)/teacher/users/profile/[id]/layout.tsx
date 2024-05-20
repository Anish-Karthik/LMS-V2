import React from "react"
import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import CurrentPathNavigator from "../../../../../../../components/shared/current-pathname"

export const metadata: Metadata = {
  title: "Profile",
  description: "View Profile",
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="mx-auto space-y-0.5">
          <CurrentPathNavigator className="!m-0 !-mt-6 !mb-2" />
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">View User Profile</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
