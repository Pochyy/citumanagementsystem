import React from "react";

/**
 * AnnouncementDetailModal.jsx
 * ---------------------------------------------------------
 * Standalone modal/overlay component that displays the full
 * details of a single announcement when its card is clicked.
 *
 * This is kept as its own component (separate from AnnouncementCard
 * and AnnouncementsPage) to follow separation of concerns:
 *   - AnnouncementsPage  -> layout / composition / state (which card is selected)
 *   - AnnouncementCard   -> renders the compact preview card
 *   - AnnouncementDetailModal -> renders the expanded detail popup
 *
 * Props:
 *   - announcement (object | null) -> the full announcement record to display
 *       {
 *         announcementID,  // TODO: DB - ANNOUNCEMENT.AnnouncementID (PK)
 *         title,           // TODO: DB - ANNOUNCEMENT.Title
 *         content,         // TODO: DB - ANNOUNCEMENT.Content
 *         datePosted,      // TODO: DB - ANNOUNCEMENT.DatePosted
 *         postedBy,        // TODO: DB - resolved ANNOUNCEMENT.CoordinatorID (FK)
 *       }
 *   - onClose (function) -> closes the modal (sets selected announcement back to null)
 *
 * TODO (Backend Integration):
 *   - If more announcement detail fields are added to the ERD later
 *     (e.g., attachments, target audience, priority level), display them here.
 *   - If a "read/unread" or "acknowledge" feature is added, the acknowledgement
 *     API call (e.g., POST /api/announcements/{id}/acknowledge) would be
 *     triggered from a button inside this modal.
 */

const Announcementdetailmodal = ({ announcement, onClose }) => {
  // If no announcement is selected, render nothing
  if (!announcement) return null;

  const { title, content, datePosted, postedBy } = announcement;

  // Prevent click inside the modal card from closing the modal
  // (only clicking the overlay background should close it)
  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    // ---------- Overlay Background ----------
    <div style={styles.overlay} onClick={onClose}>
      {/* ---------- Modal Card ---------- */}
      <div style={styles.modalCard} onClick={handleCardClick}>
        {/* ---------- Close Button ---------- */}
        <button
          style={styles.closeButton}
          onClick={onClose}
          aria-label="Close announcement details"
        >
          &times;
        </button>

        {/* ---------- Modal Title ---------- */}
        {/* TODO: DB - ANNOUNCEMENT.Title */}
        <h2 style={styles.modalTitle}>{title}</h2>

        {/* ---------- Modal Meta (Date + Posted By) ---------- */}
        <div style={styles.modalMetaRow}>
          <div style={styles.dateWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#8c1d35"
              style={styles.calendarIcon}
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            {/* TODO: DB - ANNOUNCEMENT.DatePosted */}
            <span style={styles.dateText}>{datePosted}</span>
          </div>
          {/* TODO: DB - resolved ANNOUNCEMENT.CoordinatorID (FK) -> name */}
          <span style={styles.postedByText}>Posted by {postedBy}</span>
        </div>

        {/* ---------- Divider ---------- */}
        <hr style={styles.divider} />

        {/* ---------- Full Content ---------- */}
        {/* TODO: DB - ANNOUNCEMENT.Content (full/untruncated text) */}
        <p style={styles.modalContent}>{content}</p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// Inline style objects
// ---------------------------------------------------------
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
    boxSizing: "border-box",
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  closeButton: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "24px",
    lineHeight: "1",
    color: "#8a8a8a",
    cursor: "pointer",
    padding: "4px",
  },
  modalTitle: {
    color: "#8c1d35",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 28px 12px 0",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  modalMetaRow: {
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
  },
  postedByText: {
    color: "#6f6f6f",
    fontSize: "13px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e5e5e5",
    margin: "18px 0",
  },
  modalContent: {
    color: "#4a4a4a",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: 0,
  },
};

export default Announcementdetailmodal;