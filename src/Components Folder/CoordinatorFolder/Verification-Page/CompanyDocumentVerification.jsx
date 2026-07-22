import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, FileText } from "lucide-react";
import { useVerificationData } from "./VerificationContext";


const colors = {
  maroon: "#7a1f2b",
  maroonDark: "#5e1720",
  orange: "#e8a24a",
  bg: "#f7f7f8",
  cardBg: "#ffffff",
  border: "#eaeaec",
  headerBorder: "#f1f1f2",
  textMuted: "#9a9aa2",
  textLabel: "#8a8a92",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  verifiedBg: "#e6f7ec",
  verifiedText: "#22a855",
  pendingBg: "#fdf3dd",
  pendingText: "#b8860b",
  rejectedBg: "#fbe7e7",
  rejectedText: "#e0392b",
};

const statusStyles = {
  Verified: { backgroundColor: colors.verifiedBg, color: colors.verifiedText },
  Pending: { backgroundColor: colors.pendingBg, color: colors.pendingText },
  Rejected: { backgroundColor: colors.rejectedBg, color: colors.rejectedText },
};

const styles = {
  page: { width: "100%", minHeight: "100%", backgroundColor: colors.bg, fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px", boxSizing: "border-box" },
  banner: { background: `linear-gradient(120deg, ${colors.maroonDark} 0%, ${colors.maroon} 55%, ${colors.orange} 100%)`, borderRadius: "12px", padding: "24px 28px", display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" },
  backButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", flexShrink: 0 },
  bannerTitle: { color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 },
  bannerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: "4px 0 0" },
  tableCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: colors.textLabel, fontWeight: 600, padding: "14px 16px", backgroundColor: "#fafafb", borderBottom: `1px solid ${colors.headerBorder}` },
  td: { padding: "14px 16px", fontSize: "13px", color: colors.textBody, borderBottom: `1px solid ${colors.headerBorder}`, verticalAlign: "middle" },
  nameCell: { color: colors.textDark, fontWeight: 600 },
  statusBadge: { display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px" },
  actionsCell: { display: "flex", gap: "14px" },
  actionLink: (color) => ({ color, fontSize: "12px", fontWeight: 700, cursor: "pointer", background: "none", border: "none", padding: 0 }),
  emptyRow: { padding: "32px 16px", textAlign: "center", color: colors.textMuted, fontSize: "13px" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px", boxSizing: "border-box" },
  modal: { width: "480px", maxWidth: "90%", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 12px 40px rgba(0,0,0,0.25)", overflow: "hidden" },
  modalHead: { backgroundColor: colors.maroon, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  modalHeadLeft: { display: "flex", alignItems: "center", gap: "10px" },
  modalHeadText: { color: "#fff", fontWeight: 700, fontSize: "15px" },
  modalBody: { padding: "24px 26px 28px" },
  docTitle: { color: colors.maroon, fontSize: "16px", fontWeight: 800, margin: "0 0 4px" },
  docMeta: { color: colors.textMuted, fontSize: "12px", marginBottom: "16px" },
  docContent: { borderTop: "1px dashed #ddd", paddingTop: "16px", color: "#333", fontSize: "14px", lineHeight: 1.7, whiteSpace: "pre-line" },
  closeFooterBtn: { marginTop: "22px", display: "flex", justifyContent: "flex-end" },
  closeBtn: { backgroundColor: colors.maroon, color: "#fff", border: "none", borderRadius: "6px", padding: "9px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer" },
};

function VerificationModal({ doc, onClose }) {
  if (!doc) return null;
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHead}>
          <div style={styles.modalHeadLeft}>
            <FileText size={20} color="#fff" />
            <span style={styles.modalHeadText}>Submitted Document</span>
          </div>
          <X size={20} color="#fff" style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
        <div style={styles.modalBody}>
          <h3 style={styles.docTitle}>{doc.document}</h3>
          <p style={styles.docMeta}>
            {doc.company} &middot; Submitted {doc.submitted}
          </p>
          <div style={styles.docContent}>{doc.content}</div>
          <div style={styles.closeFooterBtn}>
            <button style={styles.closeBtn} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompanyDocumentVerification() {
  const navigate = useNavigate();
  const { companyDocs: docs, updateCompanyDocStatus: updateStatus } = useVerificationData();
  const [viewingDoc, setViewingDoc] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <button style={styles.backButton} onClick={() => navigate("/Page/Verification/DocumentVerification")}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={styles.bannerTitle}>Company Document Verification</h1>
          <p style={styles.bannerSubtitle}>Review and approve submitted documents</p>
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Document</th>
              <th style={styles.th}>Submitted</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 ? (
              <tr>
                <td style={styles.emptyRow} colSpan={5}>No company documents available yet.</td>
              </tr>
            ) : (
              docs.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ ...styles.td, ...styles.nameCell }}>{doc.company}</td>
                  <td style={styles.td}>{doc.document}</td>
                  <td style={styles.td}>{doc.submitted}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, ...statusStyles[doc.status] }}>{doc.status}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionsCell}>
                      <button style={styles.actionLink(colors.maroon)} onClick={() => setViewingDoc(doc)}>
                        View
                      </button>
                      {doc.status === "Pending" && (
                        <>
                          <button style={styles.actionLink(colors.verifiedText)} onClick={() => updateStatus(doc.id, "Verified")}>
                            Approve
                          </button>
                          <button style={styles.actionLink(colors.rejectedText)} onClick={() => updateStatus(doc.id, "Rejected")}>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <VerificationModal doc={viewingDoc} onClose={() => setViewingDoc(null)} />
    </div>
  );
}
