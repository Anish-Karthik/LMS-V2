"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pencil } from "lucide-react"
import qs from "query-string"
import {
  RecoilRoot,
  RecoilState,
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"

import "@/components/ui/checkbox"
import { Announcement, Batch, Course } from "@prisma/client"
import { toast } from "react-hot-toast"

import { updateAnnouncement } from "@/lib/actions/server/announcement.server.action"
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
    id: "blog",
    name: "Blog",
  },
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
  return (
    <RecoilRoot>
      <MiddleLine
        announcement={announcement}
        courses={courses}
        batches={batches}
      />
    </RecoilRoot>
  )
}

export default AnnouncementType

function MiddleLine({
  announcement,
  courses,
  batches,
}: {
  announcement: Announcement
  courses: Course[]
  batches: Batch[]
}) {
  const announcementTypeState = atom<string>({
    key: "announcementTypeState",
    default: getCurrentAnnouncementType(announcement),
  })

  const batchIdState = atom<string>({
    key: "batchIdState",
    default: announcement.batchId || "",
  })

  const courseIdState = atom<string>({
    key: "courseIdState",
    default: announcement.courseId || "",
  })

  const value = useRecoilValue(announcementTypeState)
  const [isEditing, setIsEditing] = useRecoilState(isEditingState)
  const isSubmitting = useRecoilValue(isSubmittingState)
  const toggleEdit = () => setIsEditing((current) => !current)

  return (
    <div className="bg-secondary mt-5 flex flex-col gap-2 rounded-md border p-5">
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
          "xs:flex-nowrap flex w-full flex-wrap gap-2",
          isEditing ? "justify-between" : "justify-start pl-2"
        )}
      >
        {isEditing ? (
          <CustomSelectItems
            name="type"
            announcementTypeState={announcementTypeState}
            recoilState={announcementTypeState}
            items={announcementTypes}
            disabled={isSubmitting}
          />
        ) : (
          <span className="md:text-md bg-primary-foreground max-xs:min-w-full rounded-md p-2 text-sm font-medium">
            {value}
          </span>
        )}
        {(value === "course" || value === "batch") &&
          (isEditing ? (
            <CustomSelectItems
              name="course"
              announcementTypeState={announcementTypeState}
              recoilState={courseIdState}
              items={courses}
              disabled={isSubmitting}
            />
          ) : (
            <Display items={courses} recoilState={courseIdState} />
          ))}
        {value === "batch" &&
          (isEditing ? (
            <CustomSelectItems
              name="batch"
              announcementTypeState={announcementTypeState}
              recoilState={batchIdState}
              items={batches}
              disabled={isSubmitting}
            />
          ) : (
            <Display items={batches} recoilState={batchIdState} />
          ))}
      </div>
      {isEditing && (
        <SumbitButton
          announcementId={announcement.id}
          batchIdState={batchIdState}
          courseIdState={courseIdState}
          announcementTypeState={announcementTypeState}
        />
      )}
    </div>
  )
}

function CustomSelectItems({
  recoilState,
  name,
  items,
  announcementTypeState,
  disabled,
}: {
  name: string
  recoilState: RecoilState<string>
  announcementTypeState: RecoilState<string>
  items: any[]
  disabled?: boolean
}) {
  const [value, setValue] = useRecoilState(recoilState)
  const type = useRecoilValue(announcementTypeState)
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const router = useRouter()
  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: type,
          courseId:
            ["course", "batch"].includes(type) && name === "course"
              ? value || searchParams?.get("courseId")
              : "",
          batchId:
            type === "batch" && name === "batch"
              ? value || searchParams?.get("batchId")
              : "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [type, router, pathname, searchParams, value, name])

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

function SumbitButton({
  announcementId,
  batchIdState,
  courseIdState,
  announcementTypeState,
}: {
  batchIdState: RecoilState<string>
  courseIdState: RecoilState<string>
  announcementTypeState: RecoilState<string>
  announcementId: string
}) {
  const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingState)
  const setIsEditing = useSetRecoilState(isEditingState)
  const toggleEdit = () => setIsEditing((current) => !current)
  const batch = useRecoilValue(batchIdState)
  const course = useRecoilValue(courseIdState)
  const value = useRecoilValue(announcementTypeState)
  const router = useRouter()
  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await updateAnnouncement({
        id: announcementId,
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
    <div className="flex items-center gap-x-2">
      <Button disabled={isSubmitting} onClick={onSubmit}>
        <span className="md:text-md text-sm font-medium">Save</span>
      </Button>
    </div>
  )
}

function Display({
  recoilState,
  items,
}: {
  recoilState: RecoilState<string>
  items: any[]
}) {
  const value = useRecoilValue(recoilState)
  return (
    <span className="md:text-md bg-primary-foreground max-xs:min-w-full rounded-md p-2 text-sm font-medium">
      {items.find((c) => c.id === value)?.title ||
        items.find((c) => c.id === value)?.name}
    </span>
  )
}

const isEditingState = atom<boolean>({
  key: "isEditingState",
  default: false,
})

const isSubmittingState = atom<boolean>({
  key: "isSubmittingState",
  default: false,
})
