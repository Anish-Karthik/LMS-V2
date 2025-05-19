import { Attachment, Topic } from "@prisma/client"

import { db } from "../db"
import { getBatchById } from "./batch.action"
import { getCourseById } from "./course.actions"

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
    // Get course to determine if it's self-paced or batch-based
    const course = await getCourseById(courseId)
    if (!course) {
      throw new Error("Course not found")
    }

    // Get topic and chapter info
    const topic = await getPublishedTopicsById(topicId)
    if (!topic) {
      throw new Error("Topic not found")
    }

    const currentChapter = await db.chapter.findUnique({
      where: {
        id: topic.chapterId,
      },
    })
    if (!currentChapter) {
      throw new Error("Chapter not found")
    }

    // Check if user has purchased the course
    const userPurchase = await db.purchase.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    })

    if (!userPurchase) {
      throw new Error("Course not purchased")
    }

    // For batch-based courses, check if the batch matches
    let batch = null
    let purchase = null

    if (course.type === "batch-based" && currentChapter.batchId) {
      batch = await getBatchById(currentChapter.batchId)

      // Check if user has access to this batch
      purchase = await db.topic.findUnique({
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
        throw new Error("Batch not purchased or mismatched")
      }
    }

    let videoData = null
    let attachments: Attachment[] = []
    let nextTopic: Topic | null = null

    videoData = await db.videoData.findUnique({
      where: {
        topicId: topicId,
      },
    })

    // Find next topic in same chapter
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
      // Find next chapter's first topic
      if (course.type === "self-paced") {
        // For self-paced courses, get next chapter by courseId
        const nextChapter = await db.chapter.findFirst({
          where: {
            courseId: courseId,
            isPublished: true,
            position: {
              gt: currentChapter?.position,
            },
          },
          include: {
            topics: {
              where: {
                isPublished: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        })

        if (nextChapter && nextChapter.topics.length > 0) {
          nextTopic = nextChapter.topics[0]
        }
      } else if (currentChapter.batchId) {
        // For batch-based courses, get next chapter by batchId
        const nextChapter = await db.chapter.findFirst({
          where: {
            batchId: currentChapter.batchId,
            isPublished: true,
            position: {
              gt: currentChapter?.position,
            },
          },
          include: {
            topics: {
              where: {
                isPublished: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        })

        if (nextChapter && nextChapter.topics.length > 0) {
          nextTopic = nextChapter.topics[0]
        }
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

    // Include quiz attempts if this is a quiz-type topic
    let quizAttempts = null
    if (topic.type === "quiz") {
      quizAttempts = await db.quizAttempt.findMany({
        where: {
          userId,
          topicId: topic.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    }

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
      quizAttempts,
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
      quizAttempts: null,
    }
  }
}

export async function getTopicEmails({
  batchId,
  courseId,
}: {
  batchId?: string
  courseId?: string
}) {
  try {
    const emails = await db.user.findMany({
      where: {
        purchases: {
          some: batchId
            ? {
                batchId: batchId,
              }
            : {
                courseId: courseId,
              },
        },
      },
      select: {
        email: true,
      },
    })
    return emails.map((email) => email.email!)
  } catch (err: any) {
    console.log(err.message)
    throw new Error("Error getting emails", err)
  }
}
