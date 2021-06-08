import Axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState()
  const history = useHistory()

  function setLocalUser(user) {
    setUser(user)
    localStorage.setItem('userid', user._id)
  }
  function logout() {
    setUser()
  }

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userid')
    if (loggedInUserId) {
      Axios.get(`http://localhost:5000/user`, {
        params: { id: loggedInUserId },
      })
        .then((res) => {
          setUser(res.data)
          history.push('/')
        })
        .catch((e) => console.warn(e))
    }
  }, [])

  const value = {
    user,
    setLocalUser,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
