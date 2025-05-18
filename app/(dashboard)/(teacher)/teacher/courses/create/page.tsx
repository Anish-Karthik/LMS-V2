import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { ArrowLeft, IndianRupee, LayoutDashboardIcon } from "lucide-react"

import { getUser } from "@/lib/actions/user.actions"
import { IconBadge } from "@/components/icon-badge"

import CurrentPathNavigator from "../../../../../../components/shared/current-pathname"
import { CreateCourseDescriptionForm } from "./_components/description-form"
import { EmptyBatchesForm } from "./_components/empty-batches-form"
import { CreateCourseImageForm } from "./_components/image-form"
import { CreateCoursePriceForm } from "./_components/price-form"
import { CreateCourseTitleForm } from "./_components/title-form"
import { CreateCourseTypeForm } from "./_components/type-form"

const CreateCoursePage = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const userInfo = await getUser(user.id)
  if (!userInfo || (userInfo.role !== "teacher" && userInfo.role !== "admin")) {
    redirect("/")
  }

  // Create a dummy course object for the form components
  const emptyCourse = {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    type: "batch-based",
    batches: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <>
      <CurrentPathNavigator />
      <div className="p-6">
        <Link
          href="/teacher/courses"
          className="mb-6 flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to courses
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Create a new course</h1>
            <span className="text-primary text-sm">Complete all fields</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboardIcon} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <CreateCourseTitleForm initialData={emptyCourse} />
            <CreateCourseDescriptionForm initialData={emptyCourse} />
            <CreateCourseImageForm initialData={emptyCourse} />
            <CreateCourseTypeForm initialData={emptyCourse} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={IndianRupee} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <CreateCoursePriceForm initialData={emptyCourse} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboardIcon} />
                <h2 className="text-xl">Course batches</h2>
                <span className="text-slate-500 text-sm">
                  (Only for batch-based courses)
                </span>
              </div>
              <EmptyBatchesForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCoursePage
