import React, { lazy } from 'react';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import ProjectTimeline from '../../components/projectPage/projectTimeline';

const HashtagHeader = lazy(() => import('../../components/home/HashtagHeader'))

const index = () => {
    return (
        <GlobalLayout>
        <section data-aos="fade-up" className="aos-init py-24">
          <div className=" m-auto w-[90%]">
          <button className=' mb-2 mx-auto flex h-[41px] w-fit items-center justify-center rounded-[30px] bg-neutralBlack-50 py-2 px-4 text-neutralGray-10'>
          #SupportThe
       <span className='bg-gradient-to-r text-[#A855F7] to-violet-500 bg-clip-text text-transparent text-[14px] font-m_plus_rounded_1c font-bold'>
    
        TRIGAN
      </span>
      Project
      </button>

            <div className="m-auto flex justify-center items-center w-[100%] flex-col max-[600px]:text-center">
              <h2 className="w-full flex flex-col md:flex-row items-center justify-center text-4xl md:text-5xl lg:text-6xl dark:text-black">
              Help Us Build a
               <span className='bg-gradient-to-r  flex-wrap from-pink-500 to-violet-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl text-transparent pl-2'>
                 {/* <span className='bg-blue-500 pt-2'> */}
                  Better Future </span> 
              </h2>
              <h2 className="flex mt-2 md:mt-4 items-center justify-center text-4xl md:text-5xl lg:text-6xl dark:text-black max-[600px]:text-[28px]">
              for Cities Worldwide
                </h2>
             
            </div>
               {/* paragraph text section  */}
            <div className="flex flex-col items-center justify-center w-full]">
                <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-96 md:w-full pb-2 max-[600px]:text-[14px]">
                Your contribution can make a difference in the lives of millions and drive the transformation of urban spaces
                </p>

                <p className="text-[14px] font-m_plus_rounded_1c text-center w-[90%] text-yellow-50 dark:text-black max-[600px]:text-[14px]">
                At Trigan, we're dedicated to creating a world where cities are smarter, safer, and more connected, aiming to improve people's lives in every corner of the globe. 
<br />
<br />
Our innovative platform combines blockchain technology, AI, and real-world solutions to empower communities and foster social progress. But to truly make an impact, we need your support. By contributing to the Trigan Project, you can help us turn our vision into reality and pave the way for a more sustainable and inclusive future.
                </p>



                </div>
                <section className='py-12'>
       {/* create a button with text '#YourSupportMatters' and the word support is colored in violet */}
      <button className='flex h-[41px] w-fit items-center justify-center rounded-[30px] bg-neutralBlack-50 py-2 px-4 text-neutralGray-10'>
      #Your
       <span className='bg-gradient-to-r text-[#A855F7] to-violet-500 bg-clip-text text-transparent text-[14px] font-m_plus_rounded_1c font-bold'>
        Support
      </span>
      Matters
      </button>
                <ProjectTimeline />

                </section>

                {/* project Text section  */}
                <div className="flex flex-col items-center justify-center w-full">
                  {/* main text div  */}
                  <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="flex items-center justify-center md:text-6xl dark:text-black text-5xl ">
                    How to Support 
                    </h2>
                    <h2 className="flex items-center justify-center my-1 text-4xl md:text-5xl lg:text-6xl dark:text-black">
the <span className='bg-gradient-to-r text-center text-[#A855F7] to-violet-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl text-transparent pl-2'>
                  Trigan Project </span> <br />
                    </h2>
                    <p className="text-base font-m_plus_rounded_1c font-light mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
                    Contributing to the Trigan Project is easy, and every little bit helps. Here's how you can get involved:
                    </p>
                    </div>

                    {/* text div group */}
                    <div className="flex flex-col items-center my-8 justify-center w-[820px]">
                      <div>

                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">
                     Donate
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c w-96 md:w-full pb-2 mt-3 text-center text-yellow-50 dark:text-black ">
                      Contribute financially to the project through our secure online donation portal [link to the portal]. Choose a one-time or recurring donation and select the amount that suits you best.
                      </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">
                        Spread the Word
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-96 md:w-full pb-2 max-[600px]:text-[14px]">
Share our mission with your friends, family, and professional network. Follow us on social media and engage with our content to help raise awareness about the Trigan Project.
                    </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">


    Offer Your Expertise
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-96 md:w-full pb-2 max-[600px]:text-[14px]">
                      If you have skills, knowledge, or resources that you believe could benefit the project, reach out to us and let us know how you'd like to contribute.
                      </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">
                      Partner with Us
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-96 md:w-full pb-2 max-[600px]:text-[14px]">
                      If you represent a business or organisation that shares our values and goals, consider partnering to help drive the Trigan Project forward.
                      </p>

                      </div>
                      
                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-[#A855F7]  text-center to-violet-500 bg-clip-text text-2xl text-transparent">
                      Stay Informed
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-96 md:w-full pb-2 max-[600px]:text-[14px]">
                      Subscribe to our newsletter [link to the subscription form] to receive updates about our progress and learn about new opportunities to support our mission.
                      </p>
                      </div>
                      </div>
                      

                      
                      </div>

            </div>
            </section>
            </GlobalLayout>

    );
}

export default index;