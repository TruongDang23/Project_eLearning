// src/context/NotificationContext.js
import { createContext, useState } from 'react'

export const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
  const [localStorages, setLocalStorage] = useState({
    token: '',
    userAuth: ''
  })

  const updateStorage = (data) => {
    setLocalStorage({
      token: data.token,
      userAuth: data.userAuth
    })
  }

  return (
    <SessionContext.Provider
      value={{ localStorages, updateStorage }}
    >
      {children}
    </SessionContext.Provider>
  )
}
