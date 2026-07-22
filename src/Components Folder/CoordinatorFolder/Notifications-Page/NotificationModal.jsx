import { X, MailOpen } from "lucide-react";

export default function NotificationModal({ notif, onClose }) {
  if (!notif) return null;

  return (
    <div
      onClick={onClose}
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
        }}
      >
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
          <X size={20} color="white" style={{ cursor: "pointer" }} onClick={onClose} />
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
            {notif.title}
          </div>
          <div style={{ color: "#999", fontSize: "12px", marginBottom: "18px" }}>
            {notif.time}
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
            {notif.letter}
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={onClose}
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
  );
}
