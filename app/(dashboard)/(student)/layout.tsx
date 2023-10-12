import { Header } from '@/components/shared/header';
import { getCourses } from '@/lib/actions/course.actions';
import { isUserPurchasedCourse } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await currentUser();
  if(!user) redirect('/sign-in');
  const courses = await getCourses();
  if(!courses || !courses.length) return <div>No Courses found</div>
  const purchased = await isUserPurchasedCourse(user.id, courses[0].id);
  if(!purchased) redirect('/course-details/' + courses[0].id);
  
  return (
    <div className='relative h-full'>
      {/* desktop view */}
      <Header />
      {/* <AdminTabs />  */}
      <div className='flex'>
        <main className='w-full'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayout