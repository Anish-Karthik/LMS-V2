import { router } from "../trpc"
import { announcementRouter } from "./announcement"
import { attendanceRouter } from "./attendance"
import { batchRouter } from "./batch"
import { chapterRouter } from "./chapter"
import { courseRouter } from "./course"
import { promoRouter } from "./promo"
import { quizRouter } from "./quiz"
import { testimonialRouter } from "./testimonial"
import { topicRouter } from "./topic"
import { userRouter } from "./user"

export const appRouter = router({
  user: userRouter,
  announcement: announcementRouter,
  attendance: attendanceRouter,
  batch: batchRouter,
  course: courseRouter,
  topic: topicRouter,
  chapter: chapterRouter,
  promo: promoRouter,
  testimonial: testimonialRouter,
  quiz: quizRouter,
})

export type AppRouter = typeof appRouter
export {
  promoRouter,
  announcementRouter,
  batchRouter,
  chapterRouter,
  courseRouter,
  testimonialRouter,
  topicRouter,
  userRouter,
  attendanceRouter,
  quizRouter,
}
