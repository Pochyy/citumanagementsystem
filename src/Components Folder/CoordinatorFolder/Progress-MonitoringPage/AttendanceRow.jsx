import { CheckCircle2, XCircle } from "lucide-react";

const colors = {
  headerBorder: "#f1f1f2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  present: "#22a855",
  absent: "#e0392b",
};

const styles = {
  tr: { cursor: "pointer" },
  td: { padding: "12px 20px", fontSize: "13px", color: colors.textBody, borderBottom: `1px solid ${colors.headerBorder}`, verticalAlign: "middle", whiteSpace: "nowrap" },
  tdCenter: { padding: "12px", textAlign: "center", borderBottom: `1px solid ${colors.headerBorder}`, verticalAlign: "middle" },
  nameCell: { color: colors.textDark, fontWeight: 500 },
  totalCell: { fontSize: "13px", fontWeight: 600, color: colors.textDark, textAlign: "center" },
};

function AttendanceIcon({ present }) {
  return present ? (
    <CheckCircle2 size={18} color={colors.present} fill={colors.present} style={{ color: "#fff" }} />
  ) : (
    <XCircle size={18} color={colors.absent} fill={colors.absent} style={{ color: "#fff" }} />
  );
}

// A student is "present" for a given day if a record with a timeIn exists.
// No record at all (null/undefined) means absent — no DB row needed for absences.
function isPresent(dayEntry) {
  return Boolean(dayEntry && dayEntry.timeIn);
}

export default function AttendanceRow({ record, days, onSelect }) {
  const total = days.filter((day) => isPresent(record.attendance[day.key])).length;

  return (
    <tr style={styles.tr} onClick={() => onSelect(record.applicationId)}>
      <td style={{ ...styles.td, ...styles.nameCell }}>{record.name}</td>
      {days.map((day) => (
        <td key={day.key} style={styles.tdCenter}>
          <AttendanceIcon present={isPresent(record.attendance[day.key])} />
        </td>
      ))}
      <td style={styles.totalCell}>{total}/{days.length}</td>
    </tr>
  );
}
