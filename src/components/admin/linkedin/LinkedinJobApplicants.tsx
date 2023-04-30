import { Title } from '@mantine/core'
import { Pagination } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'
import {
  ApplicantListOptionsType,
  fetchApplicants,
  fetchPdf,
} from '../../../services/linkedin-applicants'
import { useColumns } from '../../../table-columns/applicants'
import Table from '../../Table'
import { PdfPreview } from '../PdfPreview'
import { SearchInput } from '../SearchInput'
import { ApplicantsModals } from '../linkedinapplicants/LinkedinApplicantsModals'
import { JobType } from './LinkedinAccountJobs'

export interface ModalType {
  open: boolean
  size?: string
  type: 'edit'
}

export interface ApplicantType {
  id: string
  created_at: string
  updated_at: string
  linkedin_job_post_id: string
  name: string
  cv_link: string
  applicant_link: string
  status: string
  is_invited: boolean
  is_nda: boolean
}

interface ApplicantsTableProps {
  selectedJob: JobType
}

export const LinkedinJobApplicants = ({
  selectedJob,
}: ApplicantsTableProps) => {
  const [applicants, setApplicants] = useState([])
  const [applicant, setApplicant] = useState<ApplicantType>()
  const [selectedCvLink, setSelectedCvLink] = useState('')
  const [pdfDocument, setPdfDocument] = useState('')
  const [loadingPdf, setLoadingPdf] = useState(false)

  const [fetchingApplicants, setFetchingApplicant] = useState(false)

  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 20 })

  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState({
    open: false,
    size: 'md',
    type: '',
  })
  const router = useRouter()

  const previewPdf = (url: string) => {
    setSelectedCvLink(url)
  }

  const columns = useColumns({
    edit: (applicant: ApplicantType) => {
      setApplicant(applicant)
      setModal({ open: true, size: 'md', type: 'edit' })
    },
    remove: (applicant: ApplicantType) => {
      setApplicant(applicant)
      setModal({ open: true, size: 'md', type: 'delete' })
    },
    previewPdf,
  })

  const fetchData = useCallback(
    async (options: ApplicantListOptionsType) => {
      setFetchingApplicant(true)
      try {
        const data = await fetchApplicants(options)
        setApplicants(data.Data)
        setTotalCount(data.Meta.total_count)
      } catch (error: any) {
        if ((error.response?.status as number) === 401) {
          await router.push('/admin/login')
        }
        toast.error('Something went wrong')
      }
      setFetchingApplicant(false)
    },
    [router]
  )

  const fetchDoc = useCallback(
    async (url: string) => {
      if (selectedCvLink) {
        setLoadingPdf(true)
        try {
          const response = await fetchPdf({ url })
          setPdfDocument(response)
        } catch (error: any) {
          if ((error.response?.status as number) === 401) {
            await router.push('/admin/login')
          }
          if ((error.response?.status as number) === 403) {
            setSelectedCvLink('')
          }
          toast.error('Something went wrong')
        }
        setLoadingPdf(false)
      }
    },
    [selectedCvLink]
  )

  useEffect(() => {
    void fetchData({ id: selectedJob.id, ...pagination })
  }, [fetchData, pagination])

  useEffect(() => {
    if (selectedCvLink) {
      fetchDoc(selectedCvLink)
    }
  }, [selectedCvLink])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    await fetchData({ search })
  }

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageSize, pageIndex })
  }

  return (
    <section>
      <Head>
        <title>Linkedin Applicants</title>
      </Head>
      <div className="mb-8 flex items-center justify-between">
        <Title size={24} align="center" className="text-white">
          Linkedin Applicants
        </Title>
        <SearchInput
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          placeholder="Search by Name"
          disabled={fetchingApplicants || applicants.length === 0}
        />
      </div>
      <div className="flex flex-col justify-between">
        {fetchingApplicants || applicants.length > 0 ? (
          <>
            <Table
              loading={fetchingApplicants}
              columns={columns}
              data={applicants}
              state={{ pagination }}
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
      <div>
        <PdfPreview
          pdfDocument={pdfDocument}
          loadingPdf={loadingPdf}
          cvLink={selectedCvLink}
          setSelectedCvLink={setSelectedCvLink}
        />
        <ApplicantsModals
          modal={modal as ModalType}
          setModal={setModal as Dispatch<SetStateAction<ModalType>>}
          selectedApplicant={applicant as ApplicantType}
          setSelectedApplicant={
            setApplicant as Dispatch<SetStateAction<ApplicantType>>
          }
          fetchFunction={() => fetchApplicants(pagination)}
        />
      </div>
    </section>
  )
}
