import React from "react";

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "20px",
  },

  info: {
    flex: 1,
  },

  title: {
    fontWeight: "700",
    color: "#333",
  },

  subtitle: {
    color: "#777",
    fontSize: "13px",
  },

  progressTrack: {
    width: "200px",
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#8b1e2b",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  input: {
    width: "60px",
    textAlign: "center",
    padding: "6px",
  },

  button: {
    padding: "8px 16px",
    border: "1px solid #000",
    background: "#fff",
    cursor: "pointer",
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export default function SlotManagementItem({
  internship,
  draft,
  onDraftChange,
  onStep,
  onUpdate,
  isSaving,
}) {
  const percent =
    internship.slots > 0
      ? Math.min((internship.taken / internship.slots) * 100, 100)
      : 0;

  return (
    <div style={styles.row}>
      <div style={styles.info}>
        <div style={styles.title}>{internship.position}</div>

        <div style={styles.subtitle}>
          {internship.taken} of {internship.slots} slots taken
        </div>
      </div>

      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${percent}%`,
          }}
        />
      </div>

      <div style={styles.controls}>
        <button
          onClick={() => onStep(internship.id, -1)}
          disabled={isSaving}
        >
          −
        </button>

        <input
          type="number"
          value={draft}
          min="0"
          style={styles.input}
          onChange={(e) => onDraftChange(internship.id, e.target.value)}
          disabled={isSaving}
        />

        <button
          onClick={() => onStep(internship.id, 1)}
          disabled={isSaving}
        >
          +
        </button>

        <button
          style={{
            ...styles.button,
            ...(isSaving ? styles.buttonDisabled : {}),
          }}
          onClick={() => onUpdate(internship.id)}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Update"}
        </button>
      </div>
    </div>
  );
}