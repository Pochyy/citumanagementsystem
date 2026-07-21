import React from "react";

export default function NotificationHeader({
  unreadCount,
  handleMarkAllRead,
}) {
  return (
    <div className="notifications__header">
      <div>
        <h1 className="notifications__title">Notifications</h1>

        <p className="notifications__subtitle">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${
                unreadCount === 1 ? "" : "s"
              }`
            : "You're all caught up"}
        </p>
      </div>

      <button
        className="notifications__mark-btn"
        type="button"
        onClick={handleMarkAllRead}
        disabled={unreadCount === 0}
      >
        Mark all as read
      </button>
    </div>
  );
}