"use server";

import { db } from "../db";

export const createTopic = async (chapterId: string, title: string) => {
  try {
    const lastTopic = await db.topic.findFirst({
      where: {
        chapterId: chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastTopic ? lastTopic.position + 1 : 1;

    const topic = await db.topic.create({
      data: {
        title,
        chapterId,
        position: newPosition,
      },
    });
    return topic;
  } catch (error) {
    console.error(error);
    throw new Error("Topic creation failed");
  }
}

export const reorderTopics = async (chapterId: string, topics: { id: string; position: number }[]) => {
  try {
    for (let item of topics) {
      await db.topic.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }
    return {sucess: true};
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