import { IconBadge } from '@/components/icon-badge'
import { DollarSign, File, LayoutDashboardIcon, ListChecksIcon } from 'lucide-react'
import React from 'react'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import { getCourseById } from '@/lib/actions/course.actions'
import { PriceForm } from './_components/price-form'
import { ChaptersForm } from './_components/chapters-form'
import { BatchesForm } from './_components/batches-form'

const page = async ({ params }: { params: {courseId: string } }) => {
  const course = await getCourseById(params.courseId);
  if(!course) return <div>Course not found</div>
  return (
    <div className='p-6 h-full'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
            Course Details
          </h1>
          <span className='text-sm text-primary' >Complete all fields</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboardIcon} />
              <h2 className="text-xl">
                Customize your course
              </h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
          {/* <ImageForm
            initialData={course}
            courseId={course.id}
          /> */}
          <div>
            {/* <div className="flex items-center gap-x-2">
              <IconBadge icon={DollarSign} />
              <h2 className="text-xl">
                Sell your course
              </h2>
            </div> */}
            <PriceForm
              initialData={course}
              courseId={course.id}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecksIcon} />
              <h2 className="text-xl">
                Course batches
              </h2>
            </div>
            <BatchesForm
              initialData={course}
              courseId={course.id}
            />
          </div>
          {/* <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">
                Resources & Attachments
              </h2>
            </div>
            <AttachmentForm
              initialData={course}
              courseId={course.id}
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default page