import React, { useEffect, useState } from "react";
import { resolveCompanyId, fetchInternshipStats } from "./Internship/internshipApi";


const emptyStats = {
  currentlyOpen: 0,
  totalApplicants: 0,
  totalSlots: 0,
};

export default function CompanyStats() {
  const [stats, setStats] = useState(emptyStats);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const companyId = await resolveCompanyId();
        if (!companyId) {
          throw new Error("No company found for this account.");
        }

        const data = await fetchInternshipStats(companyId);
        if (cancelled) return;

        setStats({
          currentlyOpen: data.currentlyOpen ?? 0,
          totalApplicants: data.totalApplicants ?? 0,
          totalSlots: data.totalSlots ?? 0,
        });
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err.message || "Failed to load stats.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadStats();
    return () => {
      cancelled = true;
    };
  }, []);

  if (errorMessage) {
    return <p className="stats-error">{errorMessage}</p>;
  }

  return (
    <div className="stats">
      <Stat label="Active Internships" value={isLoading ? "…" : stats.currentlyOpen} />
      <Stat label="Total Applicants" value={isLoading ? "…" : stats.totalApplicants} />
      <Stat label="Slots Remaining" value={isLoading ? "…" : stats.totalSlots} />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
