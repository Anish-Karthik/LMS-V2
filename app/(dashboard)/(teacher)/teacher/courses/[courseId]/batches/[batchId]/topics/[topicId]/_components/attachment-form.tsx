"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Attachment, Topic } from "@prisma/client"
import { File, Loader2, PlusCircle, X } from "lucide-react"
import toast from "react-hot-toast"
import * as z from "zod"

import {
  addAttachmentToTopic,
  removeAttachmentFromTopic,
} from "@/lib/actions/server/topic.server.action"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

interface AttachmentFormProps {
  initialData: Topic & { attachments: Attachment[] }
  topicId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

export const AttachmentForm = ({
  initialData,
  topicId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addAttachmentToTopic(topicId, values.url)

      toast.success("Course updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await removeAttachmentFromTopic(topicId, id)
      toast.success("Attachment deleted")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-secondary mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="mt-2 text-sm italic text-slate-500">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
                >
                  <File className="mr-2 h-4 w-4 shrink-0" />
                  <Link
                    className="line-clamp-1 text-xs"
                    href={attachment.url}
                    target="_blank"
                  >
                    {attachment.name}
                  </Link>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      title="Delete attachment"
                      type="button"
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="text-muted-foreground mt-4 text-xs">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}
