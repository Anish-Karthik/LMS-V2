import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  redirect('/student/courses');
  return (
    <div>page</div>
  )
}

export default page