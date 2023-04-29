import { Title } from '@mantine/core'
import { Pagination } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { JobsOptionsType, fetchJobs } from '../../../services/linkedin-jobs'
import { useColumns } from '../../../table-columns/jobs'
import Table from '../../Table'
import { SearchInput } from '../SearchInput'
import { SelectedItemHeader } from './SelectedItemHeader'

export interface JobType {
  id: string
  created_at: string
  updated_at: string
  linkedin_account_id: string
  title: string
  description: string
  job_id: string
  link: string
  location: string
  status: string
  is_active: boolean
}

interface JobsTableProps {
  accountID: string
  selectedJob: JobType
  setSelectedJob: React.Dispatch<React.SetStateAction<JobType | null>>
}

export const LinkedinAccountJobs = ({
  accountID,
  selectedJob,
  setSelectedJob,
}: JobsTableProps) => {
  const [jobs, setJobs] = useState([])

  const [fetchingJobs, setFetchingJobs] = useState(false)

  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 20 })

  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState('')

  const router = useRouter()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    await fetchData({ search })
  }

  const columns = useColumns()

  const fetchData = useCallback(
    async (options: JobsOptionsType) => {
      setFetchingJobs(true)
      try {
        const data = await fetchJobs(options)
        setJobs(data.Data)
        setTotalCount(data.Meta.total_count)
      } catch (error: any) {
        if ((error.response?.status as number) === 401) {
          await router.push('/admin/login')
        }
        toast.error('Something went wrong')
      }
      setFetchingJobs(false)
    },
    [router]
  )

  useEffect(() => {
    void fetchData({ id: accountID, ...pagination })
  }, [pagination])

  useEffect(() => {
    if (rowSelection && !!Object.keys(rowSelection).length) {
      const selectedIndex = parseInt(Object.keys(rowSelection)[0])
      return setSelectedJob(jobs[selectedIndex])
    }
    return setSelectedJob(null)
  }, [rowSelection])

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageSize, pageIndex })
  }

  useEffect(() => {
    if (rowSelection && !!Object.keys(rowSelection).length) {
      const selectedIndex = parseInt(Object.keys(rowSelection)[0])
      setSelectedJob(jobs[selectedIndex])
    } else {
      setSelectedJob(null)
    }
  }, [rowSelection])

  return selectedJob ? (
    <SelectedItemHeader
      setItemSelected={setRowSelection}
      selectedDescription="Job Selected"
      title={selectedJob.title}
      key={'job'}
    />
  ) : (
    <section>
      <Head>
        <title>Linkedin Jobs</title>
      </Head>
      <div className="mb-8 flex items-center justify-between">
        <Title size={24} align="center" className="text-white">
          Linkedin Jobs
        </Title>
        <SearchInput
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          placeholder="Search by Title"
          disabled={fetchingJobs || jobs.length === 0}
        />
      </div>
      <div className="my-8 flex flex-col justify-between">
        {fetchingJobs || jobs.length > 0 ? (
          <>
            <Table
              loading={fetchingJobs}
              columns={columns}
              data={jobs}
              state={{ rowSelection, pagination }}
              enableRowSelection={true}
              onRowSelectionChange={setRowSelection}
              manualPagination
              pageCount={totalCount}
              enableSorting={false}
            />
            <Pagination
              current={pagination.pageIndex}
              pageSize={pagination.pageSize}
              total={totalCount}
              onChange={handlePaginationChange}
              showSizeChanger
              onShowSizeChange={handlePaginationChange}
            />
          </>
        ) : (
          <Title size={14} className="text-white">
            No data
          </Title>
        )}
      </div>
    </section>
  )
}
