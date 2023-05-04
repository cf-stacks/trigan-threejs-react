import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { ApplicantType } from '../../components/admin/linkedin/LinkedinJobApplicants'

const dateFormatter = (value: string) => moment(value).format('DD/MM/YYYY')

interface Arguments {
  edit: (applicant: ApplicantType) => void
  remove: (applicant: ApplicantType) => void
  previewPdf: (cvLink: string) => void
}

const columnHelper = createColumnHelper<ApplicantType>()

export const useColumns = ({ edit, remove, previewPdf }: Arguments) => {
  const columns: ColumnDef<ApplicantType, any>[] = useMemo(
    () => [
      columnHelper.accessor('created_at', {
        header: 'Date created',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('updated_at', {
        header: 'Last updated',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('linkedin_job_post_id', {
        header: 'Linkedin Job ID',
      }),
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('cv_link', {
        header: 'CV Link',
        cell: ({ getValue }) => {
          return (
            !!getValue() && (
              <button
                className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                hidden={!!getValue()}
                onClick={() => previewPdf(getValue())}
              >
                preview
              </button>
            )
          )
        },
      }),
      columnHelper.accessor('applicant_link', {
        header: 'Applicant Link',
        cell: ({ getValue }) => {
          return (
            <a
              className="text-md text-blue-600 hover:underline dark:text-blue-500"
              href={getValue()}
              target="_blank"
            >
              Link
            </a>
          )
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
      }),
      columnHelper.accessor('is_invited', {
        header: 'Is Invited ',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
      }),
      columnHelper.accessor('is_nda', {
        header: 'Is Active',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-x-4">
            <span className="cursor-pointer" onClick={() => edit(row.original)}>
              <AiFillEdit size={20} />
            </span>

            <span
              className="cursor-pointer"
              onClick={() => remove(row.original)}
            >
              <AiFillDelete size={20} />
            </span>
          </div>
        ),
      }),
    ],
    [edit, remove, previewPdf]
  )
  return columns
}
