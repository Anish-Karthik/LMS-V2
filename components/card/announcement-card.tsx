import React from "react"
import { Announcement } from "@prisma/client"

const AnnouncementCard = ({
  announcement,
  viewerRole,
}: {
  announcement: Announcement
  viewerRole: string
}) => {
  return <div>AnnouncementCard</div>
}

export default AnnouncementCard
