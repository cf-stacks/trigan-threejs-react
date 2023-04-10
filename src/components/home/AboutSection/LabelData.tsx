import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

let LABEL__DATA = [
  {
    title: 'AI Assisted Communities',
    url: 'images/l1.png',
    text: `Welcome to the neighbourhood of the future, where AI breathes life into communities, unlocking unprecedented synergy and collaboration. With Trigan, we're pushing the boundaries of urban living, creating a tapestry of smart, connected, and empowered spaces that redefine city life on a global scale.`,
  },
  {
    title: ' Ecological Safeguards',
    url: 'images/l2.png',
    text: `Our planet deserves better, and Trigan is at the forefront of the green revolution. We're pioneering eco-conscious yet practical solutions that protect urban ecosystems, ensuring nature and humanity thrive in harmony. Together, we will build cities that breathe and grow, taking sustainability to a new level.`,
  },
  {
    title: 'Unified loT Data Layer',
    url: 'images/l3.png',
    text: `Imagine an interconnected urban matrix where smart devices and systems work together to create a seamless cityscape. Trigan's groundbreaking IoT data platform makes it happen, weaving an invisible web of efficiency, intelligence, and convenience throughout the urban fabric.`,
  },
  {
    title: 'Future of Work',
    url: 'images/l5.png',
    text: `Trigan is reimagining how we work, catapulting us into a new era of collaboration, flexibility, and sustainability. We're bridging the digital divide, unlocking the limitless potential of human ingenuity, and paving the way for a happier, more engaged workforce to thrive in the 21st century.`,
  },
  {
    title: 'Sovereign Identity',
    url: 'images/l6.jpg',
    text: `Discover the future of digital identity with Trigan's cutting-edge, decentralised system. We're putting the power back in your hands, giving you unparalleled control over your data and life, and redefining privacy in the digital age. It's time to embrace a new realm of sovereign identity, and Trigan is leading the way.`,
  },
  {
    title: 'The First Urban Blockchain',
    url: 'images/l4.png',
    text: `Meet the game-changer: Trigan's urban blockchain, a decentralised powerhouse driving smarter, safer, and more connected cities. Our unique platform and approach reshape the urban experience, leveraging our next-gen technology to transform governance, services, and transactions. Be part of the transformation.`,
  },
]

type Props = {
  onClickClose: () => any
  onMouseLeave: () => any
  data: number
}

const LabelData = (props: Props) => {
  const [labelsData, setLabelsData] = useState(LABEL__DATA)
  let slicArr: any = []
  slicArr = LABEL__DATA.slice(props.data - 1, LABEL__DATA.length)
  let newArr = slicArr.concat(LABEL__DATA.slice(0, props.data - 1))

  return (
    <motion.div
      key="modal"
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        delay: 0.15,
      }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      className="fixed bottom-[8%] left-[15%]  z-10 h-[70vh]  w-[70%] rounded-lg bg-[#0a0a0aea] max-[768px]:bottom-[3%] max-[768px]:left-[5%] max-[768px]:h-[90vh] max-[768px]:w-[90%] "
      onMouseLeave={props.onMouseLeave}
    >
      <Swiper
        pagination={{
          clickable: true,
        }}
        direction={'vertical'}
        speed={1200}
        loop={true}
        // autoplay={{
        //   delay: 1300,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
            centeredSlides: true,
          },
        }}
        navigation={{
          nextEl: '.label-button-next',
          prevEl: '.label-button-prev',
        }}
        className=" h-[90%] w-[100%]"
      >
        <div className="">
          <div className="  w-[100%] flex-col text-[25px] md:m-5 md:m-auto ">
            {newArr.map((item: any, i: any) => (
              <SwiperSlide key={i}>
                <div className="h-[100%] w-[100%]" id={item.id} key={item.id}>
                  <div className="flex justify-between p-[1.5rem] px-[7vw] py-[1.5rem] max-[500px]:p-[1rem]  ">
                    <h2 className="border-gradient-l-black-violet max-[870px]:text-md border-b-4   text-left text-xl capitalize max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                      {item.title}
                    </h2>
                  </div>
                  <div className="content mt-[1rem]  flex  items-center justify-center max-[768px]:flex-col">
                    <div className="image  w-[28%] max-[768px]:m-auto max-[768px]:mb-[2vh] max-[768px]:h-[50%] max-[768px]:w-[55%]  max-[500px]:w-[90%]">
                      <img
                        className="h-[100%] w-[100%] rounded-lg object-cover"
                        src={item.url}
                        alt="label 1"
                      />
                    </div>
                    <div className="text  ml-[2rem] w-[50%] text-[1.4rem] leading-[2] text-white max-[1200px]:text-[1.3rem] max-[1100px]:text-[18px]  max-[768px]:mx-[auto]  max-[768px]:ml-[0] max-[768px]:w-[90%] max-[768px]:pl-[5%] max-[768px]:text-[16px] max-[768px]:leading-normal max-[600px]:text-[14px]">
                      {item.text}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
      <div className="label__buttons flex justify-center">
        <span className="label-button-prev mx-[10px] flex cursor-pointer items-center justify-center text-[1.5rem] text-white">
          <BsChevronDoubleLeft />
        </span>
        <span className="label-button-next mx-[10px] flex cursor-pointer items-center justify-center text-[1.5rem] text-white">
          <BsChevronDoubleRight />
        </span>
      </div>
    </motion.div>
  )
}

export default LabelData
