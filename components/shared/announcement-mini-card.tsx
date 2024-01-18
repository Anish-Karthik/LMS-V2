import {
  NotificationAddOutlined,
  NotificationAddSharp,
  NotificationImportant,
} from "@mui/icons-material"
import { Announcement } from "@prisma/client"

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
    <section className="h-full px-4 pt-4">
      <h2 className="text-xl font-bold">Announcements</h2>
      <div className="flex max-h-full min-h-[14rem] flex-col rounded-md bg-background-color p-1">
        {
          <div key={announcements[0]?.id} className="flex flex-col rounded-md">
            <div className="flex items-center gap-1">
              {/* <Button disabled className="bg-text-secondary">
                {announcements[0]?.type === "general" ? (
                  <icons.general />
                ) : announcements[0]?.type === "batch" ? (
                  <icons.batch />
                ) : (
                  <icons.course />
                )}
              </Button> */}
              <h3 className="overflow-hidden text-ellipsis">
                {announcements[0]?.title}
              </h3>
              <p className="text-sm text-slate-500">
                {announcements[0]?.description?.slice(0, 200)}...
              </p>
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-slate-500">
                {announcements[0]?.updatedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default AnnouncementMiniCard
