import React from "react";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "28px 26px",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "#7a1f2b",
  },
  timestamp: {
    margin: "0 0 16px 0",
    fontSize: "12px",
    color: "#8a8a8a",
  },
  message: {
    margin: "0 0 24px 0",
    fontSize: "14px",
    color: "#333333",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  closeButton: {
    display: "block",
    marginLeft: "auto",
    backgroundColor: "#7a1f2b",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

const NotificationDetailModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{notification.title}</h2>
        <p style={styles.timestamp}>{notification.createdDate}</p>
        <p style={styles.message}>
          {notification.message && notification.message.trim().length > 0
            ? notification.message
            : "No additional details for this notification."}
        </p>
        <button style={styles.closeButton} onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDetailModal;