import React, { useState } from 'react';
import RequirementCard from './RequirementCard';
import UploadRequirementModal from './UploadRequirementModal';

// Inline SVG icon - avoids a react-icons dependency so this file has zero
// extra packages to install.
function ClipboardIcon(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
      <path d="M9 18h4" />
    </svg>
  );
}

// =============================================================================
// RequirementsPage.jsx  (COMBINED FILE)
//
// Contains everything EXCEPT the two components kept separate:
//   - RequirementCard.jsx          (the requirement row "sample" card)
//   - UploadRequirementModal.jsx   (the popup opened by a card's "Edit" button)
//
// Everything else - the header banner, the maroon progress card, and the
// page shell/state - lives in this single file.
//
// FRONTEND ONLY - all data below is placeholder/dummy state.
//
// TODO (Backend / Spring Boot integration):
//   - GET /api/requirements?internId={currentUserId}
//       -> replaces MOCK_REQUIREMENTS. Each row maps to a REQUIREMENT table
//          entry (title, description, status, uploadedDate, fileSize, etc.)
//   - GET /api/requirements/summary?internId={currentUserId}
//       -> returns { completedCount, totalCount, percent } for the progress card.
//   - POST /api/requirements/{id}/upload (multipart/form-data)
//       -> wired from UploadRequirementModal's onSave; should update the
//          matching requirement's status/uploadedDate/fileSize on success.
//   - Add loading / empty / error states around the requirement list:
//       loading -> skeleton RequirementCard placeholders
//       empty   -> "No requirements assigned yet" placeholder
//       error   -> "Couldn't load requirements, please try again" + retry
// =============================================================================

// TEMP MOCK DATA - simulates rows from the REQUIREMENT table for the logged-in
// intern. Replace with the API response described above.
const MOCK_REQUIREMENTS = [
  {
    id: 1,
    title: 'Resume / CV',
    description: 'Updated resume with complete educational and work experience',
    status: 'Completed',
    uploadedDate: 'June 15, 2026',
    fileSize: '245 KB',
  },
  {
    id: 2,
    title: 'Endorsement Letter',
    description: 'Signed endorsement letter from your school coordinator',
    status: 'Completed',
    uploadedDate: 'June 15, 2026',
    fileSize: '180 KB',
  },
  {
    id: 3,
    title: 'Certificate of Good Moral',
    description: 'Certificate issued within the last 6 months',
    status: 'Completed',
    uploadedDate: 'June 15, 2026',
    fileSize: '210 KB',
  },
  
];

const styles = {
  page: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: 'border-box',
    padding: '32px 24px 48px 24px',
  },
  container: {
    maxWidth: '860px',
    margin: '0 auto',
    width: '100%',
  },

  // ---- header banner ----
  headerWrapper: {
    marginBottom: '24px',
  },
  headerTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerIcon: {
    fontSize: '22px',
    color: '#7a1f2e',
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 800,
    color: '#7a1f2e',
    letterSpacing: '0.2px',
  },
  headerSubtitle: {
    margin: '4px 0 0 32px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.2px',
    color: '#9a9a9a',
  },

  // ---- maroon progress card ----
  progressCard: {
    backgroundColor: '#7a1f2e',
    borderRadius: '14px',
    padding: '28px 32px',
    color: '#ffffff',
    marginBottom: '24px',
    boxShadow: '0 2px 6px rgba(122,31,46,0.25)',
  },
  progressTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '8px',
  },
  progressTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 800,
  },
  progressSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.85)',
  },
  progressPercent: {
    fontSize: '26px',
    fontWeight: 800,
  },
  progressBarTrack: {
    marginTop: '18px',
    width: '100%',
    height: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressBarFill: (percent) => ({
    height: '100%',
    width: `${percent}%`,
    backgroundColor: '#f2867e',
    borderRadius: '999px',
    transition: 'width 0.3s ease',
  }),
};

function RequirementsPage() {
  // TODO: replace with real fetch of the intern's requirements list.
  const [requirements, setRequirements] = useState(MOCK_REQUIREMENTS);

  // The requirement currently being edited; null/undefined = modal closed.
  const [editingRequirement, setEditingRequirement] = useState(null);

  const completedCount = requirements.filter((r) => r.status === 'Completed').length;
  const totalCount = requirements.length;
  // NOTE: percent kept independent of the raw ratio above so it can reflect
  // whatever weighting the backend applies per-requirement. Swap for a value
  // from GET /api/requirements/summary once available.
  const percent = 40;

  const handleEditRequirement = (requirement) => {
    setEditingRequirement(requirement);
  };

  const handleCloseModal = () => {
    setEditingRequirement(null);
  };

  const handleSaveUpload = ({ requirementId, file, notes }) => {
    // TODO (Backend): replace with POST /api/requirements/{id}/upload and
    // update local state from the server response instead of this local echo.
    console.log('TODO: upload requirement file ->', { requirementId, file, notes });

    setRequirements((prev) =>
      prev.map((r) =>
        r.id === requirementId
          ? {
              ...r,
              status: 'Completed',
              uploadedDate: file ? 'Just now' : r.uploadedDate,
              fileSize: file ? `${Math.round(file.size / 1024)} KB` : r.fileSize,
            }
          : r
      )
    );

    setEditingRequirement(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ================= HEADER BANNER ================= */}
        <div style={styles.headerWrapper}>
          <div style={styles.headerTitleRow}>
            <ClipboardIcon style={styles.headerIcon} aria-hidden="true" />
            <h1 style={styles.headerTitle}>Requirements</h1>
          </div>
          <p style={styles.headerSubtitle}>UPLOAD AND MANAGE YOUR INTERNSHIP REQUIREMENTS</p>
        </div>

        {/* ================= PROGRESS CARD ================= */}
        <div style={styles.progressCard}>
          <div style={styles.progressTopRow}>
            <div>
              <h2 style={styles.progressTitle}>Requirements</h2>
              <p style={styles.progressSubtitle}>
                {completedCount} of {totalCount} requirements completed
              </p>
            </div>
            <span style={styles.progressPercent}>{percent}%</span>
          </div>

          <div
            style={styles.progressBarTrack}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div style={styles.progressBarFill(percent)} />
          </div>
        </div>

        {/* ================= REQUIREMENT LIST ================= */}
        {/* TODO: loading state -> render skeleton RequirementCard placeholders here */}
        {/* TODO: error state -> render a retry message here if fetch failed */}
        {/* TODO: empty state -> render "No requirements assigned yet" when requirements.length === 0 */}
        {requirements.map((requirement) => (
          <RequirementCard
            key={requirement.id} // REQUIREMENT table PK
            requirement={requirement}
            onEdit={handleEditRequirement}
          />
        ))}
      </div>

      {/* ================= UPLOAD / EDIT POPUP ================= */}
      {editingRequirement && (
        <UploadRequirementModal
          requirement={editingRequirement}
          onClose={handleCloseModal}
          onSave={handleSaveUpload}
        />
      )}
    </div>
  );
}

export default RequirementsPage;