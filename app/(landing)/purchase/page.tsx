import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserButton, currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { acceptInvite } from "@/lib/actions/invite.action"
import { getUser } from "@/lib/actions/user.actions"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Banner } from "@/components/banner"
import ContactUs from "@/components/landing/contact-us"
import DetailsSection from "@/components/landing/details-section"
import DisclaimerSection from "@/components/landing/disclaimer-section"
import FAQSection from "@/components/landing/faq-section"
import MainCard from "@/components/landing/main-card"
import ReviewsSection from "@/components/landing/review-section"
import SyllabusSection from "@/components/landing/syllabus-section"
import { ThemeToggle } from "@/components/theme-toggle"

const page = async ({
  searchParams,
}: {
  searchParams: { promo: string; invite: string }
}) => {
  const courses = await getCourses()
  if (!courses || !courses.length) {
    redirect("/create-course")
  }
  const user = await currentUser()
  const searchParamsPromo = searchParams.promo
    ? `promo=${searchParams.promo}`
    : ""
  const searchParamsInvite = searchParams.invite
    ? `invite=${searchParams.invite}`
    : ""
  const searchParamsUrl = `${searchParamsPromo}&${searchParamsInvite}`

  const courseId = courses[0].id
  console.log(searchParams.promo)
  if (searchParams.invite && user) {
    const userInfo = await getUser(user.id)
    await acceptInvite(searchParams.invite, user.id)
    redirect("teacher/settings")
  }
  // redirect(`/purchase/${courseId}?promo=${searchParams.promo}`)
  return (
    <div className="w-full">
      {/* <Banner variant="success" label="You already completed this topic." /> */}
      <section className="container my-20 flex flex-col items-center gap-20">
        <MainCard />
        <div className="flex !max-w-3xl flex-col items-center gap-20">
          <DetailsSection />
          <ReviewsSection />
          <SyllabusSection
            url={`/purchase/${courseId}?promo=${searchParams.promo}`}
          />
        </div>
        <FAQSection />
        <DisclaimerSection />
      </section>
      <ContactUs />
    </div>
  )
}

export default page
