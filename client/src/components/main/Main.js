import React from 'react'
import { Link } from 'react-router-dom'
import { SocketProvider } from '../contexts/SocketContext'
import { useUser } from '../contexts/UserContext'

export default function Main() {
  const { user, logout } = useUser()
  return (
    <SocketProvider id={user._id}>
      <Link to='/chat'>Chat</Link>
      <button onClick={() => logout()}>Log out</button>
    </SocketProvider>
  )
}
