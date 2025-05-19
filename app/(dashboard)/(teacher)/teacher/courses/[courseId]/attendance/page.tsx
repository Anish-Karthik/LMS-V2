"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import { Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trpc } from "@/app/_trpc/client"

interface Topic {
  id: string
  title: string
  type: string
  startTime: Date | string | null
  duration: number | null
  chapterTitle?: string
}

const AttendancePage = () => {
  const params = useParams() || {}
  const courseId = params?.courseId as string
  const [activeTab, setActiveTab] = useState("upcoming")

  const { data: chapters, isLoading: chaptersLoading } =
    trpc.chapter.getChaptersByCourseId.useQuery(courseId, {
      enabled: !!courseId,
    })

  if (chaptersLoading) {
    return (
      <div className="p-8">
        <div className="flex h-full items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    )
  }

  // Flatten topics from all chapters
  const allTopics: Topic[] = []
  chapters?.forEach((chapter) => {
    chapter.topics?.forEach((topic) => {
      allTopics.push({
        ...topic,
        chapterTitle: chapter.title,
      })
    })
  })

  // Filter topics that are of type "live" and have a startTime
  const liveTopics = allTopics.filter(
    (topic) => topic.type === "live" && topic.startTime
  )

  // Get current date
  const now = new Date()

  // Sort topics by startTime
  const sortedTopics = [...liveTopics].sort((a, b) => {
    if (!a.startTime || !b.startTime) return 0
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })

  // Filter upcoming and past topics
  const upcomingTopics = sortedTopics.filter(
    (topic) => topic.startTime && new Date(topic.startTime) > now
  )

  const pastTopics = sortedTopics.filter(
    (topic) => topic.startTime && new Date(topic.startTime) <= now
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
      </div>
      <Separator className="my-4" />

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Live Classes</TabsTrigger>
          <TabsTrigger value="past">Past Live Classes</TabsTrigger>
          <TabsTrigger value="all">All Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingTopics.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No upcoming live classes scheduled.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTopics.map((topic) => (
                <Card key={topic.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{topic.title}</span>
                    </CardTitle>
                    <CardDescription>{topic.chapterTitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {topic.startTime && (
                      <div className="mb-2 flex items-center">
                        <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                        <span className="text-sm">
                          {format(
                            new Date(topic.startTime),
                            "MMM dd, yyyy - h:mm a"
                          )}
                        </span>
                      </div>
                    )}
                    {topic.duration && (
                      <div className="text-muted-foreground text-sm">
                        Duration: {topic.duration} minutes
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link
                        href={`/teacher/courses/${courseId}/attendance/${topic.id}`}
                      >
                        Pre-configure Attendance
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastTopics.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No past live classes found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastTopics.map((topic) => (
                <Card key={topic.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{topic.title}</span>
                    </CardTitle>
                    <CardDescription>{topic.chapterTitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {topic.startTime && (
                      <div className="mb-2 flex items-center">
                        <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                        <span className="text-sm">
                          {format(
                            new Date(topic.startTime),
                            "MMM dd, yyyy - h:mm a"
                          )}
                        </span>
                      </div>
                    )}
                    {topic.duration && (
                      <div className="text-muted-foreground text-sm">
                        Duration: {topic.duration} minutes
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link
                        href={`/teacher/courses/${courseId}/attendance/${topic.id}`}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Mark Attendance
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {allTopics.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No topics found in this course.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allTopics.map((topic) => (
                <Card key={topic.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{topic.title}</span>
                    </CardTitle>
                    <CardDescription>{topic.chapterTitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">Type: {topic.type}</div>
                    {topic.startTime && (
                      <div className="mt-2 flex items-center">
                        <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                        <span className="text-sm">
                          {format(
                            new Date(topic.startTime),
                            "MMM dd, yyyy - h:mm a"
                          )}
                        </span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={topic.type === "live" ? "default" : "outline"}
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={`/teacher/courses/${courseId}/attendance/${topic.id}`}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Mark Attendance
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AttendancePage
