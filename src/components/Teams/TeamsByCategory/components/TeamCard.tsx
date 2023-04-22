import React, { useState, useEffect } from 'react'
import { TeamMember } from '../../../../types/TeamMember'
import { TeamSocialIcon } from '../../TeamSocialIcon'
import Modal from './Modal'
import { FadeInWhenVisible } from '../../../shared/FadeInWhenVisible'
import Image from "next/legacy/image"

type TeamCardProps = {
  teamMember: TeamMember
  idx: number
  showDetails: boolean
  handleShowDetails?: (member: TeamMember | null) => void
}

const TeamCard: React.FC<TeamCardProps> = ({
  teamMember,
  idx,
  showDetails,
  handleShowDetails,
}) => {
  console.log('teamMember', teamMember)
  const [hidden, setHidden] = useState(true);
  return (
    <div
        onMouseEnter={() => setHidden(false)}
        onMouseLeave={() => setHidden(true)}
        className="transition ease-in-out delay-1000 flex max-w-xs items-center justify-center overflow-hidden rounded-lg border-[1px] px-4 md:px-2 bg-blend-multiply backdrop-blur backdrop-filter"
        key={teamMember.id}
        style={{
          backgroundImage: `url${teamMember.image}`,
        }}
    >
      <div className="flex items-center flex-col items-center gap-2 pt-[1.5rem]">
        {/* <img
          // loading='lazy'
          src={teamMember.image}
          alt={teamMember.name}
          className="rounded-full  p-0"
          height={'100px'}
          width={'100px'}
        /> */}
        <div
        // className="relative z-10 flex h-full p-6 -mt-8 border border-gray-500 backdrop-blur"
        >
          <div className="mt-5 rounded-t-lg bg-gray-600 box-border shadow-lg shadow-indigo flex min-h-[250px] w-full flex-col font-m_plus_rounded_1c ">
            {/* // className="flex flex-col justify-between h-full" */}
            {/* <div>
              <div className="flex justify-between">
                <p className="pr-8 text-2xl font-semibold text-zinc-100 dark:text-black">
                  {teamMember.name}
                </p>

                <TeamSocialIcon teamMember={teamMember} />
              </div>

              <div className="my-2 mb-2">
                <p className="mb-2 whitespace-pre text-base font-semibold leading-tight text-[#A855F7] lg:text-lg">
                  {teamMember.title}
                </p>
                <p className="pt-2 text-zinc-100 dark:text-black">
                  {teamMember.shortDescription}
                </p>
              </div>
            </div>

            {teamMember?.category !== 'Leadership' && (
              <div className="flex">
                <button
                  className="flex font-mono text-sm font-medium text-[#A855F7] duration-300 ease-in-out hover:text-white dark:hover:text-black md:text-base"
                  onClick={() => {
                    // setShowModal(!showModal)
                    handleShowDetails && handleShowDetails(teamMember)
                  }}
                >
                  see all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )} */}
            <div className="px-7 py-2">
                <div
                  data-te-collapse-init
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  data-te-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  className="flex w-full text-left justify-between transition duration-150 ease-in-out"
                >
                  <p className="text-white w-full text-left text-2xl font-bold text-zinc-100 dark:text-black">
                    {teamMember.name}
                  </p>
                </div>

                <div className="my-2 mb-2 w-full text-left">
                  <p className="text-white whitespace-pre text-base font-semibold leading-tight lg:text-lg text-zinc-100 dark:text-black">
                    {teamMember.shortDescription}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: hidden ? "none" : "block",
                }}
                className="transition ease-in-out delay-1000 px-7 text-left rounded-t-lg"
              >
                <p className="text-white pt-2 text-zinc-100 dark:text-black">
                  {teamMember.shortDescription}
                </p>
                {teamMember?.category !== "Leadership" && (
                  <div className="flex items-center justify-between">
                    <button
                      className="text-purple flex items-center font-mono text-sm font-medium text-[#A855F7] duration-300 ease-in-out hover:text-white dark:hover:text-black md:text-base"
                      onClick={() => {
                        // setShowModal(!showModal)
                        handleShowDetails && handleShowDetails(teamMember);
                      }}
                    >
                      <div className="underline text-indigo underline-offset-2 flex items-center">
                        Show More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>

                    <div className="flex items-center items-end justify-end text-center p-3">
                      <TeamSocialIcon teamMember={teamMember} />
                    </div>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamCard

