"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pencil, Search } from "lucide-react"
import qs from "query-string"

import "@/components/ui/checkbox"
import { Announcement, Batch, Course } from "@prisma/client"
import { toast } from "react-hot-toast"

import { updateAnnouncement } from "@/lib/actions/announcement.action"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
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
export type AnnouncementType = "general" | "course" | "batch"
export function getCurrentAnnouncementType(
  announcement: Announcement
): AnnouncementType {
  if (announcement.batchId) return "batch"
  if (announcement.courseId) return "course"
  return "general"
}

const AnnouncementCategory = ({
  type,
  courses,
  batches,
  isStudent = false,
}: {
  type: string;
  courses: Course[]
  batches: Batch[]
  isStudent?: boolean
}) => {
  const [batch, setBatch] = useState("all")
  const [course, setCourse] = useState("all")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if(type === "general") {
      router.push(pathname.split('?')[0])
      return;
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: type,
          courseId: ["course", "batch"].includes(type)
            ? course || searchParams.get("courseId")
            : "",
          batchId:
            type === "batch" && !isStudent ? batch || searchParams.get("batchId") : "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [type, router, pathname, searchParams, course, batch, isStudent])
  useEffect(() => {
  }, [])

  return (
    <div
      className={cn(
        "flex w-full flex-wrap justify-start gap-2 pl-2 xs:flex-nowrap"
      )}
    >
    
      {(type === "course" || type === "batch") &&
          <CustomSelectItems
            setValue={setCourse}
            value={course}
            items={courses}
          />
      }
      {type === "batch" && !isStudent &&
        <CustomSelectItems
          setValue={setBatch}
          value={batch}
          items={batches}
        />
      }
    </div>
  )
}

export default AnnouncementCategory

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
        <SelectItem value="all">All</SelectItem>
        {items.map((item) => (
          <SelectItem value={item.id.toString()}>
            {item?.title?.toString() || item.name.toString()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
