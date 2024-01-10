import React from "react"
import dynamic from "next/dynamic"
import { currentUser } from "@clerk/nextjs"

import {
  createOrUpdatePromo,
  isUniquePromoCode,
} from "@/lib/actions/promo.action"
import { db } from "@/lib/db"
import { randomString } from "@/lib/format"
import CourseDetailCard from "@/components/card/course-detail-card"
import AnnouncementMiniCard from "@/components/shared/announcement-mini-card"
import { serverClient } from "@/app/_trpc/serverClient"

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
    <section className="flex justify-center p-4 max-sm:flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Welcome back {userInfo?.name}</h1>
          <p className="text-text-secondary">
            You can access all your courses here.
          </p>
        </div>
        <CourseDetailCard
          courses={userPurchasedCourses || []}
          userProgression={userProgression}
        />
      </div>
      <div className="flex flex-col">
        <AnnouncementMiniCard announcements={announcements} />
        <div className="flex flex-col gap-1 px-4">
          <h1 className="text-2xl font-bold">Refer your Friend</h1>
          <ReferralCard
            promo={promoCode}
            referralBonus={10}
            coins={userInfo!.referralBonus}
            referralCount={userInfo!.referralCount}
          />
        </div>
      </div>
    </section>
  )
}

export default page
