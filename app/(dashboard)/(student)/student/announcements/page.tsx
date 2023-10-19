import { currentUser } from "@clerk/nextjs"
import {
  NotificationAddOutlined,
  NotificationAddSharp,
  NotificationImportant,
} from "@mui/icons-material"
import { Course } from "@prisma/client"

import { getAnnouncements } from "@/lib/actions/announcement.action"
import { getAllBatches } from "@/lib/actions/batch.action"
import { getCourses } from "@/lib/actions/course.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnnouncementPage from "@/components/shared/announcement-page"

import CurrentPathNavigator from "../../_components/current-pathname"

const page = async () => {
  const announcements = await getAnnouncements()
  const user = await currentUser()
  const userInfo = await getUser(user!.id)

  const generalAnnouncements = announcements.filter(
    (a) => a.courseId === null && a.batchId === null && a.isPublished
  )
  const batchAnnouncements = announcements.filter(
    (a) =>
      a.courseId !== null &&
      a.batchId !== null &&
      userInfo!.purchases.find((p) => p.batchId === a.batchId) &&
      a.isPublished
  )
  const courseAnnouncements = announcements.filter(
    (a) => a.courseId !== null && a.batchId === null && a.isPublished
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
  const courses = await getCourses()
  const batches = await getAllBatches()

  return (
    <div>
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
        {/* TODO: good list like ojn that of course recording */}
        {announcementTabs.map((tab) => (
          <TabsContent value={tab.value} className="w-full">
            <CurrentPathNavigator />
            <AnnouncementPage
              isStudent={userInfo?.role === "student"}
              type={tab.value}
              courses={courses as Course[]}
              batches={batches}
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
