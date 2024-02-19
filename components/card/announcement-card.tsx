import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Announcement, Attachment, User } from "@prisma/client"
import { File, Pencil } from "lucide-react"

import { formatDate } from "@/lib/format"
import { checkImage } from "@/lib/utils"

import { Preview } from "../preview"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const AnnouncementCard = ({
  announcement,
  viewerRole,
}: {
  announcement: Announcement & { attachments: Attachment[]; user: User }
  viewerRole: string
}) => {
  return (
    <div className="bg-secondary mx-auto w-full max-w-4xl rounded-md">
      <div className="max-sh-fit -mb-4 flex flex-wrap justify-between">
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
        {announcement.type === "blog" && (
          <div className="mr-2 grid grid-flow-col items-center">
            {announcement.user.image && (
              <Image
                src={announcement.user.image}
                className="rounded-full"
                alt={"avatar"}
                width={25}
                height={25}
              />
            )}
            <p className="max-sh-fit rounded-sm p-4 text-sm text-slate-300">
              {/* date */}
              {announcement.user.name}
            </p>
          </div>
        )}
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

      <div className="flex flex-col gap-2 p-4">
        {/* check whether the link is image? */}
        {announcement?.attachments?.map(
          (attachment) =>
            attachment.url &&
            checkImage(attachment.url) && (
              <Image
                src={attachment.url}
                alt={"Image"}
                width={2000}
                height={2000}
              />
            )
        )}
        {/* {announcement?.attachments[0]?.url && (
            
          )} */}
      </div>
      {!!announcement.attachments.length && announcement.type !== "blog" && (
        <>
          <Separator />
          <div className="p-4">
            {announcement.attachments.map(
              (attachment) =>
                !checkImage(attachment.url) && (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                )
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AnnouncementCard
