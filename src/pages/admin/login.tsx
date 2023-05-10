import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core'
import toast from 'react-hot-toast'
import { getErrorMsg } from '../../util/api'

import { useAdminContext } from '../../context/AdminContext'
import { TEST_API_URL } from '../../util/constants'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn, setUser }: any = useAdminContext()
  const router = useRouter()
  const [fetching, setFetching] = useState(false)

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setFetching(true)
    try {
      const user: any = await axios.post(
        `${TEST_API_URL}/auth/login`,
        {
          username: email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const userDetails = user.data.Data?.Data?.user
      // check whether user is an admin or super admin user
      if(![1,2].includes(userDetails.role_id)){
        setFetching(false)
        return toast.error('Invalid credentials')
      }
      localStorage.setItem(
        'access_token',
        user.data.Data.Data.acess_token as string
      )
      setIsLoggedIn(true)
      setUser(user.data.Data?.Data?.user)
      void router.push('/admin/main')
    } catch (error: any) {
      setIsLoggedIn(false)
      setUser({})
      if (error.response?.status === 401) {
        toast.error('Wrong username or password')
      } else {
        toast.error(getErrorMsg(error))
      }
    }
    setFetching(false)
  }
  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmit}>
            <TextInput
              label="Username"
              placeholder="Your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{ backgroundColor: 'rgb(34, 139, 230)!important' }}
              type="submit"
              fullWidth
              mt="xl"
              disabled={fetching}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Login
