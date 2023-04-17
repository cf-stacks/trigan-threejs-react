import { SetStateAction, useState, Dispatch, useEffect } from 'react'
import {
  Table,
  Loader,
  Button,
  createStyles,
  Title,
  Input,
} from '@mantine/core'
import { IconMail, IconPencil, IconSearch } from '@tabler/icons'
import { useRouter } from 'next/router'
import { Pagination, PaginationProps } from 'antd'
import {
  ApplicantOptionsType,
  fetchApplicants,
} from '../../../services/linkedin-applicants'
import { ApplicantsModals } from '../linkedinapplicants/LinkedinApplicantsModals'
import { toast } from 'react-hot-toast'
import { JobType } from './LinkedinAccountJobs'
import { ApplicantType } from '../linkedinapplicants/LinkedinApplicantsTable'

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

export interface ModalType {
  open: boolean
  size?: string
  type: 'edit'
}

interface ApplicantsTableProps {
  selectedJob: JobType
}

export const LinkedinJobApplicants = ({
  selectedJob,
}: ApplicantsTableProps) => {
  const [applicants, setApplicants] = useState([])
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>()

  const [fetchingApplicant, setFetchingApplicant] = useState(false)

  const [totalCountApplicants, setCountApplicants] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [page_size, setPageSize] = useState(20)

  const [modal, setModal] = useState({
    open: false,
    size: 'md',
    type: '',
  })
  const { classes, cx } = useStyles()
  const router = useRouter()

  const statusColors = { ACTIVE: 'green', REJECT: '#fcba03', INVITED: 'blue' }

  const applicantsList =
    applicants && applicants.length > 0 ? (
      applicants.map((applicant: ApplicantType, index: number) => (
        <tr key={index}>
          <td>{new Date(applicant.created_at).toLocaleDateString()}</td>
          <td>{new Date(applicant.updated_at).toLocaleDateString()}</td>
          <td>{applicant.linkedin_job_post_id}</td>
          <td>{applicant.name}</td>
          <td style={{ color: 'purple' }}>
            <a href={applicant.cv_link}>Link</a>
          </td>
          <td
            style={{
              color:
                statusColors[applicant.status as keyof typeof statusColors],
            }}
          >
            {applicant.status}
          </td>
          <td>{applicant.is_invited ? 'Yes' : 'No'}</td>
          <td>{applicant.is_nda ? 'Yes' : 'No'}</td>
          <td>
            <Button.Group>
              <Button
                onClick={() => {
                  setModal({ open: true, size: 'md', type: 'edit' })
                  setSelectedApplicant(applicant)
                }}
                variant="light"
                color="blue"
              >
                <IconPencil style={{ zIndex: -1 }} />
              </Button>
              <Button onClick={() => {}} variant="light" color="blue">
                <IconMail style={{ zIndex: -1 }} />
              </Button>
            </Button.Group>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={9}>No Items</td>
      </tr>
    )

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    fetchData({ search })
  }

  const fetchData = async (options: ApplicantOptionsType) => {
    setFetchingApplicant(true)
    try {
      const data = await fetchApplicants(options)
      setApplicants(data.Data)
      setCountApplicants(data.Meta.total_count)
    } catch (error: any) {
      if ((error.response?.status as number) === 401) {
        await router.push('/admin/login')
      }
      toast.error('Something went wrong')
    } finally {
      setFetchingApplicant(false)
    }
  }

  const handlePaginationChange = (page: number) => {
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
    return () => {
      fetchData({ id: selectedJob.id })
    }
  }, [router])

  useEffect(() => {
    void fetchData({ page, page_size })
  }, [page, page_size])

  if (fetchingApplicant)
    return (
      <main
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Loader />
      </main>
    )

  return (
    <section>
      <Title align="center">Linkedin Applicants</Title>
      <form className={classes.searchContainer} onSubmit={handleSearch}>
        <Input
          sx={{ width: '100%' }}
          placeholder={'Search by Name'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <IconSearch />
        </button>
      </form>
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
            <th>created at</th>
            <th>updated at</th>
            <th>linkedin job id</th>
            <th>name</th>
            <th>cv link</th>
            <th>status</th>
            <th>is invited</th>
            <th>is nda</th>
            <th colSpan={2} align="right">
              actions
            </th>
          </tr>
        </thead>
        <tbody>{applicantsList}</tbody>
      </Table>

      <Pagination
        current={page}
        pageSize={page_size}
        total={totalCountApplicants}
        onChange={handlePaginationChange}
        showSizeChanger
        onShowSizeChange={handlePageSizeChange}
      />

      <div>
        <ApplicantsModals
          modal={modal as ModalType}
          setModal={setModal as Dispatch<SetStateAction<ModalType>>}
          selectedApplicant={selectedApplicant as ApplicantType}
          setSelectedApplicant={
            setSelectedApplicant as Dispatch<SetStateAction<ApplicantType>>
          }
          fetchFunction={() =>
            fetchApplicants({
              page,
              page_size,
            })
          }
        />
      </div>
    </section>
  )
}
