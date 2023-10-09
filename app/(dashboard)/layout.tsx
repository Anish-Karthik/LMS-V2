

import { Header } from '@/components/shared/header'
import Sidebar from '@/components/shared/side-bar'
import React from 'react'

const DashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='relative h-full'>
      {/* desktop view */}
      
          <Sidebar />
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