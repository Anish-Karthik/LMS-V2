"use client"

import { useEffect } from "react"
import { promosState } from "@/store/atoms"
import { Promo } from "@prisma/client"
import { useRecoilState, useRecoilValue } from "recoil"

import { ScrollArea } from "@/components/ui/scroll-area"

import { PromoCard } from "./promo-card"

export function RecentSales({
  promos: pr,
  userRole,
}: {
  userRole: string
  promos: Promo[]
}) {
  const [promos, setPromos] = useRecoilState(promosState)
  useEffect(() => {
    setPromos(pr)
  }, [pr, setPromos])
  return (
    <ScrollArea>
      <div className="lg:max-h-80">
        <div className="flex flex-col items-center gap-2">
          {promos.map((promo) => (
            <PromoCard promo={promo} userRole={userRole} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
