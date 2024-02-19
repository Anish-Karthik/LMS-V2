"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { Announcement, Attachment, Batch, Course, User } from "@prisma/client"

import AnnouncementCard from "../card/announcement-card"
import AnnouncementCategory from "./announcement-category"

const AnnouncementPage = ({
  type,
  courses,
  batches,
  announcements,
  viewerRole,
  isStudent = false,
}: {
  isStudent?: boolean
  courses?: Course[]
  batches?: Batch[]
  type: string
  announcements: (Announcement & { attachments: Attachment[]; user: User })[]
  viewerRole: string
}) => {
  const searchParams = useSearchParams()!
  // console.log(announcements)
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (type === "blog") return announcement.type === "blog"
    if (type === "general") return true
    if (type === "course")
      return (
        announcement.courseId == searchParams.get("courseId") ||
        [undefined, null, "all"].includes(searchParams.get("courseId"))
      )
    if (type === "batch")
      return (
        announcement.batchId == searchParams.get("batchId") ||
        [undefined, null, "all"].includes(searchParams.get("batchId"))
      )
    return false
  })
  return (
    <div className="flex flex-col">
      {
        <div className="max-w-[600px] p-5">
          <AnnouncementCategory
            type={type}
            batches={batches || []}
            courses={courses || []}
            isStudent={isStudent}
          />
        </div>
      }
      <div className="flex flex-col gap-3 p-5">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            announcement={announcement}
            viewerRole={viewerRole}
          />
        ))}
      </div>
    </div>
  )
}

export default AnnouncementPage
