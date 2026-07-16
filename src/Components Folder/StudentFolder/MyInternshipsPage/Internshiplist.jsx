import React, { useState } from "react";

// Reusable style objects for the InternshipList component.
// Keeping these at the top makes the JSX below easier to read and maintain.
const styles = {
  card: {
    backgroundColor: "#ececec",
    borderRadius: "6px",
    padding: "22px 28px",
    marginBottom: "20px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
  },
  title: {
    color: "#8b1e2b",
    fontSize: "17px",
    fontWeight: 700,
    margin: 0,
  },
  companyName: {
    color: "#222222",
    fontSize: "14px",
    fontWeight: 600,
    margin: "4px 0 0 0",
  },
  datesRow: {
    display: "flex",
    gap: "36px",
    marginTop: "10px",
  },
  dateText: {
    color: "#9a9a9a",
    fontSize: "12px",
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
  viewDetailsButton: {
    backgroundColor: "#8b1e2b",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  progressSection: {
    marginTop: "18px",
  },
  progressLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  progressLabel: {
    color: "#8b1e2b",
    fontSize: "13px",
    fontWeight: 600,
  },
  progressPercent: {
    color: "#555555",
    fontSize: "13px",
    fontWeight: 600,
  },
  progressTrack: {
    width: "100%",
    height: "6px",
    backgroundColor: "#d3d3d3",
    borderRadius: "3px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8b1e2b",
    borderRadius: "3px",
  },

  // Modal / popup styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: "28px 32px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  modalHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "6px",
  },
  modalTitle: {
    color: "#8b1e2b",
    fontSize: "20px",
    fontWeight: 700,
    margin: 0,
  },
  modalCloseButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#8a8a8a",
    cursor: "pointer",
    lineHeight: 1,
  },
  modalCompanyName: {
    color: "#222222",
    fontSize: "14px",
    fontWeight: 600,
    margin: "0 0 20px 0",
  },
  modalSectionLabel: {
    color: "#8b1e2b",
    fontSize: "13px",
    fontWeight: 700,
    margin: "16px 0 6px 0",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px 24px",
    marginTop: "10px",
  },
  modalInfoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  modalInfoLabel: {
    color: "#9a9a9a",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  modalInfoValue: {
    color: "#333333",
    fontSize: "14px",
    fontWeight: 600,
  },
  modalDescription: {
    color: "#6b6b6b",
    fontSize: "13px",
    lineHeight: "20px",
    margin: 0,
  },
  modalSkillsList: {
    margin: 0,
    paddingLeft: "18px",
    color: "#6b6b6b",
    fontSize: "13px",
    lineHeight: "20px",
  },
};

// InternshipList
// Reusable presentational component for a single internship application/listing.
// Intended to be reused across the Student Dashboard, Applied Internships,
// Saved Internships, Internship History, and Internship Tracking pages.
const InternshipList = ({ internship }) => {
  // Local UI state controlling whether the "View Details" popup is open.
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={styles.card}>
      {/* Database: internship.id -> used as the unique key/reference when this component is rendered in a list */}

      <div style={styles.topRow}>
        <div style={styles.leftColumn}>
          {/* Database: internship.positionTitle */}
          <h3 style={styles.title}>{internship.positionTitle}</h3>

          {/* Database: internship.companyName */}
          <p style={styles.companyName}>{internship.companyName}</p>

          <div style={styles.datesRow}>
            {/* Database: internship.appliedDate */}
            <span style={styles.dateText}>Applied: {internship.appliedDate}</span>

            {/* Database: internship.lastUpdatedDate */}
            <span style={styles.dateText}>Last Updated: {internship.lastUpdatedDate}</span>
          </div>
        </div>

        <div style={styles.rightColumn}>
          {/* Database: internship.applicationStatus */}
          <span style={styles.statusBadge}>{internship.applicationStatus}</span>

          {/* Future functionality: View Details button should retrieve and display complete internship details */}
          <button style={styles.viewDetailsButton} onClick={() => setIsModalOpen(true)}>
            View Details
          </button>
        </div>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressLabelRow}>
          <span style={styles.progressLabel}>Application Progress</span>
          {/* Database: internship.progressPercent */}
          <span style={styles.progressPercent}>{internship.progressPercent}%</span>
        </div>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${internship.progressPercent}%`,
            }}
          />
        </div>
      </div>

      {/*
        Future functionality: Apply/Cancel application buttons
        Not shown in the current design, but if added here they should
        update the internship application status in the backend/database.
        Example:
        <button style={styles.cancelButton} onClick={() => cancelApplication(internship.id)}>
          Cancel Application
        </button>
      */}

      {/* View Details popup/modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeaderRow}>
              {/* Database: internship.positionTitle */}
              <h2 style={styles.modalTitle}>{internship.positionTitle}</h2>

              <button style={styles.modalCloseButton} onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            {/* Database: internship.companyName */}
            <p style={styles.modalCompanyName}>{internship.companyName}</p>

            {/* Future functionality: Modal data should be fetched from the backend using internship.id
                when this popup opens, rather than relying only on the summary data already in the list. */}

            <div style={styles.modalInfoGrid}>
              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Department</span>
                {/* Database: internship.department */}
                <span style={styles.modalInfoValue}>{internship.department}</span>
              </div>

              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Available Slots</span>
                {/* Database: internship.availableSlots */}
                <span style={styles.modalInfoValue}>{internship.availableSlots}</span>
              </div>

              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Duration</span>
                {/* Database: internship.duration */}
                <span style={styles.modalInfoValue}>{internship.duration}</span>
              </div>

              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Start Date</span>
                {/* Database: internship.startDate */}
                <span style={styles.modalInfoValue}>{internship.startDate}</span>
              </div>

              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Application Deadline</span>
                {/* Database: internship.applicationDeadline */}
                <span style={styles.modalInfoValue}>{internship.applicationDeadline}</span>
              </div>

              <div style={styles.modalInfoItem}>
                <span style={styles.modalInfoLabel}>Work Setup</span>
                {/* Database: internship.workSetup (Onsite / Online / Hybrid) */}
                <span style={styles.modalInfoValue}>{internship.workSetup}</span>
              </div>
            </div>

            <p style={styles.modalSectionLabel}>Job Description</p>
            {/* Database: internship.jobDescription */}
            <p style={styles.modalDescription}>{internship.jobDescription}</p>

            <p style={styles.modalSectionLabel}>Required Skills</p>
            {/* Database: internship.requiredSkills (array) -> render each skill as a list item using .map() */}
            <ul style={styles.modalSkillsList}>
              {internship.requiredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipList;