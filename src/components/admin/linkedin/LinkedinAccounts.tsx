import { Title } from '@mantine/core'
import { Pagination, PaginationProps } from 'antd'
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
import Table from '../../../components/Table'
import {
  AccountsOptionsType,
  fetchAccounts,
} from '../../../services/linkedin-accounts'
import { useColumns } from '../../../table-columns/accounts'
import { SearchInput } from '../SearchInput'
import { AccountsModals } from '../linkedinaccounts/LinkedinAccountsModals'
import { SelectedItemHeader } from './SelectedItemHeader'

export interface AccountType {
  id: string
  creator_id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  is_active: boolean
  encrypted_account: string
}

export interface ModalType {
  open: boolean
  size?: string
  type: 'create' | 'edit' | 'delete'
}

interface LinkedinAccountsProps {
  selectedAccount?: AccountType | null
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType | null>>
}

export const LinkedinAccounts = ({
  selectedAccount,
  setSelectedAccount,
}: LinkedinAccountsProps) => {
  const [accounts, setAccounts] = useState([])
  const [account, setAccount] = useState<AccountType | null>(null)

  const [rowSelection, setRowSelection] = useState({})
  const paginationInitialState = { pageIndex: 1, pageSize: 20 }
  const [pagination, setPagination] = useState(paginationInitialState)

  const [fetchingAccounts, setFetchingAccounts] = useState(false)

  const [totalCount, setCount] = useState(0)
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState({
    open: false,
    size: 'md',
    type: '',
  })

  const router = useRouter()

  const columns = useColumns({
    edit: (account: AccountType) => {
      setAccount(account)
      setModal({ open: true, size: 'md', type: 'edit' })
    },
    remove: (account: AccountType) => {
      setAccount(account)
      setModal({ open: true, size: 'md', type: 'delete' })
    },
  })

  const fetchData = useCallback(
    async (options: AccountsOptionsType) => {
      setFetchingAccounts(true)
      try {
        const data = await fetchAccounts(options)
        setAccounts(data.Data)
        setCount(data.Meta.total_count)
      } catch (error: any) {
        if ((error.response?.status as number) === 401) {
          await router.push('/admin/login')
        }
        toast.error('Something went wrong')
      }
      setFetchingAccounts(false)
    },
    [router]
  )

  useEffect(() => {
    void fetchData(pagination)
  }, [fetchData, pagination])

  useEffect(() => {
    if (rowSelection && !!Object.keys(rowSelection).length) {
      const selectedIndex = parseInt(Object.keys(rowSelection)[0])
      return setSelectedAccount(accounts[selectedIndex])
    }
    return setSelectedAccount(null)
  }, [rowSelection])

  useEffect(() => {
    if (!selectedAccount) {
      setRowSelection({})
    }
  }, [selectedAccount])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    await fetchData({ search })
  }

  const handlePaginationChange = (pageIndex: number) => {
    setPagination({ pageSize: pagination.pageSize, pageIndex })
  }

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPagination({ pageIndex: 1, pageSize })
  }

  return selectedAccount ? (
    <SelectedItemHeader
      setItemSelected={setRowSelection}
      selectedDescription="Account Selected"
      title={selectedAccount.name}
      key={'account'}
    />
  ) : (
    <section>
      <Head>
        <title>Linkedin Accounts</title>
      </Head>
      <div className="mb-8 flex items-center justify-between">
        <Title size={24} align="center" className="text-white">
          Linkedin Accounts
        </Title>
        <SearchInput
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          placeholder="Search by Name"
          disabled={fetchingAccounts || accounts.length === 0}
        />
      </div>
      <div className="my-8 flex flex-col justify-between">
        {fetchingAccounts || accounts.length > 0 ? (
          <>
            <Table
              loading={fetchingAccounts}
              columns={columns}
              data={accounts}
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
              onChange={handlePageSizeChange}
              showSizeChanger
              onShowSizeChange={handlePaginationChange}
              hideOnSinglePage={true}
            />
            <div>
              <AccountsModals
                modal={modal as ModalType}
                setModal={setModal as Dispatch<SetStateAction<ModalType>>}
                selectedAccount={account as AccountType}
                setSelectedAccount={
                  setSelectedAccount as Dispatch<SetStateAction<AccountType>>
                }
                fetchFunction={() => fetchAccounts(pagination)}
              />
            </div>
          </>
        ) : (
          <Title
            size={14}
            className="mb-4 bg-[#39394B] py-5 text-center text-white"
          >
            No data
          </Title>
        )}
      </div>
    </section>
  )
}
