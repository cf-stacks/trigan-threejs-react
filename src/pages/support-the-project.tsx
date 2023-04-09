import Image from 'next/legacy/image'
import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import GlobalLayout from '../components/layouts/GlobalLayout'
import { SEO } from '../components/shared/SEO'

const SupportTheProjectPage: React.FC<any> = () => {
  return (
    <div>
      <SEO
        title="Empowering Charities and the Third Sector with Trigan: A Game-Changing Blockchain Solution"
        description="Trigan's innovative blockchain technology offers a new way for charities and third sector organisations to operate more effectively and achieve greater impact. Find out how Trigan can transform your organisation's operations and make a real difference in the world."
      />
      <GlobalLayout>
        <div className="font-mplus1 mx-auto bg-black text-white">
          <div className="flex flex-col items-center justify-center pb-[60px] pt-[130px] md:pt-[200px]">
            <div className="w-[255px} flex  justify-center rounded-3xl bg-gray-900 px-[32px] py-[8px] font-bold text-white">
              #SupportThe
              <span className=" font-bold text-purple-500">TRIGAN</span>
              Project
            </div>
            <div className="w-[850px]">
              <h2 className="mx-auto mb-[24px] mt-[16px] w-[350px] text-center text-5xl font-medium leading-[48px] text-white md:mb-[8px] md:w-[866px] md:text-6xl md:leading-[73px]">
                {' '}
                Help Us Build a{' '}
                <span className="text-purple-500">Better Future</span> for
                Cities Worldwide
              </h2>
            </div>
            <p className="mx-[10px] mt-[20px] text-center text-[20px] font-bold font-bold  text-gray-300 md:mx-[0px]  md:mt-[8px]">
              {' '}
              Your contribution can make a difference in the lives of millions
              and drive the transformation of urban spaces
              <br />
              <br />
            </p>
            <p className="mx-[10px] mt-[20px] max-w-[620px] text-center text-[20px] font-bold text-gray-300 md:mx-[0px] md:mt-[6px]">
              At Trigan, we're dedicated to creating a world where cities are
              smarter, safer, and more connected, aiming to improve people's
              lives in every corner of the globe.
              <br />
              <br />
              Our innovative platform combines blockchain technology, AI, and
              real-world solutions to empower communities and foster social
              progress. But to truly make an impact, we need your support. By
              contributing to the Trigan Project, you can help us turn our
              vision into reality and pave the way for a more sustainable and
              inclusive future.
            </p>
          </div>
          <div className="mx-auto max-w-screen-xl">
            <div className="w-[375px] md:mr-auto md:w-[715px]">
              <div className="t-[60px] md:t-[120px]  mx-auto flex w-[255px] justify-center rounded-3xl bg-gray-900 p-[8px] font-bold text-white md:mx-[0]">
                #Your
                <span className="font-bold text-purple-500">Support</span>
                Matters
              </div>
              <h2 className="font-mplus1 mb-[16px] mt-[16px] text-center text-3xl leading-10 text-white md:text-left md:text-5xl">
                {' '}
                Accelerate <span className="text-purple-500">Progress</span>
              </h2>
              <p className="mb-[32px] max-w-[620px] text-center text-xl font-bold text-gray-300 md:text-left">
                Your contribution will help us expand and enhance our platform,
                allowing us to reach more cities and provide even better
                solutions for urban challenges.
              </p>
              <Image
                src="/images/support-page-1.png"
                alt="trigan-symbol"
                width={705}
                height={384}
                loading="lazy"
              />{' '}
            </div>

            <div className="ml-auto w-[375px] md:w-[715px]">
              <div className="ml-auto w-[375px] md:w-[620px]">
                <h2 className="font-mplus1 mb-[16px] mt-[16px] text-center text-3xl font-medium leading-10 text-white md:text-right md:text-5xl">
                  {' '}
                  Empower <span className="text-purple-500">Communities</span>
                </h2>
                <p className="mb-[32px] text-center text-xl font-bold text-gray-300 md:text-right">
                  By supporting the Trigan Project, you'll enable us to create
                  opportunities for individuals, businesses, and institutions to
                  thrive and make a positive impact on their communities.
                </p>
              </div>
              <Image
                src="/images/support-page-2.png"
                alt="trigan-symbol"
                width={705}
                height={384}
                loading="lazy"
              />{' '}
            </div>

            <div className="mr-auto w-[375px] md:w-[715px]">
              <h2 className="font-mplus1 mb-[16px] mt-[16px] text-center text-3xl leading-10 text-white md:text-left md:text-5xl">
                {' '}
                Drive <span className="text-purple-500">Innovation</span>
              </h2>
              <p className="mb-[32px] max-w-[620px] text-center text-xl font-bold text-gray-300 md:text-left">
                Your support will help us continue developing cutting-edge
                technology and ground-breaking solutions that can redefine how
                we live, work, and interact in cities.
              </p>
              <Image
                src="/images/support-page-3.png"
                alt="trigan-symbol"
                width={705}
                height={384}
                loading="lazy"
              />{' '}
            </div>

            <div className="ml-auto w-[375px] md:w-[715px]">
              <div className="ml-auto w-[375px] md:w-[620px]">
                <h2 className="font-mplus1 mb-[16px] mt-[16px] text-center text-3xl font-medium leading-10 text-white md:text-right md:text-5xl">
                  {' '}
                  Foster <span className="text-purple-500">Sustainability</span>
                </h2>
                <p className="mb-[32px] text-center text-xl font-bold text-gray-300 md:text-right">
                  Your contribution will allow us to promote environmentally
                  friendly practices and create sustainable urban environments
                  for future generations.
                </p>
              </div>
              <Image
                src="/images/support-page-4.png"
                alt="trigan-symbol"
                width={705}
                height={384}
                loading="lazy"
              />{' '}
            </div>

            <div className="mr-auto w-[375px] md:w-[715px]">
              <h2 className="font-mplus1 mb-[16px] mt-[16px] text-center text-3xl leading-10 text-white md:text-left md:text-5xl">
                {' '}
                Champion <span className="text-purple-500">Equality</span>
              </h2>
              <p className="mb-[32px] max-w-[620px] text-center text-xl font-bold text-gray-300 md:text-left">
                By supporting our mission, you'll help us work towards reducing
                inequality, combating poverty, and building a more balanced and
                inclusive society
              </p>
              <Image
                src="/images/support-page-5.png"
                alt="trigan-symbol"
                width={705}
                height={384}
                loading="lazy"
              />{' '}
            </div>
          </div>

          <div className="mx-auto mt-[54px] text-center md:mt-[108px]">
            <div>
              <h2 className="leading-[42px]md:leading-[73px] max-auto mx-auto mt-[16px] w-[375px] text-center text-4xl font-medium text-white md:w-[551px] md:text-5xl">
                {' '}
                How to Support the{' '}
                <span className="text-purple-500">Trigan Project</span>
              </h2>
              <p className="mx-auto mb-[40px] mt-[32px]  max-w-[1200px] text-xl text-xl font-bold leading-[22px] text-gray-300 md:mt-[8px]">
                Contributing to the Trigan Project is easy, and every little bit
                helps. Here's how you can get involved:
              </p>
            </div>
            <div className="mx-auto w-[355px]  text-sm leading-[22px] text-gray-300 md:w-[580px] md:text-xl">
              <div>
                <h3 className="text-purple-600">Donate</h3>
                <p className="text-xl font-bold">
                  Contribute financially to the project through our secure
                  online donation portal [link to the portal]. Choose a one-time
                  or recurring donation and select the amount that suits you
                  best.
                </p>
              </div>
              <div className="mt-[24px] flex flex-col items-center">
                <h3 className="text-purple-600">Spread the Word</h3>
                <p className="text-xl font-bold">
                  Share our mission with your friends, family, and professional
                  network. Follow us on social media and engage with our content
                  to help raise awareness about the Trigan Project.
                </p>
              </div>
              <div className="mt-[24px] flex flex-col items-center">
                <h3 className="text-purple-600">Offer your expertise</h3>
                <p className="text-xl font-bold">
                  If you have skills, knowledge, or resources that you believe
                  could benefit the project, reach out to us and let us know how
                  you'd like to contribute.
                </p>
              </div>
              <div className="mt-[24px] flex flex-col items-center">
                <h3 className="text-purple-600">Partner with Us</h3>
                <p className="text-xl">
                  If you represent a business or organisation that shares our
                  values and goals, consider partnering to help drive the Trigan
                  Project forward.
                </p>
              </div>
              <div className="mt-[24px] flex flex-col items-center">
                <h3 className="text-purple-600">Stay Informed</h3>
                <p className="text-xl font-bold">
                  Subscribe to our newsletter [link to the subscription form] to
                  receive updates about our progress and learn about new
                  opportunities to support our mission.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-[80px] max-w-screen-xl">
              <div className="flex flex-col gap-[16px] md:flex-row">
                <div className="flex justify-center  rounded-3xl bg-gray-900 px-[32px] py-[8px] font-bold text-white">
                  #Together
                </div>{' '}
                <div className="flex justify-center  rounded-3xl bg-gray-900 px-[32px] py-[8px] font-bold text-white">
                  #YourSupportMatters
                </div>{' '}
                <div className="flex justify-center  rounded-3xl bg-gray-900 px-[32px] py-[8px] font-bold text-white">
                  #SupportTheTRIGAN Project
                </div>
              </div>
              <p className="mx-[10px] w-[360px] pb-[40px] pt-[20px] text-center text-xl font-bold text-gray-300 md:mx-[0px] md:w-[1135px] md:text-left">
                We can build a brighter, more sustainable, and inclusive future
                for cities around the world. Support the Trigan Project today
                and become part of the movement transforming urban living for
                the better.
              </p>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </div>
  )
}
export default SupportTheProjectPage
