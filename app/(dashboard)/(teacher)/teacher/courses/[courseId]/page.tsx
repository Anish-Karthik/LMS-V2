import { currentUser } from "@clerk/nextjs"
import {
  IndianRupee,
  LayoutDashboardIcon,
  ListChecksIcon,
  Settings,
} from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { getUser } from "@/lib/actions/user.actions"
import { IconBadge } from "@/components/icon-badge"

import CurrentPathNavigator from "../../../../../../components/shared/current-pathname"
import { BatchesForm } from "./_components/batches-form"
import { DeleteCourseButton } from "./_components/delete-course"
import { DescriptionForm } from "./_components/description-form"
import { ImageForm } from "./_components/image-form"
import { PriceForm } from "./_components/price-form"
import { PublishButton } from "./_components/publish-button"
import { TitleForm } from "./_components/title-form"
import { TypeForm } from "./_components/type-form"

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourseById(params?.courseId)
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  const isTeacher = userInfo!.role === "teacher"
  if (!course) return <div>Course not found</div>
  return (
    <>
      <CurrentPathNavigator />
      <div className="h-full p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Course Details
              {!course.isPublished && (
                <span className="ml-2 text-sm bg-slate-200 px-2 py-1 rounded-md text-slate-700">
                  Draft
                </span>
              )}
            </h1>
            <span className="text-primary text-sm">
              {!isTeacher ? "Complete all fields" : "Manage your course"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PublishButton initialData={course} courseId={course.id} />
            <DeleteCourseButton courseId={course.id} />
          </div>
        </div>
        {isTeacher ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Settings} />
                <h2 className="text-xl">Course Type</h2>
              </div>
              <TypeForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecksIcon} />
                <h2 className="text-xl">Course batches</h2>
              </div>
              <BatchesForm initialData={course} courseId={course.id} />
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboardIcon} />
                <h2 className="text-xl">Customize your course</h2>
              </div>
              <TitleForm initialData={course} courseId={course.id} />
              <DescriptionForm initialData={course} courseId={course.id} />
              <ImageForm initialData={course} courseId={course.id} />
              <TypeForm initialData={course} courseId={course.id} />
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
        )}
      </div>
    </>
  )
}

export default page
