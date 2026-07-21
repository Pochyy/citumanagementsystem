import React from "react";

export default function NotificationTabs({
  filter,
  setFilter,
  unreadCount
}) {
  return (
    <div className="notification-tabs">

      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "unread" ? "active" : ""}
        onClick={() => setFilter("unread")}
      >
        Unread ({unreadCount})
      </button>

    </div>
  );
}