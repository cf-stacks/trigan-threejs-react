import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { IoMdClose } from 'react-icons/io'
type Props = {
  onClickClose: () => any
  onMouseLeave: () => any
  data: { title: string; url: string; text: string }
}

const LabelData = (props: Props) => {
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
      <div className="flex justify-between p-[2rem]  ">
        <h2 className="border-gradient-l-black-violet max-[870px]:text-md border-b-4  text-left text-xl capitalize max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">
          {props.data.title}
        </h2>
        <button
          className=" cursor-pointer text-[1.4rem] text-white transition-all hover:text-[#eb6565]  "
          onClick={props.onClickClose}
        >
          <IoMdClose />
        </button>
      </div>
      <div className="content mt-[1rem]  flex justify-center  max-[768px]:flex-col">
        <div className="image  w-[32%] max-[768px]:m-auto max-[768px]:h-[50%] max-[768px]:w-[90%]">
          <img
            className="h-[100%] w-[100%] rounded-lg object-cover"
            src={props.data.url}
            alt="label 1"
          />
        </div>
        <div className="text  ml-[2rem] w-[45%] pt-[1rem] text-[1.4rem] leading-loose text-white max-[1100px]:text-[18px]  max-[768px]:mx-[auto]  max-[768px]:ml-[0] max-[768px]:w-[90%] max-[768px]:pl-[5%] max-[768px]:text-[16px] max-[768px]:leading-normal max-[600px]:text-[14px]">
          {props.data.text}
        </div>
      </div>
    </motion.div>
  )
}

export default LabelData
