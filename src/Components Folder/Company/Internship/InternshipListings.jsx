import React from "react";
import { useNavigate } from "react-router-dom";
import InternshipList from "./InternshipList";

const defaultInternships = [
  {
    id: 1,
    position: "Software Engineering Intern",
    department: "Engineering",
    slots: 5,
    applications: 14,
    status: "Open",
    postedDate: "Mar 1, 2025",
  },
  {
    id: 2,
    position: "UI/UX Design Intern",
    department: "Design",
    slots: 2,
    applications: 9,
    status: "Open",
    postedDate: "Feb 20, 2025",
  },
  {
    id: 3,
    position: "Data Analytics Intern",
    department: "Data Science",
    slots: 3,
    applications: 11,
    status: "Close",
    postedDate: "Feb 10, 2025",
  },
];

const styles = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Inter, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
  },

  eyebrow: {
    color: "#7a2331",
    fontWeight: "700",
    fontSize: "12px",
    textTransform: "uppercase",
    margin: 0,
  },

  title: {
    margin: "5px 0",
    fontSize: "28px",
    fontWeight: 700,
  },

  subtitle: {
    color: "#666",
    marginTop: "5px",
  },

  button: {
    background: "#7a2331",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: 1,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#f7f7f7",
    padding: "18px",
    borderRadius: "10px",
  },

  statValue: {
    fontSize: "25px",
    fontWeight: 700,
  },

  statLabel: {
    color: "#666",
    fontSize: "13px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "15px",
    color: "#777",
    borderBottom: "1px solid #ddd",
  },
};

const InternshipListingsPage = () => {
  const navigate = useNavigate();

  const totalSlots = defaultInternships.reduce(
    (sum, item) => sum + item.slots,
    0
  );

  const totalApplications = defaultInternships.reduce(
    (sum, item) => sum + item.applications,
    0
  );

  const openCount = defaultInternships.filter(
    (item) => item.status === "Open"
  ).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Company Dashboard</p>

          <h1 style={styles.title}>Internship Listings</h1>

          <p style={styles.subtitle}>
            Manage your internship postings.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/component-3/post")}
        >
          + Post Internship
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{defaultInternships.length}</div>
          <div style={styles.statLabel}>Total Postings</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{openCount}</div>
          <div style={styles.statLabel}>Currently Open</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalSlots}</div>
          <div style={styles.statLabel}>Total Slots</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalApplications}</div>
          <div style={styles.statLabel}>Applicants</div>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Slots</th>
            <th style={styles.th}>Applications</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {defaultInternships.map((internship) => (
            <InternshipList
              key={internship.id}
              internship={internship}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipListingsPage;