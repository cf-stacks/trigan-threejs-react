import React, { useEffect, createRef, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import HorizontalSlider from './HorizontalSlider'
import HashtagHeader from '../HashtagHeader'

const ScrollingSlideShow = () => {
  useEffect(() => {
    AOS.init({ offset: 150 })
  })
  return (
    <div
      className="relative mt-[1600px] flex w-full flex-col items-center gap-20 py-40"
      id="cards"
    >
      <section id="about" className="w-full px-5">
        <FadeInWhenVisible>
          <div>
            <HashtagHeader text="#Trigan Videos" position="left" id="triganVideos" />
            {/* Video Starts */}
            <h6
              className="intro_h dark:text-black"
              style={
                {
                  textAlign: 'center',
                  fontSize: '40px',
                  padding: '25px 160px',
                } as React.CSSProperties
              }
            >
              An Introduction{' '}
              <span style={{ color: '#A855F7' }}>to Trigan</span>
            </h6>
            <div className="aspect-h-9 aspect-w-16 mx-auto flex h-full w-full justify-center opacity-100 first-line:relative max-[500px]:mb-10">
              {/* <AnimationBlob /> */}
              <div className="mx-0 h-full w-full shadow-xl shadow-black md:mx-auto md:h-3/4 md:w-3/4 lg:h-3/4 lg:w-3/4  ">
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="h-full w-full object-cover "
                  src="https://www.youtube.com/embed/VY-QKe19p0Y?mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent"
                />
              </div>
            </div>
            {/* /* Video Ends */}
            <HashtagHeader text="#Our Mission" position="left" id="ourGoals" />
            <div className="mb-30 mx-auto max-w-6xl py-5 text-center font-extralight text-slate-100">
              <h2 className="headingStyle relative mt-10 mb-10 text-xl text-white md:text-5xl dark:text-black">
                Dream of a{' '}
                <span style={{ color: '#A855F7' } as React.CSSProperties}>
                  better future.
                </span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <p>We develop Web3 and AI technologies to create profitable and sustainable business opportunities that drive positive change and improve lives. Our mission is to bridge the gap between Web3 and the real world by creating innovative technologies that make a meaningful impact on society. We believe that social responsibility and collaboration are key to achieving our goals, and we are committed to being a leading force for good in the Web3 space.</p>
                </div>
                <div>
                  {/*} <div className="flex justify-center m-auto mt-[100px] w-[100%] "> {*/}

                  <img
                    className="bg-blend-darken z-10 flex flex-col justify-center lg:mt-[-50px]   lg:h-[300px] lg:w-[350px]  lg:my-[50px] lg:max-[700px]:w-[400px]  lg:max-[950px]:w-[600px] lg:max-[800px]:w-[500px] lg:max-[720px]:w-[400px] lg:max-[560px]:w-[350px] lg:max-[500px]:w-[290px] w-full"
                    src="images/city-girl-1.jpg"
                    alt="girl-looking-out-over-city"
                  />
                </div>
              </div>

              <HorizontalSlider />
            </div>
          </div>
        </FadeInWhenVisible>
      </section>
    </div>
  )
}

export default ScrollingSlideShow
