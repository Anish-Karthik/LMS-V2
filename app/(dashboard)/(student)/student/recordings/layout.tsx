import { chapters } from '@/app/constants';
import AdminTabs from '@/components/section/recording-section'
import ChapterBar from '@/components/shared/chapter-bar'
import { Header } from '@/components/shared/header';
import React from 'react'
  
const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isAdmin = true;
  const curBatch = 1;


  return (
    <div className='relative h-full'>
      {/* desktop view */}
      {/* <Header /> */}
      {/* <AdminTabs />  */}
      <div className='flex'>
        <ChapterBar chapters={chapters} />
        <main className='w-full'>
          {children}
        </main>
      </div>
    </div>
  )
}
// export type of chapters as chapterType


export default DashBoardLayout