import Image from 'next/legacy/image'
import 'react-lazy-load-image-component/src/effects/blur.css'
import React, { lazy, Suspense } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout'
import { SEO } from '../components/shared/SEO'
import { useRouter } from 'next/router'
import disablePagesList from '../../disablePagesList'

const IntroductionPage = () => {
  const router = useRouter()
  const currentUrl = new URL(import.meta.url)
  const currentFilename = currentUrl.pathname
    .split('/')
    .pop()
    ?.replace('.tsx', '')
  if (currentFilename && disablePagesList.includes(currentFilename)) {
    router.push('/')
  } else
    return (
      <div>
        <SEO
          title="Empowering Charities and the Third Sector with Trigan: A Game-Changing Blockchain Solution"
          description="Trigan's innovative blockchain technology offers a new way for charities and third sector organisations to operate more effectively and achieve greater impact. Find out how Trigan can transform your organisation's operations and make a real difference in the world."
        />
        <div className="relative overflow-x-hidden bg-black bg-opacity-75">
          <GlobalLayout>
            <div className="relative w-screen">
              <div className="sm:px-4 sm:px-8 md:px-20 md:px-8 lg:px-32">
                <div className="grid justify-items-center">
                  <div>
                    <button className="btn rounded-full bg-slate-100 bg-opacity-25 px-3 py-1 text-sm text-white">
                      #Introduction
                    </button>
                  </div>
                  <div className="mt-5">
                    <p className="text-center font-sans text-2xl font-medium text-white sm:text-3xl md:text-4xl lg:text-5xl">
                      The Future of{' '}
                      <span className="text-violet-600">Social Impact</span>
                    </p>
                  </div>
                  <div className="mt-3 px-4">
                    <p className="text-justify font-sans leading-snug  text-slate-400 sm:text-sm md:text-center md:text-lg md:leading-relaxed">
                      Trigan is more than just a technology company. We are a
                      team of passionate individuals committed to making a
                      positive impact in the world. That’s why we’ve developed a
                      platform that has the potential to transform the way
                      charities and third sector organizations operate, enabling
                      them to make a bigger difference in the lives of those
                      they serve.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      role="button"
                      className="lg:text-md rounded-full border bg-red-600 px-4 py-1 text-sm font-bold text-white hover:bg-red-700 md:ml-2 md:text-sm lg:py-2"
                    >
                      Start Explore Now
                    </button>
                  </div>
                </div>

                <div className="mb-6 mt-32 sm:px-2">
                  <div className="text-center md:text-left">
                    <button className="btn rounded-full bg-slate-100 bg-opacity-25 px-3 py-1 text-sm text-white">
                      #Power Blockchain
                    </button>
                  </div>
                  <div className="mt-5 text-center md:text-left">
                    <p className="px-3 font-sans text-2xl font-medium text-white sm:text-3xl md:text-4xl lg:text-5xl">
                      Increased{' '}
                      <span className="text-violet-600">
                        Transparency and Trust
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col md:mt-5 md:flex-row">
                    <div className="flex w-full items-center justify-center md:w-4/12">
                      <div className="w-3/5">
                        <Image
                          src="/images/trigan-symbol-white.svg"
                          alt="trigan-symbol"
                          width={100}
                          height={50}
                          layout="responsive"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="w-full text-justify md:w-8/12 md:text-left">
                      <div className="px-4 md:px-8">
                        <p className="my-8 text-sm font-normal leading-relaxed text-gray-400 text-gray-500">
                          Blockchain technology is known for its security and
                          transparency. By leveraging the power of our
                          decentralized, distributed database, charities and
                          third sector organizations can have confidence that
                          their resources are being used in the most efficient
                          and effective manner possible. This not only helps to
                          increase trust in the organizations themselves, but
                          also helps to build trust in the broader sector as a
                          whole.
                        </p>

                        <div className="mt-5 text-center md:text-left">
                          <button
                            role="button"
                            className="lg:text-md rounded-full border bg-red-600 px-4 py-1 text-sm font-bold text-white hover:bg-red-700 md:ml-6 lg:py-2"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 grid justify-items-center">
                  <div className="mt-10 w-full px-4">
                    <div className="bg-white-800 rounded-3xl bg-gradient-to-tl from-neutral-900 to-neutral-700 px-2 py-6 shadow-md md:px-28">
                      <div className="flex flex-row">
                        <div className="w-full p-4 text-right">
                          <button className="btn rounded-full bg-slate-100 bg-opacity-25 px-3 py-1 text-xs text-white">
                            #Introduction
                          </button>
                          <h5 className="my-2 text-lg font-medium tracking-tight text-white md:text-2xl">
                            Empowering
                          </h5>
                          <h5 className="mb-2 text-lg font-medium tracking-tight text-violet-600 md:text-2xl">
                            Communities and Individuals
                          </h5>
                          <p className="mb-3 text-justify text-sm font-normal leading-relaxed text-gray-400 text-gray-500 sm:text-right">
                            Trigan Citizenship is more than just a concept. It’s
                            a way of life that embodies the value of community,
                            compassion, and collaboration. By becoming a Trigan
                            Citizen, individuals and organizations can join a
                            global movement of like-minded individuals committed
                            to making a positive difference in the world. This
                            not only helps to increase the impact of individual
                            organizations, but also helps to create a sense of
                            shared purpose and common goals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid justify-items-center">
                  <div className="mt-6 w-full px-3">
                    <div className="bg-white-800 rounded-3xl bg-gradient-to-tl from-neutral-900 to-neutral-700 px-2 py-6 shadow-md md:px-28">
                      <div className="flex flex-row">
                        <div className="w-full p-4">
                          <button className="btn rounded-full bg-slate-100 bg-opacity-25 px-3 py-1 text-xs text-white">
                            #Solving Real-World Problems
                          </button>
                          <h5 className="my-2 text-lg font-medium tracking-tight text-white md:text-2xl">
                            From{' '}
                            <span className="text-violet-600">
                              Poverty to Inequality
                            </span>
                          </h5>
                          <p className="mb-3 text-justify text-sm font-normal leading-relaxed text-gray-400 text-gray-500 sm:text-left">
                            Trigan is more than just a platform. It’s a solution
                            to some of the most pressing problems facing our
                            world today. From poverty and deprivation to
                            corruption and inequality, Trigan is uniquely
                            positioned to tackle these challenges head on. By
                            leveraging the power of our blockchain technology
                            and Trigan Citizenship, we can create a more
                            equitable, sustainable, and prosperous society for
                            all.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid justify-items-center">
                  <div className="mt-8 w-full px-3">
                    <div className="bg-white-800 rounded-3xl bg-gradient-to-tl from-neutral-900 to-neutral-700 px-2 py-12 shadow-md md:px-28">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full p-4 md:w-8/12">
                          <p className="mb-2 text-base font-extralight text-white">
                            Let’s Join Us Movement
                          </p>
                          <h5 className="mb-2 text-2xl font-medium tracking-tight text-white">
                            Contact Our Team
                          </h5>
                          <p className="mb-3 text-sm font-normal leading-relaxed text-gray-400 text-gray-500">
                            Whether you’re a charity or third sector
                            organization looking to enhance your impact, or an
                            individual looking to make a difference in your
                            community, there are countless ways to get involved
                            with Trigan
                          </p>
                        </div>
                        <div className="flex flex-row items-center p-4 sm:w-full md:w-4/12">
                          <button
                            role="button"
                            className="lg:text-md ml-3 rounded-full border bg-red-600 px-4 py-1 text-sm font-bold text-white hover:bg-red-700 lg:py-2"
                          >
                            Try Now
                          </button>
                          <button
                            role="button"
                            className="lg:text-md ml-3 rounded-full border px-4 py-1 text-sm font-bold text-white lg:py-2"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlobalLayout>
        </div>
      </div>
    )
}

export default IntroductionPage
