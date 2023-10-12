
import { getCourses } from '@/lib/actions/course.actions'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const courses = await getCourses();
  if (!courses || courses.length === 0) redirect('/teacher/course/create');

  redirect('/teacher/course/' + courses[0].id);
  return (
    <div>page</div>
  )
}

export default page