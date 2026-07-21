import React from "react";
import AttendanceStatCard from "./Attendancestatcard";
import AttendanceTableRow from "./Attendancetablerow";

/**
 * AttendancePage.jsx
 * =========================================================================
 * Frontend-only recreation of the "Attendance" tracking screen.
 * Handles LAYOUT + COMPOSITION only. All row/card rendering is delegated
 * to child components (see imports above).
 *
 * ---------------------------------------------------------------------
 * ERD REFERENCE (provided separately as PNG):
 *
 *   ATTENDANCE
 *   ----------------------------
 *   AttendanceID   PK   int
 *   ApplicationID  FK   int
 *   DateRecord          date
 *   TimeIn              time
 *   TimeOut             time
 *   HoursWorked         decimal
 *   Status              enum('Present','Absent')
 *
 * NOTE: The ERD only defines the ATTENDANCE entity so far. Additional
 * entities/relationships (e.g. APPLICATION, EMPLOYEE, USER) referenced by
 * ApplicationID (FK) will be mapped here once that portion of the ERD is
 * provided. Do not assume their shape yet.
 * =========================================================================
 */
const Attendancepage = () => {
  // -----------------------------------------------------------------------
  // TODO (Backend Integration - State Management):
  // Replace these hardcoded placeholders with real state, e.g.:
  //
  // const [summary, setSummary] = useState(null);
  // const [records, setRecords] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   fetch(`/api/attendance/summary?applicationId=${applicationId}`)
  //     .then(res => res.json())
  //     .then(data => setSummary(data))
  //     .catch(err => setError(err))
  //     .finally(() => setLoading(false));
  //
  //   fetch(`/api/attendance?applicationId=${applicationId}`)
  //     .then(res => res.json())
  //     .then(data => setRecords(data));
  // }, [applicationId]);
  // -----------------------------------------------------------------------

  // PLACEHOLDER: current date/time header text.
  // TODO: replace with live Date object or server-provided timestamp.
  const currentDateTime = "Monday, June 29, 2026 · 09:30 AM";

  // PLACEHOLDER: summary stat cards.
  // TODO: replace `value` fields with `summary.totalDays`, `summary.daysPresent`,
  // `summary.daysAbsent`, `summary.attendanceRate` from the API response above.
  const summaryStats = [
    { id: "total-days", label: "Total Days", value: 20 },
    { id: "days-present", label: "Days Present", value: 18 },
    { id: "days-absent", label: "Days Absent", value: 1 },
    { id: "attendance-rate", label: "Attendance Rate", value: "90.0%" },
  ];

  // PLACEHOLDER: recent attendance records.
  // TODO: replace this array with `records` state populated from
  // GET /api/attendance?applicationId={ApplicationID}
  // Each item's `attendanceId` should come from ATTENDANCE.AttendanceID (PK).
  const recentRecords = [
    {
      attendanceId: 1,
      dateRecord: "June 29, 2026",
      timeIn: "08:00 AM",
      timeOut: "05:00 PM",
      hoursWorked: 8,
      status: "Present",
    },
    {
      attendanceId: 2,
      dateRecord: "June 28, 2026",
      timeIn: "08:15 AM",
      timeOut: "05:10 PM",
      hoursWorked: 8,
      status: "Present",
    },
    {
      attendanceId: 3,
      dateRecord: "June 27, 2026",
      timeIn: "05:00 PM",
      timeOut: "05:00 PM",
      hoursWorked: 8,
      status: "Late",
    },
    {
      attendanceId: 4,
      dateRecord: "June 26, 2026",
      timeIn: null,
      timeOut: null,
      hoursWorked: null,
      status: "Absent",
    },
  ];

  // PLACEHOLDER: monthly hours progress.
  // TODO: replace with `summary.hoursCompleted` / `summary.hoursTarget`
  const hoursCompleted = 144;
  const hoursTarget = 160;
  const progressPercent = Math.round((hoursCompleted / hoursTarget) * 100);

  // -----------------------------------------------------------------------
  // Loading / Error / Empty state handling
  // TODO: Uncomment and wire up once real fetch logic is added.
  //
  // if (loading) return <div style={styles.page}>Loading attendance data...</div>;
  // if (error) return <div style={styles.page}>Failed to load attendance data.</div>;
  // -----------------------------------------------------------------------

  // TODO (Backend Actions):
  //  - handleTimeIn(): POST /api/attendance/time-in { applicationId, timestamp }
  //  - handleTimeOut(): POST /api/attendance/time-out { applicationId, timestamp }
  const handleTimeIn = () => {
    // TODO: Call Spring Boot endpoint to record Time In for today.
    console.log("Time In clicked - wire up POST /api/attendance/time-in");
  };

  const handleTimeOut = () => {
    // TODO: Call Spring Boot endpoint to record Time Out for today.
    console.log("Time Out clicked - wire up POST /api/attendance/time-out");
  };

  return (
    <div style={styles.page}>
      {/* ================= Header / Page Title ================= */}
      <header style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>
          <span style={styles.calendarIcon} aria-hidden="true">
            📅
          </span>
          Attendance
        </h1>
        <p style={styles.pageSubtitle}>
          TRACK YOUR DAILY ATTENDANCE AND WORKING HOURS
        </p>
      </header>

      {/* ================= Mark Today's Attendance (Form/Actions) ================= */}
      <section style={styles.markAttendanceBanner}>
        <h2 style={styles.markAttendanceTitle}>Mark Today's Attendance</h2>

        <div style={styles.timeButtonsRow}>
          {/* TODO: disable this button once TimeIn already recorded for today */}
          <button
            style={styles.timeButton}
            onClick={handleTimeIn}
            type="button"
          >
            Time In
          </button>

          {/* TODO: disable this button until TimeIn has been recorded */}
          <button
            style={styles.timeButton}
            onClick={handleTimeOut}
            type="button"
          >
            Time Out
          </button>
        </div>

        <p style={styles.currentDateTimeText}>
          Current Date: {currentDateTime}
        </p>
      </section>

      {/* ================= Summary Stat Cards ================= */}
      <section style={styles.statsRow}>
        {/* Rendered dynamically from summaryStats array via .map() */}
        {summaryStats.map((stat) => (
          <AttendanceStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </section>

      {/* ================= Recent Attendance Record Table ================= */}
      <section style={styles.tableSection}>
        <h2 style={styles.tableSectionTitle}>Recent Attendance Record</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>DATE</th>
              <th style={styles.tableHeaderCell}>TIME IN</th>
              <th style={styles.tableHeaderCell}>TIME OUT</th>
              <th style={styles.tableHeaderCell}>HOURS</th>
              <th style={styles.tableHeaderCell}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {/*
              Dynamic rows rendered via .map() using the separated
              AttendanceTableRow component. Replace `recentRecords`
              with API-fetched `records` state.

              TODO: Handle empty state, e.g.:
              {records.length === 0 && (
                <tr><td colSpan={5}>No attendance records found.</td></tr>
              )}
            */}
            {recentRecords.map((record) => (
              <AttendanceTableRow key={record.attendanceId} record={record} />
            ))}
          </tbody>
        </table>

        {/* ================= Monthly Hours Progress ================= */}
        <div style={styles.progressSection}>
          <div style={styles.progressLabelRow}>
            <span style={styles.progressLabel}>Monthly Hours Progress</span>
            <span style={styles.progressLabel}>
              {hoursCompleted} / {hoursTarget} hours
            </span>
          </div>
          <div style={styles.progressBarTrack}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progressPercent}%`,
              }}
            />
          </div>
          <div style={styles.progressPercentText}>{progressPercent}%</div>
        </div>
      </section>
    </div>
  );
};

// ===========================================================================
// Styles (inline style objects - no external CSS / Tailwind / UI libraries)
// ===========================================================================
const styles = {
  page: {
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px 20px 60px 20px",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
  },

  // ---- Header ----
  pageHeader: {
    marginBottom: "20px",
  },
  pageTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    color: "#7A1F2B",
  },
  calendarIcon: {
    fontSize: "22px",
  },
  pageSubtitle: {
    margin: "6px 0 0 34px",
    fontSize: "11px",
    letterSpacing: "0.6px",
    color: "#9A9494",
    fontWeight: 600,
  },

  // ---- Mark Attendance Banner ----
  markAttendanceBanner: {
    backgroundColor: "#7A1F2B",
    borderRadius: "12px",
    padding: "26px 28px 20px 28px",
    marginBottom: "24px",
  },
  markAttendanceTitle: {
    margin: "0 0 18px 0",
    fontSize: "20px",
    fontWeight: 700,
    color: "#FFFFFF",
  },
  timeButtonsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "14px",
  },
  timeButton: {
    flex: "1 1 200px",
    backgroundColor: "#FFFFFF",
    color: "#7A1F2B",
    border: "none",
    borderRadius: "8px",
    padding: "14px 20px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  currentDateTimeText: {
    margin: 0,
    fontSize: "12px",
    color: "#E9D3D6",
  },

  // ---- Stat Cards Row ----
  statsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "30px",
  },

  // ---- Table Section ----
  tableSection: {
    backgroundColor: "#F0EEEE",
    borderRadius: "10px",
    padding: "24px",
  },
  tableSectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "17px",
    fontWeight: 700,
    color: "#7A1F2B",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderCell: {
    textAlign: "left",
    fontSize: "11px",
    letterSpacing: "0.4px",
    color: "#9A9494",
    fontWeight: 600,
    padding: "0 8px 10px 8px",
    borderBottom: "1px solid #DCD7D7",
  },

  // ---- Monthly Hours Progress ----
  progressSection: {
    marginTop: "22px",
  },
  progressLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  progressLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#B37E82",
  },
  progressBarTrack: {
    width: "100%",
    height: "8px",
    backgroundColor: "#DCD7D7",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#B0555F",
    borderRadius: "4px",
  },
  progressPercentText: {
    textAlign: "right",
    marginTop: "6px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#7A1F2B",
  },
};

export default Attendancepage;