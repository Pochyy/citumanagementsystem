import React from "react";

const statusStyles = {
  Issued: { bg: "#dcfce7", color: "#15803d" },
  Pending: { bg: "#fef9c3", color: "#a16207" },
};


export default function IssuedCertificates({ certificates, onDownload }) {
  return (
    <div className="certificates__card">
      <h2 className="certificates__card-title">Issued certificates</h2>

      {certificates.length === 0 ? (
        <p style={{ color: "#9aa0aa", fontSize: "0.85rem" }}>
          No certificates issued yet.
        </p>
      ) : (
        <div className="certificates__issued-list">
          {certificates.map((cert) => {
            const style = statusStyles[cert.status] || statusStyles.Pending;
            const canDownload = cert.status === "Issued" && cert.dataUrl;

            return (
              <div className="certificates__issued-item" key={cert.id}>
                <div>
                  <p className="certificates__issued-name">{cert.name}</p>
                  <p className="certificates__issued-detail">{cert.detail}</p>
                </div>
                <div className="certificates__issued-right">
                  <span
                    className="certificates__status-pill"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {cert.status}
                  </span>
                  <button
                    className="certificates__icon-btn"
                    type="button"
                    aria-label="Download"
                    disabled={!canDownload}
                    style={!canDownload ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
                    onClick={() => canDownload && onDownload(cert)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
