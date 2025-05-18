import z from "zod"

import {
  announcementRouter,
  attendanceRouter,
  batchRouter,
  chapterRouter,
  courseRouter,
  promoRouter,
  testimonialRouter,
  topicRouter,
  userRouter,
} from "./routers"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return { message: "Hello World" }
  }),
  user: userRouter,
  announcement: announcementRouter,
  batch: batchRouter,
  course: courseRouter,
  topic: topicRouter,
  chapter: chapterRouter,
  promo: promoRouter,
  testimonial: testimonialRouter,
  attendance: attendanceRouter,
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
