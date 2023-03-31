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
  const [applicants, setApplicants] = useState([])
  const [fetching, setFetching] = useState(false)
  const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>()

  const router = useRouter()

  const fetchFunction = useCallback(async () => {
    setFetching(true)
    try {
      const p: any = await axios.get(`${TEST_API_URL}/linkedin-applicant/get`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      setApplicants(p.Data as [])
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
