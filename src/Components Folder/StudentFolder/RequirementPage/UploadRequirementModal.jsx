import React, { useRef, useState } from 'react';

// Inline SVG icons - avoids a react-icons dependency so this file has zero
// extra packages to install.
function CloseIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function UploadCloudIcon(props) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 12v9" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

// =============================================================================
// UploadRequirementModal.jsx
// Overlay/dialog opened from a RequirementCard's "Edit" button. Lets the user
// pick a replacement file (via a drag-and-drop / click-to-browse dropzone)
// and an optional note, then confirm.
//
// This file is fully self-contained: the dropzone, the notes field, and the
// footer buttons are all inlined here rather than split into separate
// components, so this and RequirementCard.jsx are the only two component
// files outside of the page itself.
//
// This is FRONTEND ONLY - "Save" just calls onSave(payload) with local form
// state. No API calls, no validation against a backend, no persistence here.
//
// Props:
//   - requirement: the requirement being edited (title, description, etc.),
//     used to populate the modal header - null/undefined means "closed",
//     so the parent should conditionally render this component.
//   - onClose(): callback to dismiss the modal without saving
//   - onSave(payload): callback fired with { requirementId, file, notes }
//     when the user confirms. Parent (page) owns what happens with this data
//     until a real POST endpoint exists.
// =============================================================================

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '22px 24px 16px 24px',
    borderBottom: '1px solid #f0e4e5',
  },
  headerTitle: {
    margin: 0,
    fontSize: '17px',
    fontWeight: 800,
    color: '#7a1f2e',
  },
  headerSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#888',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#999',
    flexShrink: 0,
    display: 'flex',
    padding: '4px',
  },
  body: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  // ---- dropzone ----
  dropzone: (isDragging) => ({
    border: `2px dashed ${isDragging ? '#7a1f2e' : '#d8c9ca'}`,
    borderRadius: '10px',
    backgroundColor: isDragging ? '#fbeff0' : '#fdf8f8',
    padding: '28px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
  }),
  dropzoneIcon: {
    fontSize: '28px',
    color: '#b8434f',
    marginBottom: '8px',
  },
  dropzoneLabel: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#333',
    margin: 0,
  },
  dropzoneHelper: {
    fontSize: '12px',
    color: '#999',
    margin: '4px 0 0 0',
  },
  hiddenInput: {
    display: 'none',
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    backgroundColor: '#fdf8f8',
    border: '1px solid #e8d3d4',
    borderRadius: '10px',
    padding: '12px 16px',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: 0,
  },
  fileName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fileSize: {
    fontSize: '11px',
    color: '#999',
    flexShrink: 0,
  },
  removeFileButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    fontSize: '16px',
    flexShrink: 0,
    display: 'flex',
  },

  // ---- notes field ----
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#333',
  },
  textarea: {
    border: '1px solid #e0d3d4',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },

  // ---- footer buttons ----
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '16px 24px 22px 24px',
  },
  cancelButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '8px',
    padding: '10px 18px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
  },
  saveButton: (disabled) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '8px',
    padding: '10px 18px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    backgroundColor: '#7a1f2e',
    color: '#ffffff',
    border: '1px solid #7a1f2e',
    opacity: disabled ? 0.55 : 1,
  }),
};

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function UploadRequirementModal({ requirement, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  if (!requirement) return null;

  const handleFiles = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSave = () => {
    // TODO (Backend): swap this for a real submit, e.g.
    //   POST /api/requirements/{requirement.id}/upload  (multipart/form-data)
    // For now this just hands the local form state back to the parent page.
    onSave({
      requirementId: requirement.id,
      file,
      notes,
    });
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* ================= HEADER ================= */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>Update {requirement.title}</h2>
            <p style={styles.headerSubtitle}>Upload a new file to replace the current submission.</p>
          </div>
          <button type="button" style={styles.closeButton} aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div style={styles.body}>
          {/* ================= FILE DROPZONE ================= */}
          {file ? (
            <div style={styles.filePreview}>
              <div style={styles.fileInfo}>
                <FileIcon style={{ color: '#7a1f2e', flexShrink: 0 }} />
                <span style={styles.fileName}>{file.name}</span>
              </div>
              <span style={styles.fileSize}>{formatBytes(file.size)}</span>
              <button
                type="button"
                style={styles.removeFileButton}
                aria-label="Remove selected file"
                onClick={() => setFile(null)}
              >
                <CloseIcon />
              </button>
            </div>
          ) : (
            <div
              style={styles.dropzone(isDragging)}
              onClick={() => inputRef.current && inputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
            >
              <UploadCloudIcon style={styles.dropzoneIcon} />
              <p style={styles.dropzoneLabel}>Click to upload or drag and drop</p>
              <p style={styles.dropzoneHelper}>PDF, DOC, or DOCX up to 10MB</p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={styles.hiddenInput}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          )}

          {/* ================= NOTES FIELD ================= */}
          <div style={styles.fieldWrapper}>
            <label style={styles.fieldLabel}>Notes (optional)</label>
            <textarea
              style={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any context for the reviewer..."
              rows={3}
            />
          </div>
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div style={styles.footer}>
          <button type="button" style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            style={styles.saveButton(!file)}
            onClick={handleSave}
            disabled={!file}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadRequirementModal;