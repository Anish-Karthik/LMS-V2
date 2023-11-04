import { Topic } from "@prisma/client"

export function getTopicDisplay(topic: Topic, url: string) {
  return `
    <div style="font-family: sans-serif;">
      <div style="font-size: 0.5rem; color: #999;">Course Update</div>
      <h1>New Topic has been published</h1>
      <h1><a href="${url}">${topic.title}</a></h1>
      <p><a href="${url}">View Video</a></p>
    </div>
  `
}
