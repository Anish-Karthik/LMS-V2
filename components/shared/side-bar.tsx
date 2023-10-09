"use client"
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/app/constants'


const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});


const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='inset-y-0 hidden h-full md:fixed md:flex md:w-60 md:flex-col' >
      <div className='m-2 flex h-full flex-col space-y-4 rounded-md border-2 py-4'>
        <div className='flex-1 px-3 py-2'>

          <div className='space-y-6 '>
            {routes.map((route) =>(
              <Link
                key={route.label}
                href={route.href}
                className={cn('group flex w-full cursor-pointer justify-start rounded-lg bg-secondary p-6 text-sm transition-all duration-200 ease-in-out hover:bg-primary hover:text-secondary', 
                pathname === route.href ? '' : ''
                )}
              >
                <div className='flex flex-1 items-center'>
                  <route.icon className={cn('mr-2 h-5 w-5',route.color)} aria-hidden='true' />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar