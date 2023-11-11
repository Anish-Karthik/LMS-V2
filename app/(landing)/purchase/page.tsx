import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { getCourses } from "@/lib/actions/course.actions"
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

const page = async ({ searchParams }: { searchParams: { promo: string } }) => {
  const courses = await getCourses()
  if (!courses || !courses.length) {
    redirect("/create-course")
  }
  const courseId = courses[0].id
  console.log(searchParams.promo)
  // redirect(`/purchase/${courseId}?promo=${searchParams.promo}`)
  return (
    <div className="w-full">
      {/* <Banner variant="success" label="You already completed this topic." /> */}
      <nav className="flex items-center justify-between bg-transparent p-4">
        <Link href="/" className="flex items-center">
          <div className="relative mr-4 h-8 w-8">
            <Image fill alt="Logo" src="/images/logo.png" />
          </div>
          <div>
            <h1 className={cn("text-2xl font-bold ")}>ALFAQ</h1>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={`/purchase/${courseId}`}>
            <Button variant="outline" className="rounded-full">
              Purchase Now
            </Button>
          </Link>
          {<UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />}
        </div>
      </nav>
      <section className="container my-20 flex flex-col items-center gap-20">
        <MainCard />
        <div className="!max-w-3xl">
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
