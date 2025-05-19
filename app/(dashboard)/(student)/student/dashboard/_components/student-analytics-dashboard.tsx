"use client"

import { useState } from "react"
import { Award, BookOpen } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseAnalytics } from "@/app/(dashboard)/(student)/student/courses/[courseId]/_components/course-analytics"

interface PurchasedCourse {
  id: string
  title: string
  imageUrl: string | null
  category: string
  chaptersCount: number
  topicsCount: number
  price: number
  progress?: {
    completedTopics: number
    totalTopics: number
    percentage: number
  }
  quizAttempts: {
    topicId: string
    topicTitle: string
    attempts: {
      id: string
      score: number
      passed: boolean
      timeTaken?: number | null
      createdAt: Date
    }[]
  }[]
  purchaseDate: Date
}

export function StudentAnalyticsDashboard({
  courses,
}: {
  courses: PurchasedCourse[]
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses.length > 0 ? courses[0].id : ""
  )

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  )

  // Calculate overall stats across all courses
  const overallStats = {
    totalCourses: courses.length,
    totalCompletedTopics: courses.reduce(
      (sum, course) => sum + (course.progress?.completedTopics || 0),
      0
    ),
    totalTopics: courses.reduce(
      (sum, course) => sum + (course.progress?.totalTopics || 0),
      0
    ),
    averageProgress:
      courses.reduce(
        (sum, course) => sum + (course.progress?.percentage || 0),
        0
      ) / (courses.length || 1),
    totalQuizzesPassed: courses.reduce(
      (sum, course) =>
        sum +
        course.quizAttempts.reduce(
          (quizSum, topic) =>
            quizSum + (topic.attempts.some((a) => a.passed) ? 1 : 0),
          0
        ),
      0
    ),
    totalQuizzes: courses.reduce(
      (sum, course) => sum + course.quizAttempts.length,
      0
    ),
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            You haven&apos;t enrolled in any courses yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Learning Analytics</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="overview">Overall Progress</TabsTrigger>
          <TabsTrigger value="course">Course Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookOpen className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.totalCourses}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Progress
                </CardTitle>
                <BookOpen className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.averageProgress.toFixed(0)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Topics Completed
                </CardTitle>
                <BookOpen className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.totalCompletedTopics} /{" "}
                  {overallStats.totalTopics}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quizzes Passed
                </CardTitle>
                <Award className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.totalQuizzesPassed} /{" "}
                  {overallStats.totalQuizzes}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Course Progress</h3>
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">
                          {course.progress?.completedTopics || 0} of{" "}
                          {course.progress?.totalTopics || 0} topics completed
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Enrolled:{" "}
                          {new Date(course.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-2xl font-bold">
                        {course.progress?.percentage.toFixed(0) || 0}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="course" className="mt-4 space-y-4">
          <div className="mb-4">
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCourse && (
            <CourseAnalytics
              analytics={{
                courseId: selectedCourse.id,
                courseName: selectedCourse.title,
                completionPercentage: selectedCourse.progress?.percentage || 0,
                completedModules: selectedCourse.progress?.completedTopics || 0,
                totalModules: selectedCourse.progress?.totalTopics || 0,
                purchaseDate: selectedCourse.purchaseDate,
                quizAttempts: selectedCourse.quizAttempts,
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
