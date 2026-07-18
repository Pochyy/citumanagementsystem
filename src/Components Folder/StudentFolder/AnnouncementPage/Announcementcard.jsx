import React from "react";

/**
 * AnnouncementCard.jsx
 * ---------------------------------------------------------
 * Reusable presentational component for a single announcement preview.
 * Clicking anywhere on the card triggers onCardClick (passed from the
 * parent AnnouncementsPage), which opens the AnnouncementDetailModal
 * with this announcement's full details.
 *
 * Props expected (eventually sourced from the ANNOUNCEMENT table
 * in the ERD provided by the user):
 *   - announcementID   (PK, int)   -> React "key" when mapped in parent
 *   - title            (string)    -> ANNOUNCEMENT.Title
 *   - content          (string)    -> ANNOUNCEMENT.Content
 *   - datePosted       (datetime)  -> ANNOUNCEMENT.DatePosted (formatted)
 *   - postedBy         (string)    -> derived from ANNOUNCEMENT.CoordinatorID (FK)
 *                                     joined against a Coordinator/User table
 *                                     on the backend (Spring Boot service should
 *                                     resolve CoordinatorID -> Coordinator name)
 *   - onCardClick      (function)  -> called with the full announcement object
 *                                     when the card is pressed; parent uses this
 *                                     to open AnnouncementDetailModal
 *
 * TODO (Backend Integration):
 *   - Replace all placeholder text with real values passed down as props.
 *   - CoordinatorID (FK) should be resolved server-side (Spring Boot) into a
 *     display name, or resolved client-side via a separate Coordinator lookup.
 *   - AnnouncementID (PK) should be used as the unique React key by the parent
 *     component when rendering a list via .map().
 */

const Announcementcard = ({
  announcementID, // TODO: DB - ANNOUNCEMENT.AnnouncementID (PK)
  title,          // TODO: DB - ANNOUNCEMENT.Title
  content,        // TODO: DB - ANNOUNCEMENT.Content
  datePosted,     // TODO: DB - ANNOUNCEMENT.DatePosted
  postedBy,       // TODO: DB - resolved from ANNOUNCEMENT.CoordinatorID (FK)
  onCardClick,    // handler passed down from AnnouncementsPage to open the modal
}) => {
  const handleClick = () => {
    // Pass the full announcement record back up to the parent so it can
    // set the "selected announcement" state and render AnnouncementDetailModal.
    if (onCardClick) {
      onCardClick({ announcementID, title, content, datePosted, postedBy });
    }
  };

  return (
    <div
      style={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow keyboard users (Enter/Space) to open the card too
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {/* ---------- Card Title ---------- */}
      <h3 style={styles.cardTitle}>{title}</h3>

      {/* ---------- Card Content / Body ---------- */}
      <p style={styles.cardContent}>{content}</p>

      {/* ---------- Card Footer (Date + Posted By) ---------- */}
      <div style={styles.cardFooter}>
        <div style={styles.dateWrapper}>
          {/* Calendar icon (inline SVG so no external icon library is required) */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#8c1d35"
            style={styles.calendarIcon}
          >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
          </svg>
          {/* TODO: DB - ANNOUNCEMENT.DatePosted (format on backend or with a date-fns helper) */}
          <span style={styles.dateText}>{datePosted}</span>
        </div>

        {/* TODO: DB - Posted by resolved Coordinator/Department name (CoordinatorID FK) */}
        <span style={styles.postedByText}>Posted by {postedBy}</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// Inline style objects
// ---------------------------------------------------------
const styles = {
  card: {
    backgroundColor: "#ececec",
    borderRadius: "10px",
    padding: "20px 24px",
    marginBottom: "16px",
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  cardTitle: {
    color: "#8c1d35",
    fontSize: "17px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  cardContent: {
    color: "#4a4a4a",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0 0 18px 0",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  dateWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  calendarIcon: {
    flexShrink: 0,
  },
  dateText: {
    color: "#333333",
    fontSize: "13px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  postedByText: {
    color: "#6f6f6f",
    fontSize: "13px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
};

export default Announcementcard;