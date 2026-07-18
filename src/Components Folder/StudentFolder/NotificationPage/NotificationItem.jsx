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
 *
 * TODO (Backend Integration):
 *  - When Spring Boot is connected, "createdDate" will arrive as a raw
 *    ISO datetime string and should be converted to a relative time
 *    string ("Just now", "1 hour ago", etc.) either on the backend or
 *    via a utility function on the frontend.
 *  - "isRead" will control the highlighted background (unread = shaded).
 *  - Clicking a notification should eventually call a Spring Boot endpoint
 *    such as PATCH /api/notifications/{notificationId}/read to update
 *    IsRead in the database.
 */
const NotificationItem = ({
  notificationId, // TODO: DB PK - use as React key in parent .map()
  userId, // TODO: FK reference to USER table (not displayed directly)
  title,
  message,
  isRead,
  createdDate,
}) => {
  // Inline style objects (kept local to this component for encapsulation)
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
      // Read notifications show no dot (transparent placeholder keeps alignment)
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
    // TODO: onClick={() => handleMarkAsRead(notificationId)} passed down
    // from parent, which will call the Spring Boot PATCH endpoint above.
    <div style={styles.row}>
      <span style={styles.dot} />
      <div style={styles.textWrapper}>
        <p style={styles.title}>{title}</p>
        {/* Message field from ERD is available here if the design ever
            needs to show the full notification body */}
        <p style={styles.timestamp}>{createdDate}</p>
      </div>
    </div>
  );
};

export default NotificationItem;