"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

import "@/components/ui/checkbox"
import { Announcement, Batch, Course } from "@prisma/client"
import { toast } from "react-hot-toast"
import {
  RecoilRoot,
  RecoilState,
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  type: string
  courses: Course[]
  batches: Batch[]
  isStudent?: boolean
}) => {
  return (
    <RecoilRoot>
      <div
        className={cn(
          "flex w-full flex-wrap justify-start gap-2 pl-2 xs:flex-nowrap"
        )}
      >
        {(type === "course" || type === "batch") && (
          <CustomSelectItems
            type={type}
            recoilState={courseState}
            name="course"
            items={courses}
          />
        )}
        {type === "batch" && !isStudent && (
          <CustomSelectItems
            type={type}
            recoilState={batchState}
            name="batch"
            items={batches}
          />
        )}
      </div>
    </RecoilRoot>
  )
}

export default AnnouncementCategory

function CustomSelectItems({
  recoilState,
  items,
  disabled,
  type,
  name,
  isStudent = false,
}: {
  name: string
  recoilState: RecoilState<string>
  items: any[]
  type: string
  disabled?: boolean
  isStudent?: boolean
}) {
  const [value, setValue] = useRecoilState(recoilState)
  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (type === "general") {
      router.push(pathname.split("?")[0])
      return
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: type,
          courseId:
            ["course", "batch"].includes(type) && name === "course"
              ? value || searchParams.get("courseId")
              : "",
          batchId:
            type === "batch" && name === "batch" && !isStudent
              ? value || searchParams.get("batchId")
              : "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [type, router, pathname, value, name, searchParams, isStudent])

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

const batchState = atom({
  key: "batch",
  default: "all",
})

const courseState = atom({
  key: "course",
  default: "all",
})
