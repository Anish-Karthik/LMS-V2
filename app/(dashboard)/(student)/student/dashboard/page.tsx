import React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"

import {
  createOrUpdatePromo,
  isUniquePromoCode,
} from "@/lib/actions/promo.action"
import { db } from "@/lib/db"
import { randomString } from "@/lib/format"
import { Separator } from "@/components/ui/separator"
import CourseDetailCard from "@/components/card/course-detail-card"
import AnnouncementMiniCard from "@/components/shared/announcement-mini-card"
import { serverClient } from "@/app/_trpc/serverClient"

import { StudentAnalyticsDashboard } from "./_components/student-analytics-dashboard"

const ReferralCard = dynamic(() => import("@/components/card/referral-card"), {
  ssr: false,
})

const page = async () => {
  const user = await currentUser()
  const userInfo = await db.user.findUnique({
    where: {
      userId: user!.id,
    },
  })
  const promoCode = await db.promo.findFirst({
    where: {
      userObjId: userInfo!.id,
    },
  })

  if (!promoCode) {
    let promoCode = randomString(12)
    while (!(await isUniquePromoCode(promoCode))) {
      promoCode = randomString(12)
    }
    await createOrUpdatePromo({
      userId: user!.id,
      code: promoCode,
      discount: 10,
      referralBonus: 100,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
  }

  // Get purchased courses with analytics data
  const coursesWithAnalytics = await serverClient.user.getAllCourseAnalytics(
    user!.id
  )

  const userPurchasedCourses = await serverClient.user.purchasedCourses(
    user!.id
  )
  const userProgression = await Promise.all(
    userPurchasedCourses?.map(
      async (course) =>
        await serverClient.user.calculateCourseProgress({
          userId: user!.id,
          courseId: course.id,
        })
    )
  )
  const announcements = await db.announcement.findMany({
    where: {
      AND: [
        {
          isPublished: true,
        },
        {
          OR: [
            {
              courseId: {
                in: userPurchasedCourses?.map((course) => course.id),
              },
            },
            {
              type: "general",
            },
          ],
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })
  return (
    <section className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Welcome back {userInfo?.name}</h1>
        <p className="text-pink-color">You can access your courses here.</p>
      </div>

      {/* Analytics Dashboard */}
      <div className="w-full">
        <StudentAnalyticsDashboard courses={coursesWithAnalytics} />
      </div>

      <Separator className="my-4" />

      {/* Courses List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userPurchasedCourses.map((course, i) => (
          <Link href={`/student/courses/${course.id}`} key={course.id}>
            <CourseDetailCard
              course={course}
              userProgression={userProgression[i]}
            />
          </Link>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Announcements */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Recent Announcements</h2>
        <AnnouncementMiniCard announcements={announcements} />
      </div>
    </section>
  )
}

export default page
