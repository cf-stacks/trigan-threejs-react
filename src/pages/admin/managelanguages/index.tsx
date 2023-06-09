import { Button, Title, createStyles } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import axios from 'axios'
import { NextPage } from 'next'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Language,
  ManageLanguagesModal,
} from '../../../components/admin/managelanguages/ManageLanguagesModal'
import { ManageLanguageTable } from '../../../components/admin/managelanguages/ManageLanguagesTable'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { TEST_API_URL } from '../../../util/constants'

interface DashboardProps {
  children?: ReactNode
}

const useStyles = createStyles(() => ({
  topSection: {
    display: 'flex',
    alignItems: 'center',
    '@media only screen and (max-width: 850px)': {
      flexDirection: 'column',
    },
  },
  searchForm: {
    display: 'flex',
    width: '600px',
    '@media only screen and (max-width: 850px)': {
      width: '300px',
    },
  },
}))

const Dashboard: NextPage<DashboardProps> = () => {
  const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
  const [languages, setLanguages] = useState<Language[]>([])

  const { classes } = useStyles()

  const fetchFunction = useCallback(async () => {
    try {
      const m = await axios.get<{ Data: Language[] }>(
        `${TEST_API_URL}/managelanguages/getAll`,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
            'Content-Language': `${localStorage.getItem('content-language')}`,
            Session: `${localStorage.getItem('session_key')}`,
          },
        }
      )

      setLanguages(m.data.Data || [])
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      await fetchFunction()
    }
    void fetchData()
  }, [fetchFunction])

  useEffect(() => {
    async function fetchData() {
      await fetchFunction()
    }

    if (modal.type === 'reload') {
      setModal({ ...modal, type: '' })
      void fetchData()
    }
  }, [modal, fetchFunction])

  return (
    <AdminLayout>
      <Title align={'center'}>Manage Languages List</Title>
      <section className={classes.topSection}>
        <Button
          color="green"
          variant="filled"
          onClick={() => setModal({ open: true, type: 'create', size: '' })}
          sx={{ backgroundColor: '#40c057 !important', margin: '1rem auto' }}
          leftIcon={<IconPlus />}
        >
          Create Language
        </Button>
      </section>

      <section>
        <ManageLanguageTable
          data={languages}
          fetching={false} //pass fetching instead of false when url is fixed
          setModal={setModal}
        />
      </section>

      <div>
        <ManageLanguagesModal modal={modal} setModal={setModal} />
      </div>
    </AdminLayout>
  )
}

export default Dashboard
