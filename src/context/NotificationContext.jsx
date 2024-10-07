import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [readCount, setReadCount] = useState(0)

  useEffect(() => {
    const socket = io('http://localhost:3000') // Replace with your server URL

    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const count = notifications.filter((notify) => notify.isRead).length
    setReadCount(count)
  }, [notifications])

  const markAsRead = (notifyID) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notify) =>
        notify.notifyID === notifyID ? { ...notify, isRead: true } : notify
      )
    )
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, readCount, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
