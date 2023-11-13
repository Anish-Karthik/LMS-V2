"use client"

import { useEffect, useState } from "react"
import { Announcement, Attachment } from "@prisma/client"
import { toast } from "react-hot-toast"

import { notifyAnnouncement } from "@/lib/actions/server/announcement.server.action"
import { getAnnouncementDisplay } from "@/lib/mailing/announcement"
import { sendmail } from "@/lib/mailing/mailer"
import { callOnce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

const NotifyAnnouncement = ({
  announcement,
  emails,
}: {
  emails: string[]
  announcement: Announcement & { attachments: Attachment[] }
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isNotified, setIsNotified] = useState(
    announcement.isNotified || !announcement.isPublished
  )

  const onNotify = async () => {
    try {
      setIsLoading(true)
      setIsNotified(true)
      const res = await notifyAnnouncement(announcement.id)
      if (!res) {
        toast.error("Cant notify announcement")
        return
      }
      sendmail({
        to: emails,
        subject: announcement.title,
        html: getAnnouncementDisplay(announcement, window.location.href),
      })
      toast.success("Announcement was successfully mailed!")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsNotified(announcement.isNotified || !announcement.isPublished)
  }, [announcement.isNotified, announcement, announcement.isPublished])
  const triggerNotify = callOnce(onNotify, 1000 * 60)
  return (
    <ConfirmModal onConfirm={triggerNotify}>
      <Button disabled={isNotified || isLoading} variant="outline" size="sm">
        {isNotified ? "Notified" : "Notify"}
      </Button>
    </ConfirmModal>
  )
}

export default NotifyAnnouncement
