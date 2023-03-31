import { NextPage } from 'next'
import React, {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'
import axios, { AxiosError } from 'axios'
import { TEST_API_URL } from '../../../util/constants'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import TabHeaderAction from '../../../components/tabHeaderAction'
import {
  AccountType,
  AccountsTable,
  MoadalType,
} from '../../../components/admin/linkedinaccounts/LinkedinAccountsTable'
import { AccountsModals } from '../../../components/admin/linkedinaccounts/LinkedinAccountsModals'

const Accounts: NextPage = () => {
  const [search, setSearch] = useState('')
  const [accounts, setAccounts] = useState([])
  const [fetching, setFetching] = useState(false)
  const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
  const [selectedAccount, setSelectedAccount] = useState<AccountType>()

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    await fetchByUsername()
  }
  const fetchByUsername = useCallback(async () => {}, [])

  const fetchFunction = useCallback(async () => {
    setFetching(true)
    try {
      const p: any = await axios.get(`${TEST_API_URL}/linkedin-job/get`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      setAccounts(p.Data as [])
    } catch (error) {
      console.log(error)
      const err = error as AxiosError
      if ((err.response?.status as number) === 401) {
        await router.push('/admin/login')
      }
      toast.error('Something went wrong')
    }
    setFetching(false)
  }, [router])

  useEffect(() => {
    void fetchFunction()
    console.log(accounts)
  }, [fetchFunction])
  return (
    <AdminLayout>
      <Title align="center">Linkedin Accounts</Title>
      <TabHeaderAction
        search={{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          handleSubmit: handleSubmit,
        }}
        create={{
          onClick: () => setModal({ open: true, type: 'create', size: '' }),
          text: 'Create Account',
        }}
      />

      <section>
        <AccountsTable
          accounts={accounts}
          fetching={fetching}
          setModal={setModal as Dispatch<SetStateAction<MoadalType>>}
          setSelectedAccount={
            setSelectedAccount as Dispatch<SetStateAction<AccountType>>
          }
        />
      </section>

      <div>
        <AccountsModals
          modal={modal as MoadalType}
          setModal={setModal as Dispatch<SetStateAction<MoadalType>>}
          selectedAccount={selectedAccount as AccountType}
          setSelectedAccount={
            setSelectedAccount as Dispatch<SetStateAction<AccountType>>
          }
          fetchFunction={fetchFunction}
        />
      </div>
    </AdminLayout>
  )
}

export default Accounts
