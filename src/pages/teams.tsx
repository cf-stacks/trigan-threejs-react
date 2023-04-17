import type { GetStaticProps, NextPage } from 'next'
import { ReactNode, useState } from 'react'
import React, { lazy, Suspense } from 'react'

import { SEO } from '../components/shared/SEO'
import { Title } from '../components/shared/Title'
import { groupByCategory } from '../util/functions'
import { TeamMember } from '../types/TeamMember'
import { ThemeProvider } from 'next-themes'

import GlobalLayout from '../components/layouts/GlobalLayout'
import axios from 'axios'
import { API_URL, GET_API_KEY } from '../util/constants'
import useSWR from 'swr'

interface TeamsProps {
  children?: ReactNode
  teams: TeamMember[]
}

const TeamCatSelector = lazy(
  () => import('../components/shared/TeamCatSelector/index')
)
const TeamsByCategory = lazy(
  () => import('../components/Teams/TeamsByCategory/index')
)

const Teams: NextPage<TeamsProps> = () => {
  const [category, setCategory] = useState('all')

  const { data: teams, error } = useSWR('/teammember/getAll', (url) =>
    axios
      .create({
        baseURL: `${API_URL}`,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          apiKey: 'g436739d6734gd6734',
        },
      })
      .get(url)
      .then((res) => res?.data?.Data)
  )

  if (error) return <div>Failed to load data</div>
  if (!teams) return <div>Loading...</div>

  return (
    <div className=" dark:bg-white">
      <ThemeProvider attribute="class" enableSystem={true}>
        <>
          <SEO title="Teams" description="Trigan Teams" />
          <GlobalLayout>
            <div className=" relative mr-4 w-full bg-transparent">
              <div className="text-white ">
                <Title padding="py-3" title="Our Teams" />
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="m-auto w-full px-2 pb-10 lg:w-[80%] ">
                  <TeamCatSelector
                    category={category}
                    teams={teams}
                    onClick={(e) => setCategory(e)}
                  />

                  <TeamsByCategory
                    key={category}
                    category={category}
                    teams={groupByCategory(teams, category)}
                  />
                </div>
              </Suspense>
            </div>
          </GlobalLayout>
        </>
      </ThemeProvider>
    </div>
  )
}

export default Teams
