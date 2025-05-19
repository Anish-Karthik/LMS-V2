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
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1.5 text-sm font-medium">
                Next-Gen Learning Management System
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400">
                Transform Your Corporate Training Experience
              </h1>
              <p className="text-xl text-purple-200 md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The all-in-one B2B learning platform that streamlines training,
                enhances engagement, and delivers powerful analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg font-medium">
                    Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-950/30 rounded-full px-8 py-6 text-lg font-medium"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <HeroAnimation />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-3xl rounded-full transform -translate-y-1/2 translate-x-1/4 opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
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
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
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
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
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
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 relative border-t border-purple-900/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
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
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-8 md:p-12 lg:p-16">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                  Ready to Transform Your Learning Experience?
                </h2>
                <p className="text-lg text-purple-100">
                  Join hundreds of forward-thinking companies already using our
                  platform to elevate their training programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-purple-900 hover:bg-purple-100 rounded-full px-8 py-6 text-lg font-medium">
                    Schedule a Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium"
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-xl rounded-xl h-[300px] w-[400px]"></div>
                <div className="w-[400px] h-[300px] bg-purple-800/30 rounded-xl shadow-2xl border border-purple-800/30" />
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/30 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/30 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
