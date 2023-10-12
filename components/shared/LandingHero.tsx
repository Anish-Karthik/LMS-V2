"use client"
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className=' font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl'>
        <h1>The Best Trading Course for</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-2'>
          <TypewriterComponent
            options={{
              strings: [
                "Anyone who wants to learn trading",
                "Becoming a successful trader",
                "Making money online",
                "Trade with confidence"
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        Learn how to trade with our step-by-step video tutorials and live webinars.
      </div>
      <div>
        <Link href={isSignedIn ? "/course-details" : "/sign-up"}>
          <Button className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
            Start Learning
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>
      </div>
    </div>
  )
}
