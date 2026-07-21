import { Search, X, Filter, ChevronDown } from "lucide-react";
import StudentRow from "./StudentRow";

const colors = {
  cardBg: "#ffffff",
  border: "#eaeaec",
  headerBorder: "#f1f1f2",
  textMuted: "#9a9aa2",
  textLabel: "#8a8a92",
  textBody: "#4b4b52",
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
  emptyRow: { padding: "32px 16px", textAlign: "center", color: colors.textMuted, fontSize: "13px" },
};

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