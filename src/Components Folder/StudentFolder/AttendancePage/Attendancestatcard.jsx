import React from "react";

/**
 * AttendanceStatCard.jsx
 * -----------------------------------------------------------------------
 * Reusable presentational card used to display a single summary metric
 * (Total Days, Days Present, Days Absent, Attendance Rate, etc.)
 *
 * Props:
 *  - label (string): the small gray label shown above the value
 *  - value (string|number): the large bold value shown below the label
 *
 * TODO (Backend Integration):
 *  - These values will eventually come from a Spring Boot endpoint that
 *    aggregates records from the ATTENDANCE table (see ERD), e.g.
 *    GET /api/attendance/summary?applicationId={ApplicationID}
 *  - Suggested response shape:
 *    { totalDays, daysPresent, daysAbsent, attendanceRate }
 * -----------------------------------------------------------------------
 */
const AttendanceStatCard = ({ label, value }) => {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#F0EEEE",
    borderRadius: "10px",
    padding: "20px 22px",
    flex: "1 1 0",
    minWidth: "150px",
  },
  label: {
    margin: 0,
    fontSize: "13px",
    color: "#8A8484",
    fontWeight: 400,
  },
  value: {
    margin: "10px 0 0 0",
    fontSize: "28px",
    fontWeight: 700,
    color: "#7A1F2B",
  },
};

export default AttendanceStatCard;