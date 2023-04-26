import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import moment from 'moment'
import { useSelectColumn } from '../../components/Table/useSelectColumn'
import { AccountType } from '../../components/admin/linkedin/LinkedinAccounts'

interface Arguments {
  edit: (user: AccountType) => void
  remove: (user: AccountType) => void
}

const columnHelper = createColumnHelper<AccountType>()

const dateFormatter = (value: string) => moment(value).format('DD/MM/YYYY')

export const useColumns = ({ edit, remove }: Arguments) => {
  const selectColumn = useSelectColumn({ hideHeader: true })
  const columns: ColumnDef<AccountType, any>[] = useMemo(
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
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('description', {
        header: 'Description',
      }),
      columnHelper.accessor('is_active', {
        header: 'Is Active',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
      }),
      columnHelper.accessor('encrypted_account', {
        header: 'Encrypted Account',
        cell: ({ getValue }) => (
          <div className="w-[300px] truncate">{getValue()}</div>
        ),
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
    [selectColumn, edit, remove]
  )
  return columns
}
