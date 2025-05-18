"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Chapter, Course, Topic } from "@prisma/client"
import { ChevronRight, Clock, Lock } from "lucide-react"

import { formatPrice } from "@/lib/format"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CourseEnrollButton from "@/components/shared/course-enroll-button"
import CurrentPathNavigator from "@/components/shared/current-pathname"

const CourseDetailsPage = () => {
  const router = useRouter()
  const params = useParams() as { courseId: string }
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<(Chapter & { topics: Topic[] })[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [batches, setBatches] = useState([])
  const [isPurchased, setIsPurchased] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user")
        if (res.ok) {
          const data = await res.json()
          setUserId(data.userId)

          // Check if user has already purchased the course
          const purchaseRes = await fetch(
            `/api/courses/${params.courseId}/purchase-status`
          )
          if (purchaseRes.ok) {
            const purchaseData = await purchaseRes.json()
            setIsPurchased(purchaseData.isPurchased)

            // If purchased, redirect to the course page
            if (purchaseData.isPurchased) {
              router.push(`/student/courses/${params.courseId}`)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()

    const fetchCourseData = async () => {
      try {
        setLoading(true)
        // Fetch course details
        const courseRes = await fetch(`/api/courses/${params.courseId}`)
        if (!courseRes.ok) {
          throw new Error("Failed to fetch course")
        }
        const courseData = await courseRes.json()
        setCourse(courseData)

        // Get batches for the course if needed
        if (courseData.type === "batch-based") {
          const batchesRes = await fetch(
            `/api/courses/${params.courseId}/batches`
          )
          if (batchesRes.ok) {
            const batchesData = await batchesRes.json()
            setBatches(batchesData)
          }
        }

        // Only fetch chapters for self-paced courses
        if (courseData.type === "self-paced") {
          const chaptersRes = await fetch(
            `/api/courses/${params.courseId}/chapters`
          )
          if (!chaptersRes.ok) {
            throw new Error("Failed to fetch chapters")
          }
          const chaptersData = await chaptersRes.json()
          setChapters(chaptersData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Redirect on error
        router.push("/student/courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [params.courseId, router])

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) return null

  const totalTopics = chapters.reduce(
    (acc, chapter) => acc + chapter.topics.length,
    0
  )

  // For batch-based courses, show a simpler UI with just course info
  if (course.type !== "self-paced") {
    return (
      <>
        <CurrentPathNavigator />
        <div className="container mx-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="mb-6">
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div className="rounded-md p-6 my-6">
              <h2 className="text-xl font-semibold mb-2">Course Information</h2>
              <p className="mb-4">
                This is a batch-based course, which means you'll join scheduled
                sessions with an instructor.
              </p>
              <div className="mt-4 border-t pt-4">
                <p className="font-bold text-xl mb-4">
                  {formatPrice(course.price || 0)}
                </p>
                {userId ? (
                  <Button
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={() =>
                      router.push(
                        `/purchase/${course.id}`
                      )
                    }
                  >
                    Enroll
                  </Button>
                ) : (
                  <Button
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={() =>
                      router.push(
                        `/sign-in?redirect=${encodeURIComponent(
                          window.location.pathname
                        )}`
                      )
                    }
                  >
                    Sign in to Purchase
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <CurrentPathNavigator />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="mb-6">
              <p className="text-gray-700">{course.description}</p>
            </div>
            {/* Load Course Image */}
            <Image
              src={course.imageUrl || ""}
              alt={course.title}
              width={800}
              height={500}
              className="rounded-md"
            />

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-600">
                    {chapters.length}{" "}
                    {chapters.length === 1 ? "chapter" : "chapters"} •{" "}
                    {totalTopics} {totalTopics === 1 ? "topic" : "topics"}
                  </span>
                  <Badge className="bg-blue-600">
                    <Clock className="h-3 w-3 mr-1" />
                    Self-paced
                  </Badge>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {chapters.map((chapter) => (
                    <AccordionItem
                      key={chapter.id}
                      value={chapter.id}
                      className="border-b border-slate-200"
                    >
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-start text-left">
                          <span className="font-medium">{chapter.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          {chapter.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className="flex items-center justify-between py-2 text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-slate-500" />
                                <span>{topic.title}</span>
                                {topic.isFree && (
                                  <Badge className="bg-emerald-600 text-xs">
                                    Free
                                  </Badge>
                                )}
                              </div>
                              {!topic.isFree && (
                                <Lock className="h-4 w-4 text-slate-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border border-slate-200 rounded-md p-6 sticky top-24">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">
                  {formatPrice(course.price || 0)}
                </h3>
              </div>

              {userId ? (
                  <Button
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={() =>
                      router.push(
                        `/purchase/${course.id}`
                      )
                    }
                  >
                    Enroll
                  </Button>
              ) : (
                <Button
                  className="w-full mb-4 bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  onClick={() =>
                    router.push(
                      `/sign-in?redirect=${encodeURIComponent(
                        window.location.pathname
                      )}`
                    )
                  }
                >
                  Sign in to Purchase
                </Button>
              )}

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                  <span>
                    Access to {chapters.length}{" "}
                    {chapters.length === 1 ? "chapter" : "chapters"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                  <span>Learn at your own pace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsPage
