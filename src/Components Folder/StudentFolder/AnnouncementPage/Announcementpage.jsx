import React, { useState } from "react";
// Suggested file structure:
//   src/components/AnnouncementsPage.jsx        (this file)
//   src/components/AnnouncementCard.jsx          (reusable preview card component)
//   src/components/AnnouncementDetailModal.jsx   (popup showing full announcement details)
import AnnouncementCard from "./Announcementcard";
import AnnouncementDetailModal from "./Announcementdetailmodal";

/**
 * AnnouncementsPage.jsx
 * ---------------------------------------------------------
 * Frontend-only page component recreating the "Announcements" screen.
 * Clicking a card now opens AnnouncementDetailModal with that
 * announcement's full details.
 *
 * Backend integration plan (Spring Boot + MySQL):
 *   - GET /api/announcements
 *       -> Should return a list of ANNOUNCEMENT rows (see ERD):
 *          { announcementID, coordinatorID, title, content, datePosted }
 *       -> CoordinatorID (FK) should be joined/resolved server-side to a
 *          human-readable name (e.g., "Internship Coordinator", "Admin
 *          Department") before being sent to the frontend, OR resolved via
 *          a separate /api/coordinators/{id} lookup.
 *   - GET /api/announcements/{id} (optional)
 *       -> Could be used to fetch full details on demand instead of relying
 *          on the data already loaded in the list, if the list endpoint only
 *          returns truncated/preview content.
 *
 * ERD Reference (ANNOUNCEMENT table):
 *   ------------------------------------------------
 *   | AnnouncementID (PK) | int       |
 *   | CoordinatorID  (FK) | int       |
 *   | Title               | string    |
 *   | Content             | string    |
 *   | DatePosted          | datetime  |
 *   ------------------------------------------------
 *   TODO: Map additional related entities/relationships from the full ERD
 *   (e.g., Coordinator/User table that CoordinatorID references) once the
 *   complete ERD is provided.
 */

const Announcementspage = () => {
  // -----------------------------------------------------------
  // TODO: Replace this temporary/mock array with real data fetched
  // from the Spring Boot backend, e.g.:
  //
  //   const [announcements, setAnnouncements] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("/api/announcements")
  //       .then((res) => res.json())
  //       .then((data) => setAnnouncements(data))
  //       .catch((err) => setError(err))
  //       .finally(() => setIsLoading(false));
  //   }, []);
  // -----------------------------------------------------------
  const announcements = [
    {
      announcementID: 1, // TODO: DB - ANNOUNCEMENT.AnnouncementID (PK)
      title: "Internship Orientation for New Students",
      content:
        "All new interns are required to attend the orientation session on July 5, 2026, at 9:00 AM in Room 301. Topics include company policies, safety procedures, and internship expectations.",
      datePosted: "June 28, 2026", // TODO: DB - ANNOUNCEMENT.DatePosted
      postedBy: "Internship Coordinator", // TODO: DB - resolved CoordinatorID (FK)
    },
    {
      announcementID: 2,
      title: "Mid-term Evaluation Period",
      content:
        "Mid-term evaluations will be conducted from July 10-15, 2026. Please ensure all your logbook entries are up to date and prepare for your one-on-one session with your supervisor.",
      datePosted: "June 27, 2026",
      postedBy: "Admin Department",
    },
    {
      announcementID: 3,
      title: "Summer Internship Program Extended",
      content:
        "Mid-term evaluations will be conducted from July 10-15, 2026. Please ensure all your logbook entries are up to date and prepare for your one-on-one session with your supervisor.",
      datePosted: "June 27, 2026",
      postedBy: "Training Department",
    },
  ];

  // TODO: Replace with real loading / error / empty states from API call above
  const isLoading = false;
  const error = null;

  // -----------------------------------------------------------
  // Tracks which announcement (if any) is currently selected/open
  // in the AnnouncementDetailModal. null = no modal shown.
  // -----------------------------------------------------------
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Called by AnnouncementCard when it is clicked
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // Called by AnnouncementDetailModal's close button / overlay click
  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    // ---------- Single Parent Wrapper ----------
    <div style={styles.pageWrapper}>
      {/* ================= Header Section ================= */}
      <header style={styles.header}>
        <div style={styles.headerTitleRow}>
          {/* Megaphone icon (inline SVG) */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="#8c1d35"
            style={styles.headerIcon}
          >
            <path d="M18 11V3l-7 4H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1v6h2v-6h1.28L18 19v-8zM4 9h5v4H4V9zm5 9.5V17h1v1.79l-1-.29zM16 15.83l-5-1.43V8.6l5-2.86v10.09z" />
            <path d="M20 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41C21.36 15.13 22 13.64 22 12s-.64-3.13-1.76-4.24l-1.41 1.41C19.55 9.9 20 10.9 20 12z" />
          </svg>
          <h1 style={styles.headerTitle}>Announcements</h1>
        </div>
        <p style={styles.headerSubtitle}>
          STAY UPDATED WITH THE LATEST NEWS AND IMPORTANT NOTICES
        </p>
      </header>

      {/* ================= Main Content Section ================= */}
      <main style={styles.mainContent}>
        {/* ---------- Loading State ---------- */}
        {isLoading && (
          <p style={styles.statusText}>Loading announcements...</p>
        )}

        {/* ---------- Error State ---------- */}
        {!isLoading && error && (
          <p style={styles.statusText}>
            Something went wrong while loading announcements. Please try
            again later.
          </p>
        )}

        {/* ---------- Empty State ---------- */}
        {!isLoading && !error && announcements.length === 0 && (
          <p style={styles.statusText}>No announcements posted yet.</p>
        )}

        {/* ---------- Announcement Cards (dynamic list via .map()) ---------- */}
        {!isLoading &&
          !error &&
          announcements.length > 0 &&
          announcements.map((announcement) => (
            <AnnouncementCard
              // TODO: DB - use ANNOUNCEMENT.AnnouncementID (PK) as the key
              key={announcement.announcementID}
              announcementID={announcement.announcementID}
              title={announcement.title}
              content={announcement.content}
              datePosted={announcement.datePosted}
              postedBy={announcement.postedBy}
              onCardClick={handleCardClick}
            />
          ))}
      </main>

      {/* ================= Announcement Detail Modal ================= */}
      {/* Rendered only when an announcement has been selected (card clicked) */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={handleCloseModal}
      />
    </div>
  );
};

// ---------------------------------------------------------
// Inline style objects
// ---------------------------------------------------------
const styles = {
  pageWrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "24px 32px",
    boxSizing: "border-box",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    marginBottom: "24px",
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerIcon: {
    flexShrink: 0,
  },
  headerTitle: {
    color: "#8c1d35",
    fontSize: "26px",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  headerSubtitle: {
    color: "#8a8a8a",
    fontSize: "11px",
    letterSpacing: "0.5px",
    margin: "6px 0 0 36px",
    fontWeight: "500",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  statusText: {
    color: "#6f6f6f",
    fontSize: "14px",
    textAlign: "center",
    padding: "24px 0",
  },
};

export default Announcementspage;