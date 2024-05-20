import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
import { acceptInvite } from "@/lib/actions/invite.action"
import { WavyBackground } from "@/components/animation/wavy-background"
import About from "@/app/(landing)/_components/landing/about"
import AdvantagesSection from "@/app/(landing)/_components/landing/advantages-section"
import ContactUs from "@/app/(landing)/_components/landing/contact-us"
import DetailsSection from "@/app/(landing)/_components/landing/details-section"
import DisclaimerSection from "@/app/(landing)/_components/landing/disclaimer-section"
import FAQSection from "@/app/(landing)/_components/landing/faq-section"
import MainCard from "@/app/(landing)/_components/landing/main-card"
import PurchaseSection from "@/app/(landing)/_components/landing/purchase-section"
import ReasonsSection from "@/app/(landing)/_components/landing/reasons-section"
import ReviewsSection from "@/app/(landing)/_components/landing/review-section"

import PoliciesFooter from "../_components/landing/policies-footer"

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
    await acceptInvite(searchParams.invite, user.id)
    redirect("/teacher/settings")
  }
  // redirect(`/purchase/${courseId}?promo=${searchParams.promo}`)
  return (
    <div className="h-full w-full bg-black">
      {/* <Banner variant="success" label="You already completed this topic." /> */}

      <section className="mt-20 grid w-full items-center ">
        <WavyBackground
          containerClassName="flex w-full flex-col items-center gap-8 bg-transparent px-4 py-24"
          blur={15}
        >
          <MainCard />
        </WavyBackground>
        <About href={`/purchase/${courseId}?${searchParamsUrl}`} />
        <ReasonsSection />
        <AdvantagesSection />
        <DetailsSection href={`/purchase/${courseId}?${searchParamsUrl}`} />
        <ReviewsSection />
        <PurchaseSection courseId={courseId} searchUrl={searchParamsUrl} />
        <FAQSection />
        <DisclaimerSection />
      </section>
      <ContactUs className="!mt-0 bg-black text-white" />
      <PoliciesFooter className="!-mt-10 bg-black text-white" />
    </div>
  )
}

export default page
