import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { useMemo } from 'react'
import { useSelectColumn } from '../../components/Table/useSelectColumn'
import { JobType } from '../../components/admin/linkedin/LinkedinAccountJobs'

const columnHelper = createColumnHelper<JobType>()

const dateFormatter = (value: string) => moment(value).format('DD/MM/YYYY')

export const useColumns = () => {
  const selectColumn = useSelectColumn({ hideHeader: true })
  const columns: ColumnDef<JobType, any>[] = useMemo(
    () => [
      selectColumn,
      columnHelper.accessor('created_at', {
        header: 'Date created',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('updated_at', {
        header: 'Last updated',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('linkedin_account_id', {
        header: 'Linkedin Account ID',
      }),
      columnHelper.accessor('title', {
        header: 'Title',
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ getValue }) => (
          <div className={'line-clamp-5 w-[300px]'} title={getValue()}>
            {getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('job_id', {
        header: 'Job ID',
      }),
      columnHelper.accessor('link', {
        header: 'Link',
        cell: ({ getValue }) => (
          <a
            href={getValue()}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Link
          </a>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: ({ getValue }) => (
          <div className="w-[200px] truncate">{getValue()}</div>
        ),
      }),
      columnHelper.accessor('is_active', {
        header: 'Is Active',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
      }),
    ],
    [selectColumn]
  )
  return columns
}
