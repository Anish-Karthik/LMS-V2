"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import { Copy, Edit } from "lucide-react"

import { formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { toast as shadcnToast } from "@/components/ui/use-toast"

import { PromoForm } from "./promo-form"

export function PromoCard({
  promo,
  userRole,
}: {
  userRole: string
  promo: Promo
}) {
  const [isCreating, setIsCreating] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code)
    shadcnToast({ title: `${promo.code} Copied to clipboard` })
  }
  const { userId } = useAuth()
  if (!userId) {
    redirect("/sign-in")
  }
  return (
    <>
      {isCreating ? (
        <div className="w-full rounded-md border-2 border-solid border-secondary p-2">
          <PromoForm
            userId={userId}
            id={promo.id}
            code={promo.code}
            discount={promo.discount}
            expiresAt={promo.expiresAt || undefined}
            type="edit"
            setIsCreating={setIsCreating}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">{promo.code}</h3>
              <span className="text-sm text-slate-500">
                {promo.discount}% off
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">
                {" "}
                {promo.expiresAt
                  ? `Valid till ${formatDate(promo.expiresAt)}`
                  : "No expiry"}
              </span>
              <span className="text-sm text-slate-500">
                Used {promo.count} times
              </span>
            </div>
            <Button variant="ghost">
              <Copy className="h-4 w-4" onClick={handleCopy} />
            </Button>
            {userRole === "admin" && (
              <Button variant="ghost" onClick={() => setIsCreating(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
