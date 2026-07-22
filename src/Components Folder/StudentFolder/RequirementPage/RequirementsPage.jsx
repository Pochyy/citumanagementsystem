import React, { useState, useEffect } from 'react';
import RequirementCard from './RequirementCard';
import UploadRequirementModal from './UploadRequirementModal';

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

const API_BASE = "http://localhost:8080";

function getStudentId() {
  return localStorage.getItem("studentId");
}

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
  headerWrapper: { marginBottom: '24px' },
  headerTitleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  headerIcon: { fontSize: '22px', color: '#7a1f2e', flexShrink: 0 },
  headerTitle: { margin: 0, fontSize: '24px', fontWeight: 800, color: '#7a1f2e', letterSpacing: '0.2px' },
  headerSubtitle: { margin: '4px 0 0 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: '#9a9a9a' },
  progressCard: {
    backgroundColor: '#7a1f2e', borderRadius: '14px', padding: '28px 32px',
    color: '#ffffff', marginBottom: '24px', boxShadow: '0 2px 6px rgba(122,31,46,0.25)',
  },
  progressTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' },
  progressTitle: { margin: 0, fontSize: '22px', fontWeight: 800 },
  progressSubtitle: { margin: '4px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.85)' },
  progressPercent: { fontSize: '26px', fontWeight: 800 },
  progressBarTrack: { marginTop: '18px', width: '100%', height: '10px', backgroundColor: '#ffffff', borderRadius: '999px', overflow: 'hidden' },
  progressBarFill: (percent) => ({ height: '100%', width: `${percent}%`, backgroundColor: '#f2867e', borderRadius: '999px', transition: 'width 0.3s ease' }),
  stateText: { color: '#8a8a8a', fontSize: '14px', marginTop: '20px' },
};

function RequirementsPage() {
  const [studentId] = useState(getStudentId());
  const [requirements, setRequirements] = useState([]);
  const [summary, setSummary] = useState({ completedCount: 0, totalCount: 0, percent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRequirement, setEditingRequirement] = useState(null);

  const loadData = () => {
    if (!studentId) {
      setError("No logged-in student found.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`${API_BASE}/api/requirements/student/${studentId}`).then((res) => {
        if (!res.ok) throw new Error("FAILED");
        return res.json();
      }),
      fetch(`${API_BASE}/api/requirements/summary/student/${studentId}`).then((res) => {
        if (!res.ok) throw new Error("FAILED");
        return res.json();
      }),
    ])
      .then(([reqData, summaryData]) => {
        setRequirements(reqData);
        setSummary(summaryData);
      })
      .catch(() => setError("Couldn't load requirements, please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, [studentId]);

  const handleEditRequirement = (requirement) => setEditingRequirement(requirement);
  const handleCloseModal = () => setEditingRequirement(null);

  const handleSaveUpload = ({ requirementId, file, notes }) => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (notes) formData.append("notes", notes);

    fetch(`${API_BASE}/api/requirements/${requirementId}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("UPLOAD_FAILED");
        return res.json();
      })
      .then(() => {
        loadData();
        setEditingRequirement(null);
      })
      .catch(() => {
        alert("Failed to upload requirement. Please try again.");
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          <div style={styles.headerTitleRow}>
            <ClipboardIcon style={styles.headerIcon} aria-hidden="true" />
            <h1 style={styles.headerTitle}>Requirements</h1>
          </div>
          <p style={styles.headerSubtitle}>UPLOAD AND MANAGE YOUR INTERNSHIP REQUIREMENTS</p>
        </div>

        <div style={styles.progressCard}>
          <div style={styles.progressTopRow}>
            <div>
              <h2 style={styles.progressTitle}>Requirements</h2>
              <p style={styles.progressSubtitle}>
                {summary.completedCount} of {summary.totalCount} requirements completed
              </p>
            </div>
            <span style={styles.progressPercent}>{summary.percent}%</span>
          </div>
          <div style={styles.progressBarTrack} role="progressbar" aria-valuenow={summary.percent} aria-valuemin={0} aria-valuemax={100}>
            <div style={styles.progressBarFill(summary.percent)} />
          </div>
        </div>

        {loading && <p style={styles.stateText}>Loading requirements...</p>}
        {!loading && error && <p style={styles.stateText}>{error}</p>}
        {!loading && !error && requirements.length === 0 && (
          <p style={styles.stateText}>No requirements assigned yet.</p>
        )}
        {!loading && !error && requirements.map((requirement) => (
          <RequirementCard
            key={requirement.id}
            requirement={requirement}
            onEdit={handleEditRequirement}
          />
        ))}
      </div>

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