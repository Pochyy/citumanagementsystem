import React from "react";

/**
 * NotificationItem.jsx
 * --------------------------------------------------------
 * Reusable presentational component for a single notification row.
 *
 * This component is intentionally "dumb" (presentation-only) — it receives
 * all of its data through props and renders it. All backend / data-fetching
 * logic lives in the parent (NotificationsPage.jsx).
 *
 * Props expected (mapped later from the ERD "NOTIFICATION" entity):
 *  - notificationId  -> ERD: NotificationID (PK)      [int]
 *  - userId          -> ERD: UserID (FK -> USER table) [int]
 *  - title           -> ERD: Title                     [string]
 *  - message          -> ERD: Message                   [string]
 *  - isRead          -> ERD: IsRead                    [boolean]
 *  - createdDate     -> ERD: CreatedDate               [datetime]
 *  - onClick         -> called when the row is clicked; parent uses this
 *                       to PATCH /api/notifications/{notificationId}/read
 */
const NotificationItem = ({
  notificationId, // TODO: DB PK - use as React key in parent .map()
  userId, // TODO: FK reference to USER table (not displayed directly)
  title,
  message,
  isRead,
  createdDate,
  onClick,
}) => {
  const styles = {
    row: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      padding: "18px 24px",
      backgroundColor: isRead ? "#ffffff" : "#f7efef",
      borderBottom: "1px solid #ececec",
      cursor: "pointer",
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#7a1f2b",
      marginTop: "6px",
      flexShrink: 0,
      visibility: isRead ? "hidden" : "visible",
    },
    textWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    title: {
      margin: 0,
      fontSize: "14px",
      fontWeight: isRead ? 400 : 700,
      color: isRead ? "#333333" : "#7a1f2b",
    },
    timestamp: {
      margin: 0,
      fontSize: "11px",
      color: "#8a8a8a",
    },
  };

  return (
    <div style={styles.row} onClick={onClick}>
      <span style={styles.dot} />
      <div style={styles.textWrapper}>
        <p style={styles.title}>{title}</p>
        <p style={styles.timestamp}>{createdDate}</p>
      </div>
    </div>
  );
};

export default NotificationItem;