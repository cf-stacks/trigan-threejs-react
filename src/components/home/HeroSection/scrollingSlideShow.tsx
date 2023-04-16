import React, { useEffect, useState } from 'react'
import 'aos/dist/aos.css'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import HorizontalSlider from './HorizontalSlider'
import HashtagHeader from '../HashtagHeader'
import BlogSlide from './BlogSlide'

const ScrollingSlideShow = () => {
  const [text, setText] = useState('')

  useEffect(() => {
    const textComplete =
      'We develop Web3 and AI technologies to create profitable and sustainable business opportunities that drive positive change and improve lives. Our mission is to bridge the gap between Web3 and the real world by creating innovative technologies that make a meaningful impact on society. We believe that social responsibility and collaboration are key to achieving our goals, and we are committed to being a leading force for good in the Web3 space.'
    setText(textComplete)
  }, [])

  return (
    <div
      className="relative mt-[1600px] flex w-full flex-col items-center gap-20 py-40"
      id="cards"
    >
      <section id="about" className="w-full px-5">
        <FadeInWhenVisible>
          <div>
            <HashtagHeader
              text="#Trigan Videos"
              position="left"
              id="triganVideos"
            />
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
            <div className="mb-30 relative mx-auto max-w-6xl py-5 text-center font-extralight text-slate-100">
              <h2
                data-aos="fade-up"
                className="headingStyle relative mb-10 mt-10 text-[40px] text-white dark:text-black max-[680px]:text-[32px]"
              >
                Dream of a{' '}
                <span style={{ color: '#A855F7' } as React.CSSProperties}>
                  better future.
                </span>
              </h2>
              <div>
                <div className=" m-auto mb-[150px] mt-[100px] flex max-[850px]:mt-[40px] max-[850px]:flex-col">
                  <div className="w-[50%] p-4 text-justify max-[850px]:m-auto max-[850px]:w-[100%] max-[850px]:flex-col">
                    <h3 className="max-[680px]:text-md mt-[-20px] text-xl max-[480px]:text-sm">
                      {text.split('').map((char, index) => {
                        const key = `${index}-${char}`
                        return <span key={key}>{char}</span>
                      })}
                    </h3>
                    <hr className="mt-5 border-4 border-purple-600" />
                  </div>
                  <div className="align-center  m-auto flex h-[400px] w-[450px] justify-center bg-[#A855F7] object-cover max-[850px]:mt-[35px] max-[600px]:m-auto max-[600px]:mt-5 max-[600px]:h-[350px] max-[600px]:w-[400px] max-[600px]:flex-col max-[500px]:h-[250px] max-[500px]:w-[100%]">
                    <img
                      className="m-auto h-[400px] w-[450px] rotate-3 transform object-cover bg-blend-darken max-[600px]:h-[350px] max-[600px]:w-[400px] max-[500px]:h-[250px] max-[500px]:w-[300px]"
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
          <HashtagHeader text="#Blog" position="left" id="ourSolution" />
          <BlogSlide />
        </FadeInWhenVisible>
      </section>
    </div>
  )
}

export default ScrollingSlideShow
