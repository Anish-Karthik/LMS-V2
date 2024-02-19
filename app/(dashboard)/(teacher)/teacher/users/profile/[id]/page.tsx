import React from "react"

import {
  createOrUpdatePromo,
  isUniquePromoCode,
} from "@/lib/actions/promo.action"
import { db } from "@/lib/db"
import { randomString } from "@/lib/format"
import ProfilePage from "@/components/shared/profile-page"

const page = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const userInfo = await db.user.findUnique({
    where: {
      id: params?.id,
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
      userId: userInfo!.userId,
      code: promoCode,
      discount: 10,
      referralBonus: 100,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
  }
  return (
    <div className="space-y-6">
      <ProfilePage userInfo={userInfo!} promo={promoCode} />
    </div>
  )
}

export default page
