import AdminTabs from '@/components/section/recording-section'
import ChapterBar from '@/components/shared/chapter-bar'
import React from 'react'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='relative h-full'>
      {/* desktop view */}
      <AdminTabs /> 
      <div className='flex'>
        <ChapterBar />
        <main className='w-full'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayout