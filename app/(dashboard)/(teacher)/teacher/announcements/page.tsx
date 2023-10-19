import Image from "next/image"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import {
  CreateOutlined,
  NotificationAddOutlined,
  NotificationAddSharp,
  NotificationImportant,
} from "@mui/icons-material"

import { getAnnouncements } from "@/lib/actions/announcement.action"
import { getUser } from "@/lib/actions/user.actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnnouncementPage from "@/components/shared/announcement-page"

import CurrentPathNavigator from "../../_components/current-pathname"
import { AnnouncementsForm } from "./_components/announcements-form"
import { AnnouncementsList } from "./_components/announcements-list"

const page = async () => {
  const announcements = await getAnnouncements()
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  const generalAnnouncements = announcements.filter(
    (a) => a.courseId === null && a.batchId === null
  )
  const batchAnnouncements = announcements.filter(
    (a) => a.courseId !== null && a.batchId !== null
  )
  const courseAnnouncements = announcements.filter(
    (a) => a.courseId !== null && a.batchId === null
  )
  const announcementTabs = [
    {
      value: "general",
      label: "General",
      icon: NotificationAddSharp,
      data: generalAnnouncements,
    },
    {
      value: "batch",
      label: "Batch",
      icon: NotificationAddOutlined,
      data: batchAnnouncements,
    },
    {
      value: "course",
      label: "Course",
      icon: NotificationImportant,
      data: courseAnnouncements,
    },
  ]

  return (
    <div>
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
        {/* TODO: good list like ojn that of course recording */}
        {announcementTabs.map((tab) => (
          <TabsContent value={tab.value} className="w-full">
            <CurrentPathNavigator />
            <AnnouncementPage
              announcements={tab.data}
              viewerRole={userInfo!.role}
            />
            {/* <AnnouncementsList items={tab.data} /> */}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default page
