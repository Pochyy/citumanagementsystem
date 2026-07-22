import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, FileText, Clock, CheckCircle, PackageX, Trash2 } from "lucide-react";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
} from "./notificationService";
import "./Notifications.css";

// Maps each backend NotificationType to an icon + accent color
const NOTIFICATION_ICONS = {
  NEW_APPLICANT: { icon: UserPlus, color: "#6366F1", bg: "#EEF2FF" },
  DOCUMENT_SUBMITTED: { icon: FileText, color: "#10B981", bg: "#ECFDF5" },
  EVALUATION_DUE: { icon: Clock, color: "#F59E0B", bg: "#FFFBEB" },
  OFFER_ACCEPTED: { icon: CheckCircle, color: "#10B981", bg: "#ECFDF5" },
  SLOT_LOW: { icon: PackageX, color: "#F97316", bg: "#FFF7ED" },
  APPLICATION_WITHDRAWN: { icon: FileText, color: "#6B7280", bg: "#F3F4F6" },
};

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function Notifications({ userId: userIdProp }) {
  // Falls back to whoever is actually logged in (set by LoginScreen on login),
  // so this works without needing a hardcoded prop on the route.
  const userId = userIdProp || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" | "unread"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotifications(userId);
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError("Couldn't load notifications. Try again.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  async function handleMarkAllAsRead() {
    try {
      await markAllAsRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      setError("Couldn't mark notifications as read.");
    }
  }

  async function handleDelete(event, notificationId) {
    event.stopPropagation(); // don't trigger the row's navigate-to-details click
    try {
      await deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n.notificationId !== notificationId));
    } catch (err) {
      setError("Couldn't delete notification.");
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const visibleNotifications =
    filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

  if (!userId) {
    return (
      <div className="notifications-panel">
        <p className="notifications-status error">
          You need to be logged in to view notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p className="notifications-subtitle">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>
        <button
          className="mark-all-btn"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      <div className="notifications-tabs">
        <button
          className={filter === "all" ? "tab active" : "tab"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "unread" ? "tab active" : "tab"}
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {loading && <p className="notifications-status">Loading notifications...</p>}
      {error && <p className="notifications-status error">{error}</p>}

      {!loading && !error && visibleNotifications.length === 0 && (
        <p className="notifications-status">Nothing here yet.</p>
      )}

      <div className="notifications-list">
        {visibleNotifications.map((n) => {
          const config = NOTIFICATION_ICONS[n.notificationType] || NOTIFICATION_ICONS.DOCUMENT_SUBMITTED;
          const Icon = config.icon;
          return (
            <div
              key={n.notificationId}
              className={`notification-item ${!n.isRead ? "unread" : ""}`}
              onClick={() => navigate(`/component-9/${n.notificationId}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="notification-icon" style={{ background: config.bg }}>
                <Icon size={18} color={config.color} />
              </div>
              <div className="notification-content">
                <p className="notification-title">{n.title}</p>
                <p className="notification-message">{n.message}</p>
              </div>
              <div className="notification-meta">
                <span className="notification-time">{timeAgo(n.createdDate)}</span>
                {!n.isRead && <span className="unread-dot" />}
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, n.notificationId)}
                  aria-label="Delete notification"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}