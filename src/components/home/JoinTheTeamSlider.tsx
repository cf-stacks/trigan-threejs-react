import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/legacy/image'

const JoinTheTeamSlider = () => {
  // for initialization of AOS
  useEffect(() => {
    AOS.init({ offset: 150 })
  })
  const slidesContent = [
    {
      id: 1,
      img: '/images/team-page-1.png',
    },
    {
      id: 2,
      img: '/images/team-page-1.png',
    },
  ]

  return (
    <div className="join-the-team-slider relative mx-auto h-[375px] max-w-[1440px] px-4 pb-[50px] pt-[50px] md:h-[100%]">
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 768px
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          980: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        className="px-5"
      >
        {slidesContent.map((slide) => (
          <SwiperSlide
            className="border-gray dark:bg-slate-900 dark:text-black"
            key={slide.id}
          >
            <img className="h-[250px] w-[100%] md:h-[100%]" src={slide.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default JoinTheTeamSlider
