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
import AnnouncementTabs from "@/components/announcements-teacher/announcement-tabs"

const page = async () => {
  const announcements = await getAnnouncements()
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  const generalAnnouncements = announcements.filter(
    (a) => a.courseId === null && a.batchId === null && a.isPublished
  )
  const batchAnnouncements = announcements.filter(
    (a) => a.courseId !== null && a.batchId !== null && a.isPublished
  )
  const courseAnnouncements = announcements.filter(
    (a) => a.courseId !== null && a.batchId === null && a.isPublished
  )
  const blogAnnouncements = announcements.filter(
    (a) => a.type === "blog" && a.isPublished
  )

  console.log(blogAnnouncements)
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
    {
      value: "blog",
      label: "Blog",
      icon: NotificationAddSharp,
      data: blogAnnouncements,
    },
  ]
  const courses = await getCourses()
  const batches = await getAllBatches()

  return (
    <div>
      <AnnouncementTabs
        announcementTabs={announcementTabs}
        userRole={userInfo!.role}
        courses={courses as Course[]}
        batches={batches}
        announcements={announcements}
      />
    </div>
  )
}

export default page
