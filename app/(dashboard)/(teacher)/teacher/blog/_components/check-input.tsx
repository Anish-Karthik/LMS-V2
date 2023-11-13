"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

import "@/components/ui/checkbox"
import { toast } from "react-hot-toast"

import { useDebounce } from "@/hooks/use-debounce"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CheckInput = (props: {
  role?: string
  batchId?: string
  courseId?: string
  name: string
}) => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const role = searchParams.get("role")
  const courseId = searchParams.get("courseId")
  const batchId = searchParams.get("batchId")
  const searchText = searchParams.get("searchText")

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          role: props.name == "role" ? debouncedValue : role,
          searchText: searchText,
          courseId: props.name == "courseId" ? debouncedValue : courseId,
          batchId: props.name == "batchId" ? debouncedValue : batchId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [
    debouncedValue,
    role,
    router,
    pathname,
    courseId,
    batchId,
    searchText,
    props.name,
  ])

  const handleChange = (val: string) => {
    setValue(val)
    toast.success(`Filtering by ${value}`)
  }
  return (
    <div>
      <Select onValueChange={handleChange} defaultValue={"all"}>
        <SelectTrigger className="w-[180px] border-none">
          <SelectValue placeholder="User type" />
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="notEnrolled">notEnrolled</SelectItem>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CheckInput
