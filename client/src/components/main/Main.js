import React from 'react'
import { useUser } from '../contexts/UserContext'

export default function Main() {
  const { user, logout } = useUser()
  return (
    <div>
      {user.username}
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}
