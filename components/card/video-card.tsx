"use client"

import { useEffect, useState } from "react"
import ReactPlayer from "react-player"

type VideoCardProps = {
  title?: string
  url?: string
  thumbnail?: string
}

const VideoCard = ({ title, url, thumbnail }: VideoCardProps) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <ReactPlayer
      url={url || "https://www.youtube.com/watch?v=7CqJlxBYj-M"}
      width="100%"
      height="100%"
      controls={true}
    />
  )
}

export default VideoCard
