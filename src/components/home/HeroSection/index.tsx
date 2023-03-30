import { ReactNode } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import React, { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'

const ScrollingSlideShow = dynamic(() => import('./scrollingSlideShow'))
const VideoHeader = dynamic(() => import('./VideoHeader'))
// import ScrollingSlideShow from './scrollingSlideShow'
// import VideoHeader from'./VideoHeader'

interface HeroSectionProps {
  children?: ReactNode
}
const BUTTONS = [
  {
    title: 'Buy Now',
    link: '/buy',
  },
]
const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    // bg-slate-300/70
    <>
      <div className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <VideoHeader isScroll={true}/>
          <ScrollingSlideShow />
        </Suspense>
      </div>
    </>
  )
}
export default HeroSection
