"use client"

import React from "react"
import { Copy } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HandleCopy = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }
  return (
    <Button
      onClick={() => handleCopy(text)}
      variant={"ghost"}
      className={cn("flex items-center gap-2", className)}
    >
      <Copy size={20} />
    </Button>
  )
}

export default HandleCopy
