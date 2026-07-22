export default function NotificationItem({ notif, onOpen }) {
  return (
    <div
      onClick={() => onOpen(notif)}
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
        e.currentTarget.style.backgroundColor = notif.read ? "#f7f7f7" : "#e9e2e2";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = notif.read ? "white" : "#F1EDED";
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
  );
}
