import React, { ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { TEST_API_URL } from '../util/constants'

//Creating admin context
const AppContext = React.createContext({})
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  // check whether access_token exists and fetch user details
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const username = localStorage.getItem('username')
    ;(async () => {
      if (accessToken && username) {
        const { data } = await axios.get(`${TEST_API_URL}/users/${username}`, {
          headers: { Authorization: accessToken },
        })
        const userDetails = data.Data
        setIsLoggedIn(true)
        setUser(userDetails)
      }
    })()
  }, [])

  return (
    <AppContext.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAdminContext = () => {
  return useContext(AppContext)
}
