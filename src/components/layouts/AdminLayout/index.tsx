import {
  Button,
  Center,
  createStyles,
} from '@mantine/core'
import {
  IconMenu2,
  IconX,
} from '@tabler/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { TEST_API_URL } from '../../../util/constants'
import { MantineProvider, AppShell } from '@mantine/core';
import Navigation from './Navigation'

interface AdminLayoutProps {
  children?: ReactNode
}

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: "100vh",
  },
  link: {
    // width: 50,
    // height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
    position: 'relative',
  },
  navbar: {
    width: "0px",
    transition: "width 0.3 ease"
  },
  navbarOpen: {
    width: "218px",
  },
  slideLeft: {
    transform: 'translateX(-80px)',
    transition: 'transform 0.3s ease',
  },
  slideRight: {
    transform: 'translateX(calc(100vw - 80px))',
    transition: 'transform 0.3s ease',
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  dropdown: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}))

//Creating admin context
const AppContext = React.createContext({})
const AppProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const checkLoggedIn = async () => {
    console.log('checking if logged in')
    try {
      await axios.get(`${TEST_API_URL}/posts`, {
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      setIsLoggedIn(true)
      return true
    } catch (error) {
      setUser({})
      setIsLoggedIn(false)
      return false
    }
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, user, checkLoggedIn }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAdminContext = () => {
  return useContext(AppContext)
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const {push} = useRouter()
  const { classes } = useStyles()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      push('/admin/login')
    }
  }, [push])

  return (
    <AppProvider>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <AppShell
          padding="md"
          navbar={<Navigation isOpen={isOpen} setIsOpen={setIsOpen} />}
          styles={(theme) => ({
            main: { backgroundColor: "#222131", paddingTop: 35, paddingLeft: 218 + 30 },
          })}
        >
            {/*
          <Center
            sx={{
              position: 'fixed',
              left: 0,
              top: 5,
              width: '80px',
              zIndex: 999999,
            }}
            onClick={() => setOpen(open ? false : true)}
          >
            <Button size="xs" variant="white" color="dark" compact>
              {!open ? <IconX /> : <IconMenu2 />}
            </Button>
          </Center>
              */}
          <main className={classes.main}>
              {children}
          </main>
        </AppShell>
      </MantineProvider>
    </AppProvider>
  )
}

export default AdminLayout
