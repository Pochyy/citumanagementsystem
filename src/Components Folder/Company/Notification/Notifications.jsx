import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import initialNotifications from "./NotificationsData";

import NotificationHeader from "./NotificationHeader";
import NotificationTabs from "./NotificationTab";
import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";


import "./Notification.css";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const visible =
    filter === "unread"
      ? notifications.filter(n => !n.read)
      : notifications;

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleOpen = id => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );

    navigate(`/component-9/${id}`);
  };

  return (
    <div className="notifications">

      <NotificationHeader
        unreadCount={unreadCount}
        handleMarkAllRead={handleMarkAllRead}
      />

      <NotificationTabs
        filter={filter}
        setFilter={setFilter}
        unreadCount={unreadCount}
      />

      <div className="notifications__list">

        {visible.length === 0 ? (
          <NotificationEmpty />
        ) : (
          visible.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              handleOpen={handleOpen}
            />
          ))
        )}

      </div>

    </div>
  );
}