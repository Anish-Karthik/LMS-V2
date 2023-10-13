import { getCourses } from '@/lib/actions/course.actions';
import { isUserPurchasedCourse } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await currentUser();
  if(!user) redirect('/sign-in');
  const courses = await getCourses();
  if(!courses || !courses.length) return <div>No Courses found</div>
  const purchased = await isUserPurchasedCourse(user.id, courses[0].id);
  if(!purchased) redirect('/course-details/' + courses[0].id);
  redirect(`/student/courses/${courses[0].id}/dashboard`);
  return (
    <>This will not been seen</>
  )
}

export default page