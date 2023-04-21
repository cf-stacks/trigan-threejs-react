import React, { lazy, Suspense } from 'react'
// import HorizontalSlideShow from '../HeroSection/HorizontalSlideShow'
import HorizontalSlideShow from '../../components/home/HeroSection/HorizontalSlideShow'
import { SEO } from '../../components/shared/SEO'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeProvider } from 'next-themes';
import imageDefault from "./ImageDefault.png"

import GlobalLayout from '../../components/layouts/GlobalLayout';

const newpage = () => {
  return (
    <div>
      <ThemeProvider attribute="class" enableSystem={true}>
      <SEO title="Trigan Citizenship: The Future of Inclusive Community Participation" description="With Trigan Citizenship, you'll be able to participate in democratic decision-making, access new opportunities, and contribute to the well-being of your community like never before. Our unique platform combines the power of blockchain technology with real-world relevance, allowing you to make a difference in the world around you." />
      <div className="relative overflow-x-hidden bg-black dark:bg-white bg-opacity-75">
        <GlobalLayout>
          
          <div className="relative w-screen">
            <div className="px-8 md:px-16">
              <div className="mt-[100px]">
                <div className='text-center md:text-left'>
                    <button className='btn bg-slate-100 bg-opacity-25 text-white rounded-full py-1 px-3 text-sm sm:text-center md:text-left'>
                      #JoinTheTriganTeam
                    </button>
                </div>
                <div className="text-white dark:text-black">

                  
                  <div className="mb-30 relative mx-auto max-w-6xl py-5 text-center font-extralight text-slate-100">
                    <h2
                      className="headingStyle relative text-[40px] text-white dark:text-black max-[680px]:text-[32px]"
                    >
                      Join the{' '}
                      <span style={{ color: '#A855F7' } as React.CSSProperties}>
                        Trigan{' '}
                      </span>
                      <span style={{ color: "white" } as React.CSSProperties}>
                        Team
                      </span>
                    </h2>
                    <h2
                        className="headingStyle relative text-[40px] text-white dark:text-black max-[680px]:text-[32px]"
                      >
                        Shape the{' '}
                        <span style={{ color: '#A855F7' } as React.CSSProperties}>
                          Future{' '}
                        </span>
                        <span style={{ color: "white" } as React.CSSProperties}>
                          of Smart Cities
                        </span>
                      </h2>
                  </div>

                  {/* create div with 50% text e other side with image */}
                  <div className="flex mt-10">
                      <div className="w-1/2 text-white dark:text-black flex justify-center">
                        <p className="text-lg font-light">
                          We are a team of passionate individuals who are
                          dedicated to building a better future for our
                          communities. We are looking for talented individuals
                          who share our vision and want to be a part of our
                          journey.
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-center background-form ">
                        {/* <img
                          Waiting Image
                        /> */}
                      </div>
                  </div>


                </div>
                </div>
              </div>
            </div>
            {/* <HorizontalSlideShow /> */}
        </GlobalLayout>
      </div>
      </ThemeProvider>
      </div>
  )
}

export default newpage
