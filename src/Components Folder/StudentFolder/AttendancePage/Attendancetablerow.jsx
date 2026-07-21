import React from "react";

/**
 * AttendanceTableRow.jsx
 * -----------------------------------------------------------------------
 * Renders a single row inside the "Recent Attendance Record" table.
 * This component is intentionally separated out so the parent table can
 * render it dynamically via .map() once real data is available.
 *
 * Props (record):
 *  - attendanceId  -> maps to ATTENDANCE.AttendanceID (PK) — use as React key
 *  - dateRecord    -> maps to ATTENDANCE.DateRecord
 *  - timeIn        -> maps to ATTENDANCE.TimeIn
 *  - timeOut       -> maps to ATTENDANCE.TimeOut
 *  - hoursWorked   -> maps to ATTENDANCE.HoursWorked
 *  - status        -> maps to ATTENDANCE.Status ("Present" / "Absent" / "Late")
 *
 * TODO (Backend Integration):
 *  - Row data will come from GET /api/attendance/{applicationId}
 *  - ApplicationID (FK) links this record back to the logged-in user's
 *    application/employee record — not displayed here, but used for
 *    fetching/filtering on the parent page.
 * -----------------------------------------------------------------------
 */
const AttendanceTableRow = ({ record }) => {
  const { dateRecord, timeIn, timeOut, hoursWorked, status } = record;

  // TODO: Replace with a shared status-color utility once more statuses
  // (e.g. "Late", "Excused") are finalized on the backend.
  const statusColor =
    status === "Present" ? "#2E7D32" : status === "Late" ? "#B8860B" : "#A3A3A3";

  return (
    <tr style={styles.row}>
      <td style={{ ...styles.cell, fontWeight: 600, color: "#3A3A3A" }}>
        {dateRecord}
      </td>
      <td style={styles.cell}>{timeIn ?? "—"}</td>
      <td style={styles.cell}>{timeOut ?? "—"}</td>
      <td style={styles.cell}>{hoursWorked ? `${hoursWorked} hrs` : "—"}</td>
      <td style={{ ...styles.cell, color: statusColor, fontWeight: 500 }}>
        {status}
      </td>
    </tr>
  );
};

const styles = {
  row: {
    borderBottom: "1px solid #E2DEDE",
  },
  cell: {
    padding: "12px 8px",
    fontSize: "14px",
    color: "#4A4A4A",
    textAlign: "left",
  },
};

export default AttendanceTableRow;