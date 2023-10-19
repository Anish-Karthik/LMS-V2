import React from "react"

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full !w-[600px] items-center justify-center">
      {children}
    </div>
  )
}
