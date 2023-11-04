"use client"

import { useEffect, useState } from "react"
import { Topic } from "@prisma/client"
import { toast } from "react-hot-toast"

import { sendmail } from "@/lib/mailing/mailer"
import { getTopicDisplay } from "@/lib/mailing/topic"
import { callOnce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

const NotifyTopic = ({ topic, emails }: { emails: string[]; topic: Topic }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isNotified, setIsNotified] = useState(false)
  const [disabled, setDisabled] = useState(!topic.isPublished)
  console.log(emails)
  const onNotify = async () => {
    try {
      setIsLoading(true)
      setIsNotified(true)
      setDisabled(true)
      sendmail({
        to: [emails[0], emails[1]],
        subject: "New Topic has been pushblished",
        html: getTopicDisplay(topic, window.location.href),
      })
      toast.success("Announcement was successfully mailed!")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setDisabled(!topic.isPublished)
  }, [topic.isPublished, topic])
  const triggerNotify = callOnce(onNotify, 1000 * 60)
  return (
    <ConfirmModal onConfirm={triggerNotify} publishMail={true}>
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

export default NotifyTopic
