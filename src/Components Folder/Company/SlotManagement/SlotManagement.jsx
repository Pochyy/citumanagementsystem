import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SlotManagementItem from "./SlotManagementItem";
import { fetchInternshipById, updateInternshipSlots } from "../Internship/internshipApi";

const styles = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    padding: "35px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  backLink: {
    color: "#8b1e2b",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "20px",
    display: "inline-block",
  },

  summaryRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    flex: 1,
    background: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },

  label: {
    color: "#777",
    fontSize: "14px",
  },

  value: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#8b1e2b",
  },

  title: {
    color: "#8b1e2b",
    marginBottom: "20px",
  },

  emptyState: {
    color: "#777",
  },

  errorText: {
    color: "#b3261e",
    marginBottom: "15px",
  },

  savedText: {
    color: "#067647",
    fontSize: "13px",
    marginTop: "-10px",
    marginBottom: "20px",
  },

  promptBox: {
    color: "#666",
  },

  promptLink: {
    color: "#8b1e2b",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default function SlotManagementPage() {
  const { internshipId } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null); // { id, position, taken, slots }
  const [draft, setDraft] = useState(0);
  const [loading, setLoading] = useState(Boolean(internshipId));
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!internshipId) {
      setInternship(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setJustSaved(false);
      try {
        const data = await fetchInternshipById(internshipId);
        if (cancelled) return;

        // "taken" isn't tracked separately on the backend yet - applicationsCount
        // is total applications received, not confirmed/accepted slots filled.
        // Used here only as an approximate fill indicator.
        const mapped = {
          id: data.id,
          position: data.positionTitle,
          slots: data.availableSlots ?? 0,
          taken: Math.min(data.applicationsCount ?? 0, data.availableSlots ?? 0),
        };
        setInternship(mapped);
        setDraft(mapped.slots);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load this internship.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [internshipId]);

  const handleDraftChange = (_id, value) => {
    setDraft(Math.max(0, Number(value) || 0));
    setJustSaved(false);
  };

  const handleStep = (_id, amount) => {
    setDraft((prev) => Math.max(0, prev + amount));
    setJustSaved(false);
  };

  const handleUpdate = async (_id) => {
    if (!internship) return;
    setIsSaving(true);
    setError(null);
    setJustSaved(false);
    try {
      const updated = await updateInternshipSlots(internship.id, draft);
      setInternship((prev) => ({
        ...prev,
        slots: updated.availableSlots ?? draft,
        taken: Math.min(prev.taken, updated.availableSlots ?? draft),
      }));
      setJustSaved(true);
    } catch (err) {
      setError(err.message || "Failed to update slots.");
    } finally {
      setIsSaving(false);
    }
  };

  // Landed on /component-6 directly (e.g. sidebar link), no specific internship chosen.
  if (!internshipId) {
    return (
      <div style={styles.page}>
        <h2 style={styles.title}>Slots by Internship</h2>
        <p style={styles.promptBox}>
          Pick an internship from{" "}
          <span
            style={styles.promptLink}
            onClick={() => navigate("/component-3")}
          >
            Internship Listings
          </span>{" "}
          to manage its slots.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <span style={styles.backLink} onClick={() => navigate("/component-3")}>
        ← Back to Internship Listings
      </span>

      {loading && <p style={{ color: "#666" }}>Loading...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      {!loading && internship && (
        <>
          <div style={styles.summaryRow}>
            <div style={styles.card}>
              <div style={styles.label}>Total Slots</div>
              <div style={styles.value}>{internship.slots}</div>
            </div>

            <div style={styles.card}>
              <div style={styles.label}>Slots Remaining</div>
              <div style={styles.value}>
                {Math.max(internship.slots - internship.taken, 0)}
              </div>
            </div>
          </div>

          <h2 style={styles.title}>Slots by Internship</h2>

          <SlotManagementItem
            internship={internship}
            draft={draft}
            onDraftChange={handleDraftChange}
            onStep={handleStep}
            onUpdate={handleUpdate}
            isSaving={isSaving}
          />

          {justSaved && <p style={styles.savedText}>Saved ✓</p>}
        </>
      )}

      {!loading && !error && !internship && (
        <p style={styles.emptyState}>No internship found.</p>
      )}
    </div>
  );
}