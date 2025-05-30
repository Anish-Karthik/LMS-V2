"use client"

import React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { capitalize } from "@mui/material"

import { cn } from "@/lib/utils"

const CurrentPathNavigator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()!
  const pathArr = pathname.split("/")
  const params = useParams()!
  // map params values to params names
  const paramsNames = Object.keys(params)
  const revParams = new Map()
  paramsNames.forEach((name) => {
    revParams?.set(params[name], name)
  })

  return (
    <div
      className={cn(
        "flex-start bg-secondary ml-6 mt-4 flex w-fit rounded-sm p-1",
        className
      )}
    >
      {pathArr.map((path, index) => {
        if (path === "") return null
        // check if path matches with any params if then return params name
        if (revParams?.has(path)) {
          return null
        }
        return (
          <Link
            href={
              index + 1 === pathArr.length ||
              (index + 2 == pathArr.length &&
                revParams?.has(pathArr[pathArr.length - 1]))
                ? `${pathname
                    .split("/")
                    .slice(0, index + 1)
                    .join("/")}`
                : `${pathname
                    .split("/")
                    .slice(0, index + 1)
                    .join("/")}`
            }
            key={index}
            className="flex-start ml-2 flex gap-2"
          >
            <p
              className={cn(
                " hover:underline",
                (index + 1 === pathArr.length ||
                  (index + 2 == pathArr.length &&
                    revParams?.has(pathArr[pathArr.length - 1]))) &&
                  "mr-2 text-blue-500"
              )}
            >
              {capitalize(path)}
            </p>
            {!(
              index + 1 === pathArr.length ||
              (index + 2 == pathArr.length &&
                revParams?.has(pathArr[pathArr.length - 1]))
            ) && <p> {">"} </p>}
          </Link>
        )
      })}
    </div>
  )
}

export default CurrentPathNavigator
