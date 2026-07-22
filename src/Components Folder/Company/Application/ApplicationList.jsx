import React, { useEffect, useMemo, useState } from "react";
import { getApplicantsForCompany } from "./ApplicationsStore";
import { resolveCompanyId } from "../Internship/internshipApi";
import ApplicationItem from "./ApplicationItem";

const styles = {
  page: {
    background: "#fff",
    padding: "30px",
    minHeight: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  title: {
    color: "#8b1e2b",
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  filters: {
    display: "flex",
    gap: "12px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    minWidth: "180px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "15px",
    borderBottom: "1px solid #ddd",
    color: "#777",
  },
};

export default function ApplicationListPage() {
  const [applicants, setApplicants] = useState([]);
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
          throw new Error("No company found for this account.");
        }
        const data = await getApplicantsForCompany(companyId);
        if (!cancelled) setApplicants(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const [internshipFilter, setInternshipFilter] = useState("All internships");
  const [statusFilter, setStatusFilter] = useState("All status");

  const internshipOptions = useMemo(
    () => [
      "All internships",
      ...new Set(applicants.map((a) => a.appliedFor)),
    ],
    [applicants]
  );

  const statusOptions = ["All status", "Pending", "Shortlisted", "Accepted"];

  const filtered = applicants.filter((a) => {
    const internshipMatch =
      internshipFilter === "All internships" ||
      internshipFilter === a.appliedFor;

    const statusMatch =
      statusFilter === "All status" || statusFilter === a.status;

    return internshipMatch && statusMatch;
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Application List</h1>

        <div style={styles.filters}>
          <select
            style={styles.select}
            value={internshipFilter}
            onChange={(e) => setInternshipFilter(e.target.value)}
          >
            {internshipOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select
            style={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading applications…</p>}
      {error && <p style={{ color: "#b3261e" }}>Error: {error}</p>}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Applicant</th>
              <th style={styles.th}>Applied For</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>School</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((applicant, index) => (
              <ApplicationItem
                key={applicant.id}
                applicant={applicant}
                index={index}
              />
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>No applications found.</p>
      )}
    </div>
  );
}