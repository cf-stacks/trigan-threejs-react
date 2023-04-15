import React from 'react';
import Image from 'next/image';

// import project1 from '../../../public/images/project1.svg';
// import project2 from '../../../public/images/project2.svg';
// import project3 from '../../../public/images/project3.svg';
// import project4 from '../../../public/images/project4.svg';
// import project5 from '../../../public/images/project5.svg';
const ProjectTimeline = () => {
   
    const timelineItems = [
        {
            id: 1,
            title: 'Accelerate',
            titleColored: 'ProgressTitle',
            description: 'Your contribution will help us expand and enhance our platform, allowing us to reach more cities and provide even better solutions for urban challenges.',
            image: '/images/project1.svg',
        },
        {
            id: 2,
            title: 'Empower',
            titleColored: 'Communities',
            description: 'By supporting the Trigan Project, youll enable us to create opportunities for individuals, businesses, and institutions to thrive and make a positive impact on their communities.',
            image: '/images/project2.svg',
        },
        {
            id: 3,
            title: 'Drive',
            titleColored: 'Innovation',
            description: 'Your support will help us continue developing cutting-edge technology and  ground-breaking solutions that can redefine how we live, work, and interact in cities.'
          ,  image: '/images/project3.svg',
        },
        {
            id: 4,
            title: 'Foster',
            titleColored: 'Sustainability',
            description: 'Your contribution will allow us to promote environmentally friendly practices and create sustainable urban environments for future generations.',
            image: '/images/project 4.svg',

        },
        {
            id: 5,
            title: 'Champion',
            titleColored: 'Equality',
            description: 'By supporting our mission, you will help us work towards reducing inequality, combating poverty, and building a more balanced and inclusive society.',
            image: '/images/project5.svg',
        }
        
    ]

    // let start = 'justify-start' 'items-start'
    // let end = 'justify-end' 'items-end'

    // map through the timelineItems array and return the following JSX and position the divs left and right accordingly 


    
    return (
        <section className="py-10">
                <div className=''>
                    {
                        timelineItems.map((item,index ) => {
                            return (
                                <div key={item.id} 
                                className={`${index  % 2 === 0 ?
                                    'justify-start items-start' : 'justify-end items-end'
                                            } first-letter: m-auto flex flex-col `}>
                                    <div className={`${index  % 2 === 0 ?
                                                'justify-start text-start items-start' : 'justify-end text-end items-end'
                                                        } flex flex-col justify-start items-start w-[550px]`}>
                                        <h3 className= "text-[#F2F6FB] py-2 font-m_plus_rounded_1c tracking-tighter text-5xl  text-center">
                                            {item.title}
                                            <span className='bg-gradient-to-r text-[#A855F7] to-violet-500 bg-clip-text text-5xl text-transparent pl-2'>
                                                {item.titleColored} </span></h3>
                                        <p
                                            className={`text-sm pb-2 font-medium font-m_plus_rounded_1c  w-[80%] text-[#BAC0C6] dark:text-black`}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className={`${index  % 2 === 0 ?
                                    'justify-start items-start' : 'justify-end items-end'
                                            } flex items-start justify-start w-full`}>
                                        <Image 
                                        src={item.image}
                                        width={600} height={450} alt="" />
                                    </div>
                                </div>
                            )
                        })

                    }

            {/* <div className="m-auto justfify-start flex flex-col items-start ">

                <div className="flex flex-col justify-start items-start w-[550px]">
<h3 className= "text-[#F2F6FB] py-2 font-m_plus_rounded_1c tracking-tighter text-5xl  text-center">
    Project
    <span className='bg-gradient-to-r text-[#A855F7] to-violet-500 bg-clip-text text-5xl text-transparent pl-2'>
                  Future </span></h3>
                      
                      <p 
                      className="text-sm pb-2 font-medium font-m_plus_rounded_1c  w-[70%] text-[#BAC0C6] dark:text-black ">
                        Your contribution can make a difference in the lives of millions and drive the transformation of urban spaces
                        </p>

                        </div>
                <div className="flex items-start justify-start w-full">
                    <Image src='/images/project1.svg' width={600} height={450} alt="" />

                </div>
                </div> */}
                </div>

        </section>
    );
}

export default ProjectTimeline;