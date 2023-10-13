import { Header } from '@/components/shared/header';
import { getCourses } from '@/lib/actions/course.actions';
import { isUserPurchasedCourse } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const DashBoardLayout = async ({
  children, params
}: {
  children: React.ReactNode;
  params: {courseId: string}
}) => {
  const user = await currentUser();
  if(!user) redirect('/sign-in');
  if(!params.courseId) redirect('/dashboard/student/courses');
  const purchased = await isUserPurchasedCourse(user.id, params.courseId);
  if(!purchased) redirect('/course-details/' + params.courseId);
  
  return (
    <main>
      {children}
    </main>
  )
}

export default DashBoardLayout