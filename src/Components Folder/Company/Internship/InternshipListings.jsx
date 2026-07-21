import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InternshipList from "./InternshipList";
import { resolveCompanyId, fetchInternships, fetchInternshipStats } from "./internshipApi";

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

  const [internships, setInternships] = useState([]);
  const [stats, setStats] = useState({
    totalPostings: 0,
    currentlyOpen: 0,
    totalSlots: 0,
    totalApplicants: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const companyId = await resolveCompanyId();
        if (!companyId) {
          if (!cancelled) {
            setError("No company is logged in.");
            setLoading(false);
          }
          return;
        }

        const [listData, statsData] = await Promise.all([
          fetchInternships(companyId),
          fetchInternshipStats(companyId),
        ]);
        if (!cancelled) {
          setInternships(listData);
          setStats(statsData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load internships.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

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
          <div style={styles.statValue}>{stats.totalPostings}</div>
          <div style={styles.statLabel}>Total Postings</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.currentlyOpen}</div>
          <div style={styles.statLabel}>Currently Open</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.totalSlots}</div>
          <div style={styles.statLabel}>Total Slots</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.totalApplicants}</div>
          <div style={styles.statLabel}>Applicants</div>
        </div>
      </div>

      {error && (
        <p style={{ color: "#b3261e", marginBottom: "15px" }}>{error}</p>
      )}

      {loading ? (
        <p style={{ color: "#666" }}>Loading internships...</p>
      ) : (
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
            {internships.map((internship) => (
              <InternshipList
                key={internship.id}
                internship={internship}
              />
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && internships.length === 0 && (
        <p style={{ color: "#666", marginTop: "15px" }}>
          No internships posted yet.
        </p>
      )}
    </div>
  );
};

export default InternshipListingsPage;