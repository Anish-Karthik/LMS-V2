import { Attachment, Topic } from "@prisma/client"

import { db } from "../db"
import { getBatchById } from "./batch.action"

export const getTopicById = async (topicId: string) => {
  try {
    const topic = await db.topic.findUnique({
      where: {
        id: topicId,
      },
    })

    return topic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic not found: ", error.message)
  }
}

export const getTopicAttachments = async (topicId: string) => {
  try {
    const attachments = await db.attachment.findMany({
      where: {
        topicId: topicId,
      },
    })

    return attachments
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic attachments not found: ", error.message)
  }
}

export const getPublishedTopicsById = async (topicId: string) => {
  try {
    const topic = await db.topic.findUnique({
      where: {
        id: topicId,
        isPublished: true,
      },
    })
    if (!topic) {
      throw new Error("Topic not found")
    }

    return topic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic not found: ", error.message)
  }
}

export const getDetailedTopicClient = async ({
  courseId,
  topicId,
  userId,
}: {
  courseId: string
  topicId: string
  userId: string
}) => {
  try {
    // find to which batch the topic belongs to
    const purchase = await db.topic.findUnique({
      where: {
        id: topicId,
      },
      select: {
        chapter: {
          select: {
            batch: {
              include: {
                purchases: {
                  where: {
                    userId: userId,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!purchase || !purchase.chapter?.batch?.purchases) {
      throw new Error("Course not purchased")
    }
    const topic = await getPublishedTopicsById(topicId)

    const currentChapter = await db.chapter.findUnique({
      where: {
        id: topic.chapterId,
      },
    })
    if (!currentChapter) {
      throw new Error("Chapter not found")
    }

    if (!topic) {
      throw new Error("Topic not found")
    }
    const batch = await getBatchById(currentChapter.batchId)

    let videoData = null
    let attachments: Attachment[] = []
    let nextTopic: Topic | null = null

    videoData = await db.videoData.findUnique({
      where: {
        topicId: topicId,
      },
    })

    nextTopic = await db.topic.findFirst({
      where: {
        chapterId: topic.chapterId,
        isPublished: true,
        position: {
          gt: topic?.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    })

    if (!nextTopic) {
      // get next chapter's first topic
      const nextChapter = await db.chapter.findFirst({
        where: {
          batchId: currentChapter?.batchId,
          position: {
            gt: currentChapter?.position,
          },
        },
        include: {
          topics: {
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      })
      if (nextChapter) {
        nextTopic = await db.topic.findFirst({
          where: {
            chapterId: nextChapter.id,
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        })
      }
    }

    const userProgressTopic = await db.userProgressTopic.findUnique({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
    })

    return {
      chapter: currentChapter,
      topic,
      batch,
      videoData,
      attachments,
      nextTopic,
      nextTopicType: nextTopic?.type,
      userProgressTopic,
      purchase,
    }
  } catch (error: any) {
    console.log("[GET_CHAPTER]", error)
    return {
      chapter: null,
      topic: null,
      batch: null,
      videoData: null,
      attachments: [],
      nextTopic: null,
      nextTopicType: null,
      userProgressTopic: null,
      purchase: null,
    }
  }
}
