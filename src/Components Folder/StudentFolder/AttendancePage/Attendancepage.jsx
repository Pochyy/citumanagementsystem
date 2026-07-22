import React, { useState, useEffect, useCallback } from "react";
import AttendanceStatCard from "./Attendancestatcard";
import AttendanceTableRow from "./Attendancetablerow";

/**
 * AttendancePage.jsx
 * =========================================================================
 * Frontend recreation of the "Attendance" tracking screen, wired to the
 * Spring Boot backend.
 *
 * Endpoints used:
 *   GET  /api/applications/student/{studentId}/active   -> resolve applicationId
 *   GET  /api/attendance/summary?applicationId=         -> stat cards + hours progress
 *   GET  /api/attendance/recent?applicationId=&limit=    -> recent records table
 *   POST /api/attendance/time-in   { applicationId }
 *   POST /api/attendance/time-out  { applicationId }
 *
 * ASSUMPTION (no auth/context file seen yet): the logged-in student's
 * studentId is read from localStorage, set at login time. Replace
 * getStudentId() below with however your app actually exposes the current
 * user once that's available.
 * =========================================================================
 */

const API_BASE = ""; // e.g. "http://localhost:8080" if not proxied via CRA

function getStudentId() {
  // TODO: replace with real auth/session lookup once AuthContext (or
  // equivalent) is available. Placeholder assumes login flow stores this.
  return localStorage.getItem("studentId");
}

const Attendancepage = () => {
  const [studentId] = useState(getStudentId());
  const [applicationId, setApplicationId] = useState(null);

  const [summary, setSummary] = useState(null);
  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timeInDone, setTimeInDone] = useState(false);
  const [timeOutDone, setTimeOutDone] = useState(false);
  const [actionError, setActionError] = useState(null);

  const [currentDateTime, setCurrentDateTime] = useState(formatNow());

  // Keep the header clock live.
  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(formatNow()), 60000);
    return () => clearInterval(interval);
  }, []);

  function formatNow() {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ---- Step 1: resolve studentId -> applicationId ----
  useEffect(() => {
    if (!studentId) {
      setError("No logged-in student found.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/applications/student/${studentId}/active`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("NO_ACTIVE_APPLICATION");
        }
        if (!res.ok) {
          throw new Error("FAILED_TO_LOAD_APPLICATION");
        }
        return res.json();
      })
      .then((application) => {
        setApplicationId(application.id);
      })
      .catch((err) => {
        if (err.message === "NO_ACTIVE_APPLICATION") {
          setError("You don't have an active internship placement yet.");
        } else {
          setError("Failed to load your internship application.");
        }
        setLoading(false);
      });
  }, [studentId]);

  // ---- Step 2: once applicationId is known, load summary + recent records ----
  const loadAttendanceData = useCallback(() => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`${API_BASE}/api/attendance/summary?applicationId=${applicationId}`).then((res) => {
        if (!res.ok) throw new Error("FAILED_TO_LOAD_SUMMARY");
        return res.json();
      }),
      fetch(`${API_BASE}/api/attendance/recent?applicationId=${applicationId}&limit=10`).then((res) => {
        if (!res.ok) throw new Error("FAILED_TO_LOAD_RECORDS");
        return res.json();
      }),
    ])
      .then(([summaryData, recordsData]) => {
        setSummary(summaryData);
        setRecords(recordsData);

        // Determine whether today's Time In / Time Out are already recorded,
        // so the buttons can be disabled appropriately.
        const todayLabel = new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const todayRecord = recordsData.find((r) => r.dateRecord === todayLabel);
        setTimeInDone(!!todayRecord?.timeIn);
        setTimeOutDone(!!todayRecord?.timeOut);
      })
      .catch(() => {
        setError("Failed to load attendance data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicationId]);

  useEffect(() => {
    loadAttendanceData();
  }, [loadAttendanceData]);

  // ---- Actions: Time In / Time Out ----
  const handleTimeIn = () => {
    if (!applicationId) return;
    setActionError(null);

    fetch(`${API_BASE}/api/attendance/time-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("TIME_IN_FAILED");
        return res.json();
      })
      .then(() => {
        setTimeInDone(true);
        loadAttendanceData();
      })
      .catch(() => {
        setActionError("Could not record Time In. It may already be recorded for today.");
      });
  };

  const handleTimeOut = () => {
    if (!applicationId) return;
    setActionError(null);

    fetch(`${API_BASE}/api/attendance/time-out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("TIME_OUT_FAILED");
        return res.json();
      })
      .then(() => {
        setTimeOutDone(true);
        loadAttendanceData();
      })
      .catch(() => {
        setActionError("Could not record Time Out. Make sure Time In is recorded first.");
      });
  };

  // ---- Loading / Error states ----
  if (loading) {
    return <div style={styles.page}>Loading attendance data...</div>;
  }
  if (error) {
    return <div style={styles.page}>{error}</div>;
  }

  // ---- Derived display data from API responses ----
  const summaryStats = [
    { id: "total-days", label: "Total Days", value: summary?.totalDays ?? 0 },
    { id: "days-present", label: "Days Present", value: summary?.daysPresent ?? 0 },
    { id: "days-absent", label: "Days Absent", value: summary?.daysAbsent ?? 0 },
    {
      id: "attendance-rate",
      label: "Attendance Rate",
      value: `${(summary?.attendanceRate ?? 0).toFixed(1)}%`,
    },
  ];

  const hoursCompleted = summary?.hoursCompleted ?? 0;
  const hoursTarget = summary?.hoursTarget ?? 1; // avoid divide-by-zero
  const progressPercent = Math.min(
    100,
    Math.round((hoursCompleted / hoursTarget) * 100)
  );

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
          <button
            style={{
              ...styles.timeButton,
              ...(timeInDone ? styles.timeButtonDisabled : {}),
            }}
            onClick={handleTimeIn}
            disabled={timeInDone}
            type="button"
          >
            {timeInDone ? "Time In Recorded" : "Time In"}
          </button>

          <button
            style={{
              ...styles.timeButton,
              ...(!timeInDone || timeOutDone ? styles.timeButtonDisabled : {}),
            }}
            onClick={handleTimeOut}
            disabled={!timeInDone || timeOutDone}
            type="button"
          >
            {timeOutDone ? "Time Out Recorded" : "Time Out"}
          </button>
        </div>

        {actionError && (
          <p style={styles.actionErrorText}>{actionError}</p>
        )}

        <p style={styles.currentDateTimeText}>
          Current Date: {currentDateTime}
        </p>
      </section>

      {/* ================= Summary Stat Cards ================= */}
      <section style={styles.statsRow}>
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
            {records.length === 0 && (
              <tr>
                <td colSpan={5} style={styles.emptyStateCell}>
                  No attendance records found.
                </td>
              </tr>
            )}
            {records.map((record) => (
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
  timeButtonDisabled: {
    backgroundColor: "#E9D3D6",
    color: "#B37E82",
    cursor: "not-allowed",
  },
  actionErrorText: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    color: "#FFD9DC",
    fontWeight: 600,
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
  emptyStateCell: {
    textAlign: "center",
    padding: "20px 8px",
    fontSize: "13px",
    color: "#9A9494",
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