import AboutComponent from '../components/about'
import { SEO } from '../components/shared/SEO'
import React, { lazy, Suspense } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout';
import { Router, useRouter } from 'next/router';
import disablePagesList from '../../disablePagesList';

const About = () => {
  const router = useRouter()
  const currentUrl = new URL(import.meta.url);
  const currentFilename = currentUrl.pathname.split('/').pop()?.replace(".tsx","");
  if(currentFilename && disablePagesList.includes(currentFilename))
  {
      router.push("/");    
  }
  else
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
