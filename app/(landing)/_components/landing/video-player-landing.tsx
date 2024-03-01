"use client"

import React from "react"
import ReactPlayer from "react-player"

const VideoPlayerLanding = ({ url }: { url: string }) => {
  const [mounted, serMounted] = React.useState(false)
  React.useEffect(() => {
    serMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      controls={true}
      className="rounded-xl"
    />
  )
}

export default VideoPlayerLanding
