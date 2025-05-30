"use server"

import { db } from "@/lib/db"

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
      const existingVideo = await db.videoData.findFirst({
        where: {
          topicId: topicId,
        },
      })

      if (existingVideo) {
        db.videoData.delete({
          where: {
            id: existingVideo.id,
          },
        })
      }
    }

    await db.topic.delete({
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
      const existingVideo = await db.videoData.findFirst({
        where: {
          topicId: topicId,
        },
      })

      if (existingVideo) {
        db.videoData.delete({
          where: {
            id: existingVideo.id,
          },
        })
      }
      await db.videoData.create({
        data: {
          topicId: topicId,
          url: videoUrl,
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
        isNotified: false,
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
        isNotified: false,
      },
    })

    return updatedTopic
  } catch (error: any) {
    console.error(error)
    throw new Error("Topic unpublish failed: ", error.message)
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

export const notifyTopic = async (topicId: string) => {
  try {
    const topic = await db.topic.update({
      where: {
        id: topicId,
        isPublished: true,
      },
      data: {
        isNotified: true,
      },
    })
    console.log("Topic notified: ", topic)
    return !!(topic && topic.isNotified && topic.isPublished)
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Topic not found: ", error.message)
  }
}
