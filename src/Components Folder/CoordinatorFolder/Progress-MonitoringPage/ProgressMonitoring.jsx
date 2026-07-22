import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
import AttendanceTable from "./AttendanceTable";
import AttendanceDetail from "./AttendanceDetail";

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

const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Formats a Date as "YYYY-MM-DD" using local time (avoids UTC off-by-one issues).
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Builds the Mon-Fri work week (as real calendar dates) containing the given date.
function getWorkWeek(referenceDate) {
  const date = new Date(referenceDate);
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const days = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      key: toDateKey(d),
      label: `${DAY_ABBR[d.getDay()]} ${d.getDate()}`,
      date: d,
    });
  }
  return days;
}

function buildWeekLabel(days) {
  if (days.length === 0) return "";
  const first = days[0].date;
  const last = days[days.length - 1].date;
  const month = MONTH_NAMES[first.getMonth()];
  return `Week of ${month} ${first.getDate()}-${last.getDate()}, ${first.getFullYear()}`;
}

// Dummy attendance shaped like real DB rows. ATTENDANCE.ApplicationID (FK -> APPLICATION)
// is the actual key per the ERD — attendance belongs to a specific internship application,
// not directly to a student (a student could have more than one application over time).
// A real backend would return exactly this shape from something like:
//   SELECT application_id, date, time_in, time_out FROM attendance WHERE date BETWEEN ? AND ?
function buildDummyRecords(days) {
  const [mon, tue, wed, thu, fri] = days.map((d) => d.key);

  return [
    {
      applicationId: 101,
      studentNumber: "2010-40009",
      name: "Mark Villaceran",
      attendance: {
        [mon]: { timeIn: "08:02 AM", timeOut: "05:01 PM" },
        [tue]: { timeIn: "07:58 AM", timeOut: "05:00 PM" },
        [wed]: null,
        [thu]: { timeIn: "08:05 AM", timeOut: "05:03 PM" },
        [fri]: { timeIn: "07:55 AM", timeOut: "04:58 PM" },
      },
    },
    {
      applicationId: 102,
      studentNumber: "23-562-1332",
      name: "Vinzent Lariosa",
      attendance: {
        [mon]: null,
        [tue]: { timeIn: "08:10 AM", timeOut: "05:02 PM" },
        [wed]: { timeIn: "08:00 AM", timeOut: "05:00 PM" },
        [thu]: { timeIn: "07:59 AM", timeOut: "05:01 PM" },
        [fri]: { timeIn: "08:03 AM", timeOut: "05:00 PM" },
      },
    },
    {
      applicationId: 103,
      studentNumber: "24-2016-40529",
      name: "Jose Adiawan",
      attendance: {
        [mon]: { timeIn: "08:01 AM", timeOut: "05:00 PM" },
        [tue]: null,
        [wed]: null,
        [thu]: { timeIn: "08:04 AM", timeOut: "05:02 PM" },
        [fri]: { timeIn: "07:57 AM", timeOut: "04:59 PM" },
      },
    },
  ];
}

export default function ProgressMonitoring() {
  const [days] = useState(() => getWorkWeek(new Date()));
  const [weekLabel, setWeekLabel] = useState(() => buildWeekLabel(getWorkWeek(new Date())));
  const [records, setRecords] = useState(() => buildDummyRecords(getWorkWeek(new Date())));
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const from = days[0].key;
    const to = days[days.length - 1].key;

    fetch(`http://localhost:8080/api/attendance?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.records) {
          setWeekLabel(data.weekLabel);
          setRecords(data.records);
        }
      })
      .catch((err) => {
        console.log("Error fetching attendance records:", err);
      });
  }, [days]);

  const selectedRecord = records.find((r) => r.applicationId === selectedStudentId) || null;

  const filteredRecords = records.filter((r) => {
    const term = searchTerm.toLowerCase();
    return r.name.toLowerCase().includes(term) || r.studentNumber.toLowerCase().includes(term);
  });

  const handleExport = () => {
    const headers = ["Student Number", "Name", ...days.map((d) => d.label), "Total Present"];

    const rows = filteredRecords.map((r) => {
      const dayValues = days.map((d) => (r.attendance[d.key]?.timeIn ? "Present" : "Absent"));
      const total = days.filter((d) => r.attendance[d.key]?.timeIn).length;
      return [r.studentNumber, r.name, ...dayValues, `${total}/${days.length}`];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <div style={styles.bannerLeft}>
          {selectedRecord && (
            <button style={styles.backButton} onClick={() => setSelectedStudentId(null)}>
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 style={styles.bannerTitle}>
              {selectedRecord ? "Attendance Status" : "Attendance Records"}
            </h1>
            <p style={styles.bannerSubtitle}>
              {selectedRecord ? "Day-by-day status for this student" : "Daily attendance tracking"}
            </p>
          </div>
        </div>
        {!selectedRecord && (
          <button style={styles.exportButton} onClick={handleExport}>
            <Download size={14} />
            Export
          </button>
        )}
      </div>

      {selectedRecord ? (
        <AttendanceDetail record={selectedRecord} days={days} weekLabel={weekLabel} />
      ) : (
        <AttendanceTable
          records={filteredRecords}
          hasAnyRecords={records.length > 0}
          days={days}
          weekLabel={weekLabel}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onClearSearch={() => setSearchTerm("")}
          onSelectStudent={setSelectedStudentId}
        />
      )}
    </div>
  );
}