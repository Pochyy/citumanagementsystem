import { CheckCircle2, XCircle } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  bg: "#f7f7f8",
  cardBg: "#ffffff",
  border: "#eaeaec",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  present: "#22a855",
  absent: "#e0392b",
};

const styles = {
  detailCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  detailHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" },
  avatar: { width: "56px", height: "56px", borderRadius: "50%", backgroundColor: colors.maroon, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px", flexShrink: 0 },
  detailName: { fontSize: "17px", fontWeight: 700, color: colors.textDark, margin: 0 },
  detailSub: { fontSize: "13px", color: colors.textMuted, margin: "2px 0 0" },
  detailTotalBadge: { marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: colors.textDark, backgroundColor: colors.bg, padding: "6px 14px", borderRadius: "999px" },
  dayList: { display: "flex", flexDirection: "column", gap: "10px" },
  dayRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: colors.bg, borderRadius: "8px", flexWrap: "wrap", gap: "8px" },
  dayRowLeft: { display: "flex", alignItems: "center", gap: "10px" },
  dayRowLabel: { fontSize: "13px", fontWeight: 500, color: colors.textDark, minWidth: "70px" },
  dayRowStatus: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600 },
  dayRowTimes: { display: "flex", alignItems: "center", gap: "16px" },
  timeBlock: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  timeLabel: { fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  timeValue: { fontSize: "13px", color: colors.textBody, fontWeight: 500, margin: "2px 0 0" },
};

function AttendanceIcon({ present }) {
  return present ? (
    <CheckCircle2 size={18} color={colors.present} fill={colors.present} style={{ color: "#fff" }} />
  ) : (
    <XCircle size={18} color={colors.absent} fill={colors.absent} style={{ color: "#fff" }} />
  );
}

// A student is "present" for a given day if a record with a timeIn exists.
function isPresent(dayEntry) {
  return Boolean(dayEntry && dayEntry.timeIn);
}

export default function AttendanceDetail({ record, days, weekLabel }) {
  const initials = record.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const total = days.filter((day) => isPresent(record.attendance[day.key])).length;

  return (
    <div style={styles.detailCard}>
      <div style={styles.detailHeader}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <h2 style={styles.detailName}>{record.name}</h2>
          <p style={styles.detailSub}>{record.studentNumber} &middot; {weekLabel}</p>
        </div>
        <span style={styles.detailTotalBadge}>{total}/{days.length} days present</span>
      </div>

      <div style={styles.dayList}>
        {days.map((day) => {
          const entry = record.attendance[day.key];
          const present = isPresent(entry);
          return (
            <div key={day.key} style={styles.dayRow}>
              <div style={styles.dayRowLeft}>
                <span style={styles.dayRowLabel}>{day.label}</span>
                <span style={{ ...styles.dayRowStatus, color: present ? colors.present : colors.absent }}>
                  <AttendanceIcon present={present} />
                  {present ? "Present" : "Absent"}
                </span>
              </div>

              {present && (
                <div style={styles.dayRowTimes}>
                  <div style={styles.timeBlock}>
                    <p style={styles.timeLabel}>Time In</p>
                    <p style={styles.timeValue}>{entry.timeIn}</p>
                  </div>
                  <div style={styles.timeBlock}>
                    <p style={styles.timeLabel}>Time Out</p>
                    <p style={styles.timeValue}>{entry.timeOut || "—"}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}