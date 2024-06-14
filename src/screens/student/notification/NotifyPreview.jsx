import React from "react";
import styled from "styled-components";
import AvatarImg from "./a2.png";
import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";

function NotifyPreview({ notify, onClick }) {
  const {
    notifyID,
    title,
    message,
    route,
    isRead,
    imgInstructor,
    dateTimeRecive,
  } = notify;

  const timeAgo = formatDistanceToNow(new Date(dateTimeRecive), {
    addSuffix: true,
  });

  return (
    <NotifyPreviewWrapper
      className={`notification-item ${isRead ? "read" : ""}`}
      onClick={onClick}
    >
      <div className="notification-item">
        <div className="notification-item__avatar">
          <Avatar src={imgInstructor} />
        </div>
        <div className="notification-item__content">
          <h3 className="notification-item__title">{title}</h3>
          {/* <p className="notification-item__message">{message}</p> */}
          <span className="notification-item__date">{timeAgo}</span>
        </div>
      </div>
    </NotifyPreviewWrapper>
  );
}

const NotifyPreviewWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;

  .notification-item {
    display: flex;
    gap: 3.2rem;
    align-items: center;
    width: 100%;

    &.read {
      background-color: #f0f0f0;
    }

    .notification-item__avatar {
      padding: 2px;
      .MuiAvatar-root {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
      }
    }

    .notification-item__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .notification-item__title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #333;
      }

      .notification-item__message {
        font-size: 1.4rem;
        color: #666;
      }

      .notification-item__date {
        font-size: 1.4rem;
        font-weight: 600;
        color: #999;
      }
    }
  }
`;

export default NotifyPreview;
