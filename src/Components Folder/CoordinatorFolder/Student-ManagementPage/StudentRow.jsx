import { Eye } from "lucide-react";

const colors = {
  headerBorder: "#f1f1f2",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  border: "#eaeaec",
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
  tr: { cursor: "pointer" },
  td: { padding: "14px 16px", fontSize: "13px", color: colors.textBody, borderBottom: `1px solid ${colors.headerBorder}`, verticalAlign: "middle" },
  nameCell: { color: colors.textDark, fontWeight: 500 },
  statusBadge: { display: "inline-block", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px" },
  hoursCell: { display: "flex", alignItems: "center", gap: "8px", minWidth: "160px" },
  progressTrack: { flex: 1, height: "6px", borderRadius: "999px", backgroundColor: colors.trackBg, overflow: "hidden" },
  progressFill: (pct) => ({ width: `${pct}%`, height: "100%", backgroundColor: colors.barRed, borderRadius: "999px" }),
  hoursText: { fontSize: "12px", color: colors.textMuted, whiteSpace: "nowrap" },
  actionButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "6px", border: `1px solid ${colors.border}`, backgroundColor: "#fff", cursor: "pointer", color: colors.textBody },
};

// Fields here map directly to the ERD:
// studentId (STUDENT.StudentID), firstName/lastName (USER), studentNumber (STUDENT.StudentNumber),
// course (STUDENT.Course), companyName (COMPANY.CompanyName via INTERNSHIP POSTING),
// progressStatus (INTERNSHIP PROGRESS.Status), hoursCompleted / requiredHours (INTERNSHIP PROGRESS / INTERNSHIP POSTING)
export default function StudentRow({ student, onSelect }) {
  const pct = Math.round((student.hoursCompleted / student.requiredHours) * 100);
  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <tr style={styles.tr} onClick={() => onSelect(student.studentId)}>
      <td style={styles.td}>{student.studentNumber}</td>
      <td style={{ ...styles.td, ...styles.nameCell }}>{fullName}</td>
      <td style={styles.td}>{student.course}</td>
      <td style={styles.td}>{student.companyName}</td>
      <td style={styles.td}>
        <span style={{ ...styles.statusBadge, ...statusStyles[student.progressStatus] }}>
          {student.progressStatus}
        </span>
      </td>
      <td style={styles.td}>
        <div style={styles.hoursCell}>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill(pct)} />
          </div>
          <span style={styles.hoursText}>{student.hoursCompleted}/{student.requiredHours}</span>
        </div>
      </td>
      <td style={styles.td}>
        <button
          style={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(student.studentId);
          }}
        >
          <Eye size={14} />
        </button>
      </td>
    </tr>
  );
}
