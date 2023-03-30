import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
// import Model from '../../../../public/EarthTexture/Draco.jsx'
import { SignUpModal } from './SignUpModal'
import { SupportersSection } from '../SupportersSection/index'
import useEarlyAccessModal from '../../../hooks/useEarlyAccessModal'
import { motion, MotionConfig } from 'framer-motion'
// import { ThemeProvider } from 'next-themes'
// import MoonModel from '../../../../public/MoonTexture/Moon'
import Combined from '../../../../public/assets/CombinedPlanets.jsx'
import { useTheme } from 'next-themes'

const Spinner = () => {
  return <Html>
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="#A855F7" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span className="sr-only">Loading...</span>
  </Html>
}

const Logo = () => (

  <motion.div
    transition={{ delay: 5, duration: 5, ease: 'easeInOut' }}
    exit={{ opacity: 0 , transition: { duration: 5, delay: 5 } }}
    className="w-[100%] h-[100%] m-auto flex justify-center align-center"
    >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      id="HeroLogo"
      viewBox="80 0 1000 1000"
      className="flex m-auto justify-center align-center w-[300px] md2:w-[500px]"
    >
      <path d="M535.57 593.55C530.35 597.22 528.79 604.27 531.98 609.79L566.42 669.45C574.1 682.75 593.3 682.75 600.98 669.45L702.83 493.03C706.72 486.29 698.73 478.98 692.36 483.45L535.57 593.55Z" />
      <path d="M633.68 315.11L758.77 373.24C764.67 375.98 771.7 373.76 774.95 368.13L814.47 299.69C820.91 288.53 812.86 274.59 799.98 274.59L583.71 274.59L583.71 274.59C574.9 274.59 572.25 286.57 580.24 290.28L633.68 315.11Z" />
      <path d="M471.61 428.91L458.92 285.98C458.35 279.53 452.95 274.59 446.47 274.59L366.47 274.59C354.01 274.59 346.23 288.07 352.46 298.86L461.08 486.99L461.08 486.99C465.47 494.59 477.12 490.91 476.35 482.17L471.61 428.91Z" />

      <path d="M213.01 878.89L213.01 784.28L192.84 784.28C184.97 784.28 180.64 779.95 180.64 772.08L180.64 770.68C180.64 762.81 184.97 758.48 192.84 758.48L261.91 758.48C269.78 758.48 274.11 762.81 274.11 770.68L274.11 772.08C274.11 779.95 269.78 784.28 261.91 784.28L241.92 784.28L241.92 878.89C241.92 886.76 237.59 891.09 229.72 891.09L225.21 891.09C217.34 891.09 213.01 886.76 213.01 878.89Z" />
      <path d="M408 891.09L402.57 891.09C395.74 891.09 391.7 887.98 388.3 882.19L368.94 848.63C366.92 848.72 364.84 848.77 362.69 848.77L347.41 848.77L347.41 878.89C347.41 886.76 343.08 891.09 335.21 891.09L330.45 891.09C322.58 891.09 318.25 886.76 318.25 878.89L318.25 770.68C318.25 762.81 322.58 758.48 330.45 758.48L363.23 758.48C406.2 758.48 421.23 772.82 421.23 803.05C421.23 822.18 413.38 836.16 395.96 843.33L416.34 876.53C422.12 885.93 419.59 891.09 408 891.09ZM392.09 804.99C392.09 788.55 382.92 782.87 362.51 782.87L347.23 782.87L347.23 826.92L362.51 826.92C382.92 826.93 392.09 821.56 392.09 804.99Z" />
      <path d="M469.55 878.89L469.55 770.68C469.55 762.81 473.88 758.48 481.75 758.48L486.32 758.48C494.19 758.48 498.52 762.81 498.52 770.68L498.52 878.89C498.52 886.76 494.19 891.09 486.32 891.09L481.75 891.09C473.88 891.09 469.55 886.76 469.55 878.89Z" />
      <path d="M546.79 824.42C546.79 783.94 572.31 756.86 609.8 756.86C633.43 756.86 650.74 763.86 660.73 779.54C665.45 786.94 662.36 792.36 653.83 794.38L649.67 795.36C643.09 796.92 638.8 794.75 634.66 790.59C628.72 784.67 621.47 781.04 610.65 781.04C589.69 781.04 575.88 798.27 575.88 824.72C575.88 851.54 589.26 868.15 610.52 868.15C628.74 868.15 640.71 857.76 641.93 837.77L619.86 837.77C612.48 837.77 608.33 833.74 608.33 826.55L608.33 826.37C608.33 819.35 612.78 815.45 620.53 815.45L659.68 815.45C667.43 815.45 672 817.71 672 824.11L672 826.79C672 867.69 648.07 892.42 609.24 892.42C571.21 892.42 546.79 865.81 546.79 824.42Z" />
      <path d="M819.83 891.09L814.77 891.09C807.76 891.09 803.3 887.84 800.87 881.17L796.1 868.06L738.8 868.06L734.1 881.18C731.72 887.82 727.18 891.09 720.16 891.09L715.28 891.09C706.31 891.09 702.34 885.33 705.65 877.03L748.95 768.16C751.57 761.56 756.09 758.49 763.04 758.49L771.7 758.49C778.65 758.49 783.16 761.57 785.79 768.16L829.28 877C832.6 885.32 828.67 891.09 819.83 891.09ZM767.37 790.01L746.62 846.7L788.24 846.7L767.37 790.01Z" />
      <path d="M884.35 891.08C876.48 891.08 872.15 886.75 872.15 878.88L872.15 770.67C872.15 762.8 876.48 758.47 884.35 758.47L890.88 758.47C897.53 758.47 901.83 760.85 905.58 766.64L957.46 845.64L957.46 770.66C957.46 762.79 961.79 758.46 969.66 758.46L974.17 758.46C982.04 758.46 986.37 762.79 986.37 770.66L986.37 878.87C986.37 886.74 982.04 891.07 974.17 891.07L967.89 891.07C961.24 891.07 956.77 888.32 953.19 882.9L901.12 803.59L901.12 878.87C901.12 886.74 896.79 891.07 888.92 891.07L884.35 891.08L884.35 891.08Z" />
    </svg>
  </motion.div>

)
const VideoHeader = (props:any) => {
  const {isScroll} = props;
  const index = useRef(0)
  const [playAnimation, setPlayAnimation] = useState(false)
  const [currentItem, setCurrentItem] = useState(Logo)
  const { modal, setModal } = useEarlyAccessModal()
  const [bgDisplay, setBgDisplay] = useState(true)
  const [renderCompanyCards, setRenderCompanyCards] = useState(false)

  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);

  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {

    if(isScroll){
      window.addEventListener('scroll', () => {
      var factor = Math.max(0, (2000 - window.scrollY) / 2000)
      if (window.scrollY < 1300) factor = 1
      document.documentElement.style.setProperty('--headerOpacity', factor.toString())
      document.documentElement.style.setProperty('--headerScale', factor.toString())
      if (window.scrollY > window.screen.height * 1.5) setBgDisplay(false)
      else setBgDisplay(true)
    })
    const timer = setInterval(() => {
      switch (index.current) {
        case 0:
          setCurrentItem(
            <div className="flex justify-center h-[150px]">
              <h1
                id="header1"
                className={`flex-wrap text-center font-m_plus_rounded_1c font-semibold uppercase md:font-bold`}
              >
                <pre className="mt-[25px] text-[25px] font-bold font-m_plus_rounded_1c dark:text-purple-500">
                  THE URBAN BLOCKCHAIN
                </pre>
                <span className="text-[35px] font-bold font-m_plus_rounded_1c dark:text-purple-500">
                  POWERED BY AI
                </span>
              </h1>
            </div>
          )
          break

        case 1:
          setCurrentItem(
            <div className="flex justify-center h-[150px]">
              <h1
                id="header1"
                className={`text-center font-m_plus_rounded_1c font-semibold uppercase md:font-bold`}
              >
                <pre className="mt-[25px] text-[25px] font-bold font-m_plus_rounded_1c dark:text-purple-500  max-[400px]:text-[22px]">
                  INNOVATING BEYOND
                </pre>
                <span className="text-[35px] font-bold font-m_plus_rounded_1c dark:text-purple-500">
                  PoW AND PoS.
                </span>
              </h1>
            </div>
          )
          break
        case 2:
          setCurrentItem(
            <div className="flex justify-center h-[150px]">
              <h1
                id="header1"
                className={`text-center font-m_plus_rounded_1c font-semibold uppercase md:font-bold`}
              >
                <pre className="mt-[25px] text-[25px] font-bold font-m_plus_rounded_1c dark:text-purple-500  max-[400px]:text-[22px]">
                  REDEFINING BLOCKCHAIN FOR
                </pre>
                <span className="text-[35px] font-bold font-m_plus_rounded_1c dark:text-purple-500">
                  A FAIRER FUTURE
                </span>
              </h1>
            </div>
          )
          break
        case 3:
          setCurrentItem(
            <div className="flex justify-center h-[150px]">
              <h1
                id="header1"
                className={`text-center font-m_plus_rounded_1c font-semibold uppercase md:font-bold`}
              >
                <pre className="mt-[30px] text-[22px] font-bold font-m_plus_rounded_1c dark:text-purple-500 max-[400px]:text-[18px]">
                  INTRODUCING THE FUTURE
                </pre>
                <span className="text-[35px] font-bold font-m_plus_rounded_1c dark:text-purple-500">
                  OF LIVING
                </span>
              </h1>
            </div>
          )
          break
      }
      if (index.current === 3) {
        index.current = 0
      } else {
        index.current = Number(index.current) + 1
      }
    }, 3000)
    return () => clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    delayRenderCompanyCards()

    const onPageLoad = () => {
      setPlayAnimation(true)
    }
    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad)
      return () => window.removeEventListener('load', onPageLoad)
    }
    
  }, [])

  function delayRenderCompanyCards() {
    setTimeout(() => {
      setRenderCompanyCards(true)
    }, 3000)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 h-screen w-screen bg-black dark:bg-white`}>
        {/* Moon and Earth combined component */}
        {/* if it's in dark mode it shouldn't render the animation of the planet and the moon, if it's in light mode then it should render the animation */}
        {currentTheme === "dark"
          ? null
          :
          (
            <Canvas>
              {/* <ambientLight intensity={0.001} color="#ffffff" /> */}

              <directionalLight
                position={[-3, 2, 0]}
                intensity={0.85}
                color="purple"
              />
              <ambientLight intensity={0.251} color="purple" />

              <Suspense fallback={<Spinner />}>
                <>
                  <Combined time={time} setTime={setTime} isPlaying={isPlaying} isScroll={isScroll}/>
                  <Stars
                    radius={300}
                    depth={60}
                    count={1000}
                    factor={5}
                    saturation={0}
                  />
                </>
              </Suspense>
              <directionalLight args={['#b6c7f2', 3]} position={[-10, 5, -1]} />

            </Canvas>
          )
        }

        <div
          className={`absolute top-0 left-0 flex h-screen w-screen m-auto scale-[var(--headerScale)] flex-col text-white opacity-[var(--headerOpacity)]`}
          style={{
            transitionTimingFunction: 'ease',
            justifyContent: 'space-between',
            margin: 'auto',
          }}
        >
          <div className="flex flex-col align-center justify-end  w-full h-[500px] m-auto max-[500px]:w-[300px]">
            {isScroll ? currentItem : null}

          {isScroll ?
            <div className="flex flex-col items-center w-full">
              <button className="rounded-full w-fit border bg-transparent py-2 px-4  font-m_plus_rounded_1c font-bold text-white hover:bg-gray-400 dark:text-purple-500 dark:hover:text-black">
                <a href="/project">Learn More</a>
              </button>
              <button className="opacity-50 rounded-full w-[80px] flex justify-center items-center  h-10 mt-3 border bg-transparent px-4 text-center  font-m_plus_rounded_1c font-bold text-white hover:bg-gray-400 dark:text-purple-500 dark:hover:text-black"
                onClick={() => setIsPlaying(p => !p)}>
                {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-5 h-5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>}
              </button>
            </div>: null}
          </div>

          {isScroll && renderCompanyCards ? (<SupportersSection />) : null}

        </div>
        <div>
          <SignUpModal modal={modal} setModal={setModal} />
        </div>

      </header>
    </>
  )
}

export default VideoHeader