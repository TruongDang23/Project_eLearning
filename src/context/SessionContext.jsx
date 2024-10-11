// src/context/NotificationContext.js
import { createContext, useState } from 'react'

export const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
  const [localData, setLocalData] = useState({
    token: '',
    userAuth: ''
  })

  // const updateStorage = (data) => {
  //   setLocalStorage({
  //     token: data.token,
  //     userAuth: data.userAuth
  //   })
  // }

  return (
    <SessionContext.Provider
      value={{ localData, setLocalData }}
    >
      {children}
    </SessionContext.Provider>
  )
}
