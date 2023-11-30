import React from "react"
import {
  NotificationAddOutlined,
  NotificationAddSharp,
  NotificationImportant,
} from "@mui/icons-material"
import { Announcement } from "@prisma/client"

import { Button } from "../ui/button"

const icons = {
  general: NotificationAddSharp,
  batch: NotificationAddOutlined,
  course: NotificationImportant,
}
const AnnouncementMiniCard = ({
  announcements,
}: {
  announcements: Announcement[]
}) => {
  return (
    <section className="px-4 pt-4 ">
      <h2 className="text-xl font-bold">Announcements</h2>
      <div className="flex flex-col rounded-md bg-background-color p-1">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="flex flex-col rounded-md">
            <div className="flex items-center gap-1">
              <Button disabled className="bg-text-secondary">
                {announcement.type === "general" ? (
                  <icons.general />
                ) : announcement.type === "batch" ? (
                  <icons.batch />
                ) : (
                  <icons.course />
                )}
              </Button>
              <h3 className="overflow-hidden text-ellipsis">
                {announcement.title}
              </h3>
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-slate-500">
                {announcement.updatedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AnnouncementMiniCard
