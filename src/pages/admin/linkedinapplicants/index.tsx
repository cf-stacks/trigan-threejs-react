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
import TabHeaderAction from '../../../components/tabHeaderAction'
import {
  ApplicantType,
  ApplicantsTable,
  MoadalType,
} from '../../../components/admin/linkedinapplicants/LinkedinApplicantsTable'
import { ApplicantsModals } from '../../../components/admin/linkedinapplicants/LinkedinApplicantsModals'

const Applicants: NextPage = () => {
  const [search, setSearch] = useState('')
  const [applicants, setApplicants] = useState([
    {
      id: '17bd82b3-ea7c-48c5-b4ba-7398b098748d',
      creator_id: '5947b11d-d114-4b0e-b0c0-f91eefaf11da',
      created_at: '2023-03-17T17:23:14.547618Z',
      updated_at: '2023-03-17T17:23:14.548735Z',
      linkedin_job_id: 'ff6bc7f3-a18d-44b3-ae60-264716d3bc0d',
      name: 'abc',
      cv_link: 'https://www.africau.edu/images/default/sample.pdf',
      status: 'ACTIVE',
    },
    {
      id: '17bd82b3-ea7c-48c5-b4ba-7398b098748d',
      creator_id: '5947b11d-d114-4b0e-b0c0-f91eefaf11da',
      created_at: '2023-03-17T17:23:14.547618Z',
      updated_at: '2023-03-17T17:23:14.548735Z',
      linkedin_job_id: 'ff6bc7f3-a18d-44b3-ae60-264716d3bc0d',
      name: 'abc',
      cv_link: 'https://www.africau.edu/images/default/sample.pdf',
      status: 'REJECT',
    },
    {
      id: '17bd82b3-ea7c-48c5-b4ba-7398b098748d',
      creator_id: '5947b11d-d114-4b0e-b0c0-f91eefaf11da',
      created_at: '2023-03-17T17:23:14.547618Z',
      updated_at: '2023-03-17T17:23:14.548735Z',
      linkedin_job_id: 'ff6bc7f3-a18d-44b3-ae60-264716d3bc0d',
      name: 'abc',
      cv_link: 'https://www.africau.edu/images/default/sample.pdf',
      status: 'INVITED',
    },
  ])
  const [fetching, setFetching] = useState(false)
  const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>()

  const router = useRouter()

  const fetchFunction = useCallback(async () => {
    // setFetching(true)
    // try {
    //   const p: any = await axios.get(`${TEST_API_URL}/linkedin-applicant/get`, {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `${localStorage.getItem('access_token')}`,
    //     },
    //   })
    //   setApplicant(p.Data as [])
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
    console.log(applicants)
  }, [fetchFunction])
  return (
    <AdminLayout>
      <Title align="center">Linkedin Applicants</Title>

      <section>
        <ApplicantsTable
          applicants={applicants}
          fetching={fetching}
          setModal={setModal as Dispatch<SetStateAction<MoadalType>>}
          setSelectedApplicant={
            setSelectedApplicant as Dispatch<SetStateAction<ApplicantType>>
          }
        />
      </section>

      <div>
        <ApplicantsModals
          modal={modal as MoadalType}
          setModal={setModal as Dispatch<SetStateAction<MoadalType>>}
          selectedApplicant={selectedApplicant as ApplicantType}
          setSelectedApplicant={
            setSelectedApplicant as Dispatch<SetStateAction<ApplicantType>>
          }
          fetchFunction={fetchFunction}
        />
      </div>
    </AdminLayout>
  )
}

export default Applicants
