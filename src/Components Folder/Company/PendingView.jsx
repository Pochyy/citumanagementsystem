import React from "react";

export default function PendingView({ data }) {
  return (
    <div className="verification-form__success">
      <div className="verification-form__success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h2>Submitted for review</h2>
      <p>
        Submitted on {new Date(data.submittedDate).toLocaleDateString()}. This usually takes
        2–3 business days to review.
      </p>
    </div>
  );
}
