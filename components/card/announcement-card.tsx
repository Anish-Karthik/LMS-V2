import React from "react"
import Link from "next/link"
import { Announcement, Attachment } from "@prisma/client"
import { File, Pencil } from "lucide-react"

import { formatDate } from "@/lib/format"

import { Preview } from "../preview"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const AnnouncementCard = ({
  announcement,
  viewerRole,
}: {
  announcement: Announcement & { attachments: Attachment[] }
  viewerRole: string
}) => {
  return (
    <div className="rounded-md bg-secondary">
      <div className="max-sh-fit -mb-4">
        <p className="max-sh-fit rounded-sm p-4 text-xs text-slate-600">
          {/* date */}
          {formatDate(announcement.updatedAt)}
          {!(
            formatDate(announcement.updatedAt) ===
              formatDate(announcement.createdAt) &&
            announcement.updatedAt.getHours() ===
              announcement.createdAt.getHours() &&
            announcement.updatedAt.getMinutes() ===
              announcement.createdAt.getMinutes()
          ) && " (edited)"}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <h2 className="mb-2 text-2xl font-semibold">{announcement.title}</h2>
        {["teacher", "admin"].includes(viewerRole) && (
          <Link href={`/teacher/announcements/${announcement.id}`}>
            <Button variant={"ghost"}>
              <Pencil className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
      <div>
        <Preview value={announcement.description!} />
      </div>
      {!!announcement.attachments.length && (
        <>
          <Separator />
          <div className="p-4">
            {announcement.attachments.map((attachment) => (
              <Link
                href={attachment.url}
                target="_blank"
                key={attachment.id}
                className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
              >
                <File />
                <p className="line-clamp-1">{attachment.name}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AnnouncementCard
