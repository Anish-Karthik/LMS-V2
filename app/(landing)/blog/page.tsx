import React from "react"
import { currentUser } from "@clerk/nextjs"
import { NotificationAddSharp } from "@mui/icons-material"

import { getAnnouncements } from "@/lib/actions/announcement.action"
import { getAllBatches } from "@/lib/actions/batch.action"
import { getCourses } from "@/lib/actions/course.actions"
import { getUser } from "@/lib/actions/user.actions"
import ContactUs from "@/components/landing/contact-us"
import LandingNavbar from "@/components/shared/LandingNavbar"
import AnnouncementPage from "@/components/shared/announcement-page"

const page = async () => {
  const announcements = await getAnnouncements()
  const user = await currentUser()
  const userInfo = await getUser(user?.id || "")
  const blogAnnouncements = announcements.filter(
    (a) => a.type === "blog" && a.isPublished
  )
  blogAnnouncements.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
  const announcementTabs = [
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
      <div className="mx-auto mb-24 flex max-w-4xl flex-col items-start">
        <div className="ml-4 mt-8">
          <h1 className="text-center text-4xl font-bold">
            Latest Blogs from AlfaQ
          </h1>
        </div>
        <AnnouncementPage
          announcements={blogAnnouncements}
          isStudent={
            userInfo?.role === "student" || userInfo?.role === undefined
          }
          viewerRole={userInfo?.role || "student"}
          type="blog"
        />
        <ContactUs className="absolute inset-x-0 -bottom-2 bg-secondary-color" />
      </div>
    </div>
  )
}

export default page
