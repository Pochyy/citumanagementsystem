import React from "react";

const typeStyles = {
  applicant: {
    bg: "#eef2ff",
    color: "#4338ca",
    icon: (
      <path d="M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    ),
  },
  document: {
    bg: "#ecfdf5",
    color: "#047857",
    icon: (
      <>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
      </>
    ),
  },
  reminder: {
    bg: "#fef3e2",
    color: "#b45309",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  accepted: {
    bg: "#ecfdf3",
    color: "#067647",
    icon: <path d="m5 13 4 4L19 7" />,
  },
};

export default function NotificationItem({
  notification,
  handleOpen,
}) {
  const style = typeStyles[notification.type];

  return (
    <div
      className={
        notification.read
          ? "notifications__item"
          : "notifications__item notifications__item--unread"
      }
      onClick={() => handleOpen(notification.id)}
    >
      <div
        className="notifications__icon"
        style={{
          background: style.bg,
          color: style.color,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {style.icon}
        </svg>
      </div>

      <div className="notifications__item-main">
        <div className="notifications__item-top">
          <p
            className={
              notification.read
                ? "notifications__item-title notifications__item-title--read"
                : "notifications__item-title"
            }
          >
            {notification.title}
          </p>

          <span className="notifications__item-time">
            {notification.time}
          </span>
        </div>

        <p className="notifications__item-detail">
          {notification.detail}
        </p>
      </div>

      {!notification.read && (
        <span className="notifications__dot"></span>
      )}
    </div>
  );
}