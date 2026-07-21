import React from "react";
import ShortlistedItem from "./ShortlistedItem";

const shortlisted = [
  {
    id: 1,
    name: "Jennie Rose",
    appliedDate: "Applied Mar 5",
    appliedFor: "Software Engineering",
    shortlistedOn: "Mar 6 2026",
    school: "UP Diliman",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Paul Ferdinand",
    appliedDate: "Applied Mar 3",
    appliedFor: "UI/UX Design",
    shortlistedOn: "Mar 4 2026",
    school: "DLSU Manila",
    status: "Accepted",
  },
];

const styles = {
  page: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  title: {
    color: "#8b1e2b",
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "25px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "15px",
    borderBottom: "1px solid #ddd",
    color: "#888",
    fontSize: "13px",
  },
};

const ShortlistedPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Shortlisted</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Applicant</th>
            <th style={styles.th}>Applied For</th>
            <th style={styles.th}>Shortlisted On</th>
            <th style={styles.th}>School</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {shortlisted.map((applicant, index) => (
            <ShortlistedItem
              key={applicant.id}
              applicant={applicant}
              index={index}
            />
          ))}
        </tbody>
      </table>

      {shortlisted.length === 0 && (
        <p>No shortlisted applicants yet.</p>
      )}
    </div>
  );
};

export default ShortlistedPage;