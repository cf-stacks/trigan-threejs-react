import Image from 'next/legacy/image'
import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import GlobalLayout from '../components/layouts/GlobalLayout'
import { SEO } from '../components/shared/SEO'
import JoinTheTeamSlider from '../components/home/JoinTheTeamSlider'

const VisionPage: React.FC<any> = () => {
  return (
    <div>
      <SEO
        title="Empowering Charities and the Third Sector with Trigan: A Game-Changing Blockchain Solution"
        description="Trigan's innovative blockchain technology offers a new way for charities and third sector organisations to operate more effectively and achieve greater impact. Find out how Trigan can transform your organisation's operations and make a real difference in the world."
      />
      <GlobalLayout>
        <div className="bg-black text-white">
          <div className="px-[100px]">
            <div>
              {' '}
              <div className="flex flex-col items-center justify-center pt-[120px]">
                <div className="flex w-[255px] justify-center rounded-[30px] bg-gray-800 p-[8px] text-white">
                  #JoinThe
                  <span className="text-purple-500">TRIGAN</span>
                  Project
                </div>
                <h2 className="font-m-plus-1 mb-[24px] w-[375px] text-center text-3xl font-semibold leading-[44px] text-white md:w-[969px] md:text-[60px] md:leading-[73px]">
                  {' '}
                  Join the <span className="text-purple-500">Trigan</span> Team
                  Shape the <span className="text-purple-500">Future</span> of
                  Smart Cities
                </h2>
                <p className="w-[325px] pb-[48px] text-center font-bold text-gray-300 md:w-[100%]">
                  {' '}
                  Be part of a passionate, dedicated team working towards
                  transforming cities and empowering communities.
                </p>
              </div>
            </div>
          </div>

          <JoinTheTeamSlider />
          <div className="mx-auto">
            <div className="mr-0 flex flex-col justify-center text-center md:m-[100px] md:gap-[40px] lg:flex-row">
              {' '}
              <p className="mdmt-[40px] mx-auto w-[375px] font-bold text-gray-300">
                Trigan's mission is to create a more connected, sustainable, and
                inclusive world by transforming how cities function. Our
                platform combines blockchain technology, AI, and real-world
                solutions to foster social progress, improve the quality of
                life, and drive economic development.
                <br />
                <br />
                Our team is the driving force behind our success, and we're
                always looking for talented, motivated individuals to join us on
                this exciting journey.If you share our vision and are eager to
                make a difference, we'd love to hear from you. Our team is
                entirely volunteer-based, consisting of over 50 passionate
                professionals from diverse backgrounds and skill sets, all
                committed to making an impact.
              </p>
              <div className="pt-[16px]">
                <Image
                  src="/images/team-page-2.png"
                  alt="trigan-symbol"
                  width={905}
                  height={414}
                  loading="lazy"
                />{' '}
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-m-plus-1 mx-auto my-[16px] w-[375px] text-center text-3xl font-semibold leading-[44px] text-white md:w-[955px] md:text-6xl md:leading-[73px]">
              {' '}
              Here’s your chance to become part of this{' '}
              <span className="text-purple-500">incredible</span> team.
            </h2>

            <div className="mb-[100px] mt-[24px] flex flex-col items-center">
              <h3 className="pb-[38px] text-purple-500">What you can expect</h3>
              <p className=" w-[355px] text-center font-bold text-gray-300 md:w-[600px]">
                Trigan's mission is to create a more connected, sustainable, and
                inclusive world by transforming how cities function. Our
                platform combines blockchain technology, AI, and real-world
                solutions to foster social progress, improve the quality of
                life, and drive economic development.
                <br />
                <br />
                Our team is the driving force behind our success, and we're
                always looking for talented, motivated individuals to join us on
                this exciting journey.If you share our vision and are eager to
                make a difference, we'd love to hear from you. Our team is
                entirely volunteer-based, consisting of over 50 passionate
                professionals from diverse backgrounds and skill sets, all
                committed to making an impact.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-[25px] md:gap-[69px]">
            <div className="feature-box .bg-opacity-25 h-[307px] w-[360px] rounded-[40px] bg-gray-500 md:w-[400px]">
              <div className="pl-[27px] pt-[50px] md:pl-[39px]">
                <div className="relative mb-[27px] text-white">
                  <span className="absolute left-[6.8%] top-[25%] z-10 text-xl">
                    1
                  </span>
                  <Image
                    src="/images/bubble.svg"
                    alt="trigan-symbol"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h4 className="pb-[12px] text-2xl">
                  Collaborative Environment
                </h4>
                <p className="w-[342px] font-bold text-gray-300">
                  Work alongside like-minded individuals from various fields,
                  united by a common goal of shaping the future of smart cities.
                </p>
              </div>
            </div>
            <div className="feature-box h-[307px] w-[360px] rounded-[40px] bg-gray-500 md:w-[400px]">
              <div className="pl-[27px] pt-[50px] md:pl-[39px]">
                <div className="relative mb-[27px] text-white">
                  <span className="absolute left-[6.8%] top-[25%] z-10 text-xl">
                    2
                  </span>
                  <Image
                    src="/images/bubble.svg"
                    alt="trigan-symbol"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h4 className="pb-[12px] text-2xl">Personal Growth</h4>
                <p className="w-[327px] font-bold  text-gray-300 md:w-[342px]">
                  Develop new skills, expand your knowledge, and gain invaluable
                  experience as you contribute to a groundbreaking project
                </p>
              </div>
            </div>
            <div className="feature-box h-[307px] w-[360px] rounded-[40px] bg-gray-500 md:w-[400px]">
              <div className="pl-[27px] pt-[50px] md:pl-[39px]">
                <div className="relative mb-[27px] text-white">
                  <span className="absolute left-[6.8%] top-[25%] z-10 text-xl">
                    3
                  </span>
                  <Image
                    src="/images/bubble.svg"
                    alt="trigan-symbol"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h4 className="pb-[12px] text-2xl">Global Impact</h4>
                <p className="text-gray-300] w-[342px]  font-bold text-gray-300">
                  Be part of a team working towards making a lasting positive
                  change in cities worldwide.
                </p>
              </div>
            </div>
            <div className="feature-box h-[307px] w-[360px] rounded-[40px]  bg-gray-500 md:w-[400px]">
              <div className="pl-[27px] pt-[50px] md:pl-[39px]">
                <div className="relative mb-[27px] text-white">
                  <span className="absolute left-[6.8%] top-[25%] z-10 text-xl">
                    4
                  </span>
                  <Image
                    src="/images/bubble.svg"
                    alt="trigan-symbol"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h4 className="pb-[12px] text-2xl">Networking Opportunities</h4>
                <p className="w-[327px] font-bold text-gray-300 md:w-[342px]">
                  Connect with professionals from different industries,
                  fostering relationships that can lead to exciting new
                  opportunities and collaborations.
                </p>
              </div>
            </div>
            <div className="feature-box h-[307px] w-[360px] rounded-[40px]  bg-gray-500 md:w-[400px]">
              <div className="pl-[27px] pt-[50px] md:pl-[39px]">
                <div className="relative mb-[27px] text-white">
                  <span className="absolute left-[6.8%] top-[25%] z-10 text-xl">
                    5
                  </span>
                  <Image
                    src="/images/bubble.svg"
                    alt="trigan-symbol"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h4 className="pb-[12px] text-2xl">Sense of Purpose</h4>
                <p className="w-[327px] font-bold text-gray-300 md:w-[342px]">
                  Experience the satisfaction of knowing that your efforts
                  directly contribute to the betterment of society and the
                  environment
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-[45px] py-[100px]">
            {' '}
            <div className="w-[325px] md:w-[650px]">
              <h4 className="mb-[32px] w-[375px]  text-center text-xl font-bold text-purple-500 md:w-[100%] md:text-left">
                To join the Trigan team, follow these simple steps
              </h4>
              <div>
                <h4 className="mx-[10px] w-[360px] text-justify text-sm font-bold text-purple-500 md:mx-[0px] md:my-[16px] md:w-[500px]">
                  Step 1.
                </h4>
                <p className="mx-[10px] w-[360px] text-justify font-bold  md:mx-[0px] md:w-[100%]">
                  Fill out our online application form [link to the form],
                  providing your contact information, background, and relevant
                  experience.
                </p>
              </div>
              <div>
                <h4 className="mx-[10px] w-[360px] text-justify text-sm font-bold text-purple-500 md:mx-[0px] md:my-[16px] md:w-[500px]">
                  Step 2.
                </h4>
                <p className="mx-[10px] w-[360px] text-justify  font-bold  md:mx-[0px] md:w-[100%]">
                  Tell us why you're interested in joining the Trigan team and
                  how you believe you can contribute to our mission.
                </p>
              </div>
              <div>
                <h4 className=" mx-[10px] w-[360px] text-justify text-sm font-bold font-bold text-purple-500 md:mx-[0px] md:my-[16px] md:w-[500px]">
                  Step 3.
                </h4>
                <p className="mx-[10px] w-[360px] text-justify  font-bold  md:mx-[0px] md:w-[100%]">
                  Attach your resume or CV and any relevant portfolio pieces or
                  work samples, if applicable.
                </p>
              </div>
              <div>
                <h4 className="mx-[10px] w-[360px] text-justify text-sm  font-bold font-bold text-purple-500 md:mx-[0px] md:my-[16px] md:w-[500px]">
                  Step 4.
                </h4>
                <p className="mx-[10px] w-[360px] text-justify  font-bold  md:mx-[0px] md:w-[100%]">
                  Submit your application and wait for our team to review it.
                  We'll be in touch if we believe you're a great fit for our
                  team. Take advantage of this unique opportunity to be part of
                  a transformative movement that's reshaping the future of urban
                  living. Apply now and join us in making a difference, one city
                  at a time.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/images/team-page-3.jpg"
                alt="trigan-symbol"
                width={705}
                height={600}
                loading="lazy"
              />{' '}
            </div>
          </div>
        </div>
      </GlobalLayout>
    </div>
  )
}

export default VisionPage
