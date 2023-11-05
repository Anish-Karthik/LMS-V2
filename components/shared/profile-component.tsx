import React from "react"
import Image from "next/image"
import { Promo, User } from "@prisma/client"

import { formatPrice } from "@/lib/format"
import { Separator } from "@/components/ui/separator"

import ReferralCard from "../card/referral-card"

const ProfileComponent = ({
  userInfo,
  promo,
}: {
  userInfo: User
  promo: Promo | null
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 ">
      <div className="mx-auto flex w-full items-center justify-evenly gap-5 max-md:flex-col">
        <Image
          src={userInfo.image!}
          alt="avatar"
          width={200}
          height={200}
          className="rounded-full"
        />
        <ReferralCard
          promo={promo}
          referralBonus={10}
          coins={userInfo.referralBonus}
          referralCount={userInfo.referralCount}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Name</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.name}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Email</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.email}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Phone</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.phoneNo}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Country</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo?.country}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>State</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo?.state}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>City</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo?.city}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Gender</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo?.gender}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Role</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.role}</p>
        </div>
      </div>
      {/* <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Referral Count</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.referralCount}</p>
        </div>
      </div> */}
      {/* <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Referral Balance</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{userInfo.referralBonus}</p>
        </div>
      </div>
      <Separator /> */}
      {/* <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Referral Bonus</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{formatPrice(100)}</p>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p>Referral Code</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">{promo?.code}</p>
        </div>
      </div> */}
      {/* <Separator /> */}

      <Separator />
    </div>
  )
}

export default ProfileComponent
