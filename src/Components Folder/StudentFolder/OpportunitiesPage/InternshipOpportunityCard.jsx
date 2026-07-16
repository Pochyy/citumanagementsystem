import React from "react";

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
};

// InternshipOpportunityCard
// Reusable presentational component for a single internship listing.
// Intended to be reused across the Student Dashboard, Saved Internships,
// Search Results, and Featured Listings pages.
const InternshipOpportunityCard = ({ internship }) => {
  return (
    <div style={styles.card}>
      {/* Database: internship.id -> used as the unique key/reference when this card is rendered in a list */}

      <div style={styles.leftColumn}>
        {/* Database: internship.title */}
        <h3 style={styles.title}>{internship.title}</h3>

        {/* Database: internship.companyName */}
        {/* Database: internship.companyLogo -> could be rendered here as an <img> once available */}
        <p style={styles.companyName}>{internship.companyName}</p>

        {/* Database: internship.description */}
        <p style={styles.description}>{internship.description}</p>

        <div style={styles.metaRow}>
          {/* Database: internship.location */}
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>📍</span>
            <span>{internship.location}</span>
          </div>

          {/* Database: internship.duration */}
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>🕐</span>
            <span>{internship.duration}</span>
          </div>

          {/* Database: internship.compensation */}
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>$</span>
            <span>{internship.compensation}</span>
          </div>
        </div>

        <p style={styles.requirementsLabel}>Requirements :</p>
        {/* Database: internship.requiredSkills (array) -> render each skill as a list item using .map() */}
        <ul style={styles.requirementsList}>
          {internship.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        {/* Database: internship.postedDate -> format as a relative time string (e.g. "Posted 2 days ago") */}
        <p style={styles.postedText}>Posted {internship.postedDaysAgo} days ago...</p>
      </div>

      <div style={styles.rightColumn}>
        {/* Database: internship.status (e.g. "Onsite", "Remote", "Hybrid") */}
        <span style={styles.statusBadge}>{internship.status}</span>

        {/* Future functionality: Apply button should submit an internship application to the backend/database */}
        <button
          style={styles.applyButton}
          onClick={() => {
            // Future functionality: connect to application submission endpoint
            // e.g. submitApplication(internship.id)
          }}
        >
          Apply Now
        </button>

        {/*
          Future functionality: Save button
          Not shown in the current design, but should be added here once needed.
          Should save this internship record for the logged-in student.
          Example:
          <button style={styles.saveButton} onClick={() => saveInternship(internship.id)}>
            Save
          </button>
        */}

        {/*
          Future functionality: View Details button
          Not shown in the current design, but should be added here once needed.
          Should navigate to a dedicated internship details page using internship.id.
          Example:
          <button style={styles.viewDetailsButton} onClick={() => navigateToDetails(internship.id)}>
            View Details
          </button>
        */}
      </div>
    </div>
  );
};

export default InternshipOpportunityCard;