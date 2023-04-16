import { useState, useEffect } from 'react'
import { Table, Loader, createStyles, Title, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useRouter } from 'next/router'
import { Pagination, PaginationProps } from 'antd'
import { ApplicantOptionsType } from '../../../services/linkedin-applicants'
import { toast } from 'react-hot-toast'
import { fetchJobs } from '../../../services/linkedin-jobs'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  checkbox: {
    borderRadius: '2px',
    height: '20px',
    width: '20px',
    zIndex: 'auto',

    input: {
      height: '20px',
      width: '20px',
      outline: '0px !important',

      ':checked, :hover': {
        backgroundColor: '#A855F7 !important',
      },
    },
  },

  '& *': {
    fontSize: '0.75rem',
  },

  searchContainer: {
    marginRight: '1.5rem',
    position: 'relative',
    display: 'flex',
    width: '341px',
    '@media only screen and (max-width: 850px)': {
      width: '300px',
    },

    input: {
      backgroundColor: '#39394B',
      color: 'white',
      borderRadius: '10px',
      padding: '12px 20px',
      paddingRight: '62px',
      width: '100%',
      height: '42px',
    },

    button: {
      borderRadius: '10px',
      position: 'absolute',
      right: '0',
      color: 'white',
      height: '42px',
      width: '42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))

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
  setSelectedJob: React.Dispatch<React.SetStateAction<JobType>>
}

export const LinkedinAccountJobs = ({
  accountID,
  selectedJob,
  setSelectedJob,
}: JobsTableProps) => {
  const [jobs, setJobs] = useState([])

  const [fetchingJobs, setFetchingJobs] = useState(false)

  const [totalCountJobs, setCountJobs] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [page_size, setPageSize] = useState(20)

  const { classes, cx } = useStyles()
  const router = useRouter()

  const handleSelectJob = async (job: JobType) => {
    if (job === selectedJob) {
      setSelectedJob(undefined)
      return
    }
    setSelectedJob(job)
    fetchJobs({ id: job.id })
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    fetchData({ search })
  }

  const fetchData = async (options: ApplicantOptionsType) => {
    setFetchingJobs(true)
    try {
      const data = await fetchJobs(options)
      setJobs(data.Data)
      setCountJobs(data.Meta.total_count)
    } catch (error: any) {
      if ((error.response?.status as number) === 401) {
        await router.push('/admin/login')
      }
      toast.error('Something went wrong')
    } finally {
      setFetchingJobs(false)
    }
  }

  const handlePaginationChange = (page: number) => {
    console.log('PAGEEE', page)

    setPage(page)
  }

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPage(1)
    setPageSize(pageSize)
  }

  useEffect(() => {
    setSelectedJob(undefined)
    return () => {
      fetchData({ id: accountID })
    }
  }, [router])

  useEffect(() => {
    void fetchData({ page, page_size })
    console.log(jobs)
  }, [page, page_size])

  const jobsList =
    jobs && jobs.length > 0 ? (
      jobs.map(
        (job: JobType, index: number) =>
          (selectedJob?.id === job.id || !selectedJob?.id) && (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className={cx(classes.checkbox)}
                  checked={!!selectedJob && selectedJob.id === job.id}
                  onChange={() => handleSelectJob(job)}
                />
              </td>
              <td>{new Date(job.created_at).toLocaleDateString()}</td>
              <td>{new Date(job.updated_at).toLocaleDateString()}</td>
              <td>{job.linkedin_account_id}</td>
              <td>{job.title}</td>
              <td>
                <div
                  style={{
                    whiteSpace: 'pre-line',
                    height: '100px',
                    overflowY: 'scroll',
                  }}
                >
                  {job.description}
                </div>
              </td>
              <td>{job.job_id}</td>
              <td style={{ color: 'purple' }}>
                <a href={job.link}>link</a>
              </td>
              <td>{job.location}</td>
              <td>{job.status}</td>
              <td>{job.is_active ? 'Yes' : 'No'}</td>
            </tr>
          )
      )
    ) : (
      <tr>
        <td colSpan={9}>No Items</td>
      </tr>
    )

  if (fetchingJobs)
    return (
      <main
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Loader />
      </main>
    )

  return (
    <section>
      <Title align="center">Linkedin Jobs</Title>
      {!selectedJob && (
        <form className={classes.searchContainer} onSubmit={handleSearch}>
          <Input
            sx={{ width: '100%' }}
            placeholder={'Search by Description'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <IconSearch />
          </button>
        </form>
      )}
      <Table
        sx={{
          minWidth: 700,
          '& td': {
            maxWidth: '200px',
            wordWrap: 'break-word',
          },
          '& th': {
            textTransform: 'capitalize',
          },
        }}
      >
        <thead className={cx(classes.header)}>
          <tr>
            <th></th>
            <th>created at</th>
            <th>updated at</th>
            <th>linkedin account id</th>
            <th>title</th>
            <th>description</th>
            <th>job id</th>
            <th>link</th>
            <th>location</th>
            <th>status</th>
            <th>is active</th>
          </tr>
        </thead>
        <tbody>{jobsList}</tbody>
      </Table>

      {!selectedJob && (
        <Pagination
          current={page}
          pageSize={page_size}
          total={totalCountJobs}
          onChange={handlePaginationChange}
          showSizeChanger
          onShowSizeChange={handlePageSizeChange}
        />
      )}
    </section>
  )
}
