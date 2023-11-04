import { Announcement, Attachment } from "@prisma/client"

import { formatDate } from "../format"

export const getAnnouncementDisplay = (
  announcement: Announcement & { attachments: Attachment[] },
  url: string
) => {
  const display = `
    <div className="rounded-md bg-secondary">
      <div className="max-sh-fit -mb-4">
        <p className="max-sh-fit rounded-sm p-4 text-xs text-slate-600">
          ${formatDate(announcement.updatedAt)}
          ${
            !(
              formatDate(announcement.updatedAt) ===
                formatDate(announcement.createdAt) &&
              announcement.updatedAt.getHours() ===
                announcement.createdAt.getHours() &&
              announcement.updatedAt.getMinutes() ===
                announcement.createdAt.getMinutes()
            ) && " (edited)"
          }
        </p>
      </div>
      <a href=${url} target="_blank">
        <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
          <h2 className="mb-2 text-2xl font-semibold">${announcement.title}</h2>
        </div>
      </a>
      <div>
        ${announcement.description}
      </div>
      ${
        announcement.attachments.length
          ? `
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between px-4">
          <h2 className="mb-2 text-xl font-semibold">Attachments</h2>
        </div>
        <div className="p-4">
          ${announcement.attachments
            .map(
              (attachment) => `
            <a
              href=${attachment.url}
              target="_blank"
              key=${attachment.id}
              className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
            >
              <File />
              <p className="line-clamp-1">${attachment.name}</p>
            </a>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }
    </div>
  `
  return display
}
