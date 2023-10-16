"use client"

import React, { useEffect, useState } from "react"
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd"
import { Batch, Purchase, User } from "@prisma/client"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface UsersListProps {
  defaultBatch: Batch & { purchases: (Purchase & { user: User })[] }
  currentBatch: Batch & { purchases: (Purchase & { user: User })[] }
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
}: UsersListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [purchasesDefault, setPurchasesDefault] = useState(
    defaultBatch.purchases
  )
  const [purchasesCurrent, setPurchasesCurrent] = useState(
    currentBatch.purchases
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setPurchasesDefault(defaultBatch.purchases)
  }, [defaultBatch])

  useEffect(() => {
    setPurchasesCurrent(currentBatch.purchases)
  }, [currentBatch])
  if (!isMounted) {
    return null
  }
  const switchItem = (
    source: Purchase[],
    destination: Purchase[],
    result: DropResult
  ) => {
    const items = Array.from(source)
    const [reorderedItem] = items.splice(result.source.index, 1)
    destination.splice(result!.destination!.index, 0, reorderedItem)
  }

  // no reordering and postioning of purchases
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    if (result.source.droppableId === result.destination.droppableId) return

    if (result.source.droppableId === "default") {
      // move data from default list to current list
      // switchItem(purchasesDefault, purchasesCurrent, result);
      const items = Array.from(purchasesDefault)
      const [reorderedItem] = items.splice(result.source.index, 1)
      setPurchasesDefault(items)

      // add data to current list
      const itemsCurrent = Array.from(purchasesCurrent)
      itemsCurrent.push(reorderedItem)
      setPurchasesCurrent(itemsCurrent)

      // update database
      switchBatch(defaultBatch.id, currentBatch.id, reorderedItem.id)
    } else {
      // move data from current list to default list
      const items = Array.from(purchasesCurrent)
      const [reorderedItem] = items.splice(result.source.index, 1)
      setPurchasesCurrent(items)

      // add data to default list
      const itemsDefault = Array.from(purchasesDefault)
      itemsDefault.push(reorderedItem)
      setPurchasesDefault(itemsDefault)

      // update database
      switchBatch(currentBatch.id, defaultBatch.id, reorderedItem.id)
    }
  }
  if (defaultBatch.purchases.length || currentBatch.purchases.length)
    return (
      // create a code to drap and drop purchases from and to the default batch and the current batch

      // on left side, show the default batch
      // on right side, show the current batch
      // show the purchases in both batches
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-x-2">
          <Droppable droppableId="default">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="border-2 border-secondary"
              >
                {purchasesDefault.map((purchase, index) => (
                  <Draggable
                    key={purchase.id}
                    draggableId={purchase.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "flex items-center justify-between gap-x-2 rounded-md bg-slate-500/20 p-2",
                          "hover:bg-slate-500/40",
                          "transition-colors duration-200",
                          "cursor-move"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <GripVertical className="h-5 w-5 text-sky-700" />
                          <div>
                            <h3 className="text-sm font-semibold">
                              {purchase.user.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {purchase.user.email}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button variant="default" className="px-2 py-1">
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="current">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="border-2 border-secondary"
              >
                {purchasesCurrent.map((purchase, index) => (
                  <Draggable
                    key={purchase.id}
                    draggableId={purchase.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "flex items-center justify-between gap-x-2 rounded-md bg-sky-500/20 p-2",
                          "hover:bg-sky-500/40",
                          "transition-colors duration-200",
                          "cursor-move"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <GripVertical className="h-5 w-5 text-sky-700" />
                          <div>
                            <h3 className="text-sm font-semibold">
                              {purchase.user.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {purchase.user.email}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button variant="default" className="px-2 py-1">
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    )
  return (
    <div className="flex h-64 items-center justify-center">
      <p className="text-xl text-slate-500">
        No purchases found in unassigned batch and current batch
      </p>
    </div>
  )
}

export default UsersList
