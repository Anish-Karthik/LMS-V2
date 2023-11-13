"use client"

import React from "react"
import { CreateOutlined } from "@mui/icons-material"
import { Announcement, Batch, Course } from "@prisma/client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnnouncementPage from "@/components/shared/announcement-page"

import CurrentPathNavigator from "../../../_components/current-pathname"
import { AnnouncementsForm } from "./announcements-form"

const AnnouncementTabs = ({
  announcementTabs,
  userRole,
  courses,
  batches,
  announcements,
}: {
  announcementTabs: {
    value: string
    label: string
    icon: any
    data: any[]
  }[]
  announcements: Announcement[]
  userRole: string
  courses: Course[]
  batches: Batch[]
}) => {
  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="tab">
        <TabsTrigger value={"create"} className="tab">
          <CreateOutlined width={24} height={24} />
          <p className="max-sm:hidden">{"Create"}</p>
        </TabsTrigger>

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

      <TabsContent value={"create"} className="w-full">
        <CurrentPathNavigator />
        <AnnouncementsForm initialData={announcements} />
      </TabsContent>
      {announcementTabs.map((tab) => (
        <TabsContent value={tab.value} className="w-full">
          <CurrentPathNavigator />
          <AnnouncementPage
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
