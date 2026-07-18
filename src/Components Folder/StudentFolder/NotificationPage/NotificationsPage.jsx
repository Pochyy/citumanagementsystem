import React, { useState, useEffect } from "react";
// Suggested file structure:
//   src/components/notifications/NotificationsPage.jsx  (this file)
//   src/components/notifications/NotificationItem.jsx   (reusable row component)
import NotificationItem from "./NotificationItem";

/**
 * NotificationsPage.jsx
 * --------------------------------------------------------
 * Frontend-only recreation of the "Notifications" screen.
 *
 * Backend integration plan (Spring Boot + MySQL):
 *  - GET  /api/notifications?userId={id}   -> fetch list for logged-in user
 *  - PATCH /api/notifications/{id}/read    -> mark a single notification read
 *  - GET  /api/notifications/unread-count  -> populate the "X unread" text
 *
 * ERD mapping (NOTIFICATION table):
 *  NotificationID (PK, int)  -> notification.notificationId
 *  UserID (FK, int)          -> notification.userId (links to USER entity)
 *  Title (string)            -> notification.title
 *  Message (string)          -> notification.message
 *  IsRead (boolean)          -> notification.isRead
 *  CreatedDate (datetime)    -> notification.createdDate
 *
 * NOTE: This component is presentation/layout only. No API calls,
 * authentication, or business logic are implemented here.
 */
const NotificationsPage = () => {
  // ------------------------------------------------------------------
  // STATE (placeholders for future backend-driven state)
  // ------------------------------------------------------------------
  // TODO: Replace this hardcoded array with data fetched from
  // GET /api/notifications?userId={currentUserId}
  const [notifications, setNotifications] = useState([
    {
      notificationId: 1, // ERD: NotificationID (PK)
      userId: 101, // ERD: UserID (FK)
      title: "Vinzent Lariosa Submitted missing documents",
      message: "", // ERD: Message field (not shown in this design, available for detail view)
      isRead: false, // ERD: IsRead
      createdDate: "Just Now", // ERD: CreatedDate (already formatted as relative time)
    },
    {
      notificationId: 2,
      userId: 102,
      title: "Cebu Pacific company application pending review",
      message: "",
      isRead: false,
      createdDate: "1 hours ago",
    },
    {
      notificationId: 3,
      userId: 103,
      title: "Mark Villaceran has benn absent for 3 concecutive days",
      message: "",
      isRead: false,
      createdDate: "3 hours ago",
    },
    {
      notificationId: 4,
      userId: 104,
      title: "Daniel Adlawan completed all 486 training hours",
      message: "",
      isRead: true,
      createdDate: "Yesteday",
    },
    {
      notificationId: 5,
      userId: 105,
      title: "New logbook submission from Vinzent Lariosa (Week 20)",
      message: "",
      isRead: true,
      createdDate: "3 hours ago",
    },
    {
      notificationId: 6,
      userId: 106,
      title: "BDO Unibank submitted evaluation for John Loquillano",
      message: "",
      isRead: true,
      createdDate: "3 hours ago",
    },
  ]);

  // TODO: loading / error state to be used once real API calls are wired up
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------------
  // EFFECTS (placeholder for future data fetching)
  // ------------------------------------------------------------------
  useEffect(() => {
    // TODO: Replace with real Spring Boot API call, e.g.:
    //
    // setIsLoading(true);
    // fetch(`/api/notifications?userId=${currentUserId}`)
    //   .then((res) => res.json())
    //   .then((data) => setNotifications(data))
    //   .catch((err) => setError(err))
    //   .finally(() => setIsLoading(false));
    //
    // Left empty intentionally for frontend-only scope.
  }, []);

  // Derived value: count of unread notifications.
  // TODO: Once backend is connected, this can instead come directly
  // from GET /api/notifications/unread-count for efficiency.
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ------------------------------------------------------------------
  // INLINE STYLES
  // ------------------------------------------------------------------
  const styles = {
    page: {
      fontFamily: "Arial, Helvetica, sans-serif",
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
      padding: "32px 40px",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    headerTitle: {
      margin: 0,
      fontSize: "34px",
      fontWeight: 800,
      color: "#7a1f2b",
    },
    bellIcon: {
      fontSize: "26px",
      color: "#7a1f2b",
      transform: "translateY(-4px)",
    },
    subHeader: {
      margin: "2px 0 24px 0",
      fontSize: "14px",
      fontWeight: 700,
      color: "#7a1f2b",
    },
    listContainer: {
      border: "1px solid #ececec",
      borderRadius: "4px",
      overflow: "hidden",
      width: "100%",
    },
    stateMessage: {
      padding: "24px",
      textAlign: "center",
      color: "#8a8a8a",
      fontSize: "14px",
    },
  };

  return (
    // Single parent wrapper div for the whole page
    <div style={styles.page}>
      {/* ============================ HEADER ============================ */}
      <div style={styles.headerRow}>
        <h1 style={styles.headerTitle}>Notifications</h1>
        {/* Simple bell icon rendered with a unicode glyph to avoid
            external icon libraries; swap for an SVG/icon-set later if desired */}
        <span style={styles.bellIcon}>&#128276;</span>
      </div>

      {/* TODO: Replace hardcoded "3" with `unreadCount` once verified against
          backend-provided data (currently already wired to derived state) */}
      <p style={styles.subHeader}>{unreadCount} unread notifications</p>

      {/* ========================= MAIN CONTENT ========================= */}
      <div style={styles.listContainer}>
        {/* ----- LOADING STATE ----- */}
        {isLoading && (
          <p style={styles.stateMessage}>Loading notifications...</p>
        )}

        {/* ----- ERROR STATE ----- */}
        {!isLoading && error && (
          <p style={styles.stateMessage}>
            Something went wrong while loading notifications.
          </p>
        )}

        {/* ----- EMPTY STATE ----- */}
        {!isLoading && !error && notifications.length === 0 && (
          <p style={styles.stateMessage}>You have no notifications yet.</p>
        )}

        {/* ----- NOTIFICATION LIST (dynamic via .map()) ----- */}
        {!isLoading &&
          !error &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            // ERD: NotificationID (PK) used as the React key
            <NotificationItem
              key={notification.notificationId}
              notificationId={notification.notificationId}
              userId={notification.userId}
              title={notification.title}
              message={notification.message}
              isRead={notification.isRead}
              createdDate={notification.createdDate}
            />
          ))}
      </div>
    </div>
  );
};

export default NotificationsPage;