import React, { useEffect, createRef, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import HorizontalSlider from './HorizontalSlider'
import HashtagHeader from '../HashtagHeader'



const ScrollingSlideShow = () => {
  const [text, setText] = useState("");

  // useEffect(() => {
  //   AOS.init({ offset: 150 })
  // })


  useEffect(() => {
    const textComplete = "We develop Web3 and AI technologies to create profitable and sustainable business opportunities that drive positive change and improve lives. Our mission is to bridge the gap between Web3 and the real world by creating innovative technologies that make a meaningful impact on society. We believe that social responsibility and collaboration are key to achieving our goals, and we are committed to being a leading force for good in the Web3 space.";
    setText(textComplete);
    // let i = 0;
    // const timer = setInterval(() => {
      // setText(textComplete.substring(0, i));
    //   i++;
    //   if (i > textComplete.length) {
    //     clearInterval(timer);
    //   }
    // }, 10);
  }, []);
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
              <h2 data-aos="fade-up" className="headingStyle relative mt-10 mb-10 text-[40px] max-[680px]:text-[32px] text-white dark:text-black">
                Dream of a{' '}
                <span style={{ color: '#A855F7' } as React.CSSProperties}>
                  better future.
                </span>
              </h2>
              <div> 
              <div className=' flex m-auto mt-[100px] mb-[150px] max-[850px]:flex-col max-[850px]:mt-[40px]'>
                <div  className='w-[50%] text-justify p-4 max-[850px]:flex-col max-[850px]:m-auto max-[850px]:w-[100%]'>
                <h3 className='mt-[-20px] text-xl max-[680px]:text-md max-[480px]:text-sm'>
                  {text.split('').map((char, index) => {
                    const key = `${index}-${char}`;
                    return (
                      <span
                        key={key}
                      >
                        {char}
                      </span>
                    );
                  })}
                </h3>
                </div>
                {/* <hr className='mt-20 border-4 border-purple-600' /> */}
                <div className='bg-[#A855F7] w-[450px] h-[400px] object-cover max-[600px]:w-[400px] max-[600px]:h-[350px] max-[500px]:w-[300px] max-[500px]:h-[250px] max-[850px]:mt-[35px] flex justify-center align-center m-auto max-[600px]:flex-col max-[600px]:m-auto max-[600px]:mt-5' >
                  
                  <img
                    className="m-auto bg-blend-darken w-[450px] h-[400px] object-cover max-[600px]:w-[400px] max-[600px]:h-[350px] max-[500px]:w-[300px] max-[500px]:h-[250px] transform rotate-3"
                    src="images/city-girl-1.jpg"
                    alt="girl-looking-out-over-city"
                  />
                </div>
              </div>
           <div>
          {/*} <div className="flex justify-center m-auto mt-[100px] w-[100%] "> {*/}
     

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
