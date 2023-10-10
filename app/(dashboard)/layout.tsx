

import { Header } from '@/components/shared/header'
import Sidebar from '@/components/shared/side-bar'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { clerkClient } from "@clerk/nextjs";
import { Trole } from '../constants'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  if (!user.publicMetadata.role) await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      role: "user",
    }
  })
  const isAdmin = user?.publicMetadata.role === 'admin';

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