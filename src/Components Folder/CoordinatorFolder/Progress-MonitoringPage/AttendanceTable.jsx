import { Search, X, Calendar } from "lucide-react";
import AttendanceRow from "./AttendanceRow";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#eaeaec",
  headerBorder: "#f1f1f2",
  textMuted: "#9a9aa2",
  textLabel: "#8a8a92",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
};

const styles = {
  searchCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "14px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", marginBottom: "20px" },
  searchInputWrap: { display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "9px 12px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px", color: colors.textBody },
  clearButton: { display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", cursor: "pointer", color: colors.textMuted, padding: "2px" },
  tableCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  weekHeader: { display: "flex", alignItems: "center", gap: "8px", padding: "16px 20px", borderBottom: `1px solid ${colors.headerBorder}`, fontSize: "14px", fontWeight: 600, color: colors.textDark },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: colors.textLabel, fontWeight: 600, padding: "12px 20px", backgroundColor: "#fafafb", borderBottom: `1px solid ${colors.headerBorder}`, whiteSpace: "nowrap" },
  thCenter: { textAlign: "center", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: colors.textLabel, fontWeight: 600, padding: "12px 12px", backgroundColor: "#fafafb", borderBottom: `1px solid ${colors.headerBorder}`, whiteSpace: "nowrap" },
  emptyRow: { padding: "32px 16px", textAlign: "center", color: colors.textMuted, fontSize: "13px" },
};

export default function AttendanceTable({
  records,
  hasAnyRecords,
  days,
  weekLabel,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onSelectStudent,
}) {
  return (
    <>
      <div style={styles.searchCard}>
        <div style={styles.searchInputWrap}>
          <Search size={16} color={colors.textMuted} />
          <input
            style={styles.searchInput}
            placeholder="Search for students..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          {searchTerm && (
            <button type="button" style={styles.clearButton} onClick={onClearSearch}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.weekHeader}>
          <Calendar size={16} color={colors.maroon} />
          {weekLabel}
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                {days.map((day) => (
                  <th key={day.key} style={styles.thCenter}>{day.label}</th>
                ))}
                <th style={styles.thCenter}>Total</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td style={styles.emptyRow} colSpan={days.length + 2}>
                    {hasAnyRecords ? "No students match your search." : "No attendance records available yet."}
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <AttendanceRow
                    key={record.applicationId}
                    record={record}
                    days={days}
                    onSelect={onSelectStudent}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}