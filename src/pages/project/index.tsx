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

            </div>
            </section>
            </GlobalLayout>

    );
}

export default index;