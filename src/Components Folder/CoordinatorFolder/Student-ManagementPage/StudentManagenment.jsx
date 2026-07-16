import { useState, useEffect } from "react";
import { Search, Download, Filter, ChevronDown, Eye, ArrowLeft, Mail, Phone, Building2 } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  maroonDark: "#5e1720",
  orange: "#e8a24a",
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
  activeBg: "#e6f7ec",
  activeText: "#22a855",
  completedBg: "#e6f0fb",
  completedText: "#2c7be5",
  inactiveBg: "#fbe7e7",
  inactiveText: "#e0392b",
};

const statusStyles = {
  Active: { backgroundColor: colors.activeBg, color: colors.activeText },
  Completed: { backgroundColor: colors.completedBg, color: colors.completedText },
  Inactive: { backgroundColor: colors.inactiveBg, color: colors.inactiveText },
};

const styles = {
  page: { width: "100%", minHeight: "100vh", backgroundColor: colors.bg, fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px", boxSizing: "border-box" },
  banner: { background: `linear-gradient(120deg, ${colors.maroonDark} 0%, ${colors.maroon} 55%, ${colors.orange} 100%)`, borderRadius: "12px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" },
  bannerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  backButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" },
  bannerTitle: { color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 },
  bannerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: "4px 0 0" },
  exportButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: colors.maroonDark, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: 500, padding: "9px 16px", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" },
  searchCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", marginBottom: "20px" },
  searchRow: { display: "flex", alignItems: "center", gap: "10px" },
  searchInputWrap: { flex: 1, display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "9px 12px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px", color: colors.textBody },
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
  detailCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  detailHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
  avatar: { width: "56px", height: "56px", borderRadius: "50%", backgroundColor: colors.maroon, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px" },
  detailName: { fontSize: "17px", fontWeight: 700, color: colors.textDark, margin: 0 },
  detailSub: { fontSize: "13px", color: colors.textMuted, margin: "2px 0 0" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" },
  infoRow: { display: "flex", alignItems: "flex-start", gap: "10px" },
  infoLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  infoValue: { fontSize: "14px", color: colors.textBody, margin: "2px 0 0" },
  detailProgressWrap: { marginTop: "8px" },
  detailProgressLabel: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: colors.textBody, marginBottom: "6px" },
};

function StudentRow({ student, onSelect }) {
  const pct = Math.round((student.hours / student.totalHours) * 100);
  return (
    <tr style={styles.tr} onClick={() => onSelect(student.id)}>
      <td style={styles.td}>{student.id}</td>
      <td style={{ ...styles.td, ...styles.nameCell }}>{student.name}</td>
      <td style={styles.td}>{student.program}</td>
      <td style={styles.td}>{student.company}</td>
      <td style={styles.td}>
        <span style={{ ...styles.statusBadge, ...statusStyles[student.status] }}>{student.status}</span>
      </td>
      <td style={styles.td}>
        <div style={styles.hoursCell}>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill(pct)} />
          </div>
          <span style={styles.hoursText}>{student.hours}/{student.totalHours}</span>
        </div>
      </td>
      <td style={styles.td}>
        <button
          style={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(student.id);
          }}
        >
          <Eye size={14} />
        </button>
      </td>
    </tr>
  );
}

function StudentDetail({ student }) {
  const pct = Math.round((student.hours / student.totalHours) * 100);
  const initials = student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={styles.detailCard}>
      <div style={styles.detailHeader}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <h2 style={styles.detailName}>{student.name}</h2>
          <p style={styles.detailSub}>{student.id} &middot; {student.program}</p>
        </div>
        <span style={{ ...styles.statusBadge, ...statusStyles[student.status], marginLeft: "auto" }}>
          {student.status}
        </span>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoRow}>
          <Building2 size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Company</p>
            <p style={styles.infoValue}>{student.company}</p>
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
            <p style={styles.infoLabel}>Phone Number</p>
            <p style={styles.infoValue}>{student.phone || "—"}</p>
          </div>
        </div>
      </div>

      <div style={styles.detailProgressWrap}>
        <div style={styles.detailProgressLabel}>
          <span>OJT Hours Completed</span>
          <span>{student.hours}/{student.totalHours}</span>
        </div>
        <div style={styles.progressTrack}>
          <div style={styles.progressFill(pct)} />
        </div>
      </div>
    </div>
  );
}

export default function StudentManagement() {
  const [students, setStudents] = useState([
    { id: "2010-40009", name: "Mark Villaceran", program: "BSIT", company: "Globe Telecom", status: "Active", hours: 245, totalHours: 485, email: "mark.villaceran@example.com", phone: "+63 917 000 0001" },
    { id: "23-562-1332", name: "Vinzent Lariosa", program: "BSCS", company: "Accenture Philippines", status: "Active", hours: 333, totalHours: 485, email: "vinzent.lariosa@example.com", phone: "+63 917 000 0002" },
    { id: "24-2016-40529", name: "Jose Adiawan", program: "BSIT", company: "Globe Telecom", status: "Completed", hours: 485, totalHours: 485, email: "jose.adiawan@example.com", phone: "+63 917 000 0003" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.log("Error fetching students:", err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.id.toLowerCase().includes(term) ||
      s.company.toLowerCase().includes(term) ||
      s.program.toLowerCase().includes(term)
    );
  });

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || null;

  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <div style={styles.bannerLeft}>
          {selectedStudent && (
            <button style={styles.backButton} onClick={() => setSelectedStudentId(null)}>
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 style={styles.bannerTitle}>{selectedStudent ? "Student Record" : "Student Records"}</h1>
            <p style={styles.bannerSubtitle}>
              {selectedStudent ? "Detailed OJT progress for this student" : "All enrolled OJT students"}
            </p>
          </div>
        </div>
        {!selectedStudent && (
          <button style={styles.exportButton}>
            <Download size={14} />
            Export
          </button>
        )}
      </div>

      {selectedStudent ? (
        <StudentDetail student={selectedStudent} />
      ) : (
        <>
          <div style={styles.searchCard}>
            <div style={styles.searchRow}>
              <div style={styles.searchInputWrap}>
                <Search size={16} color={colors.textMuted} />
                <input
                  style={styles.searchInput}
                  placeholder="Search for students..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button style={styles.filterButton} onClick={() => setFiltersOpen((prev) => !prev)}>
                <Filter size={14} />
                Filters
              </button>
            </div>

            {filtersOpen && (
              <div style={{ marginTop: "12px", fontSize: "12px", color: colors.textMuted }}>
                Filter options coming soon.
              </div>
            )}

            <div style={styles.chevronRow} onClick={() => setFiltersOpen((prev) => !prev)}>
              <ChevronDown size={16} style={{ transform: filtersOpen ? "rotate(180deg)" : "none" }} />
            </div>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Program</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Hours</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td style={styles.emptyRow} colSpan={7}>No student records available yet.</td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <StudentRow key={student.id} student={student} onSelect={setSelectedStudentId} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}