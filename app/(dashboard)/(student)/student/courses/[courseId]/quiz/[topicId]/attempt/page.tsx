import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"

import { getCourseById } from "@/lib/actions/course.actions"
import { getDetailedTopicClient } from "@/lib/actions/topic.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Banner } from "@/components/banner"

import { QuizAttemptForm } from "../../../_components/quiz-attempt-form"

const QuizAttemptPage = async ({
  params,
}: {
  params: { courseId: string; topicId: string }
}) => {
  const user = await currentUser()
  const userInfo = await getUser(user?.id || "")

  if (!user?.id || !userInfo) {
    return redirect("/")
  }

  // Check if user has purchased this course
  const userPurchaseInfoForThisCourse = userInfo.purchases.find(
    (purchase) => purchase.courseId === params?.courseId
  )

  if (!userPurchaseInfoForThisCourse) {
    return redirect("/")
  }

  // Get course to check if it's self-paced or batch-based
  const course = await getCourseById(params.courseId)
  if (!course) {
    return redirect("/student/courses")
  }

  const { topic, chapter, batch, quizAttempts } = await getDetailedTopicClient({
    userId: user.id,
    topicId: params?.topicId,
    courseId: params?.courseId,
  })

  if (!topic) {
    return redirect(`/student/courses/${params.courseId}`)
  }

  // For batch-based courses, validate batch access
  if (course.type === "batch-based") {
    if (!batch) {
      return redirect(`/student/courses/${params.courseId}`)
    }

    if (userPurchaseInfoForThisCourse.batchId !== batch.id) {
      return redirect(`/student/courses/${params.courseId}`)
    }
  }

  // Parse quiz questions
  const questions = topic.questions ? JSON.parse(topic.questions as string) : []

  if (questions.length === 0) {
    return redirect(
      `/student/courses/${params.courseId}/quiz/${params.topicId}`
    )
  }

  // Check if there's a pending attempt
  const pendingAttempts =
    quizAttempts?.filter((attempt) => !attempt.answers) || []

  // If no pending attempt, redirect back to quiz page
  if (pendingAttempts.length === 0) {
    return redirect(
      `/student/courses/${params.courseId}/quiz/${params.topicId}`
    )
  }

  // Get the most recent pending attempt
  const currentAttempt = pendingAttempts[0]

  // Check if user has reached maximum attempts
  const attemptsRemaining = !topic.allowedAttempts
    ? Infinity
    : topic.allowedAttempts - (quizAttempts?.length || 0)

  if (attemptsRemaining <= 0) {
    return redirect(
      `/student/courses/${params.courseId}/quiz/${params.topicId}`
    )
  }

  // Check if user has already passed the quiz
  const hasPassed = quizAttempts?.some((attempt) => attempt.passed)

  if (hasPassed) {
    return redirect(
      `/student/courses/${params.courseId}/quiz/${params.topicId}`
    )
  }

  return (
    <div className="mx-auto max-w-4xl pb-20">
      <div className="p-4">
        <h1 className="mb-6 text-2xl font-bold">{topic.title}</h1>

        {topic.timeLimit && (
          <Banner
            variant="warning"
            label={`This quiz has a time limit of ${topic.timeLimit} minutes. The timer started when you clicked 'Start Quiz'.`}
          />
        )}

        <div className="mt-6">
          <QuizAttemptForm
            topicId={params.topicId}
            courseId={params.courseId}
            questions={questions}
            timeLimit={topic.timeLimit || undefined}
            passingScore={topic.passingScore || undefined}
            allowedAttempts={topic.allowedAttempts || undefined}
            userId={user.id}
            attemptId={currentAttempt.id}
            attemptStartTime={currentAttempt.createdAt}
          />
        </div>
      </div>
    </div>
  )
}

export default QuizAttemptPage
