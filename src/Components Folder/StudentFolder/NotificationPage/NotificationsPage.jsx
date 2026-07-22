import React, { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import NotificationDetailModal from "./NotificationDetailModal";

const API_BASE = "http://localhost:8080";

function getUserId() {
  return localStorage.getItem("userId");
}

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const then = new Date(isoString);
  const now = new Date();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just Now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return then.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const NotificationsPage = () => {
  const [userId] = useState(getUserId());
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("No logged-in user found.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/notifications/user/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("FAILED");
        return res.json();
      })
      .then((data) => setNotifications(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleMarkAsRead = (notificationId) => {
    fetch(`${API_BASE}/api/notifications/${notificationId}/read`, {
      method: "PATCH",
    })
      .then((res) => {
        if (!res.ok) throw new Error("FAILED");
        return res.json();
      })
      .then((updated) => {
        setNotifications((prev) =>
          prev.map((n) => (n.notificationId === updated.notificationId ? updated : n))
        );
      })
      .catch(() => {
        // Silently ignore for now; the notification simply stays unread on screen.
      });
  };

  const handleOpenNotification = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      handleMarkAsRead(notification.notificationId);
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h1 style={styles.headerTitle}>Notifications</h1>
        <span style={styles.bellIcon}>&#128276;</span>
      </div>

      <p style={styles.subHeader}>{unreadCount} unread notifications</p>

      <div style={styles.listContainer}>
        {isLoading && (
          <p style={styles.stateMessage}>Loading notifications...</p>
        )}

        {!isLoading && error && (
          <p style={styles.stateMessage}>
            Something went wrong while loading notifications.
          </p>
        )}

        {!isLoading && !error && notifications.length === 0 && (
          <p style={styles.stateMessage}>You have no notifications yet.</p>
        )}

        {!isLoading &&
          !error &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              notificationId={notification.notificationId}
              userId={notification.userId}
              title={notification.title}
              message={notification.message}
              isRead={notification.read}
              createdDate={formatRelativeTime(notification.createdDate)}
              onClick={() => handleOpenNotification(notification)}
            />
          ))}
      </div>

      <NotificationDetailModal
        notification={
          selectedNotification
            ? { ...selectedNotification, createdDate: formatRelativeTime(selectedNotification.createdDate) }
            : null
        }
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NotificationsPage;