import styled from "styled-components";
import AvatarImg from "./a2.png";
import NotifyPreview from "./NotifyPreview";
import { useState } from "react";
const NotifyData = [
  {
    notifyID: 1,
    title:
      "New Course Added ew course on ReactJS has been addedew course on ReactJS has been added",
    message: "New course on ReactJS has been added",
    route: "/course/1",
    isRead: false,
    imgInstructor: AvatarImg,
    dateTimeRecive: "2024-06-10T10:00:00"
  },
  {
    notifyID: 2,
    title: "You are enrolled in a new course",
    message: "New course on Angular has been added",
    route: "/course/2",
    isRead: true,
    imgInstructor: AvatarImg,
    dateTimeRecive: "2024-06-14T10:00:00"
  },
  {
    notifyID: 3,
    title: "Yeah, I know that!",
    message: "New course on VueJS has been added",
    route: "/course/3",
    isRead: false,
    imgInstructor: AvatarImg,
    dateTimeRecive: "2023-10-10T10:00:00"
  },
  {
    notifyID: 4,
    title: "Hello World!",
    message: "New course on NodeJS has been added",
    route: "/course/4",
    isRead: true,
    imgInstructor: AvatarImg,
    dateTimeRecive: "2023-10-10T10:00:00"
  },
  {
    notifyID: 5,
    title: "New Course Added",
    message:
      "New course on MongoDB has been added. Một div kiểu grid 2 column. Một column về list các notify, một column về nội dung của từng column đó. Mỗi khi nhấn vào một item trong column bên này thì nội dung sẽ để qua bên column kia",
    route: "/course/5",
    isRead: false,
    imgInstructor: AvatarImg,
    dateTimeRecive: "2024-10-10T10:00:00"
  }
];

function ListNotifications() {
  const [selectedNotify, setSelectedNotify] = useState(null);
  // dùng useState để thay đổi isRead khi click vào một notify
  const [notifyData, setNotifyData] = useState(NotifyData);

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
              <p>{new Date(selectedNotify.dateTimeRecive).toLocaleString()}</p>
              <a
                href={selectedNotify.route}
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
