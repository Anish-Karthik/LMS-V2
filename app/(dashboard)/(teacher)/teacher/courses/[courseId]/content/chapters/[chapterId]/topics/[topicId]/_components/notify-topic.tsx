"use client"

import { useEffect, useState } from "react"
import { Topic } from "@prisma/client"
import { toast } from "react-hot-toast"

import { notifyTopic } from "@/lib/actions/server/topic.server.action"
import { sendmail } from "@/lib/mailing/mailer"
import { getTopicDisplay } from "@/lib/mailing/topic"
import { callOnce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

const NotifyTopic = ({ topic, emails }: { emails: string[]; topic: Topic }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isNotified, setIsNotified] = useState(
    topic.isNotified || !topic.isPublished
  )

  const onNotify = async () => {
    try {
      setIsLoading(true)
      setIsNotified(true)
      const res = await notifyTopic(topic.id)
      if (!res) {
        toast.error("Cant notify topic")
        return
      }
      sendmail({
        to: emails,
        subject: "New Topic has been pusblished",
        html: getTopicDisplay(topic, window.location.href),
      })
      toast.success("Announcement was successfully mailed!")
    } catch (error: any) {
      toast.error("Something went wrong")
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsNotified(topic.isNotified || !topic.isPublished)
  }, [topic.isNotified, topic, topic.isPublished])
  const triggerNotify = callOnce(onNotify, 1000 * 60)
  return (
    <ConfirmModal onConfirm={triggerNotify} publishMail={true}>
      <Button disabled={isNotified || isLoading} variant="outline" size="sm">
        {isNotified ? "Notified" : "Notify"}
      </Button>
    </ConfirmModal>
  )
}

export default NotifyTopic
