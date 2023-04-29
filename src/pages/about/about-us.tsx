import React from 'react'

import { SEO } from '../../components/shared/SEO'

import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeProvider } from 'next-themes';

import GlobalLayout from '../../components/layouts/GlobalLayout';

const newpage = () => {

  const CARDS_ABOUT_TEAM = [
    {
      id: 1,
      title: 'Collaborative Environment',
      description:" We are a team of passionate, creative, and innovative individuals who are committed to achieving our goals. We believe that collaboration is key to success, and we are always looking for new ways to work together to achieve our goals.",
    },
    {
      id: 2,
      title: 'Personal Growth',
      description:" We are committed to providing our team members with the resources and support they need to grow and develop their skills. We believe that personal growth is essential to achieving our goals, and we are always looking for new ways to help our team members grow and develop.",
    },
    {
      id: 3,
      title: 'Global Impact',
      description:" We are committed to creating a positive impact on the world around us. We believe that our work has the potential to make a difference in the lives of millions of people, and we are always looking for new ways to help our team members grow and develop.",
    },
    {
      id: 4,
      title: 'Networking Opportunities',
      description:" We are committed to providing our team members with the resources and support they need to grow and develop their skills. We believe that personal growth is essential to achieving our goals, and we are always looking for new ways to help our team members grow and develop.",
    },
    {
      id: 5,
      title: 'Sense of Purpose',
      description:" We are committed to creating a positive impact on the world around us. We believe that our work has the potential to make a difference in the lives of millions of people, and we are always looking for new ways to help our team members grow and develop.",
    },
  ];


  return (
    <div>
      <ThemeProvider attribute="class" enableSystem={true}>
      <SEO title="Trigan Citizenship: The Future of Inclusive Community Participation" description="With Trigan Citizenship, you'll be able to participate in democratic decision-making, access new opportunities, and contribute to the well-being of your community like never before. Our unique platform combines the power of blockchain technology with real-world relevance, allowing you to make a difference in the world around you." />
      <div className="relative overflow-x-hidden bg-black dark:bg-white bg-opacity-75">
        <GlobalLayout>
          
          <div className="relative w-screen">
            <div className="px-8 md:px-16">
              <div className="mt-[180px]">
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

                  <div className='flex justify-center w-[100%]'>
                    <p className="text-lg font-light justify-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                    </p>
                  </div>

                  <div className="flex justify-center items-center w-[100%]">
                    <div className="flex w-[100%] justify-center background-form m-5">
                      {/* <img
                        Waiting Image
                      /> */}
                    </div>
                  </div>

                  <div className="flex mt-10 mb-10 max-[680px]:flex-col">
                      <div className="w-[50%] text-white dark:text-black flex justify-center m-2 max-[680px]:w-[90%]">
                        <p className="text-lg font-light text-justify m-5 justify-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer consectetur ante eget lorem eleifend, ac pulvinar tellus venenatis. Fusce vestibulum felis non sapien dignissim interdum. Nam sodales eros sit amet nulla bibendum ultrices. Nullam vel erat ultrices, pretium sapien non, rhoncus felis. Donec auctor aliquet diam, vel euismod lectus malesuada eu. Nunc feugiat tincidunt ornare.
                        </p>
                      </div>
                      <div className="w-[50%] flex justify-center background-form m-5 max-[680px]:w-[90%]">
                        {/* <img
                          Waiting Image
                        /> */}
                      </div>
                  </div>

                  <div className="mb-10 relative mx-auto max-w-6xl py-5 text-center font-extralight text-slate-100">
                    <h2
                      className="headingStyle relative text-[40px] text-white dark:text-black max-[680px]:text-[32px]"
                    >
                      Here's your chance to become{' '}
                    </h2>
                    <h2 className="headingStyle relative text-[40px] text-white dark:text-black max-[680px]:text-[32px]">
                    <span style={{ color: "white" } as React.CSSProperties}>
                        part of this{' '}
                      </span>
                      <span style={{ color: '#A855F7' } as React.CSSProperties}>
                        incredible{' '}
                      </span>
                      <span style={{ color: "white" } as React.CSSProperties}>
                        team{' '}
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-col justify-center items-center w-[100%]">
                    <h4 className="relative text-[30px] text-white dark:text-black max-[680px]:text-[32px] mb-10">
                 
                      <span style={{ color: '#A855F7' } as React.CSSProperties}>
                        What you can expect
                      </span>
                   
                    </h4>
                    
                    <p className="text-lg font-light justify-center mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                    </p>

                    <p className="text-lg font-light justify-center mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                    </p>

                  </div>

                  <div className="flex flex-wrap justify-center m-auto items-center w-[100%] mb-[150px]">
                    { CARDS_ABOUT_TEAM.map((card, index) => (
                      <div className="flex flex-col w-[320px] h-[280px] p-1 bg-white/[.2] m-5 rounded-lg">
                        <div className='w-[55px] flex justify-center items-center'>
                        <div className="flex justify-center items-center bg-[#A855F7] h-[50px] w-[50px] rounded-full">
                          <span className='justify-center font-bold'>{card.id}</span>
                        </div>
                        </div>
                        <div className="flex flex-col justify-center items-center h-[250px]">
                          <h1 className="w-[100%] h-[40px] flex font-bold justify-center mb-5">{card.title}</h1>
                          <p className="w-[100%] h-[170px] text-sm font-light justify-center text-justify mb-2"> {card.description} </p>
                        </div>
                      </div>
                    ))}
                    </div>


                    <div className="flex mt-10  mb-10 max-[680px]:flex-col">
                      <div className="w-[60%] text-white dark:text-black flex flex-col justify-center m-2 max-[680px]:w-[90%]">
                      <h2 className="headingStyle relative text-[30px] text-white dark:text-black max-[680px]:text-[32px] mb-5">
                          <span style={{ color: '#A855F7' } as React.CSSProperties}>
                            To join the Trigan team, follow these simple steps
                          </span>
                      </h2>

                      <div className="flex flex-col w-[100%]">
                          <h2 style={{ color: '#A855F7' } as React.CSSProperties}>
                            Step 1
                          </h2>
                          <p className="text-lg font-light justify-center mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                          </p>
                      </div>

                      <div className="flex flex-col w-[100%]">
                          <h2 style={{ color: '#A855F7' } as React.CSSProperties}>
                            Step 2
                          </h2>
                          <p className="text-lg font-light justify-center mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                          </p>
                      </div>

                      <div className="flex flex-col w-[100%]">
                          <h2 style={{ color: '#A855F7' } as React.CSSProperties}>
                            Step 3
                          </h2>
                          <p className="text-lg font-light justify-center mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                          </p>
                      </div>

                      <div className="flex flex-col w-[100%]">
                          <h2 style={{ color: '#A855F7' } as React.CSSProperties}>
                            Step 4
                          </h2>
                          <p className="text-lg font-light justify-center mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                          </p>
                      </div>

                      <div className="flex flex-col w-[100%]">
                          <h2 style={{ color: '#A855F7' } as React.CSSProperties}>
                            Step 5
                          </h2>
                          <p className="text-lg font-light justify-center mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna sit amet libero consectetur, a bibendum metus tincidunt.
                          </p>
                      </div>



                       
                      </div>
                      <div className="w-[40%] flex justify-center background-form m-5 max-[680px]:w-[90%]">
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

export default newpage;
