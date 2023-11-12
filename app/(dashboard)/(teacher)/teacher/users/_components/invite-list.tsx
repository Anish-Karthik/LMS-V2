"use client"

import dynamic from "next/dynamic"
import { Invite } from "@prisma/client"

import { ScrollArea } from "@/components/ui/scroll-area"

const InviteCard = dynamic(() => import("./invite-card"), { ssr: false })

export function InviteList({
  invites,
  userRole,
}: {
  userRole: string
  invites: Invite[]
}) {
  return (
    <ScrollArea>
      <div className="lg:max-h-80">
        <div className="flex flex-col items-center gap-2">
          {invites.map((invite) => (
            <InviteCard invite={invite} userRole={userRole} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
