import styled from "styled-components"
import NotifyPreview from "./NotifyPreview"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "~/screens/system/Loading"

import io from "socket.io-client"

import { NotificationContext } from "~/context/NotificationContext"

function ListNotifications() {
  const [selectedNotify, setSelectedNotify] = useState(null);
  // dùng useState để thay đổi isRead khi click vào một notify
  const [notifyData, setNotifyData] = useState()
  const token = localStorage.getItem("token")
  const userAuth = localStorage.getItem("userAuth")
  const userData = JSON.parse(localStorage.getItem("userAuth"))
  const userID = userData ? userData.userID : ""
  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3000/s/loadNotification", {
        params: {
          userID
        },
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setNotifyData(response.data)
        setIsLoad(false)
      })
      .catch((error) => {
        //Server shut down
        if (error.message === "Network Error") navigate("/server-shutdown");
        //Connection error
        if (error.response.status === 500) navigate("/500error");
        //Unauthorized. Need login
        if (error.response.status === 401) navigate("/401error");
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate("/403error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSelectNotify = (notify) => {
    setSelectedNotify(notify);
    const updatedNotifyData = notifyData.map((item) => {
      if (item.notifyID === notify.notifyID) {
        return { ...item, isRead: true };
      }
      return item;
    });
    setNotifyData(updatedNotifyData);
  };

  return (
    <>
      {
        isLoad ? (<Loading/>) :
          (
            <>
              <NotificationWrapper className="container white-space-small--top white-space-small">
                <h2 className="heading-tertiary">Notifications</h2>
                <div className="notifications">
                  <div className="notification-list">
                    {notifyData.map((notify) => (
                      <NotifyPreview
                        key={notify.notifyID}
                        notify={notify}
                        className="notification-item"
                        onClick={() => handleSelectNotify(notify)}
                      />
                    ))}
                  </div>
                  <div className="notification-content">
                    {selectedNotify ? (
                      <>
                        <h3>{selectedNotify.title}</h3>
                        <p>{selectedNotify.message}</p>
                        <p>{new Date(selectedNotify.time).toLocaleString()}</p>
                        <a
                          href={selectedNotify.routing}
                          target="_blank"
                          rel="noreferrer"
                          color="inherit"
                        >
                Go to Q&A
                        </a>
                      </>
                    ) : (
                      <p className="no-select">
              Select a notification to see the details
                      </p>
                    )}
                  </div>
                </div>
              </NotificationWrapper>
            </>
          )
      }
    </>
  );
}

const NotificationWrapper = styled.section`
  .notifications {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 4.8rem;
  }
  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
  .notification-list {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 60vh;
    ${"" /* làm thanh cuộn  */}
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
  }
  .notification-item {
    background-color: #fff;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
  }
  .notification-content {
    padding: 1.6rem;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    a {
      display: block;
      font-size: 1.6rem;
      color: #1971c2;
      margin-top: 1.6rem;
      text-decoration: none;
      &:hover {
        color: #155b96;
      }
    }
    .no-select {
      font-size: 1.6rem;
      color: #333;
      text-align: center;
    }
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
    color: #333;
  }

  p {
    font-size: 1.4rem;
    color: #333;
    line-height: 1.6;
  }

  @media (max-width: 1400px) {
    .notifications {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .notifications {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .notification-list {
      height: auto;
    }
  }
`;

export default ListNotifications;
