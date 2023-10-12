import VideoCard from '@/components/card/video-card'
import { getTopicById } from '@/lib/actions/topic.actions'
import React from 'react'

const page = async ({params}: {params :{id: string}}) => {
  const topic = await getTopicById(params.id);
  if(!topic || !topic.videoUrl) return <div>Topic not found</div>

  return (
    <div>
      <div>
        <VideoCard url={topic?.videoUrl} />
      </div>
    </div>
  )
}

export default page