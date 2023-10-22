import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import ProfilePage from "@/components/shared/profile-page"

export default async function SettingsProfilePage() {
  const user = await currentUser()
  const userInfo = await db.user.findUnique({
    where: {
      userId: user!.id,
    },
  })

  if (!userInfo || !user || !["teacher", "admin"].includes(userInfo.role))
    redirect("/")
  const promoCode = await db.promo.findFirst({
    where: {
      userObjId: userInfo!.id,
    },
  })

  return (
    <div className="space-y-6">
      <ProfilePage userInfo={userInfo!} promo={promoCode} />
    </div>
  )
}
