import Form from '../../components/form'
import Maps from '../../components/map'
// import HiLocationMarker from react icons/hi
import { HiLocationMarker } from 'react-icons/hi'
// IoCall
import { IoCall } from 'react-icons/io5'
import React, { lazy, Suspense , useEffect } from 'react'
const GlobalLayout = lazy(() => import('../../components/layouts/GlobalLayout'))

const Engage = () => {
  return (
    <div className=' dark:bg-white dark:text-black'>
      <GlobalLayout>
        <div className="flex flex-col px-3 pb-20 sm:px-0 w-[95%] mx-auto ">
        <div className="mt-[200px] grid grid-cols-1 lg:grid-cols-2 gap-2 justify-items-center">
        <div className="flex flex-col w-full  justify-center">
          <Form />
          </div>
     {/* map div component belowa */}
       <div 
       className="flex flex-col w-full justify-center items-center lg:mt-32">
          <Maps />
          <div className="flex bg-black dark:bg-white w-[91%] flex-col justify-around  text-left md:flex-row md:items-center md:text-center ">
          <div className="flex pb-3  pl-3 pr-4 text-left"
               data-aos="fade-right"
              >
                <IoCall className="inline-block text-red-700 dark:text-tpurple  text-2xl mr-2" />
              <p className="text-[#838383] dark:text-black"
              >
                <a
                  href="tel:1234567"
              //  data-aos="fade-up-right"
                  className="text-base hover:text-[#1f6fff] text-[#F2F6FB] dark:text-black"
                >
                  +123456789
                </a>
              </p>
            </div>
           
            <div className="flex pb-3  pl-3 pr-4 "
               data-aos="fade-right"
              >
               <HiLocationMarker className="inline-block text-red-700 dark:text-tpurple text-2xl mr-2" />
              <p className=" mb-0 text-base text-left text-[#F2F6FB] dark:text-black"
              // data-aos="fade-up-right"
              >
                
                Trigan LTD, 9 Watling Street, <br />
                Dumfries, DG1 1HF
              </p>
            </div>
           
          </div>
          </div>
          
        </div>
        </div>
       
      </GlobalLayout>
    </div>
  )
}
export default Engage
