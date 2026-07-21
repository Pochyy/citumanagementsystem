import React from 'react';

// Inline SVG icon - avoids a react-icons dependency so this file has zero
// extra packages to install.
function UploadIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
      <path d="M5 21h14" />
    </svg>
  );
}

// =============================================================================
// RequirementCard.jsx
// A single requirement row: title, description, upload metadata, a status
// badge, and an "Edit" button that opens the UploadRequirementModal.
//
// Props:
//   - requirement: {
//       id            -> requirement PK
//       title         -> e.g. "Resume / CV"
//       description   -> short helper text
//       status        -> 'Completed' | 'Pending'
//       uploadedDate  -> display string, e.g. "June 15, 2026"
//       fileSize      -> display string, e.g. "245 KB"
//     }
//   - onEdit(requirement): callback fired when "Edit" is clicked - lifts the
//     requirement up to the page so it can open UploadRequirementModal with
//     the right data pre-filled.
// =============================================================================

const styles = {
  card: {
    backgroundColor: '#e9e9e9',
    borderRadius: '10px',
    padding: '20px 24px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '220px',
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 700,
    color: '#b8434f',
  },
  description: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#555',
  },
  meta: {
    margin: '24px 0 0 0',
    fontSize: '12px',
    color: '#9a9a9a',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
    flexShrink: 0,
  },
  status: (status) => ({
    fontSize: '13px',
    fontWeight: 700,
    color: status === 'Completed' ? '#8c2432' : '#b98900',
  }),
  editButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '8px',
    padding: '10px 18px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: '#7a1f2e',
    border: '1px solid #e0d3d4',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
  },
};

function RequirementCard({ requirement, onEdit }) {
  const { title, description, status, uploadedDate, fileSize } = requirement;

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <p style={styles.meta}>
          Uploaded: {uploadedDate} • {fileSize}
        </p>
      </div>

      <div style={styles.right}>
        <span style={styles.status(status)}>{status}</span>
        <button type="button" style={styles.editButton} onClick={() => onEdit(requirement)}>
          <UploadIcon />
          Edit
        </button>
      </div>
    </div>
  );
}

export default RequirementCard;