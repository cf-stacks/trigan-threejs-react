import React, { lazy } from 'react';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import ProjectTimeline from '../../components/projectPage/projectTimeline';

const HashtagHeader = lazy(() => import('../../components/home/HashtagHeader'))

const index = () => {
    return (
        <GlobalLayout>
        <section data-aos="fade-up" className="aos-init py-24">
          <div className=" m-auto w-[90%]">
        <HashtagHeader text="#SupportTheTRIGANProject" position="center" id="practosifa"/>

            <div className="m-auto flex justify-center items-center w-[100%] flex-col max-[600px]:text-center">
              <h2 className="flex items-center justify-center text-6xl dark:text-black max-[600px]:text-[28px]">
              Help Us Build a
               <span className='bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-6xl text-transparent pl-2'>
                  Better Future </span> <br />
              </h2>
              <h2 className="flex mt-1 items-center justify-center text-6xl dark:text-black max-[600px]:text-[28px]">
              for Cities Worldwide
                </h2>
             
            </div>
               {/* paragraph text section  */}
            <div className="flex flex-col items-center justify-center w-full]">
                <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
                Your contribution can make a difference in the lives of millions and drive the transformation of urban spaces
                </p>

                <p className="text-[14px] font-m_plus_rounded_1c text-center w-[70%] text-yellow-50 dark:text-black max-[600px]:text-[14px]">
                At Trigan, we're dedicated to creating a world where cities are smarter, safer, and more connected, aiming to improve people's lives in every corner of the globe. 
<br />
<br />
Our innovative platform combines blockchain technology, AI, and real-world solutions to empower communities and foster social progress. But to truly make an impact, we need your support. By contributing to the Trigan Project, you can help us turn our vision into reality and pave the way for a more sustainable and inclusive future.
                </p>



                </div>
                <ProjectTimeline />

                {/* project Text section  */}
                <div className="flex flex-col items-center justify-center w-full">
                  {/* main text div  */}
                  <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="flex items-center justify-center md:text-6xl dark:text-black text-5xl ">
                    How to Support 
                    </h2>
                    <h2 className="flex items-center justify-center my-1 md:text-6xl dark:text-black text-5xl ">
the <span className='bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-6xl text-transparent pl-2'>
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
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
                      Contribute financially to the project through our secure online donation portal [link to the portal]. Choose a one-time or recurring donation and select the amount that suits you best.
                      </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">
                        Spread the Word
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
Share our mission with your friends, family, and professional network. Follow us on social media and engage with our content to help raise awareness about the Trigan Project.
                    </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">


    Offer Your Expertise
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
                      If you have skills, knowledge, or resources that you believe could benefit the project, reach out to us and let us know how you'd like to contribute.
                      </p>
                      </div>

                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-center text-[#A855F7]  to-violet-500 bg-clip-text text-2xl text-transparent">
                      Partner with Us
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
                      If you represent a business or organisation that shares our values and goals, consider partnering to help drive the Trigan Project forward.
                      </p>

                      </div>
                      
                      <div className="mt-8">
                      <h4 className="bg-gradient-to-r text-[#A855F7]  text-center to-violet-500 bg-clip-text text-2xl text-transparent">
                      Stay Informed
                      </h4>
                      <p className="text-[14px] font-m_plus_rounded_1c mb-6 mt-3 text-center text-yellow-50 dark:text-black w-[85%] max-[600px]:text-[14px]">
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