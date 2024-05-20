"use client"

import { useState } from "react"
import { Invite } from "@prisma/client"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CurrentPathNavigator from "../../../../../../components/shared/current-pathname"
import { InviteForm } from "./invite-form"
import { InviteList } from "./invite-list"

const InvitePage = ({
  initialData,
  userRole,
  userId,
}: {
  userId: string
  userRole: string
  initialData: Invite[]
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  // const { userId } = useAuth()
  // if (!userId) return redirect("/sign-up")

  return (
    <Card className="col-span-3 max-md:!w-full md:!-mr-4  lg:!mr-0">
      <CurrentPathNavigator />
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Invite Code </CardTitle>
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a Invite
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isCreating && <InviteForm setIsCreating={setIsCreating} />}
        {!isCreating && (
          <InviteList invites={initialData} userRole={userRole} />
        )}
      </CardContent>
    </Card>
  )
}

export default InvitePage
