import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser } from "@/lib/actions/user.actions"
import { OnboardingType } from "@/lib/utils"

import TypeForm from "./_components/typeform"

const page = async ({
  searchParams,
}: {
  searchParams: { promo: string; invite: string }
}) => {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }
  const userInfo = await getUser(user.id)
  const isPurchased =
    !!userInfo?.purchases?.length || userInfo?.role === "student" || false
  const isAdmin = ["teacher", "admin"].includes(userInfo?.role || "")
  if (isPurchased) {
    redirect("/student/courses")
  }
  if (isAdmin) {
    redirect("/teacher/dashboard")
  }
  if (userInfo) {
    redirect("/purchase")
  }
  const initialData: OnboardingType = {
    name: "",
    email: user.emailAddresses[0]?.emailAddress || "",
    phoneNo: user.phoneNumbers[0]?.phoneNumber || "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    employmentStatus: "",
    howDidHear: "",
    ICountry: null,
    IState: null,
    ICity: null,
    image: user.imageUrl || "",
    userId: user.id,
  }
  return <TypeForm initialData={initialData} promo={searchParams.promo} />
}

export default page
