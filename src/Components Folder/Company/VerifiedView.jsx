import React from "react";

export default function VerifiedView({ data }) {
  return (
    <div className="verification-form__card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, color: "var(--maroon)" }}>Verification status</h2>
        <span
          style={{
            background: "var(--gold)",
            color: "#4a3400",
            padding: "7px 16px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.85rem",
          }}
        >
          ✓ Verified
        </span>
      </div>
      <p style={{ color: "var(--ink-faint)", marginTop: 16 }}>
        Verified on {new Date(data.reviewedDate).toLocaleDateString()}
      </p>
    </div>
  );
}
