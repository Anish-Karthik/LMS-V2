"use client"

import { useEffect, useState } from "react"
import { Announcement, Attachment } from "@prisma/client"
import { toast } from "react-hot-toast"

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
  const [isNotified, setIsNotified] = useState(false)
  const [disabled, setDisabled] = useState(!announcement.isPublished)

  const onNotify = async () => {
    try {
      setIsLoading(true)
      setIsNotified(true)
      setDisabled(true)
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
    setDisabled(!announcement.isPublished)
  }, [announcement.isPublished, announcement])
  const triggerNotify = callOnce(onNotify, 1000 * 60)
  return (
    <ConfirmModal onConfirm={triggerNotify}>
      <Button
        disabled={isNotified || disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isNotified ? "Notified" : "Notify"}
      </Button>
    </ConfirmModal>
  )
}

export default NotifyAnnouncement
