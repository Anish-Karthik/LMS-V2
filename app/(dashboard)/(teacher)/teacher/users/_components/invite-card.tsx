"use client"

import { useState } from "react"
import { Invite } from "@prisma/client"
import { Copy, Edit } from "lucide-react"

import { formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { toast as shadcnToast } from "@/components/ui/use-toast"
import ShareCard from "@/components/card/share-card"

import { InviteForm } from "./invite-form"

export default function InviteCard({
  invite,
  userRole,
}: {
  userRole: string
  invite: Invite
}) {
  const [isCreating, setIsCreating] = useState(false)
  const url = `${window.location.host}/purchase?invite=${invite.invite}`
  const handleCopy = () => {
    navigator.clipboard.writeText(invite.invite)
    shadcnToast({ title: `${invite.invite} Copied to clipboard` })
  }

  return (
    <>
      {isCreating ? (
        <div className="w-full rounded-md border-2 border-solid border-secondary p-2">
          <InviteForm
            id={invite.id}
            invite={invite.invite}
            uses={invite.uses}
            expiresAt={invite.expiresAt || undefined}
            type="edit"
            setIsCreating={setIsCreating}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between max-xs:flex-col max-xs:items-start">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium max-sm:text-sm">
                {invite.invite}
              </h3>
              <span className="text-sm text-slate-500 max-sm:text-xs">
                {invite.uses} uses left
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 max-xs:!w-full max-xs:justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 max-sm:text-xs">
                {" "}
                {invite.expiresAt
                  ? `Valid till ${formatDate(invite.expiresAt)}`
                  : "No expiry"}
              </span>
              {/* <span className="text-sm text-slate-500 max-sm:text-xs">
                Used {invite.count} times
              </span> */}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost">
                <Copy className="h-4 w-4" onClick={handleCopy} />
              </Button>
              {userRole === "admin" && (
                <Button variant="ghost" onClick={() => setIsCreating(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <ShareCard url={url} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
