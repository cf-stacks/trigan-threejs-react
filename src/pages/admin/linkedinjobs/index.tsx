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
  const [jobs, setJobs] = useState([])
  const [fetching, setFetching] = useState(false)

  const router = useRouter()

  const fetchFunction = useCallback(async () => {
    setFetching(true)
    try {
      const p: any = await axios.get(`${TEST_API_URL}/linkedin-job/get`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      setJobs(p.Data as [])
    } catch (error) {
      console.log(error)
      const err = error as AxiosError
      if ((err.response?.status as number) === 401) {
        await router.push('/admin/login')
      }
      toast.error('Something went wrong')
    }
    setFetching(false)
  }, [router])

  useEffect(() => {
    void fetchFunction()
    console.log(jobs)
  }, [fetchFunction])
  return (
    <AdminLayout>
      <Title align="center">Linkedin Jobs</Title>

      <section>
        <JobsTable jobs={jobs} fetching={fetching} />
      </section>
    </AdminLayout>
  )
}

export default Jobs
