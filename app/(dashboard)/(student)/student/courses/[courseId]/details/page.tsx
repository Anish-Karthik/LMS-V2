import Image from "next/image"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { BookOpen, CalendarDays, Clock, Users } from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { db } from "@/lib/db"
import { formatPrice } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import CourseReviews from "../_components/course-reviews"
import CourseTestimonial from "../_components/course-testimonial"

const CourseDetailsPage = async ({
  params,
}: {
  params: { courseId: string }
}) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  // Get the course to check it exists
  const course = await getCourseById(params.courseId)
  if (!course) redirect("/student/courses")

  // Check if the user has purchased this course
  const userPurchase = await db.purchase.findFirst({
    where: {
      userId: user.id,
      courseId: params.courseId,
    },
  })

  // Find the user object in the database (needed for testimonial)
  const dbUser = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!dbUser) {
    redirect("/student/courses")
  }

  // Find user's testimonial for this course
  const userTestimonial = await db.testimonial.findFirst({
    where: {
      userObjId: dbUser.id,
      courseId: params.courseId,
    },
  })

  // Fetch all published testimonials for this course
  const courseTestimonials = await db.testimonial.findMany({
    where: {
      courseId: params.courseId,
      isPublished: true,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Calculate average rating
  const averageRating =
    courseTestimonials.length > 0
      ? courseTestimonials.reduce((acc, t) => acc + t.rating, 0) /
        courseTestimonials.length
      : 0

  // Get teacher information
  const teacherInfo = await db.teacher.findMany({
    where: {
      courseIds: {
        has: params.courseId,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main content area - Course details */}
        <div className="space-y-8 lg:col-span-2">
          {/* Course image and basic info */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="aspect-video w-full">
              <Image
                src={course.imageUrl || "/placeholder-course.jpg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Course title and overview */}
          <div>
            <h1 className="mb-3 text-3xl font-bold">{course.title}</h1>
            <div className="mb-4 flex items-center space-x-4">
              <Badge
                variant={course.type === "self-paced" ? "secondary" : "default"}
              >
                {course.type === "self-paced" ? "Self-paced" : "Batch-based"}
              </Badge>
              {averageRating > 0 && (
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({courseTestimonials.length} reviews)
                  </span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-lg">
              {course.description ||
                "No description available for this course."}
            </p>
          </div>

          {/* Course features */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-background rounded-lg border p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Clock className="text-primary mb-2 h-8 w-8" />
                <h3 className="font-medium">Learning Format</h3>
                <p className="text-muted-foreground text-sm">
                  {course.type === "self-paced"
                    ? "Learn at your own pace"
                    : "Scheduled sessions"}
                </p>
              </div>
            </div>
            <div className="bg-background rounded-lg border p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Users className="text-primary mb-2 h-8 w-8" />
                <h3 className="font-medium">Expert Teachers</h3>
                <p className="text-muted-foreground text-sm">
                  {teacherInfo.length} instructor
                  {teacherInfo.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="bg-background rounded-lg border p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <CalendarDays className="text-primary mb-2 h-8 w-8" />
                <h3 className="font-medium">Access</h3>
                <p className="text-muted-foreground text-sm">Lifetime access</p>
              </div>
            </div>
            <div className="bg-background rounded-lg border p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="text-primary mb-2 h-8 w-8" />
                <h3 className="font-medium">Resources</h3>
                <p className="text-muted-foreground text-sm">
                  Downloadable materials
                </p>
              </div>
            </div>
          </div>

          {/* Instructors section */}
          {teacherInfo.length > 0 && (
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">Your Instructors</h2>
              <div className="space-y-4">
                {teacherInfo.map((teacher) => (
                  <div key={teacher.id} className="flex items-start gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      {teacher.user.image ? (
                        <Image
                          src={teacher.user.image}
                          alt={teacher.user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-primary flex h-full w-full items-center justify-center font-bold text-white">
                          {teacher.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{teacher.user.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Course Instructor
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews section */}
          <div className="bg-background rounded-xl border p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Student Reviews</h2>
            <CourseReviews
              courseId={params.courseId}
              // initialTestimonials={courseTestimonials}
            />
          </div>
        </div>

        {/* Sidebar content - Purchase & Review */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Price card */}
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">
                {formatPrice(course.price || 0)}
              </h2>
              {userPurchase ? (
                <Button size="lg" className="mb-4 w-full" asChild>
                  <a href={`/student/courses/${params.courseId}`}>
                    Go to Course
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="mb-4 w-full" asChild>
                  <a href={`/purchase/${params.courseId}`}>Enroll Now</a>
                </Button>
              )}

              <div className="border-t pt-4">
                <h3 className="mb-2 font-medium">This course includes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {course.type === "self-paced"
                      ? "Self-paced learning"
                      : "Live instructor sessions"}
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Downloadable resources
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Full lifetime access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access on mobile and desktop
                  </li>
                </ul>
              </div>
            </div>

            {/* Your review card */}
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Your Review</h2>
              {userPurchase ? (
                <CourseTestimonial
                  courseId={params.courseId}
                  userObjId={dbUser.id}
                  existingTestimonial={userTestimonial}
                />
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm">
                    You must purchase this course to leave a review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsPage
