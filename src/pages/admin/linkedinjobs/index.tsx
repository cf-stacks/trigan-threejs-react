import { NextPage } from 'next'
import React, {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'
import axios, { AxiosError } from 'axios'
import { TEST_API_URL } from '../../../util/constants'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import {
  JobType,
  JobsTable,
} from '../../../components/admin/linkedinjobs/LinkedinJobsTable'

const Jobs: NextPage = () => {
  const [jobs, setJobs] = useState([
    {
      id: 'ff6bc7f3-a18d-44b3-ae60-264716d3bc0d',
      creator_id: '5947b11d-d114-4b0e-b0c0-f91eefaf11da',
      created_at: '2023-03-17T17:22:50.357895Z',
      updated_at: '2023-03-17T17:22:50.358794Z',
      linkedin_account_id: '1a600a96-b4e2-4b81-ab03-6026a6150e39',
      title: 'Senior Golang Developer',
      description:
        'Job description\nThe ideal candidate for this position will have a broad technical skillset and extensive experience in this industry. As a result, the candidate should be able to design, develop and test the products required for the companys needs. Moreover, the candidate should be able to work with other developers in determining product strategy. \n Responsibilities\nDevelop and designing relevant code on project needs \nMentoring junior developers \nCreate test driven environment for relevant projects\n\nQualifications\nBachelors degree or equivalent experience in Computer Science 4-6 years of industry experience \nTechnical depth across multiple languages \nAble to meet deadlines \nLeadership experience \nStrong communications skills\nIndustry\nInformation Technology & Services\nEmployment Type\nFull-time\nEdit job description',
      job_id: '3507823048',
      link: 'https://www.linkedin.com/hiring/jobs/3507823048/detail/',
      is_active: true,
    },
    {
      id: 'ff6bc7f3-a18d-44b3-ae60-264716d3bc0d',
      creator_id: '5947b11d-d114-4b0e-b0c0-f91eefaf11da',
      created_at: '2023-03-17T17:22:50.357895Z',
      updated_at: '2023-03-17T17:22:50.358794Z',
      linkedin_account_id: '1a600a96-b4e2-4b81-ab03-6026a6150e39',
      title: 'Senior Golang Developer',
      description:
        'Job description\nThe ideal candidate for this position will have a broad technical skillset and extensive experience in this industry. As a result, the candidate should be able to design, develop and test the products required for the companys needs. Moreover, the candidate should be able to work with other developers in determining product strategy. \n Responsibilities\nDevelop and designing relevant code on project needs \nMentoring junior developers \nCreate test driven environment for relevant projects\n\nQualifications\nBachelors degree or equivalent experience in Computer Science 4-6 years of industry experience \nTechnical depth across multiple languages \nAble to meet deadlines \nLeadership experience \nStrong communications skills\nIndustry\nInformation Technology & Services\nEmployment Type\nFull-time\nEdit job description',
      job_id: '3507823048',
      link: 'https://www.linkedin.com/hiring/jobs/3507823048/detail/',
      is_active: true,
    },
  ])
  const [fetching, setFetching] = useState(false)

  const router = useRouter()

  const fetchFunction = useCallback(async () => {
    // setFetching(true)
    // try {
    //   const p: any = await axios.get(`${TEST_API_URL}/linkedin-job/get`, {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `${localStorage.getItem('access_token')}`,
    //     },
    //   })
    //   setJobs(p.Data as [])
    // } catch (error) {
    //   console.log(error)
    //   const err = error as AxiosError
    //   if ((err.response?.status as number) === 401) {
    //     await router.push('/admin/login')
    //   }
    //   toast.error('Something went wrong')
    // }
    // setFetching(false)
  }, [router])

  useEffect(() => {
    void fetchFunction()
    console.log(jobs)
  }, [fetchFunction])
  return (
    <AdminLayout>
      <Title align="center">Linkedin Accounts</Title>

      <section>
        <JobsTable jobs={jobs} fetching={fetching} />
      </section>
    </AdminLayout>
  )
}

export default Jobs
