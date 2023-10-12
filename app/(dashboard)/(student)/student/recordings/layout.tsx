// import { chapters } from '@/app/constants';
import AdminTabs from '@/components/section/recording-section'
import ChapterBar from '@/components/shared/chapter-bar'
import { Header } from '@/components/shared/header';
import { getChaptersByBatchId } from '@/lib/actions/chapter.action';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
  
const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await currentUser();
  const userInfo = await getUser(user?.id || '');
  if(!user || !userInfo) redirect('/');
  const curBatch = userInfo.purchases[0].batchId;
  if(!curBatch) redirect('/')
  const chapters = await getChaptersByBatchId(curBatch);

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