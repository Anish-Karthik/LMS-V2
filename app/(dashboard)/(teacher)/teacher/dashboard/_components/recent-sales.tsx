"use client"
import { Promo } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PromoCard } from "./promo-card";

export function RecentSales({
  promos,
  userRole,
}: {
  userRole: string;
  promos: Promo[]
}) {
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




