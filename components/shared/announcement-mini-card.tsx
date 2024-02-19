import Link from "next/link"
import {
  NotificationAddOutlined,
  NotificationAddSharp,
  NotificationImportant,
} from "@mui/icons-material"
import { Announcement } from "@prisma/client"

import { Preview } from "../preview"
import { Separator } from "../ui/separator"

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
  console.log(announcements)
  return (
    <section className="h-full px-4 pt-4">
      <h2 className="text-xl font-bold">Announcements</h2>
      <div className="bg-background-color flex max-h-full min-h-[14rem] flex-col overflow-y-auto rounded-md p-1">
        {announcements.slice(0, 3).map((announcement) => (
          <Link
            href={`/student/announcement/${announcement.id}`}
            key={announcement?.id}
            className="!hover:cursor-pointer flex flex-col rounded-md p-2 hover:opacity-70"
          >
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-text-primary overflow-hidden text-ellipsis">
                {announcement?.title}
              </h3>
              <div className="flex justify-end">
                <p className="text-sm text-slate-500">
                  {announcement?.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="!-m-3 !p-0 text-sm text-slate-200">
              <Preview value={announcement?.description!} />
            </div>
            <Separator />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AnnouncementMiniCard
