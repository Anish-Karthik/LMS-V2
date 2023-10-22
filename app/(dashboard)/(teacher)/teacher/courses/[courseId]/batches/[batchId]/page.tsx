import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { getBatchById, getBatches } from "@/lib/actions/batch.action"
import { getChaptersByBatchId } from "@/lib/actions/chapter.action"
import { getDefaultBatch } from "@/lib/actions/course.actions"
import { db } from "@/lib/db"

import BatchTabs from "./_components/batch-tabs"

const batchTabs = [
  { value: "details", label: "Details", icon: "/assets/edit.svg" },
  // { value: "teachers", label: "Teachers", icon: "/assets/members.svg" },
  { value: "students", label: "Students", icon: "/assets/members.svg" },
]

const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string; batchId: string }
}) => {
  const { userId } = auth()
  const { courseId, batchId } = params
  const defaultBatch = await getDefaultBatch(courseId)
  const currentBatch = await getBatchById(batchId)
  const allBatches = await db.batch.findMany({
    where: { courseId },
    include: { purchases: { include: { user: true } } },
  })
  if (!userId || !defaultBatch || !currentBatch) {
    return redirect("/")
  }
  const initialData = await getChaptersByBatchId(batchId)
  return (
    <BatchTabs
      batchId={batchId}
      courseId={courseId}
      batchTabs={batchTabs}
      initialData={initialData}
      defaultBatch={defaultBatch}
      currentBatch={currentBatch}
      allBatches={allBatches}
    />
  )
}

export default CourseIdPage
