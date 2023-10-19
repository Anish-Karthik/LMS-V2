import { IndianRupee, LayoutDashboardIcon, ListChecksIcon } from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { IconBadge } from "@/components/icon-badge"

import CurrentPathNavigator from "../../../_components/current-pathname"
import { BatchesForm } from "./_components/batches-form"
import { DescriptionForm } from "./_components/description-form"
import { ImageForm } from "./_components/image-form"
import { PriceForm } from "./_components/price-form"
import { TitleForm } from "./_components/title-form"

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourseById(params.courseId)
  if (!course) return <div>Course not found</div>
  return (
    <>
      <CurrentPathNavigator />
      <div className="h-full p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Details</h1>
            <span className="text-sm text-primary">Complete all fields</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboardIcon} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecksIcon} />
                <h2 className="text-xl">Course batches</h2>
              </div>
              <BatchesForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={IndianRupee} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
