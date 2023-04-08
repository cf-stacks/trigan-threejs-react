import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import LabelData from './LabelData'
// import "./animation.css";

type Props = {
  onButtonClick: (data: { title: string; url: string; text: string }) => void
}

const AnimationCity = ({ onButtonClick }: Props) => {
  const handleButtonClick = (data: {
    title: string
    url: string
    text: string
  }) => {
    onButtonClick(data)
  }
  const [isMobile, setIsMobile] = useState(false)

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
              onClick={() =>
                handleButtonClick({
                  title: 'AI Assisted Communities',
                  url: 'images/l1.png',
                  text: `Welcome to the neighbourhood of the future, where AI breathes life into communities, unlocking unprecedented synergy and collaboration. With Trigan, we're pushing the boundaries of urban living, creating a tapestry of smart, connected, and empowered spaces that redefine city life on a global scale.`,
                })
              }
            >
              <div
                data-aos="fade-left"
                className="border-gradient-l-black-violet aos-init m-auto   flex h-[100px] flex-col items-start justify-end border-b-4  max-[768px]:mt-[30px] max-[767px]:h-[60px]  max-[720px]:h-[auto] max-[640px]:ml-[45px]  max-[499px]:ml-[30px] "
              >
                <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                  AI Assisted Communities
                </h2>
              </div>
            </button>
            <button
              onClick={() =>
                handleButtonClick({
                  title: 'Future of Work',
                  url: 'images/l5.png',
                  text: `Trigan is reimagining how we work, catapulting us into a new era of collaboration, flexibility, and sustainability. We're bridging the digital divide, unlocking the limitless potential of human ingenuity, and paving the way for a happier, more engaged workforce to thrive in the 21st century.`,
                })
              }
            >
              <div
                data-aos="fade-left"
                className="border-gradient-r-black-violet aos-init m-auto  flex h-[100px] flex-col items-start justify-end border-b-4  max-[768px]:mt-[30px] max-[768px]:h-[60px] max-[720px]:h-[auto] max-[640px]:ml-[200px] max-[560px]:ml-[165px] max-[500px]:ml-[185px] max-[445px]:ml-[200px]"
              >
                <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
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
              onClick={() =>
                handleButtonClick({
                  title: 'Sovereign Identity',
                  url: 'images/l6.jpg',
                  text: `Discover the future of digital identity with Trigan's cutting-edge, decentralised system. We're putting the power back in your hands, giving you unparalleled control over your data and life, and redefining privacy in the digital age. It's time to embrace a new realm of sovereign identity, and Trigan is leading the way.`,
                })
              }
            >
              <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                Sovereign Identity
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[50px] max-[768px]:w-[100%] max-[720px]:h-[auto] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button
              onClick={() =>
                handleButtonClick({
                  title: ' Ecological Safeguards',
                  url: 'images/l2.png',
                  text: `Our planet deserves better, and Trigan is at the forefront of the green revolution. We're pioneering eco-conscious yet practical solutions that protect urban ecosystems, ensuring nature and humanity thrive in harmony. Together, we will build cities that breathe and grow, taking sustainability to a new level.`,
                })
              }
            >
              <h2 className="max-[870px]:text-md text-right text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                Ecological Safeguards
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-left"
            className="border-gradient-r-black-violet aos-init m-auto  mt-[20px] flex h-[80px] flex-col items-end justify-end border-b-4 max-[768px]:ml-[80px] max-[768px]:mt-[0px] max-[768px]:h-[60px] max-[720px]:h-[50px] max-[720px]:w-[80%] max-[600px]:mx-[45px] max-[499px]:w-[70%] "
          >
            <button
              onClick={() =>
                handleButtonClick({
                  title: 'The First Urban Blockchain',
                  url: 'images/l4.png',
                  text: `Meet the game-changer: Trigan's urban blockchain, a decentralised powerhouse driving smarter, safer, and more connected cities. Our unique platform and approach reshape the urban experience, leveraging our next-gen technology to transform governance, services, and transactions. Be part of the transformation.`,
                })
              }
            >
              <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                The First Urban Blockchain
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[auto] max-[768px]:w-[100%] max-[720px]:h-[25px] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button
              onClick={() =>
                handleButtonClick({
                  title: 'Unified loT Data Layer',
                  url: 'images/l3.png',
                  text: `Imagine an interconnected urban matrix where smart devices and systems work together to create a seamless cityscape. Trigan's groundbreaking IoT data platform makes it happen, weaving an invisible web of efficiency, intelligence, and convenience throughout the urban fabric.`,
                })
              }
            >
              <h2 className="max-[870px]:text-md text-right text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
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
