import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"

import ProfilePage from "./components/profile-page"

export default async function SettingsProfilePage() {
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
  return (
    <div className="space-y-6">
      {/* <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div> */}
      {/* <Separator /> */}
      <ProfilePage userInfo={userInfo!} promo={promoCode} />
    </div>
  )
}
