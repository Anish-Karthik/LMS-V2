import React from "react"

type ChapterCardProps = {
  chapter: any
  onClick: () => void
}

const ChapterCard = ({ chapter, onClick }: ChapterCardProps) => {
  return (
    // create me an card that has a title, that is used as side nav
    <div onClick={onClick} className=""></div>
  )
}

export default ChapterCard
