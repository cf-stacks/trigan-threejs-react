import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import {
  Table,
  Loader,
  Button,
  createStyles,
  Title,
  Input,
} from '@mantine/core'
import { IconPencil, IconSearch, IconX } from '@tabler/icons'
import { useRouter } from 'next/router'
import { Pagination, PaginationProps } from 'antd'
import { ApplicantOptionsType } from '../../../services/linkedin-applicants'
import { toast } from 'react-hot-toast'
import { fetchAccounts } from '../../../services/linkedin-accounts'
import { AccountsModals } from '../linkedinaccounts/LinkedinAccountsModals'
import { JobType } from './LinkedinJobApplicants'

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

interface AccountsTableProps {
  selectedAccount: AccountType
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>
  setSelectedJob: React.Dispatch<React.SetStateAction<JobType>>
}

export const LinkedinAccounts = ({
  selectedAccount,
  setSelectedAccount,
  setSelectedJob,
}: AccountsTableProps) => {
  const [accounts, setAccounts] = useState([])

  const [fetchingAccounts, setFetchingAccounts] = useState(false)

  const [totalCount, setCount] = useState(0)
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

  const fetchData = async (options?: ApplicantOptionsType) => {
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
    } finally {
      setFetchingAccounts(false)
    }
  }

  const handleSelectAccount = async (account: AccountType) => {
    if (account === selectedAccount) {
      setSelectedAccount(undefined)
      return
    }
    setSelectedAccount(account)
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    fetchData({ search })
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
      setSelectedAccount(undefined)
      fetchData()
    }
  }, [router])

  useEffect(() => {
    void fetchAccounts({ page, page_size })
    console.log(accounts)
  }, [fetchAccounts, page, page_size])

  const accountsList =
    accounts && accounts.length > 0 ? (
      accounts.map(
        (account: AccountType, index: number) =>
          (selectedAccount?.id === account.id || !selectedAccount?.id) && (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className={cx(classes.checkbox)}
                  checked={
                    !!selectedAccount && selectedAccount.id === account.id
                  }
                  onChange={() => handleSelectAccount(account)}
                />
              </td>
              <td>{new Date(account.created_at).toLocaleDateString()}</td>
              <td>{new Date(account.updated_at).toLocaleDateString()}</td>
              <td>{account.name}</td>
              <td>{account.description}</td>
              <td>{account.is_active ? 'Yes' : 'No'}</td>
              <td>{account.encrypted_account}</td>
              <td>
                <Button.Group>
                  <Button
                    onClick={() => {
                      setModal({ open: true, type: 'edit' })
                      setSelectedAccount(account)
                    }}
                    variant="light"
                    color="blue"
                  >
                    <IconPencil style={{ zIndex: -1 }} />
                  </Button>
                  <Button
                    onClick={() => {
                      setModal({ open: true, type: 'delete' })
                      setSelectedAccount(account)
                    }}
                    variant="light"
                    color="red"
                  >
                    <IconX style={{ zIndex: -1 }} />
                  </Button>
                </Button.Group>
              </td>
            </tr>
          )
      )
    ) : (
      <tr>
        <td colSpan={9}>No Items</td>
      </tr>
    )

  if (fetchingAccounts)
    return (
      <main
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Loader />
      </main>
    )

  return (
    <section>
      <Title align="center">Linkedin Accounts</Title>
      {!selectedAccount && (
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
            <th>name</th>
            <th>description</th>
            <th>is active</th>
            <th>encrypted account</th>
            <th colSpan={2} align="right">
              actions
            </th>
          </tr>
        </thead>
        <tbody>{accountsList}</tbody>
      </Table>

      {!selectedAccount && (
        <Pagination
          current={page}
          pageSize={page_size}
          total={totalCount}
          onChange={handlePageSizeChange}
          showSizeChanger
          onShowSizeChange={handlePaginationChange}
        />
      )}

      <div>
        <AccountsModals
          modal={modal as ModalType}
          setModal={setModal as Dispatch<SetStateAction<ModalType>>}
          selectedAccount={selectedAccount as AccountType}
          setSelectedAccount={
            setSelectedAccount as Dispatch<SetStateAction<AccountType>>
          }
          fetchFunction={() => fetchAccounts({ page, page_size })}
        />
      </div>
    </section>
  )
}
