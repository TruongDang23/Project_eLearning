// src/context/NotificationContext.js
import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Lấy thông tin người dùng từ localStorage
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const userData = JSON.parse(localStorage.getItem('userAuth'))
  const userID = userData ? userData.userID : ''

  useEffect(() => {
    // Hàm lấy dữ liệu thông báo ban đầu từ API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/s/loadNotification',
          {
            params: { userID },
            headers: {
              Token: token,
              User: userAuth
            }
          }
        )
        setNotifications(response.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        // Xử lý các lỗi tương tự như trong code ban đầu
        if (error.message === 'Network Error') navigate('/server-shutdown')
        else if (error.response) {
          const status = error.response.status
          if (status === 500) navigate('/500error')
          if (status === 401) navigate('/401error')
          if (status === 403) navigate('/403error')
        }
      }
    }

    fetchNotifications()
  }, [userID, token, userAuth, navigate])

  useEffect(() => {
    // Kết nối socket.io chỉ khi đã có userID
    if (!userID) return

    const socket = io('http://localhost:3001', {
      query: { userID }, // Gửi userID trong query nếu cần
      withCredentials: true
    })

    // Nghe sự kiện 'notification' từ server
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications])
    })

    // Cleanup khi component unmount
    return () => {
      socket.disconnect()
    }
  }, [userID])

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      query: { userID }, // Gửi userID trong query nếu cần
      withCredentials: true
    })
    // Cập nhật số lượng thông báo chưa đọc
    const count = notifications.filter((notify) => !notify.isRead).length
    setUnreadCount(count)

    // Bạn có thể gửi yêu cầu lên server để cập nhật số lượng thông báo chưa đọc nếu cần
    socket.emit('unreadCount', count)
  }, [notifications])

  const markAsRead = (notifyID) => {
    const socket = io('http://localhost:3001', {
      query: { userID }, // Gửi userID trong query nếu cần
      withCredentials: true
    })
    setNotifications((prevNotifications) =>
      prevNotifications.map((notify) =>
        notify.notifyID === notifyID ? { ...notify, isRead: true } : notify
      )
    )
    // Bạn có thể gửi yêu cầu lên server để cập nhật trạng thái đã đọc nếu cần
    // Emit the updated unread count to the server
    const unreadCount = notifications.filter((notify) => !notify.isRead).length
    socket.emit('unreadCount', unreadCount)
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, isLoading }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
