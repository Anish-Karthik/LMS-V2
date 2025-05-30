"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import { PlusCircle } from "lucide-react"
import { RecoilRoot } from "recoil"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { PromoForm } from "./promo-form"
import { RecentSales } from "./recent-sales"

const PromoPage = ({
  initialData,
  userRole,
  userId,
}: {
  userId: string
  userRole: string
  initialData: Promo[]
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  // const { userId } = useAuth()
  // if (!userId) return redirect("/sign-up")

  return (
    <RecoilRoot>
      <Card className="col-span-3 max-md:!w-full md:!-mr-4  lg:!mr-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Promo Code </CardTitle>
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a Promo
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating && <PromoForm setIsCreating={setIsCreating} />}
          {!isCreating && (
            <RecentSales promos={initialData} userRole={userRole} />
          )}
        </CardContent>
      </Card>
    </RecoilRoot>
  )
}

export default PromoPage
