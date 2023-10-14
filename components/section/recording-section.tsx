"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { communityTabs } from "@/app/constants"

const AdminTabs = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="tab w-full">
          {communityTabs.map((tab, ind) => {
            if (tab.label === "Requests") {
              return <></>
            }
            return (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="tab w-full"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {communityTabs.map((tab) => (
          <TabsContent value={tab.value} className="text-light-1 w-full">
            {/* <RecordingSection isAdmin={isAdmin} curBatch={curBatch} /> */}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default AdminTabs
