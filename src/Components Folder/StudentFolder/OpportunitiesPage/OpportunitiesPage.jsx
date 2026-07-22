import React, { useEffect, useMemo, useState } from "react";
import InternshipOpportunityCard from "./InternshipOpportunityCard";
import { fetchOpenInternships } from "./internshipApi";

// Reusable style objects for the InternshipOpportunitiesPage.
// Keeping these at the top makes the JSX below easier to read and maintain.
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
    fontSize: "24px",
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
    margin: "6px 0 28px 34px",
  },
  searchWrapper: {
    border: "1px solid #d9d9d9",
    borderRadius: "6px",
    padding: "14px 18px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchIcon: {
    color: "#b0b0b0",
    fontSize: "14px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#9a9a9a",
    backgroundColor: "transparent",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  statusText: {
    color: "#666",
    marginBottom: "16px",
  },
  errorText: {
    color: "#b3261e",
    marginBottom: "16px",
  },
};

// Computes a rough "posted N days ago" number from any date-ish field the
// backend gives us. Returns null if there's nothing usable, so the card can
// fall back to a generic label instead of showing "Posted null days ago".
function daysAgo(dateString) {
  if (!dateString) return null;
  const posted = new Date(dateString);
  if (Number.isNaN(posted.getTime())) return null;
  const diffMs = Date.now() - posted.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

// Maps a raw internship record from the backend into the exact shape
// InternshipOpportunityCard expects. Backend field names are guessed based
// on the CreateInternship.jsx submit payload (positionTitle, department,
// duration, jobDescription, requiredSkills, workSetup, etc). Adjust the
// left-hand fallbacks below if your actual API response uses different keys.
function mapInternshipToOpportunity(internship) {
  const postedSource =
    internship.postedDate || internship.createdAt || internship.startDate;

  return {
    id: internship.id,
    title: internship.positionTitle || internship.position || "Untitled Position",
    companyName:
      internship.companyName || internship.company?.name || "Company",
    description: internship.jobDescription || internship.description || "",
    // No dedicated "location" field exists in the current post-internship
    // form, so this falls back to the work setup until that's added.
    location: internship.location || internship.workSetup || "Not specified",
    duration: internship.duration || "Not specified",
    // Compensation isn't collected by CreateInternship.jsx yet either.
    compensation: internship.compensation || "Not specified",
    requiredSkills: internship.requiredSkills || [],
    status: internship.workSetup || internship.status || "Open",
    postedDaysAgo: daysAgo(postedSource),
  };
}

// InternshipOpportunitiesPage
// Main page responsible for the overall layout: header, search/filter section,
// and the list of internship opportunity cards, backed by live data from
// GET /api/internships/open.
const InternshipOpportunitiesPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOpenInternships();
        if (!cancelled) setInternships(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load internship opportunities.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const opportunities = useMemo(
    () => internships.map(mapInternshipToOpportunity),
    [internships]
  );

  const filteredOpportunities = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return opportunities;
    return opportunities.filter((opportunity) =>
      [
        opportunity.title,
        opportunity.companyName,
        opportunity.description,
        ...(opportunity.requiredSkills || []),
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [opportunities, searchTerm]);

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>💼</span>
        <h1 style={styles.headerTitle}>Internship Opportunities</h1>
      </div>
      <p style={styles.subtitle}>Browse and apply for available internship positions</p>

      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search for Opportunities..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p style={styles.statusText}>Loading internship opportunities...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      {!loading && !error && filteredOpportunities.length === 0 && (
        <p style={styles.statusText}>
          {searchTerm
            ? "No opportunities match your search."
            : "No internship opportunities are open right now."}
        </p>
      )}

      <div style={styles.listWrapper}>
        {!loading &&
          !error &&
          filteredOpportunities.map((opportunity) => (
            <InternshipOpportunityCard key={opportunity.id} internship={opportunity} />
          ))}
      </div>

      {/*
        Future functionality: Pagination / Load More
        Once you're dealing with many open internships, add a control here
        to page through additional results instead of loading everything at once.
      */}
    </div>
  );
};

export default InternshipOpportunitiesPage;