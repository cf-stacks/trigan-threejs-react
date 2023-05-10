import React, { ReactNode, useContext, useState } from 'react'

//Creating admin context
const AppContext = React.createContext({})
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  return (
    <AppContext.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAdminContext = () => {
  return useContext(AppContext)
}
