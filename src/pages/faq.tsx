import { ReactNode } from 'react'
import { SEO } from '../components/shared/SEO'
import React, { lazy, Suspense } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout';
import dynamic from 'next/dynamic';
const FaqSection = lazy(() => import('../components/shared/FaqSection/index'))

const VideoHeader = dynamic(() => import('../components/home/HeroSection/VideoHeader'))

interface FaqProps {
  children?: ReactNode
}

const Faq: React.FC<FaqProps> = () => {
  return (
   <div className='dark:bg-white dark:text-black'> 
        <SEO title="FAQ" description="Trigan Frequently Asked Question" />
        <GlobalLayout>
          <VideoHeader isScroll={false}/>
          <FaqSection />
        </GlobalLayout>
    </div>
  )
}

export default Faq
