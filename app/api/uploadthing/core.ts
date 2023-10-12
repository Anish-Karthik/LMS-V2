import { auth, currentUser } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"

import { isTeacherOrHigher } from "@/lib/actions/user.actions"

const f = createUploadthing()

const handleAuth = () => {
  const { userId } = auth()
  const isAuthorized = isTeacherOrHigher(userId)

  if (!userId || !isAuthorized) throw new Error("Unauthorized")
  return { userId }
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new Error("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
