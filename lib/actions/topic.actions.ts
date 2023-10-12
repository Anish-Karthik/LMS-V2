"use server"

import Mux from "@mux/mux-node"

import { db } from "../db"
import { getBatchById } from "./batch.action"

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
