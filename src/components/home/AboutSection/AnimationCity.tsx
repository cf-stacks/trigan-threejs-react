import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

type Props = {
  onButtonClick: (data: any) => void
  active: string
  whoActive: (num: string) => void
}

// import "./animation.css";

const AnimationCity = ({ onButtonClick, active, whoActive }: Props) => {
  const [isMobile, setIsMobile] = useState(false)

  console.log(active)
  const handleButtonClick = (data: any) => {
    onButtonClick(data)
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  return (
    <>
      <div className="m-auto mt-[100px] flex w-[100%] scale-75 justify-center md:scale-100 lg:scale-100 ">
        {/* smaller image */}
        {/* <img
    className="z-10 flex flex-col justify-center mt-[-50px] h-[300] w-[400px]  mb-[50px]"
    src="images/trigan-section-bg-c.png"
    alt="planet"
/> */}
        {/* max-[600px]:w-[400px]  max-[800px]:w-[600px] w-[900px]  */}
        <div
          data-aos="fade-up"
          className="aos-init absolute z-0 w-[1000px] flex-col max-[1100px]:w-[900px] max-[950px]:w-[850px] max-[870px]:w-[800px]"
        >
          {/* <div data-aos="fade-left" className="flex border-b-4 border-gradient-l-black-violet flex-col justify-end  h-[40px]  items-start ml-[300px] max-[950px]:ml-[150px] max-[800px]:mt-[-20px] max-[800px]:ml-[200px] max-[640px]:ml-[280px] max-[560px]:ml-[220px] max-[500px]:mt-[-20px] max-[500px]:ml-[250px] max-[500px]:h-[20px] max-[445px]:ml-[270px]  ">
        <button onClick={() => handleButtonClick('AI Assisted Communities')}>
              <h2 className="text-xl  max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">AI Assisted Communities</h2>
          </button>
        </div> */}
          <div className="flex justify-between max-[720px]:mx-auto max-[720px]:w-[80%] max-[600px]:pr-[35px] max-[499px]:w-[60%]">
            <button
              onMouseEnter={() => {
                handleButtonClick(1)
                whoActive('1')
              }}
            >
              <div
                data-aos="fade-left"
                className="border-gradient-l-black-violet aos-init m-auto   flex h-[100px] flex-col items-start justify-end border-b-4  max-[768px]:mt-[30px] max-[767px]:h-[60px]  max-[720px]:h-[auto] max-[640px]:ml-[45px]  max-[499px]:ml-[30px] "
              >
                <h2
                  className={` label__title__text  label__title__text1 max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                    active === '1' ? 'active1' : ''
                  }`}
                >
                  AI Assisted Communities
                </h2>
              </div>
            </button>
            <button
              onMouseEnter={() => {
                handleButtonClick(4)
                whoActive('2')
              }}
            >
              <div
                data-aos="fade-left"
                className="border-gradient-r-black-violet aos-init m-auto  flex h-[100px] flex-col items-start justify-end border-b-4  duration-300 ease-in-out max-[768px]:mt-[30px] max-[768px]:h-[60px] max-[720px]:h-[auto] max-[640px]:ml-[200px] max-[560px]:ml-[165px] max-[500px]:ml-[185px] max-[445px]:ml-[200px]"
              >
                <h2
                  className={`label__title__text label__title__text2  max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                    active === '2' ? 'active2' : ''
                  }`}
                >
                  Future of Work
                </h2>
              </div>
            </button>
          </div>

          <div
            data-aos="fade-left"
            className="border-gradient-r-black-violet aos-init m-auto  mt-[20px] flex h-[80px] flex-col items-end justify-end border-b-4 max-[768px]:ml-[80px] max-[768px]:mt-[0px] max-[768px]:h-[60px] max-[720px]:h-[50px] max-[720px]:w-[80%]  max-[600px]:mx-[45px] max-[499px]:w-[70%]"
          >
            <button
              onMouseEnter={() => {
                handleButtonClick(5)
                whoActive('3')
              }}
            >
              <h2
                className={`label__title__text label__title__text3  max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                  active === '3' ? 'active3' : ''
                }`}
              >
                Sovereign Identity
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[50px] max-[768px]:w-[100%] max-[720px]:h-[auto] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button
              onMouseEnter={() => {
                handleButtonClick(2)
                whoActive('4')
              }}
            >
              <h2
                className={` label__title__text  label__title__text4 max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                  active === '4' ? 'active4' : ''
                }`}
              >
                Ecological Safeguards
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-left"
            className="border-gradient-r-black-violet aos-init m-auto  mt-[20px] flex h-[80px] flex-col items-end justify-end border-b-4 max-[768px]:ml-[80px] max-[768px]:mt-[0px] max-[768px]:h-[60px] max-[720px]:h-[50px] max-[720px]:w-[80%] max-[600px]:mx-[45px] max-[499px]:w-[70%] "
          >
            <button
              onMouseEnter={() => {
                handleButtonClick(6)
                whoActive('5')
              }}
            >
              <h2
                className={`label__title__text label__title__text5  max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                  active === '5' ? 'active5' : ''
                }`}
              >
                The First Urban Blockchain
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[auto] max-[768px]:w-[100%] max-[720px]:h-[25px] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button
              onMouseEnter={() => {
                handleButtonClick(3)
                whoActive('6')
              }}
            >
              <h2
                className={`label__title__text label__title__text6 max-[870px]:text-md text-left text-xl duration-300 ease-in-out max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px] ${
                  active === '6' ? 'active6' : ''
                }`}
              >
                Unified loT Data Layer
              </h2>
            </button>
          </div>
        </div>
        <img
          className="mb-[50px] mt-[-50px] flex h-[300] w-[700px] flex-col  justify-center max-[950px]:w-[600px]  max-[768px]:w-[500px] max-[720px]:w-[400px] max-[700px]:w-[400px] max-[560px]:w-[350px] max-[500px]:w-[290px]"
          src="images/trigan-section-bg-c.png"
          alt="planet"
        />
      </div>
    </>
  )
}

export default AnimationCity
