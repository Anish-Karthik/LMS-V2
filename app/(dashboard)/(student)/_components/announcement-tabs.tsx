"use client"

import React from "react"
import { Batch, Course } from "@prisma/client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnnouncementPage from "@/components/shared/announcement-page"

import CurrentPathNavigator from "./current-pathname"

const AnnouncementTabs = ({
  announcementTabs,
  userRole,
  courses,
  batches,
}: {
  announcementTabs: {
    value: string
    label: string
    icon: any
    data: any[]
  }[]
  userRole: string
  courses: Course[]
  batches: Batch[]
}) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="tab">
        {announcementTabs.map((tab) => (
          <TabsTrigger value={tab.value} className="tab">
            <tab.icon width={24} height={24} />
            <p className="max-sm:hidden">{tab.label}</p>
            {tab.data.length > 0 && (
              <p className="ml-1 rounded-sm px-2 py-1 !text-xs">
                {tab.data.length}
              </p>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {announcementTabs.map((tab) => (
        <TabsContent value={tab.value} className="w-full">
          <CurrentPathNavigator />
          <AnnouncementPage
            isStudent={userRole === "student"}
            type={tab.value}
            courses={courses as Course[]}
            batches={batches}
            announcements={tab.data}
            viewerRole={userRole}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default AnnouncementTabs
