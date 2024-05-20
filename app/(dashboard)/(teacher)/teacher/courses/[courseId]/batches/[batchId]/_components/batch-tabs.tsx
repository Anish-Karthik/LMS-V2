"use client"

import Image from "next/image"
import { Chapter, Topic } from "@prisma/client"
import { ListChecks } from "lucide-react"

import { ComplexBatch } from "@/types/nav"
import { swapUserBatch } from "@/lib/actions/batch.action"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconBadge } from "@/components/icon-badge"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import BatchEditForm from "./batch-edit-form"
import { ChaptersForm } from "./chapters-form"
import UsersList from "./users-list"

const BatchTabs = ({
  batchTabs,
  initialData,
  batchId,
  courseId,
  defaultBatch,
  currentBatch,
  allBatches,
}: {
  batchTabs: {
    value: string
    label: string
    icon: any
  }[]
  allBatches: ComplexBatch[]
  initialData: (Chapter & { topics: Topic[] })[]
  batchId: string
  courseId: string
  defaultBatch: ComplexBatch
  currentBatch: ComplexBatch
}) => {
  return (
    <Tabs defaultValue={`${batchTabs[0].value}`} className="w-full">
      <TabsList className="tab">
        {batchTabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.value} className="tab">
            <Image
              src={tab.icon}
              alt={tab.label}
              width={24}
              height={24}
              className="object-contain"
            />
            <p className="max-sm:hidden">{tab.label}</p>

            {/* <p className='bg-light-4 !text-tiny-medium text-light-2 ml-1 rounded-sm px-2 py-1'>{userInfo[tab.value]?.length}</p> */}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        key={batchTabs[0].label}
        value={batchTabs[0].value}
        className="mx-auto w-full px-2"
      >
        <div>
          <CurrentPathNavigator className="-ml-0 mb-2" />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <BatchEditForm batch={currentBatch} courseId={courseId} />
            </div>
            <div>
              <div className="mt-2 flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm
                initialData={initialData}
                batchId={batchId}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        key={batchTabs[1].label}
        value={batchTabs[1].value}
        className="mx-auto w-full max-w-[76rem] px-2"
      >
        <CurrentPathNavigator className="-ml-0 mb-2" />
        <UsersList
          defaultBatch={defaultBatch}
          currentBatch={currentBatch}
          switchBatch={swapUserBatch}
          allBatches={allBatches}
        />
      </TabsContent>
    </Tabs>
  )
}

export default BatchTabs
