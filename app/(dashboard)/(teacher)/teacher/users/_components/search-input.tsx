"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import qs from "query-string"

import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()!
  const router = useRouter()
  const pathname = usePathname()!

  const role = searchParams?.get("role")
  const courseId = searchParams?.get("courseId")
  const batchId = searchParams?.get("batchId")

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          role: role,
          searchText: debouncedValue,
          courseId: courseId,
          batchId: batchId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, role, router, pathname, courseId, batchId])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-full pl-9 md:w-[300px] "
        placeholder="Search for a user"
      />
    </div>
  )
}
