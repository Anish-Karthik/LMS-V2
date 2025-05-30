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
import { db } from "@/lib/db"

import AnnouncementTabs from "../../_components/announcement-tabs"

const page = async () => {
  const announcements = await getAnnouncements()
  const user = await currentUser()
  const userInfo = (await db.user.findUnique({
    where: {
      userId: user!.id,
    },
    include: {
      purchases: true,
    },
  }))!

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
      <AnnouncementTabs
        announcementTabs={announcementTabs}
        userRole={userInfo.role}
        courses={courses as Course[]}
        batches={batches}
      />
    </div>
  )
}

export default page
