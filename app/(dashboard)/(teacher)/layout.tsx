

import { Header } from '@/components/shared/header'
import Sidebar from '@/components/shared/side-bar'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { clerkClient } from "@clerk/nextjs";
import { Trole } from '@/app/constants'
import { getUser } from '@/lib/actions/user.actions'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const userInfo = await getUser(user.id);
  if (!userInfo) redirect('/sign-in');
  if(userInfo.role === 'student') redirect('/');

  return (
    <div className='relative h-full'>
      {/* desktop view */}
      
      <Sidebar role={user.publicMetadata.role as Trole} />
      <main className='m-2 md:ml-60'>
        <div className=''>
          <div className='m-2 rounded-md border-2'>
            <Header />
          </div>
          <div className='m-2 rounded-md border-2'>
            {children}
          </div>   
        </div>
      </main>
    </div>
  )
}

export default DashBoardLayout