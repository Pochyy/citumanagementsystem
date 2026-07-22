import React, { useState } from "react";
import { submitApplication } from "../../Company/Application/ApplicationsStore";
// Reusable style objects for the InternshipOpportunityCard component.
// Keeping these at the top makes the JSX below easier to read and maintain.
const styles = {
  card: {
    backgroundColor: "#ececec",
    borderRadius: "6px",
    padding: "24px 28px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
  },
  title: {
    color: "#8b1e2b",
    fontSize: "18px",
    fontWeight: 700,
    margin: 0,
  },
  companyName: {
    color: "#222222",
    fontSize: "14px",
    fontWeight: 600,
    margin: "4px 0 0 0",
  },
  description: {
    color: "#8a8a8a",
    fontSize: "13px",
    margin: "10px 0 16px 0",
  },
  metaRow: {
    display: "flex",
    gap: "28px",
    marginBottom: "16px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#6b6b6b",
    fontSize: "13px",
  },
  metaIcon: {
    fontSize: "13px",
  },
  requirementsLabel: {
    color: "#333333",
    fontSize: "13px",
    fontWeight: 600,
    margin: "0 0 6px 0",
  },
  requirementsList: {
    margin: 0,
    paddingLeft: "18px",
    color: "#6b6b6b",
    fontSize: "13px",
    lineHeight: "20px",
  },
  postedText: {
    color: "#a3a3a3",
    fontSize: "12px",
    marginTop: "14px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px",
    minWidth: "140px",
  },
  statusBadge: {
    color: "#8b1e2b",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  applyButton: {
    backgroundColor: "#8b1e2b",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 22px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  applyButtonApplied: {
    backgroundColor: "#4a9b6e",
    cursor: "default",
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#1a7f4e",
    fontSize: "12.5px",
    fontWeight: 600,
    textAlign: "right",
  },
  errorMessage: {
    color: "#b3261e",
    fontSize: "12.5px",
    fontWeight: 600,
    textAlign: "right",
  },
};

function postedLabel(postedDaysAgo) {
  if (postedDaysAgo === null || postedDaysAgo === undefined) return "Posted recently";
  if (postedDaysAgo === 0) return "Posted today";
  if (postedDaysAgo === 1) return "Posted 1 day ago";
  return `Posted ${postedDaysAgo} days ago`;
}

// InternshipOpportunityCard
// Reusable presentational component for a single internship listing.
// Intended to be reused across the Student Dashboard, Saved Internships,
// Search Results, and Featured Listings pages.
const InternshipOpportunityCard = ({ internship }) => {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applyError, setApplyError] = useState(null);

  // Records this application (so it shows up on the company's Application
  // List page, pulling the student's real profile data) and shows a
  // confirmation right here on the card. Students don't have access to the
  // company-side Application List, so we don't navigate them there.
  const handleApply = async () => {
    if (applied || applying) return;
    setApplying(true);
    setApplyError(null);
    try {
      await submitApplication(internship);
      setApplied(true);
    } catch (err) {
      setApplyError("Something went wrong. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.leftColumn}>
        <h3 style={styles.title}>{internship.title}</h3>
        <p style={styles.companyName}>{internship.companyName}</p>
        <p style={styles.description}>{internship.description}</p>

        <div style={styles.metaRow}>
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>📍</span>
            <span>{internship.location}</span>
          </div>

          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>🕐</span>
            <span>{internship.duration}</span>
          </div>

          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>$</span>
            <span>{internship.compensation}</span>
          </div>
        </div>

        <p style={styles.requirementsLabel}>Requirements :</p>
        {internship.requiredSkills && internship.requiredSkills.length > 0 ? (
          <ul style={styles.requirementsList}>
            {internship.requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p style={{ ...styles.requirementsList, paddingLeft: 0 }}>No specific requirements listed.</p>
        )}

        <p style={styles.postedText}>{postedLabel(internship.postedDaysAgo)}</p>
      </div>

      <div style={styles.rightColumn}>
        <span style={styles.statusBadge}>{internship.status}</span>

        <button
          style={{
            ...styles.applyButton,
            ...(applied ? styles.applyButtonApplied : {}),
          }}
          onClick={handleApply}
          disabled={applied || applying}
        >
          {applied ? "Applied ✓" : applying ? "Applying..." : "Apply Now"}
        </button>

        {applied && (
          <span style={styles.successMessage}>
            Application submitted successfully!
          </span>
        )}

        {applyError && <span style={styles.errorMessage}>{applyError}</span>}

        {/*
          Future functionality: Save button
          Should save this internship record for the logged-in student.
        */}

        {/*
          Future functionality: View Details button
          Should navigate to a dedicated internship details page using internship.id.
        */}
      </div>
    </div>
  );
};

export default InternshipOpportunityCard;