
import { getBatches } from '@/lib/actions/batch.action'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({
  params
}: {
  params: { courseId: string }

}) => {
  const batch = await getBatches(params.courseId);
  if (!batch || batch.length === 0) redirect(`/teacher/courses/${params.courseId}`)
  redirect(`/teacher/courses/${params.courseId}/batches/${batch[0].id}`)
  return (
    <div>page</div>
  )
}

export default page