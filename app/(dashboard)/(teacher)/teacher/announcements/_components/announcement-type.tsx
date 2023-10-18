"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import qs from "query-string"

import "@/components/ui/checkbox"
import { Batch, Course } from "@prisma/client"
import { toast } from "react-hot-toast"

import { useDebounce } from "@/hooks/use-debounce"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AnnouncementType = ({
  type,
  courses,
  batches,
}: {
  type: string
  courses: Course[]
  batches: Batch[]
}) => {
  const [value, setValue] = useState(type || "")
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: debouncedValue,
          courseId: searchParams.get("courseId"),
          batchId: searchParams.get("batchId"),
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, router, pathname, type])

  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }
  return (
    <div className="mt-5 flex w-full flex-wrap justify-between gap-2 md:flex-nowrap">
      <Select onValueChange={handleChange} defaultValue={"general"}>
        <SelectTrigger className="">
          <SelectValue placeholder="Announcement Type" className="w-full " />
        </SelectTrigger>
        <SelectContent className="w-full ">
          <SelectItem value="general">General</SelectItem>
          <SelectItem value="course">Course</SelectItem>
          <SelectItem value="batch">Batch</SelectItem>
        </SelectContent>
      </Select>
      {(value === "course" || value === "batch") && (
        <CourseCustomSelect items={courses} type={value} />
      )}
      {value === "batch" && <BatchCustomSelect items={batches} type={value} />}
    </div>
  )
}

export default AnnouncementType

function CourseCustomSelect({
  items,
  type,
}: {
  type: string
  items: Course[]
}) {
  const [value, setValue] = useState(items[0].id)
  const debouncedValue = useDebounce(value)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: type,
          courseId: debouncedValue,
          batchId: type === "batch" && searchParams.get("batchId"),
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, router, pathname, type, searchParams])

  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }
  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="">
        <SelectValue placeholder="Announcement Type" className="w-full " />
      </SelectTrigger>
      <SelectContent className="w-full ">
        {items.map((item) => (
          <SelectItem value={item.id.toString()}>
            {item.title.toString() as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function BatchCustomSelect({ items, type }: { type: string; items: Batch[] }) {
  const [value, setValue] = useState(items[0].id)
  const debouncedValue = useDebounce(value)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: type,
          batchId: debouncedValue,
          courseId: type === "batch" && searchParams.get("courseId"),
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    console.log(url)
    router.push(url)
  }, [value, debouncedValue, router, pathname, type])

  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }
  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="">
        <SelectValue placeholder="Announcement Type" className="w-full " />
      </SelectTrigger>
      <SelectContent className="w-full ">
        {items.map((item) => (
          <SelectItem value={item.id.toString()}>
            {item.name.toString() as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
