
import { Banner } from '@/components/banner'
import { IconBadge } from '@/components/icon-badge'
import { getAnnouncementByid } from '@/lib/actions/announcement.action'
import { getBatches } from '@/lib/actions/batch.action'
import { getCourses } from '@/lib/actions/course.actions'
import { FileIcon, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CurrentPathNavigator from '../../../_components/current-pathname'


import { ArrowLeft } from 'lucide-react'
import { AnnouncementDescriptionForm } from '../_components/topic-description-form'
import { AnnouncementTitleForm } from '../_components/topic-title-form'
import { AttachmentForm } from '../_components/attachment-form'
import { AnnouncementActions } from '../_components/topic-actions'


const CreateAnnoucement = async ({
  params,
  searchParams,
}:{
  params: { announcementId: string },
  searchParams: { [key: string]: string },
}) => {

  const announcement = await getAnnouncementByid(params.announcementId);
  const course = (await getCourses())![0];
  const batches = await getBatches(searchParams.courseId || course.id);

  const requiredFields = [announcement.title, announcement.description]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <div>
      <CurrentPathNavigator />
      {!announcement.isPublished && (
        <Banner
          variant="warning"
          label="This announcement is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/announcements`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Annoucements
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">announcement Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <AnnouncementActions
                disabled={!isComplete}
                batchId={searchParams.batchId}
                announcementId={params.announcementId}
                courseId={searchParams.courseId}
                isPublished={announcement.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Create your Annoucement</h2>
              </div>
              <AnnouncementTitleForm
                initialData={announcement}
              />
              <AnnouncementDescriptionForm
                initialData={announcement}
              />
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FileIcon} />
                <h2 className="text-xl">Resources & Attachments {"(Optional)"}</h2>
              </div>
              <AttachmentForm
                initialData={announcement}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FileIcon} />
                <h2 className="text-xl">Resources & Attachments {"(Optional)"}</h2>
              </div>
              <AttachmentForm
                initialData={announcement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAnnoucement