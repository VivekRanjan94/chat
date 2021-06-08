import React, { useEffect, useContext, useState } from 'react'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState()

  function setLocalUser(user) {
    setUser(user)
  }
  function logout() {
    setUser()
  }

  useEffect(() => {
    console.log(user)
  }, [])

  const value = {
    user,
    setLocalUser,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
