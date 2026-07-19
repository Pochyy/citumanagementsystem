import { useState } from "react";
import { Bell, X, MailOpen } from "lucide-react";

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

  const onMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
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
      </div>

      {/* ===== LIST ===== */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleOpen(notif)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              padding: "18px 32px",
              backgroundColor: notif.read ? "white" : "#F1EDED",
              borderBottom: "1px solid #e6e6e6",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = notif.read
                ? "#f7f7f7"
                : "#e9e2e2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = notif.read
                ? "white"
                : "#F1EDED";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", minWidth: 0 }}>
              {/* dot */}
              <div
                style={{
                  marginTop: "6px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: notif.read ? "transparent" : "#7B1113",
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: "#7B1113",
                    fontSize: "14.5px",
                    fontWeight: notif.read ? 500 : 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {notif.title}
                </div>
                <div
                  style={{
                    marginTop: "3px",
                    color: "#999",
                    fontSize: "12px",
                  }}
                >
                  {notif.time}
                </div>
              </div>
            </div>

            {/* right side status pill */}
            <div
              style={{
                flexShrink: 0,
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                color: notif.read ? "#6b7280" : "white",
                backgroundColor: notif.read ? "#E7E7E7" : "#7B1113",
              }}
            >
              {notif.read ? "Read" : "Unread"}
            </div>
          </div>
        ))}
      </div>

      {/* ===== LETTER MODAL ===== */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "480px",
              maxWidth: "90%",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              overflow: "hidden",
              animation: "notifPop 0.15s ease",
            }}
          >
            {/* letter header */}
            <div
              style={{
                backgroundColor: "#7B1113",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MailOpen size={20} color="white" />
                <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>
                  Notification Details
                </span>
              </div>
              <X
                size={20}
                color="white"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(null)}
              />
            </div>

            {/* letter body styled like a paper letter */}
            <div style={{ padding: "26px 26px 30px 26px" }}>
              <div
                style={{
                  color: "#7B1113",
                  fontSize: "17px",
                  fontWeight: 800,
                  marginBottom: "4px",
                }}
              >
                {selected.title}
              </div>
              <div style={{ color: "#999", fontSize: "12px", marginBottom: "18px" }}>
                {selected.time}
              </div>

              <div
                style={{
                  borderTop: "1px dashed #ddd",
                  paddingTop: "18px",
                  color: "#333",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                }}
              >
                {selected.letter}
              </div>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    backgroundColor: "#7B1113",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "9px 20px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
