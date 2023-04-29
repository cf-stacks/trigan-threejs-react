import AboutComponent from '../components/about'
import { SEO } from '../components/shared/SEO'
import React, { lazy, Suspense } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout';

const About = () => {
  var disablePage = process.env.NEXT_PUBLIC_DISABLE_PAGE;
   if(disablePage === 'true')
    {
        return null;
    }
  return (
    <div className='dark:bg-white'>
      <SEO title="About" description='About Trigan' />
        <GlobalLayout>
          <AboutComponent />
      </GlobalLayout>
     </div>
  )
};

export default About;
