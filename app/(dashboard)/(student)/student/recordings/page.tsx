import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { communityTabs } from '@/app/constants';
import Image from 'next/image';
import React from 'react'
import RecordingSection from '@/components/section/recording-section';
import Link from 'next/link';
import VideoCard from '@/components/card/video-card';

const RecordingPage = () => {
  const isAdmin = true;
  const curBatch = 1;
  return (
    <div className='h-full w-full'>
      here beautiful course description will be showed, Until then just navigate around the tabs
    </div>
  )
}

export default RecordingPage;