"use client"

import { useState } from "react"
import { promosState } from "@/store/atoms"
import { Promo } from "@prisma/client"
import { Copy, Edit, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useSetRecoilState } from "recoil"

import { formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { toast as shadcnToast } from "@/components/ui/use-toast"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { trpc } from "@/app/_trpc/client"

import { PromoForm } from "./promo-form"

export function PromoCard({
  promo,
  userRole,
}: {
  userRole: string
  promo: Promo
}) {
  const setPromos = useSetRecoilState(promosState)
  const [isCreating, setIsCreating] = useState(false)
  const deletePromo = trpc.promo.delete.useMutation()
  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code)
    shadcnToast({ title: `${promo.code} Copied to clipboard` })
  }

  const handleDelete = () => {
    deletePromo.mutateAsync(promo.id)
    setPromos((promos) => promos.filter((p) => p.id !== promo.id))
    toast.success("Promo deleted successfully")
  }

  return (
    <>
      {isCreating ? (
        <div className="border-secondary w-full rounded-md border-2 border-solid p-2">
          <PromoForm
            id={promo.id}
            code={promo.code}
            discount={promo.discount}
            expiresAt={promo.expiresAt || undefined}
            type="edit"
            setIsCreating={setIsCreating}
          />
        </div>
      ) : (
        <div className="max-xs:flex-col max-xs:items-start flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium max-sm:text-sm">
                {promo.code}
              </h3>
              <span className="text-sm text-slate-500 max-sm:text-xs">
                {promo.discount}% off
              </span>
            </div>
          </div>
          <div className="max-xs:!w-full max-xs:justify-between flex items-center gap-1">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 max-sm:text-xs">
                {" "}
                {promo.expiresAt
                  ? `Valid till ${formatDate(promo.expiresAt)}`
                  : "No expiry"}
              </span>
              <span className="text-sm text-slate-500 max-sm:text-xs">
                Used {promo.count} times
              </span>
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
              {userRole === "admin" && (
                <ConfirmModal
                  typeDelete={userRole === "admin"}
                  onConfirm={handleDelete}
                >
                  <Button variant="destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </ConfirmModal>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
