import AdminTabs from '@/components/section/recording-section'
import ChapterBar from '@/components/shared/chapter-bar'
import { Header } from '@/components/shared/header';
import React from 'react'
  const chapters = [
    {
      id: 1,
      title: '1. Introduction',
      isCompleted: true,
      subTopics: [
        {
          id: 1,
          title: 'Introduction to the course',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 2,
          title: 'Introduction to the course',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 3,
          title: 'Introduction to the course',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }
      ],
    },      
    {
      id: 2,
      title: '2. What is Trading',
      isCompleted: false,
      subTopics: [
        {
          id: 1,
          title: 'Introduction to trading',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 2,
          title: 'Why trading is important',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 3,
          title: 'Knowledge check 2.1',
          type: "quiz",
          quiz: [
            {
              question: "What is use of trading?",
              options: [ "Earn", "Lose", "Nothing"]
            }
          ]
        }, 
      ]
    },
    {
      id: 3,
      title: '3. Why Trade',
      isCompleted: false,
      subTopics: [
        {
          id: 1,
          title: 'Introduction to trading',
          type: 'video',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 2,
          title: 'Why trading is important',
          type: 'lab',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
          id: 3,
          title: 'Knowledge check 2.1',
          type: "assignment",
          quiz: [
            {
              question: "What is use of trading?",
              options: [ "Earn", "Lose", "Nothing"]
            }
          ]
        }
      ]
    }
  ];
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
      <Header />
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
export type Tchapters = typeof chapters;

export default DashBoardLayout