import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { AiFillDelete, AiFillEdit, AiFillCopy } from 'react-icons/ai'
import moment from 'moment'
import { AdminInvitation } from '../../types/AdminInvitation'
import toast from 'react-hot-toast'

interface Arguments {
  edit: (invitation: AdminInvitation) => void
  remove: (invitation: AdminInvitation) => void
}

const columnHelper = createColumnHelper<AdminInvitation>()

const dateFormatter = (value: string) => moment(value).format('DD MMM, YYYY')

export const useColumns = ({ edit, remove }: Arguments) => {
  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Copied value to clipboard')
    } catch (error) {
      toast.error('Error while copying to clipboard')
    }
  }
  const columns: ColumnDef<AdminInvitation, any>[] = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
      }),
      columnHelper.accessor('creator_id', {
        header: 'Creator Id',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
      }),
      columnHelper.accessor('token', {
        header: 'Token',
        cell: ({ getValue }) => (
          <div className="flex gap-x-4">
            <div>{getValue()?.slice(0, 10)}...</div>
            <div
              className="cursor-pointer"
              onClick={() => copyToClipboard(getValue())}
            >
              <AiFillCopy size={20} />
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('created_at', {
        header: 'Date created',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('updated_at', {
        header: 'Last updated',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.accessor('expired_at', {
        header: 'Expires On',
        cell: ({ getValue }) => dateFormatter(getValue()),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row: { original: currentAdminInvitation } }) => (
          <div className="flex gap-x-4">
            <span className="cursor-pointer">
              <AiFillEdit
                size={20}
                onClick={() => edit(currentAdminInvitation)}
              />
            </span>

            <span className="cursor-pointer">
              <AiFillDelete
                size={20}
                onClick={() => remove(currentAdminInvitation)}
              />
            </span>
          </div>
        ),
      }),
    ],
    [edit, remove]
  )
  return columns
}
