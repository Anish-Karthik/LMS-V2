import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Layers,
  Shield,
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

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="from-primary-50 relative overflow-hidden bg-gradient-to-b to-white py-20">
        <div className="bg-grid-black/5 absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Empower your <span className="text-primary">organization</span>{" "}
                with modern learning
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600">
                A comprehensive learning management system designed for
                businesses that want to train employees, partners, and customers
                with ease.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/purchase">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg shadow-2xl lg:h-[500px]">
              <Image
                src="/placeholder-platform.jpg"
                alt="LMS Platform Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything you need for effective training
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Our comprehensive platform provides all the tools to create,
              deliver, and track learning across your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Course Management
              </h3>
              <p className="text-slate-600">
                Create and organize courses with rich multimedia content,
                quizzes, assignments, and live sessions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                User Management
              </h3>
              <p className="text-slate-600">
                Manage users, teams, and permissions with ease. Create custom
                roles and learning paths.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Advanced Analytics
              </h3>
              <p className="text-slate-600">
                Track progress and engagement with detailed analytics and
                customizable reporting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Interactive Learning
              </h3>
              <p className="text-slate-600">
                Engage learners with interactive content, quizzes, discussions,
                and live sessions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Certifications
              </h3>
              <p className="text-slate-600">
                Create and award certificates automatically upon course
                completion to recognize achievements.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Enterprise Security
              </h3>
              <p className="text-slate-600">
                Enterprise-grade security with SSO integration, data encryption,
                and compliance features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-slate-900">
            Trusted by leading organizations
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mb-6 text-slate-700">
                &quot;This platform has transformed our training program.
                We&apos;ve seen a 45% increase in course completion rates and
                significantly improved employee engagement.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Jane Doe</p>
                  <p className="text-sm text-slate-600">
                    Head of Learning, Enterprise Co.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mb-6 text-slate-700">
                &quot;The analytics and reporting features have been invaluable
                for tracking our compliance training. Setup was easy and the
                support team has been exceptional.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600">
                  RS
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Robert Smith</p>
                  <p className="text-sm text-slate-600">
                    Training Director, Global Services
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mb-6 text-slate-700">
                &quot;We&apos;ve been able to scale our customer education
                program with minimal resources. The self-paced and batch-based
                course options give us the flexibility we need.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600">
                  AJ
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Amy Johnson</p>
                  <p className="text-sm text-slate-600">
                    Customer Success, Tech Innovators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to transform your organization&apos;s learning?
          </h2>
          <p className="text-primary-50 mx-auto mb-10 max-w-3xl text-xl">
            Join thousands of businesses that are improving training outcomes
            with our platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/purchase">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-primary-700 border-white bg-transparent text-white"
              asChild
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why choose our LMS platform?
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              A complete solution that grows with your organization&apos;s
              learning needs
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Scalable Solution
                </h3>
                <p className="text-slate-600">
                  Our platform scales from small teams to enterprise
                  organizations with thousands of learners.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Custom Branding
                </h3>
                <p className="text-slate-600">
                  White-label the platform with your organization&apos;s
                  branding and domain.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Integration Ready
                </h3>
                <p className="text-slate-600">
                  Seamlessly integrate with your existing tools via our API and
                  pre-built connectors.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Mobile Friendly
                </h3>
                <p className="text-slate-600">
                  Deliver learning experiences that work on any device with our
                  responsive design.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Dedicated Support
                </h3>
                <p className="text-slate-600">
                  Get support from our team of learning experts to maximize your
                  platform usage.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Regular Updates
                </h3>
                <p className="text-slate-600">
                  Benefit from continuous improvement with regular feature
                  updates and enhancements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
