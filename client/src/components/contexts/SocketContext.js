import React, { useEffect, useContext, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useUser() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { query: { id } })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  const value = {
    socket,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
