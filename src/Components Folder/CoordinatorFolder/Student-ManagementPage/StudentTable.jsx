import { Search, X, Filter, ChevronDown, Eye } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  bg: "#f7f7f8",
  cardBg: "#ffffff",
  border: "#eaeaec",
  headerBorder: "#f1f1f2",
  textMuted: "#9a9aa2",
  textLabel: "#8a8a92",
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
  searchCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", marginBottom: "20px" },
  searchRow: { display: "flex", alignItems: "center", gap: "10px" },
  searchInputWrap: { flex: 1, display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "9px 12px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px", color: colors.textBody },
  clearButton: { display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", cursor: "pointer", color: colors.textMuted, padding: "2px" },
  filterButton: { display: "flex", alignItems: "center", gap: "6px", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "9px 14px", backgroundColor: "#fff", fontSize: "13px", color: colors.textBody, cursor: "pointer", whiteSpace: "nowrap" },
  chevronRow: { display: "flex", justifyContent: "center", marginTop: "10px", cursor: "pointer", color: colors.textMuted },
  tableCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: colors.textLabel, fontWeight: 600, padding: "14px 16px", backgroundColor: "#fafafb", borderBottom: `1px solid ${colors.headerBorder}` },
  tr: { cursor: "pointer" },
  td: { padding: "14px 16px", fontSize: "13px", color: colors.textBody, borderBottom: `1px solid ${colors.headerBorder}`, verticalAlign: "middle" },
  nameCell: { color: colors.textDark, fontWeight: 500 },
  statusBadge: { display: "inline-block", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px" },
  hoursCell: { display: "flex", alignItems: "center", gap: "8px", minWidth: "160px" },
  progressTrack: { flex: 1, height: "6px", borderRadius: "999px", backgroundColor: colors.trackBg, overflow: "hidden" },
  progressFill: (pct) => ({ width: `${pct}%`, height: "100%", backgroundColor: colors.barRed, borderRadius: "999px" }),
  hoursText: { fontSize: "12px", color: colors.textMuted, whiteSpace: "nowrap" },
  actionButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "6px", border: `1px solid ${colors.border}`, backgroundColor: "#fff", cursor: "pointer", color: colors.textBody },
  emptyRow: { padding: "32px 16px", textAlign: "center", color: colors.textMuted, fontSize: "13px" },
};

// Fields here map directly to the ERD:
// studentId (STUDENT.StudentID), firstName/lastName (USER), studentNumber (STUDENT.StudentNumber),
// course (STUDENT.Course), companyName (COMPANY.CompanyName via INTERNSHIP POSTING),
// progressStatus (INTERNSHIP PROGRESS.Status), hoursCompleted / requiredHours (INTERNSHIP PROGRESS / INTERNSHIP POSTING)
function StudentRow({ student, onSelect }) {
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

export default function StudentTable({
  students,
  searchTerm,
  onSearchChange,
  onClearSearch,
  filtersOpen,
  onToggleFilters,
  onSelectStudent,
}) {
  return (
    <>
      <div style={styles.searchCard}>
        <div style={styles.searchRow}>
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
          <button style={styles.filterButton} onClick={onToggleFilters}>
            <Filter size={14} />
            Filters
          </button>
        </div>

        {filtersOpen && (
          <div style={{ marginTop: "12px", fontSize: "12px", color: colors.textMuted }}>
            Filter options coming soon.
          </div>
        )}

        <div style={styles.chevronRow} onClick={onToggleFilters}>
          <ChevronDown size={16} style={{ transform: filtersOpen ? "rotate(180deg)" : "none" }} />
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student Number</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Hours</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td style={styles.emptyRow} colSpan={7}>No student records available yet.</td>
              </tr>
            ) : (
              students.map((student) => (
                <StudentRow key={student.studentId} student={student} onSelect={onSelectStudent} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}