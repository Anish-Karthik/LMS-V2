import Link from "next/link"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"
import { ArrowLeft, File, ListChecks } from "lucide-react"

import { getCourseById } from "@/lib/actions/course.actions"
import { getDetailedTopicClient } from "@/lib/actions/topic.actions"
import { getUser } from "@/lib/actions/user.actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@/components/banner"
import { Preview } from "@/components/preview"

import { ChapterProgressButton } from "../../_components/chapter-progress-button"
import { QuizAttemptHistory } from "../../_components/quiz-attempt-history"
import { QuizStartForm } from "../../_components/quiz-start-form"
import { QuizAttempt } from "@prisma/client"

const QuizTopicPage = async ({
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

  const {
    topic,
    chapter,
    batch,
    attachments,
    nextTopic,
    userProgressTopic,
    purchase,
    quizAttempts,
  } = await getDetailedTopicClient({
    userId: user.id,
    topicId: params?.topicId,
    courseId: params?.courseId,
  })

  if (!topic || !chapter) {
    return (
      <>
        <h1>Topic not found{JSON.stringify(topic)}</h1>
        <h1>Chapter not found{JSON.stringify(chapter)}</h1>
      </>
    )
  }

  // For batch-based courses, validate batch access
  if (course.type === "batch-based") {
    if (!batch) {
      return (
        <>
          <h1>Batch not found{JSON.stringify(batch)}</h1>
        </>
      )
    }

    if (userPurchaseInfoForThisCourse.batchId !== batch.id) {
      return (
        <>
          <h1>
            Batch mismatch, you are not authorized to access this batch content,
            contact your mentor
          </h1>
        </>
      )
    }
  }

  const isLocked = false // !topic.isFree && !purchase;

  // Parse quiz questions
  const questions = topic.questions ? JSON.parse(topic.questions as string) : []

  // Get completed attempts (with answers)
  const completedAttempts =
    quizAttempts?.filter((attempt) => attempt.answers) || []

  // Check if user has reached maximum attempts
  const hasAttempts =
    !topic.allowedAttempts || completedAttempts.length < topic.allowedAttempts

  // Check if user has already passed the quiz
  const hasPassed =
    completedAttempts.length > 0 &&
    completedAttempts.some((attempt) => attempt.passed)

  // Check if all attempts are used
  const allAttemptsUsed =
    topic.allowedAttempts && completedAttempts.length >= topic.allowedAttempts

  // Check if we should show answers (user passed or all attempts used)
  const shouldShowAnswers = hasPassed || allAttemptsUsed

  return (
    <div>
      {userProgressTopic?.isCompleted && (
        <Banner variant="success" label="You have completed this quiz." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to take this quiz."
        />
      )}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="flex flex-col items-center justify-between p-4 md:flex-row">
          <h2 className="mb-2 text-2xl font-semibold">{topic.title}</h2>

          <ChapterProgressButton
            userId={user.id}
            chapterId={chapter.id}
            topicId={params?.topicId}
            courseId={params?.courseId}
            nextTopicId={nextTopic?.id}
            nextTopicType={nextTopic?.type}
            isCompleted={!!userProgressTopic?.isCompleted}
          />
        </div>
        <Separator />

        {/* Quiz information */}
        <div className="p-4">
          {/* Quiz description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <Preview value={topic.description || "No instructions provided."} />
          </div>

          {/* Show completed attempts with answers if user has passed or used all attempts */}
          {shouldShowAnswers && completedAttempts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Your Quiz Results</h3>
              <QuizAttemptHistory
                attempts={completedAttempts as QuizAttempt[]}
                questions={questions}
              />
            </div>
          )}

          {/* Previous attempts summary when still taking quiz */}
          {!shouldShowAnswers && completedAttempts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Previous Attempts</h3>
              <div className="space-y-2">
                {completedAttempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className={`p-4 border rounded-md ${
                      attempt.passed
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">
                        Score: {attempt.score}%{attempt.passed && " (Passed)"}
                        {!attempt.passed && " (Failed)"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(attempt.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {attempt.timeTaken && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Time taken: {Math.floor(attempt.timeTaken / 60)}m{" "}
                        {attempt.timeTaken % 60}s
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz form or messages */}
          {!hasAttempts && (
            <Banner
              variant="warning"
              label={`You have used all ${topic.allowedAttempts} attempts for this quiz.`}
            />
          )}

          {hasPassed && (
            <Banner
              variant="success"
              label="You have already passed this quiz!"
            />
          )}

          {!isLocked && hasAttempts && !hasPassed && questions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
              <QuizStartForm
                topicId={params.topicId}
                courseId={params.courseId}
                timeLimit={topic.timeLimit || undefined}
                passingScore={topic.passingScore || undefined}
                allowedAttempts={topic.allowedAttempts || undefined}
                attemptsUsed={completedAttempts.length}
                description={topic.description || ""}
              />
            </div>
          )}

          {questions.length === 0 && (
            <Banner variant="warning" label="This quiz has no questions yet." />
          )}
        </div>

        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold">Resources</h3>
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex w-full items-center rounded-md border p-3 text-sky-700 hover:underline"
                  >
                    <File className="mr-2 h-4 w-4" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizTopicPage
