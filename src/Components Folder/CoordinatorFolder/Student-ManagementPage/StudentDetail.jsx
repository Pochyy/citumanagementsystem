import { Mail, Phone, Building2 } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#eaeaec",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  trackBg: "#e9e9eb",
  barRed: "#e0392b",
  ongoingBg: "#e6f7ec",
  ongoingText: "#22a855",
  completedBg: "#e6f0fb",
  completedText: "#2c7be5",
  failedBg: "#fbe7e7",
  failedText: "#e0392b",
};

// Matches INTERNSHIP PROGRESS.Status enum from the ERD: Ongoing | Completed | Failed
const statusStyles = {
  Ongoing: { backgroundColor: colors.ongoingBg, color: colors.ongoingText },
  Completed: { backgroundColor: colors.completedBg, color: colors.completedText },
  Failed: { backgroundColor: colors.failedBg, color: colors.failedText },
};

const styles = {
  detailCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  detailHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
  avatar: { width: "56px", height: "56px", borderRadius: "50%", backgroundColor: colors.maroon, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px" },
  statusBadge: { display: "inline-block", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px" },
  detailName: { fontSize: "17px", fontWeight: 700, color: colors.textDark, margin: 0 },
  detailSub: { fontSize: "13px", color: colors.textMuted, margin: "2px 0 0" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" },
  infoRow: { display: "flex", alignItems: "flex-start", gap: "10px" },
  infoLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  infoValue: { fontSize: "14px", color: colors.textBody, margin: "2px 0 0" },
  progressTrack: { flex: 1, height: "6px", borderRadius: "999px", backgroundColor: colors.trackBg, overflow: "hidden" },
  progressFill: (pct) => ({ width: `${pct}%`, height: "100%", backgroundColor: colors.barRed, borderRadius: "999px" }),
  detailProgressWrap: { marginTop: "8px" },
  detailProgressLabel: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: colors.textBody, marginBottom: "6px" },
};

// student fields map to: STUDENT + USER + INTERNSHIP PROGRESS (via APPLICATION) + COMPANY (via INTERNSHIP POSTING)
export default function StudentDetail({ student }) {
  const pct = Math.round((student.hoursCompleted / student.requiredHours) * 100);
  const fullName = `${student.firstName} ${student.lastName}`;
  const initials = `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();

  return (
    <div style={styles.detailCard}>
      <div style={styles.detailHeader}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <h2 style={styles.detailName}>{fullName}</h2>
          <p style={styles.detailSub}>{student.studentNumber} &middot; {student.course}</p>
        </div>
        <span style={{ ...styles.statusBadge, ...statusStyles[student.progressStatus], marginLeft: "auto" }}>
          {student.progressStatus}
        </span>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoRow}>
          <Building2 size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Company</p>
            <p style={styles.infoValue}>{student.companyName}</p>
          </div>
        </div>
        <div style={styles.infoRow}>
          <Mail size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Email Address</p>
            <p style={styles.infoValue}>{student.email || "—"}</p>
          </div>
        </div>
        <div style={styles.infoRow}>
          <Phone size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Contact Number</p>
            <p style={styles.infoValue}>{student.contactNumber || "—"}</p>
          </div>
        </div>
      </div>

      <div style={styles.detailProgressWrap}>
        <div style={styles.detailProgressLabel}>
          <span>OJT Hours Completed</span>
          <span>{student.hoursCompleted}/{student.requiredHours}</span>
        </div>
        <div style={styles.progressTrack}>
          <div style={styles.progressFill(pct)} />
        </div>
      </div>
    </div>
  );
}