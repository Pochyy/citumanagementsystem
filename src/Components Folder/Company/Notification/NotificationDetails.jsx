import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserPlus, FileText, Clock, CheckCircle, PackageX, ArrowLeft, Trash2 } from "lucide-react";
import { getNotificationById, markAsRead, deleteNotification } from "./notificationService";
import "./Notifications.css";

const NOTIFICATION_ICONS = {
  NEW_APPLICANT: { icon: UserPlus, color: "#6366F1", bg: "#EEF2FF" },
  DOCUMENT_SUBMITTED: { icon: FileText, color: "#10B981", bg: "#ECFDF5" },
  EVALUATION_DUE: { icon: Clock, color: "#F59E0B", bg: "#FFFBEB" },
  OFFER_ACCEPTED: { icon: CheckCircle, color: "#10B981", bg: "#ECFDF5" },
  SLOT_LOW: { icon: PackageX, color: "#F97316", bg: "#FFF7ED" },
  APPLICATION_WITHDRAWN: { icon: FileText, color: "#6B7280", bg: "#F3F4F6" },
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function NotificationDetails() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotification = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotificationById(notificationId);
      setNotification(data);
      setError(null);

      // Mark as read once the person opens the details page
      if (!data.isRead) {
        await markAsRead(notificationId);
        setNotification((prev) => ({ ...prev, isRead: true }));
      }
    } catch (err) {
      setError("Couldn't load this notification.");
    } finally {
      setLoading(false);
    }
  }, [notificationId]);

  useEffect(() => {
    loadNotification();
  }, [loadNotification]);

  async function handleDelete() {
    try {
      await deleteNotification(notificationId);
      navigate("/component-9");
    } catch (err) {
      setError("Couldn't delete this notification.");
    }
  }

  if (loading) {
    return (
      <div className="notifications-panel">
        <p className="notifications-status">Loading notification...</p>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="notifications-panel">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to notifications
        </button>
        <p className="notifications-status error">{error || "Notification not found."}</p>
      </div>
    );
  }

  const config = NOTIFICATION_ICONS[notification.notificationType] || NOTIFICATION_ICONS.DOCUMENT_SUBMITTED;
  const Icon = config.icon;

  return (
    <div className="notifications-panel">
      <div className="detail-top-row">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to notifications
        </button>
        <button className="delete-btn" onClick={handleDelete} aria-label="Delete notification">
          <Trash2 size={16} /> Delete
        </button>
      </div>

      <div className="notification-detail-card">
        <div className="notification-icon" style={{ background: config.bg, width: 48, height: 48 }}>
          <Icon size={24} color={config.color} />
        </div>

        <h2 className="notification-detail-title">{notification.title}</h2>
        <p className="notification-detail-date">{formatDate(notification.createdDate)}</p>
        <p className="notification-detail-message">{notification.message}</p>

        {notification.relatedApplicationId && (
          <button
            className="mark-all-btn"
            onClick={() => navigate(`/component-4/${notification.relatedApplicationId}`)}
          >
            View related application
          </button>
        )}
      </div>
    </div>
  );
}