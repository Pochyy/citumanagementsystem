import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";
import NotificationModal from "./NotificationModal";

const initialNotifications = [
  {
    id: 1,
    title: "Vinzent Lariosa Submitted missing documents",
    time: "Just now",
    read: false,
    letter:
      "Hi Coordinator,\n\nVinzent Lariosa has just uploaded the previously missing requirements to the OJT portal. Please review the submitted files and update his compliance status at your earliest convenience.\n\n- CITU OJT Management System",
  },
  {
    id: 2,
    title: "Cebu Pacific company application pending review",
    time: "1 hour ago",
    read: false,
    letter:
      "Hi Coordinator,\n\nA new host company application from Cebu Pacific is awaiting your review. Please check the company profile and accreditation documents, then approve or decline the application.\n\n- CITU OJT Management System",
  },
  {
    id: 3,
    title: "Mark Villaceran has been absent for 3 consecutive days",
    time: "3 hours ago",
    read: false,
    letter:
      "Hi Coordinator,\n\nOur attendance monitoring has flagged Mark Villaceran for 3 consecutive days of absence at his OJT host company. Please reach out to the student and his supervisor to confirm the reason and next steps.\n\n- CITU OJT Management System",
  },
  {
    id: 4,
    title: "Daniel Adlawan completed all 486 training hours",
    time: "Yesterday",
    read: true,
    letter:
      "Hi Coordinator,\n\nCongratulations! Daniel Adlawan has officially completed all 486 required OJT training hours. You may now proceed with finalizing his clearance and evaluation paperwork.\n\n- CITU OJT Management System",
  },
  {
    id: 5,
    title: "New logbook submission from Vinzent Lariosa (Week 20)",
    time: "3 hours ago",
    read: true,
    letter:
      "Hi Coordinator,\n\nVinzent Lariosa has submitted his Week 20 logbook entry for review. Please check the reported tasks and hours logged, then leave your remarks or approval.\n\n- CITU OJT Management System",
  },
  {
    id: 6,
    title: "BDO Unibank submitted evaluation for John Loquillano",
    time: "3 hours ago",
    read: true,
    letter:
      "Hi Coordinator,\n\nBDO Unibank has submitted the mid-term performance evaluation for intern John Loquillano. Please review the ratings and comments provided by his industry supervisor.\n\n- CITU OJT Management System",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "unread"

  const onMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const onMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visibleNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const handleOpen = (notif) => {
    setSelected(notif);
    if (!notif.read) {
      onMarkAsRead(notif.id);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          padding: "28px 32px 20px 32px",
          borderBottom: "1px solid #eee",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1
            style={{
              margin: 0,
              color: "#7B1113",
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            Notifications
          </h1>
          <Bell size={22} color="#7B1113" fill="#7B1113" />
        </div>
        <div
          style={{
            marginTop: "4px",
            color: "#7B1113",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </div>

        {/* ===== MARK ALL AS READ ===== */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            style={{
              border: "1px solid #e5e5e8",
              backgroundColor: "#fff",
              color: unreadCount === 0 ? "#c7c7cc" : "#7B1113",
              fontSize: "12.5px",
              fontWeight: 700,
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: unreadCount === 0 ? "default" : "pointer",
            }}
          >
            Mark all as read
          </button>
        </div>

        {/* ===== ALL / UNREAD TABS ===== */}
        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: filter === "all" ? "#FBE7E7" : "transparent",
              color: filter === "all" ? "#C0392B" : "#8a8a92",
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={{
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: filter === "unread" ? "#FBE7E7" : "transparent",
              color: filter === "unread" ? "#C0392B" : "#8a8a92",
            }}
          >
            Unread
          </button>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {visibleNotifications.length === 0 ? (
          <div style={{ padding: "40px 32px", textAlign: "center", color: "#9a9aa2", fontSize: "13px" }}>
            No unread notifications.
          </div>
        ) : (
          visibleNotifications.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} onOpen={handleOpen} />
          ))
        )}
      </div>

      <NotificationModal notif={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
