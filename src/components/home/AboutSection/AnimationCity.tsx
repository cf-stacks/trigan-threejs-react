import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// import "./animation.css";
const LABEL__DATA = [
  {
    id: 'label1',
    title: 'AI Assisted Communities',
    url: 'images/l1.png',
    text: `Welcome to the neighbourhood of the future, where AI breathes life into communities, unlocking unprecedented synergy and collaboration. With Trigan, we're pushing the boundaries of urban living, creating a tapestry of smart, connected, and empowered spaces that redefine city life on a global scale.`,
  },
  {
    id: 'label2',
    title: ' Ecological Safeguards',
    url: 'images/l2.png',
    text: `Our planet deserves better, and Trigan is at the forefront of the green revolution. We're pioneering eco-conscious yet practical solutions that protect urban ecosystems, ensuring nature and humanity thrive in harmony. Together, we will build cities that breathe and grow, taking sustainability to a new level.`,
  },
  {
    id: 'label3',
    title: 'Unified loT Data Layer',
    url: 'images/l3.png',
    text: `Imagine an interconnected urban matrix where smart devices and systems work together to create a seamless cityscape. Trigan's groundbreaking IoT data platform makes it happen, weaving an invisible web of efficiency, intelligence, and convenience throughout the urban fabric.`,
  },
  {
    id: 'label4',
    title: 'Future of Work',
    url: 'images/l5.png',
    text: `Trigan is reimagining how we work, catapulting us into a new era of collaboration, flexibility, and sustainability. We're bridging the digital divide, unlocking the limitless potential of human ingenuity, and paving the way for a happier, more engaged workforce to thrive in the 21st century.`,
  },
  {
    id: 'label5',
    title: 'Sovereign Identity',
    url: 'images/l6.jpg',
    text: `Discover the future of digital identity with Trigan's cutting-edge, decentralised system. We're putting the power back in your hands, giving you unparalleled control over your data and life, and redefining privacy in the digital age. It's time to embrace a new realm of sovereign identity, and Trigan is leading the way.`,
  },
  {
    id: 'label6',
    title: 'The First Urban Blockchain',
    url: 'images/l4.png',
    text: `Meet the game-changer: Trigan's urban blockchain, a decentralised powerhouse driving smarter, safer, and more connected cities. Our unique platform and approach reshape the urban experience, leveraging our next-gen technology to transform governance, services, and transactions. Be part of the transformation.`,
  },
]

const AnimationCity = () => {
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
            <button>
              <div
                data-aos="fade-left"
                className="border-gradient-l-black-violet aos-init m-auto   flex h-[100px] flex-col items-start justify-end border-b-4  max-[768px]:mt-[30px] max-[767px]:h-[60px]  max-[720px]:h-[auto] max-[640px]:ml-[45px]  max-[499px]:ml-[30px] "
              >
                <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                  AI Assisted Communities
                </h2>
              </div>
            </button>
            <button>
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
            <button>
              <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                Sovereign Identity
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[50px] max-[768px]:w-[100%] max-[720px]:h-[auto] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button>
              <h2 className="max-[870px]:text-md text-right text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                Ecological Safeguards
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-left"
            className="border-gradient-r-black-violet aos-init m-auto  mt-[20px] flex h-[80px] flex-col items-end justify-end border-b-4 max-[768px]:ml-[80px] max-[768px]:mt-[0px] max-[768px]:h-[60px] max-[720px]:h-[50px] max-[720px]:w-[80%] max-[600px]:mx-[45px] max-[499px]:w-[70%] "
          >
            <button>
              <h2 className="max-[870px]:text-md text-left text-xl max-[768px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                The First Urban Blockchain
              </h2>
            </button>
          </div>

          <div
            data-aos="fade-right"
            className="border-gradient-l-black-violet aos-init m-auto  flex h-[40px] flex-col items-start justify-end border-b-4 max-[768px]:h-[auto] max-[768px]:w-[100%] max-[720px]:h-[25px] max-[720px]:w-[80%] max-[640px]:w-[65%] max-[640px]:w-[70%] max-[500px]:w-[420px]"
          >
            <button>
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
      {/* display labels data section  */}
      <section className="Imgpart_center mx-auto    items-center px-4 py-36 text-slate-100 2xl:max-w-3xl ">
        <div className="paragraphStyle label__show__data  m-auto mb-[8rem]  h-[80vh] w-[80vw] translate-y-[-8rem]   snap-y snap-mandatory  flex-wrap  overflow-y-scroll scroll-smooth rounded-md  bg-white/[.1] py-2 text-lg font-extralight max-[1200px]:h-[70vh] max-[768px]:h-[62vh] max-[768px]:translate-y-[-6rem] max-[500px]:h-[80vh] max-[500px]:translate-y-[-3rem] md:py-5 md:text-xl">
          <div className="  w-[100%] flex-col text-[25px] md:m-5 md:m-auto ">
            {LABEL__DATA.map((item) => (
              <div
                className=" h-[80vh] w-[100%] snap-start max-[1200px]:h-[70vh] max-[768px]:h-[62vh] max-[500px]:h-[80vh]"
                id={item.id}
                key={item.id}
              >
                <div className="flex justify-between p-[2rem] max-[500px]:p-[1rem] ">
                  <h2 className="border-gradient-l-black-violet max-[870px]:text-md border-b-4  text-left text-xl capitalize max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
                    {item.title}
                  </h2>
                </div>
                <div className="content mt-[1rem]  flex  items-center justify-center max-[768px]:flex-col">
                  <div className="image  w-[35%] max-[768px]:m-auto max-[768px]:mb-[2vh] max-[768px]:h-[50%] max-[768px]:w-[55%]  max-[500px]:w-[90%]">
                    <img
                      className="h-[100%] w-[100%] rounded-lg object-cover"
                      src={item.url}
                      alt="label 1"
                    />
                  </div>
                  <div className="text  ml-[2rem] w-[50%] text-[1.5rem] leading-[2] text-white max-[1200px]:text-[1.3rem] max-[1100px]:text-[18px]  max-[768px]:mx-[auto]  max-[768px]:ml-[0] max-[768px]:w-[90%] max-[768px]:pl-[5%] max-[768px]:text-[16px] max-[768px]:leading-normal max-[600px]:text-[14px]">
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <br></br>
        </div>
      </section>
    </>
  )
}

export default AnimationCity
