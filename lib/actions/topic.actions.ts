"use server"

import Mux from "@mux/mux-node"
import { Attachment, Topic } from "@prisma/client"

import { db } from "../db"
import { getBatchById } from "./batch.action"
import { isUserPurchasedCourse } from "./user.actions"

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
)

export const createTopic = async (chapterId: string, title: string) => {
  try {
    const lastTopic = await db.topic.findFirst({
      where: {
        chapterId: chapterId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastTopic ? lastTopic.position + 1 : 1

    const topic = await db.topic.create({
      data: {
        title,
        chapterId,
        position: newPosition,
      },
    })
    return topic
  } catch (error) {
    console.error(error)
    throw new Error("Topic creation failed")
  }
}

export const reorderTopics = async (
  chapterId: string,
  topics: { id: string; position: number }[]
) => {
  try {
    for (let item of topics) {
      await db.topic.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }
    return { sucess: true }
  } catch (error) {
    console.error(error)
    throw new Error("Topic reorder failed")
  }
}

export const getTopicsByChapterId = async (chapterId: string) => {
  try {
    const topics = await db.topic.findMany({
      where: { chapterId },
      orderBy: {
        position: "asc",
      },
    })
    return topics
  } catch (error) {
    console.error(error)
    throw new Error("Topics not found")
  }
}

export const deleteTopic = async (topicId: string) => {
  try {
    const topic = await db.topic.findUnique({
      where: {
        id: topicId,
      },
    })

    if (!topic) {
      return new Error("Not Found")
    }

    if (topic.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          topicId: topicId,
        },
      })

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }
    }

    const deletedTopic = await db.topic.delete({
      where: {
        id: topicId,
      },
    })
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic deletion failed: ", error.message)
  }
}

// const { isPublished, ...values } = await req.json();
export const updateTopic = async ({
  topicId,
  title,
  videoUrl,
  description,
  isPublished,
}: {
  topicId: string
  title?: string
  videoUrl?: string
  description?: string
  isPublished?: boolean
}) => {
  try {
    const topic = await db.topic.findUnique({
      where: {
        id: topicId,
      },
    })

    if (!topic) {
      return new Error("Not Found")
    }

    const updatedTopic = await db.topic.update({
      where: {
        id: topicId,
      },
      data: {
        title: title || topic.title,
        videoUrl: videoUrl || topic.videoUrl,
        description: description || topic.description,
        isPublished: isPublished || topic.isPublished,
      },
    })

    if (videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          topicId: topicId,
        },
      })

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }

      const asset = await Video.Assets.create({
        input: videoUrl,
        playback_policy: "public",
        test: false,
      })

      await db.muxData.create({
        data: {
          topicId: topicId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      })
    }

    return updatedTopic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic update failed: ", error.message)
  }
}

export const publishTopic = async (topicId: string) => {
  try {
    const updatedTopic = await db.topic.update({
      where: {
        id: topicId,
      },
      data: {
        isPublished: true,
      },
    })

    return updatedTopic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic publish failed: ", error.message)
  }
}

export const unpublishTopic = async (topicId: string) => {
  try {
    const updatedTopic = await db.topic.update({
      where: {
        id: topicId,
      },
      data: {
        isPublished: false,
      },
    })

    return updatedTopic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic unpublish failed: ", error.message)
  }
}

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
    const purchase = await isUserPurchasedCourse(userId, courseId)
    if (!purchase) {
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

    let muxData = null
    let attachments: Attachment[] = []
    let nextTopic: Topic | null = null

    muxData = await db.muxData.findUnique({
      where: {
        topicId: topicId,
      },
    })

    nextTopic = await db.topic.findFirst({
      where: {
        chapterId: topic.chapterId,
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
        nextTopic = nextChapter.topics[0]
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
      muxData,
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
      muxData: null,
      attachments: [],
      nextTopic: null,
      nextTopicType: null,
      userProgressTopic: null,
      purchase: null,
    }
  }
}

export const updateUserProgressTopic = async (
  userId: string,
  topicId: string,
  isCompleted: boolean
) => {
  try {
    await db.userProgressTopic.upsert({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        topicId,
        isCompleted,
      },
    })
  } catch (error: any) {
    console.error(error)
    throw new Error("User progress update failed: ", error.message)
  }
}

export const addAttachmentToTopic = async (
  topicId: string,
  attachmentUrl: string,
  name = "Attachment"
) => {
  try {
    const attachment = await db.attachment.create({
      data: {
        topicId,
        url: attachmentUrl,
        name: attachmentUrl.split("/").pop() || name,
      },
    })

    return attachment
  } catch (error: any) {
    console.error(error)
    throw new Error("Attachment upload failed: ", error.message)
  }
}

export const removeAttachmentFromTopic = async (
  topicId: string,
  attachmentId: string
) => {
  try {
    const deletedAttachment = await db.attachment.delete({
      where: {
        id: attachmentId,
        topicId: topicId,
      },
    })
  } catch (error: any) {
    console.error(error)
    throw new Error("Attachment deletion failed: ", error.message)
  }
}
