"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pencil } from "lucide-react"
import qs from "query-string"

import "@/components/ui/checkbox"
import { Announcement, Batch, Course } from "@prisma/client"
import { toast } from "react-hot-toast"

import { updateAnnouncement } from "@/lib/actions/announcement.action"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const announcementTypes = [
  {
    id: "general",
    name: "General",
  },
  {
    id: "course",
    name: "Course",
  },
  {
    id: "batch",
    name: "Batch",
  },
]
export type TAnnouncementType = "general" | "course" | "batch"
export function getCurrentAnnouncementType(
  announcement: Announcement
): TAnnouncementType {
  if (announcement.batchId) return "batch"
  if (announcement.courseId) return "course"
  return "general"
}

export const AnnouncementType = ({
  announcement,
  courses,
  batches,
}: {
  announcement: Announcement
  courses: Course[]
  batches: Batch[]
}) => {
  const [value, setValue] = useState<string>(
    getCurrentAnnouncementType(announcement)
  )
  const [batch, setBatch] = useState(announcement.batchId || "")
  const [course, setCourse] = useState(announcement.courseId || "")
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: value,
          courseId: ["course", "batch"].includes(value)
            ? course || searchParams.get("courseId")
            : "",
          batchId:
            value === "batch" ? batch || searchParams.get("batchId") : "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [value, router, pathname, searchParams, course, batch])

  const toggleEdit = () => setIsEditing((current) => !current)
  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await updateAnnouncement({
        id: announcement.id,
        courseId: course,
        batchId: batch,
        type: value,
      })
      toast.success("Announcement type updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-2 rounded-md border bg-secondary p-5">
      <div className="-mt-3 flex items-center justify-between font-medium">
        Announcement type
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit type
            </>
          )}
        </Button>
      </div>
      <div
        className={cn(
          "flex w-full flex-wrap gap-2 xs:flex-nowrap",
          isEditing ? "justify-between" : "justify-start pl-2"
        )}
      >
        {isEditing ? (
          <CustomSelectItems
            setValue={setValue}
            value={value}
            items={announcementTypes}
            disabled={isSubmitting}
          />
        ) : (
          <span className="md:text-md rounded-md bg-primary-foreground p-2 text-sm font-medium max-xs:min-w-full">
            {value}
          </span>
        )}
        {(value === "course" || value === "batch") &&
          (isEditing ? (
            <CustomSelectItems
              setValue={setCourse}
              value={course}
              items={courses}
              disabled={isSubmitting}
            />
          ) : (
            <span className="md:text-md rounded-md bg-primary-foreground p-2 text-sm font-medium max-xs:min-w-full">
              {courses.find((c) => c.id === course)?.title}
            </span>
          ))}
        {value === "batch" &&
          (isEditing ? (
            <CustomSelectItems
              setValue={setBatch}
              value={batch}
              items={batches}
              disabled={isSubmitting}
            />
          ) : (
            <span className="md:text-md rounded-md bg-primary-foreground p-2 text-sm font-medium max-xs:min-w-full">
              {batches.find((b) => b.id === batch)?.name}
            </span>
          ))}
      </div>
      {isEditing && (
        <div className="flex items-center gap-x-2">
          <Button disabled={isSubmitting} onClick={onSubmit}>
            <span className="md:text-md text-sm font-medium">Save</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default AnnouncementType

function CustomSelectItems({
  setValue,
  value,
  items,
  disabled,
}: {
  setValue: (val: string) => void
  value: string
  items: any[]
  disabled?: boolean
}) {
  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={value}
      disabled={disabled}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Announcement Type" className="w-full " />
      </SelectTrigger>
      <SelectContent className="w-full ">
        {items.map((item) => (
          <SelectItem value={item.id.toString()}>
            {item?.title?.toString() || item.name.toString()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
