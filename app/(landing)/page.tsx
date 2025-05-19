import Image from "next/image"
import Link from "next/link"
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { Footer } from "@/components/footer"
import { HeroAnimation } from "@/components/hero-animation"
// import { Navbar } from "@/components/navbar"
import { PricingCard } from "@/components/pricing-card"
import { StatsCard } from "@/components/stats-card"
import { TestimonialCard } from "@/components/testimonial-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1.5 text-sm font-medium">
                Next-Gen Learning Management System
              </div>
              <h1 className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
                Transform Your Corporate Training Experience
              </h1>
              <p className="text-xl text-purple-200 md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The all-in-one B2B learning platform that streamlines training,
                enhances engagement, and delivers powerful analytics.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6 text-lg font-medium text-white hover:from-pink-600 hover:to-purple-700">
                    Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full border-purple-500 px-8 py-6 text-lg font-medium text-purple-300 hover:bg-purple-950/30"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <HeroAnimation />
              </div>
              <div className="absolute inset-0 -translate-y-1/2 translate-x-1/4 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pink-600/20 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent md:text-5xl">
              Comprehensive Features for Modern Learning
            </h2>
            <p className="text-lg text-purple-200">
              Everything you need to create, manage, and optimize your corporate
              training programs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-pink-500" />}
              title="Attendance Management"
              description="Track and manage attendance with automated reminders and comprehensive reporting."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-purple-500" />}
              title="Batched Courses"
              description="Organize learners into cohorts with batch-specific content and schedules."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-pink-500" />}
              title="Instructors Management"
              description="Assign, schedule, and evaluate instructors with powerful management tools."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-purple-500" />}
              title="Interactive Quizzes"
              description="Create engaging assessments with various question types and automated grading."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-pink-500" />}
              title="Powerful Analytics"
              description="Gain insights with detailed reports on learner progress and engagement."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-purple-500" />}
              title="Referral System"
              description="Grow your user base with built-in referral tracking and reward mechanisms."
            />
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard number="98%" label="Completion Rate" />
            <StatsCard number="45%" label="Engagement Increase" />
            <StatsCard number="3.5x" label="ROI on Training" />
            <StatsCard number="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent md:text-5xl">
              Trusted by Learning Leaders
            </h2>
            <p className="text-lg text-purple-200">
              See what our customers are saying about our LMS platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="This platform revolutionized how we approach corporate training. The analytics alone saved us countless hours of manual work."
              author="Sarah Johnson"
              role="Head of L&D, TechCorp"
              avatarUrl=""
            />
            <TestimonialCard
              quote="The batch management and instructor scheduling features are game-changers. We've increased our training capacity by 200%."
              author="Michael Chen"
              role="Training Director, Global Finance"
              avatarUrl=""
            />
            <TestimonialCard
              quote="The quiz builder and automated grading have transformed our assessment process. Our team loves the intuitive interface."
              author="Jessica Williams"
              role="Chief Learning Officer, Retail Giant"
              avatarUrl=""
            />
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl"></div>
      </section>

      {/* Pricing Section */}
      <section className="relative border-t border-purple-900/30 py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent md:text-5xl">
              Flexible Pricing for Teams of All Sizes
            </h2>
            <p className="text-lg text-purple-200">
              Choose the plan that fits your organization's needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard
              title="Starter"
              price="$499"
              period="/month"
              description="Perfect for small teams just getting started with structured training."
              features={[
                "Up to 100 active users",
                "Basic attendance tracking",
                "5 instructor accounts",
                "Standard quiz builder",
                "Basic analytics dashboard",
              ]}
              buttonText="Get Started"
              popular={false}
            />
            <PricingCard
              title="Professional"
              price="$999"
              period="/month"
              description="Ideal for growing organizations with comprehensive training needs."
              features={[
                "Up to 500 active users",
                "Advanced attendance management",
                "Unlimited instructor accounts",
                "Advanced quiz builder with custom templates",
                "Comprehensive analytics and reporting",
                "Referral system",
              ]}
              buttonText="Get Started"
              popular={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              period=""
              description="Tailored solutions for large organizations with complex requirements."
              features={[
                "Unlimited users",
                "Full attendance and compliance tracking",
                "Custom integrations",
                "White-labeling options",
                "Dedicated account manager",
                "24/7 priority support",
              ]}
              buttonText="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-8 md:p-12 lg:p-16">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                  Ready to Transform Your Learning Experience?
                </h2>
                <p className="text-lg text-purple-100">
                  Join hundreds of forward-thinking companies already using our
                  platform to elevate their training programs.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="rounded-full bg-white px-8 py-6 text-lg font-medium text-purple-900 hover:bg-purple-100">
                    Schedule a Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white px-8 py-6 text-lg font-medium text-white hover:bg-white/10"
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                {/* <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Platform dashboard preview"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-2xl"
                /> */}
                <div className="absolute inset-0 h-[300px] w-[400px] rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-xl"></div>
                <div className="h-[300px] w-[400px] rounded-xl border border-purple-800/30 bg-purple-800/30 shadow-2xl" />
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-pink-600/30 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-600/30 blur-3xl"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
