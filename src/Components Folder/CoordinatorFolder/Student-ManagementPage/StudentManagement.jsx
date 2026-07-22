import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";

const colors = {
  maroon: "#7a1f2b",
  maroonDark: "#5e1720",
  orange: "#e8a24a",
  bg: "#f7f7f8",
};

const styles = {
  page: { width: "100%", minHeight: "100vh", backgroundColor: colors.bg, fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px", boxSizing: "border-box" },
  banner: { background: `linear-gradient(120deg, ${colors.maroonDark} 0%, ${colors.maroon} 55%, ${colors.orange} 100%)`, borderRadius: "12px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" },
  bannerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  backButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" },
  bannerTitle: { color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 },
  bannerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: "4px 0 0" },
  exportButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: colors.maroonDark, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: 500, padding: "9px 16px", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" },
};

// Dummy data shaped to match a join across:
// STUDENT (studentId, studentNumber, course, yearLevel, contactNumber)
// USER (firstName, lastName, email)
// APPLICATION (applicationId)
// INTERNSHIP POSTING -> COMPANY (companyName)
// INTERNSHIP PROGRESS (progressStatus: Ongoing|Completed|Failed, hoursCompleted, requiredHours)
// A real backend endpoint (e.g. GET /api/students) would return exactly this shape,
// built from a query joining those tables on their FKs.
export default function StudentManagement() {
  const [students, setStudents] = useState([
    {
      studentId: 1,
      applicationId: 101,
      studentNumber: "2010-40009",
      firstName: "Mark",
      lastName: "Villaceran",
      course: "BSIT",
      yearLevel: 3,
      companyName: "Globe Telecom",
      progressStatus: "Ongoing",
      hoursCompleted: 245,
      requiredHours: 485,
      email: "mark.villaceran@example.com",
      contactNumber: "+63 917 000 0001",
    },
    {
      studentId: 2,
      applicationId: 102,
      studentNumber: "23-562-1332",
      firstName: "Vinzent",
      lastName: "Lariosa",
      course: "BSCS",
      yearLevel: 4,
      companyName: "Accenture Philippines",
      progressStatus: "Ongoing",
      hoursCompleted: 333,
      requiredHours: 485,
      email: "vinzent.lariosa@example.com",
      contactNumber: "+63 917 000 0002",
    },
    {
      studentId: 3,
      applicationId: 103,
      studentNumber: "24-2016-40529",
      firstName: "Jose",
      lastName: "Adiawan",
      course: "BSIT",
      yearLevel: 3,
      companyName: "Globe Telecom",
      progressStatus: "Completed",
      hoursCompleted: 485,
      requiredHours: 485,
      email: "jose.adiawan@example.com",
      contactNumber: "+63 917 000 0003",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/coordinator/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.log("Error fetching students:", err);
      });
  }, []);

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return (
      fullName.includes(term) ||
      s.studentNumber.toLowerCase().includes(term) ||
      s.companyName.toLowerCase().includes(term) ||
      s.course.toLowerCase().includes(term)
    );
  });

  const selectedStudent = students.find((s) => s.studentId === selectedStudentId) || null;

  const handleExport = () => {
    const headers = ["Student Number", "Name", "Course", "Company", "Status", "Hours Completed", "Required Hours"];

    const rows = filteredStudents.map((s) => [
      s.studentNumber,
      `${s.firstName} ${s.lastName}`,
      s.course,
      s.companyName,
      s.progressStatus,
      s.hoursCompleted,
      s.requiredHours,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "student_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          <button style={styles.exportButton} onClick={handleExport}>
            <Download size={14} />
            Export
          </button>
        )}
      </div>

      {selectedStudent ? (
        <StudentDetail student={selectedStudent} />
      ) : (
        <StudentTable
          students={filteredStudents}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onClearSearch={() => setSearchTerm("")}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((prev) => !prev)}
          onSelectStudent={setSelectedStudentId}
        />
      )}
    </div>
  );
}