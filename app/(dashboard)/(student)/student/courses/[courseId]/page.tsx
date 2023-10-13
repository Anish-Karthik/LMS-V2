import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({params}: {params: {courseId: string}}) => {
  redirect('/student/courses/' + params.courseId + '/dashboard');
  return (
    <div>page</div>
  )
}

export default page