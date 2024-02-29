import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { acceptInvite } from "@/lib/actions/invite.action"
import { getUser } from "@/lib/actions/user.actions"
import About from "@/components/landing/about"
import ContactUs from "@/components/landing/contact-us"
import DetailsSection from "@/components/landing/details-section"
import DisclaimerSection from "@/components/landing/disclaimer-section"
import FAQSection from "@/components/landing/faq-section"
import MainCard from "@/components/landing/main-card"
import PurchaseSection from "@/components/landing/purchase-section"
import ReasonsSection from "@/components/landing/reasons-section"
import ReviewsSection from "@/components/landing/review-section"
import AdvantagesSection from "@/components/landing/advantages-section"

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
    redirect("/teacher/settings")
  }
  // redirect(`/purchase/${courseId}?promo=${searchParams.promo}`)
  return (
    <div className="h-full w-full bg-black">
      {/* <Banner variant="success" label="You already completed this topic." /> */}

      <section className="mt-20 grid w-full items-center ">
        <MainCard />
        <About href={`/purchase/${courseId}?promo=${searchParams.promo}`} />
        <ReasonsSection />
        <AdvantagesSection />
        <div className="w-full bg-black">
          <div className="mx-auto max-w-[80%] bg-black">
            <DetailsSection courseId={courseId} />
          </div>
        </div>
        <ReviewsSection />
        <PurchaseSection />
        <FAQSection />
        <DisclaimerSection />
      </section>
      <ContactUs className="!mt-0 bg-black text-white" />
    </div>
  )
}

export default page
