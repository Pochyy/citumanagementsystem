import React, { useEffect, useState } from "react";
import { getAllApplicants, decideApplicant } from "../Application/ApplicationsStore";
import ShortlistedItem from "./ShortlistedItem";

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
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllApplicants()
      .then(setApplicants)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const shortlisted = applicants.filter(
    (a) => a.status === "Shortlisted" || a.status === "Accepted"
  );

  const handleAccept = async (id) => {
    await decideApplicant(id, "accepted");
    load();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Shortlisted</h1>

      {loading && <p>Loading…</p>}

      {!loading && (
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
                onAccept={() => handleAccept(applicant.id)}
              />
            ))}
          </tbody>
        </table>
      )}

      {!loading && shortlisted.length === 0 && (
        <p>No shortlisted applicants yet.</p>
      )}
    </div>
  );
};

export default ShortlistedPage;
