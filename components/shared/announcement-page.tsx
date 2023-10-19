import React from "react"
import { Announcement, Attachment } from "@prisma/client"

import AnnouncementCard from "../card/announcement-card"

const AnnouncementPage = ({
  announcements,
  viewerRole,
}: {
  announcements: (Announcement & { attachments: Attachment[] })[]
  viewerRole: string
}) => {
  return (
    <div className="flex flex-col p-5 gap-3">
      {announcements.map((announcement) => (
        <AnnouncementCard announcement={announcement} viewerRole={viewerRole} />
      ))}
    </div>
  )
}

export default AnnouncementPage
