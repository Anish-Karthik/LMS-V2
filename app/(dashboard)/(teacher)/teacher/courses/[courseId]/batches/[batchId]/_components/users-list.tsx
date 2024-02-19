"use client"

import { useState } from "react"
import { Batch, Purchase } from "@prisma/client"
// replace with your button component library
import cn from "classnames"
import { ListChecks } from "lucide-react"

import { ComplexBatch } from "@/types/nav"
import { switchManyUserBatches } from "@/lib/actions/server/batch.server.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

interface UsersListProps {
  allBatches: ComplexBatch[]
  defaultBatch: ComplexBatch
  currentBatch: ComplexBatch
  switchBatch: (
    prevbatchId: string,
    newbatchId: string,
    swappedPurchaseId: string
  ) => void
}
const UsersList = ({
  defaultBatch,
  currentBatch,
  switchBatch,
  allBatches,
}: UsersListProps) => {
  const [leftBatch, setLeftBatch] = useState<ComplexBatch>(defaultBatch)
  const [rightBatch, setRightBatch] = useState<ComplexBatch>(currentBatch)
  const [selectedLeftPurchases, setSelectedLeftPurchases] = useState<
    Purchase[]
  >([])
  const [selectedRightPurchases, setSelectedRightPurchases] = useState<
    Purchase[]
  >([])
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSelectRight = (batch: Batch, purchase: Purchase) => {
    const newSelectedRightPurchases = [...selectedRightPurchases]
    const index = newSelectedRightPurchases.findIndex(
      (p) => p.id === purchase.id
    )
    if (index === -1) {
      newSelectedRightPurchases.push(purchase)
    } else {
      newSelectedRightPurchases.splice(index, 1)
    }
    setSelectedRightPurchases(newSelectedRightPurchases)
  }

  const handleSelectLeft = (batch: Batch, purchase: Purchase) => {
    const newSelectedLeftPurchases = [...selectedLeftPurchases]
    const index = newSelectedLeftPurchases.findIndex(
      (p) => p.id === purchase.id
    )
    if (index === -1) {
      newSelectedLeftPurchases.push(purchase)
    } else {
      newSelectedLeftPurchases.splice(index, 1)
    }
    setSelectedLeftPurchases(newSelectedLeftPurchases)
  }

  const handleMoveRight = async () => {
    setIsUpdating(true)
    const { batch1, batch2 } = await switchManyUserBatches(
      leftBatch.id,
      rightBatch.id,
      selectedLeftPurchases.map((p) => p.id)
    )

    setLeftBatch(batch1)
    setRightBatch(batch2)
    setSelectedLeftPurchases([])
    setIsUpdating(false)
  }

  const handleMoveLeft = async () => {
    setIsUpdating(true)
    const { batch1, batch2 } = await switchManyUserBatches(
      rightBatch.id,
      leftBatch.id,
      selectedRightPurchases.map((p) => p.id)
    )
    setLeftBatch(batch2)
    setRightBatch(batch1)
    setSelectedRightPurchases([])
    setIsUpdating(false)
  }

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-x-2 sm:grid-cols-2">
        <div className="border-secondary relative border-2">
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-500/50">
              <div className="h-12 w-12 animate-spin rounded-full border-y-2 border-gray-100"></div>
            </div>
          )}

          <div className="flex items-center justify-between gap-x-2 rounded-md bg-slate-500/20 p-2">
            <Select
              value={leftBatch.id}
              onValueChange={(value) => {
                const batch = allBatches.find((b) => b.id === value)
                setLeftBatch(batch!)
              }}
            >
              <SelectTrigger className="relative flex items-center gap-x-2">
                <h3 className="text-sm font-semibold">{leftBatch.name}</h3>
                <ListChecks
                  size={20}
                  className="bg-background absolute right-3 z-50"
                />
              </SelectTrigger>
              <SelectContent>
                {allBatches.map(
                  (batch) =>
                    rightBatch.id != batch.id && (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          </div>
          {leftBatch.purchases.length ? (
            <div className="flex flex-col gap-y-2 p-2">
              {leftBatch.purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className={cn(
                    "flex items-center justify-between gap-x-2 rounded-md bg-slate-500/20 p-2",
                    "hover:bg-slate-500/40",
                    "transition-colors duration-200",
                    "cursor-pointer",
                    selectedLeftPurchases.some((p) => p.id === purchase.id) &&
                      "bg-slate-500/40"
                  )}
                  onClick={() => handleSelectLeft(leftBatch, purchase)}
                >
                  <div className="flex items-center gap-x-2">
                    <Input
                      type="checkbox"
                      checked={selectedLeftPurchases.some(
                        (p) => p.id === purchase.id
                      )}
                      onChange={() => handleSelectLeft(leftBatch, purchase)}
                    />
                    <div>
                      <h3 className="text-sm font-semibold">
                        {purchase.user.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {purchase.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <p className="text-xs text-slate-500">
                No purchases found in {leftBatch.name} batch
              </p>
            </div>
          )}
        </div>
        <div className="border-secondary relative border-2">
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-500/50">
              <div className="h-12 w-12 animate-spin rounded-full border-y-2 border-sky-500"></div>
            </div>
          )}
          <div className="flex items-center justify-between gap-x-2 rounded-md bg-sky-500/20 p-2">
            <Select
              value={rightBatch.id}
              onValueChange={(value) => {
                const batch = allBatches.find((b) => b.id === value)
                setRightBatch(batch!)
              }}
            >
              <SelectTrigger className="relative flex items-center gap-x-2">
                <h3 className="text-sm font-semibold">{rightBatch.name}</h3>
                <ListChecks
                  size={20}
                  className="bg-background absolute right-3 z-50"
                />
              </SelectTrigger>
              <SelectContent>
                {allBatches.map(
                  (batch) =>
                    leftBatch.id != batch.id && (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          </div>
          {rightBatch.purchases.length ? (
            <div className="flex flex-col gap-y-2 p-2">
              {rightBatch.purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className={cn(
                    "flex items-center justify-between gap-x-2 rounded-md bg-sky-500/20 p-2",
                    "hover:bg-sky-500/40",
                    "transition-colors duration-200",
                    "cursor-pointer",
                    selectedRightPurchases.some((p) => p.id === purchase.id) &&
                      "bg-sky-500/40"
                  )}
                  onClick={() => handleSelectRight(rightBatch, purchase)}
                >
                  <div className="flex items-center gap-x-2">
                    <Input
                      type="checkbox"
                      checked={selectedRightPurchases.some(
                        (p) => p.id === purchase.id
                      )}
                      onChange={() => handleSelectRight(rightBatch, purchase)}
                    />
                    <div>
                      <h3 className="text-sm font-semibold">
                        {purchase.user.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {purchase.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <p className="text-xs text-slate-500">
                No purchases found in {rightBatch.name} batch
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          variant="default"
          className="px-2 py-1"
          onClick={handleMoveRight}
        >
          Move to&nbsp;
          <span className="text-orange-700">{rightBatch.name}</span>
        </Button>
        <Button
          variant="default"
          className="px-2 py-1"
          onClick={handleMoveLeft}
        >
          Move to&nbsp;<span className="text-sky-700">{leftBatch.name}</span>
        </Button>
      </div>
    </>
  )
}

export default UsersList
