import React, { useState, useEffect } from "react";
import Internshiplist from "./Internshiplist";

// Reusable style objects for the MyInternshipPage.
const styles = {
  page: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerIcon: {
    fontSize: "22px",
    color: "#8b1e2b",
  },
  headerTitle: {
    color: "#8b1e2b",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#8a8a8a",
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    margin: "6px 0 28px 32px",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  stateText: {
    color: "#8a8a8a",
    fontSize: "14px",
    marginTop: "20px",
  },
};

const API_BASE = ""; // e.g. "http://localhost:8080" if not proxied via CRA

function getStudentId() {
  return localStorage.getItem("studentId");
}

// MyInternshipPage
// Main page responsible for the overall layout: header section and the list
// of the student's internship applications, each rendered with InternshipList.
const MyInternshipPage = () => {
  const [studentId] = useState(getStudentId());
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) {
      setError("No logged-in student found.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/applications/student/${studentId}/details`)
      .then((res) => {
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        return res.json();
      })
      .then((data) => {
        setInternships(data);
      })
      .catch(() => {
        setError("Failed to load your applications.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>📄</span>
        <h1 style={styles.headerTitle}>My Applications</h1>
      </div>
      <p style={styles.subtitle}>Track the status of your internship applications</p>

      {loading && <p style={styles.stateText}>Loading your applications...</p>}
      {!loading && error && <p style={styles.stateText}>{error}</p>}
      {!loading && !error && internships.length === 0 && (
        <p style={styles.stateText}>You haven't applied to any internships yet.</p>
      )}

      {!loading && !error && internships.length > 0 && (
        <div style={styles.listWrapper}>
          {internships.map((internship) => (
            <Internshiplist key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInternshipPage;