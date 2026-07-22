import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ChevronRight } from "lucide-react";
import { useVerificationData } from "./VerificationContext";

const colors = {
  maroon: "#7a1f2b",
  maroonDark: "#5e1720",
  orange: "#e8a24a",
  green: "#22a855",
  cardBg: "#ffffff",
  textMuted: "#6b6b72",
  textDark: "#2b2b30",
};

const styles = {
  page: {
    width: "100%",
    minHeight: "100%",
    background: "linear-gradient(160deg, #7a1f2b 0%, #b23f41 30%, #db5558 55%, #f1b82d 100%)",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: "36px 40px",
    boxSizing: "border-box",
  },
  header: { marginBottom: "28px" },
  title: { color: "#fff", fontSize: "26px", fontWeight: 700, margin: 0 },
  subtitle: { color: "rgba(255,255,255,0.9)", fontSize: "14px", margin: "4px 0 0" },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "24px",
  },
  selectCard: {
    backgroundColor: colors.cardBg,
    borderRadius: "14px",
    padding: "36px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  iconWrap: {
    width: "72px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
  },
  cardTitle: { fontSize: "20px", fontWeight: 700, color: colors.maroon, margin: "0 0 10px" },
  cardDesc: { fontSize: "13px", color: colors.textMuted, lineHeight: 1.6, margin: "0 0 26px", maxWidth: "320px" },
  cardLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: colors.maroon,
    fontSize: "14px",
    fontWeight: 700,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  statCard: {
    backgroundColor: colors.cardBg,
    borderRadius: "12px",
    padding: "24px 16px",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  statNumber: (color) => ({ fontSize: "30px", fontWeight: 800, color, margin: 0 }),
  statLabel: { fontSize: "13px", color: colors.textDark, marginTop: "8px" },
};

export default function DocumentVerification() {
  const navigate = useNavigate();
  const {
    studentPendingCount,
    studentVerifiedCount,
    companyPendingCount,
    companyVerifiedCount,
  } = useVerificationData();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Document Verification</h1>
        <p style={styles.subtitle}>Select the type of documents you want to verify</p>
      </div>

      <div style={styles.cardGrid}>
        <div
          style={styles.selectCard}
          onClick={() => navigate("/Page/Verification/StudentRequirmentVerification")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={styles.iconWrap}>
            <GraduationCap size={56} color={colors.textDark} strokeWidth={1.5} />
          </div>
          <h2 style={styles.cardTitle}>Student Requirements</h2>
          <p style={styles.cardDesc}>
            Review endorsement letters, consent forms, medical certificates, and other
            student-submitted documents
          </p>
          <span style={styles.cardLink}>
            View Student Docs <ChevronRight size={16} />
          </span>
        </div>

        <div
          style={styles.selectCard}
          onClick={() => navigate("/Page/Verification/CompanyDocumentVerification")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={styles.iconWrap}>
            <Building2 size={56} color={colors.textDark} strokeWidth={1.5} />
          </div>
          <h2 style={styles.cardTitle}>Company Requirements</h2>
          <p style={styles.cardDesc}>
            Review MOAs, business permits, accreditation letters, and training plans from
            partner companies
          </p>
          <span style={styles.cardLink}>
            View Company Docs <ChevronRight size={16} />
          </span>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statNumber(colors.maroon)}>{studentPendingCount}</p>
          <p style={styles.statLabel}>Student Docs Pending</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber(colors.green)}>{studentVerifiedCount}</p>
          <p style={styles.statLabel}>Student Docs Verified</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber(colors.maroon)}>{companyPendingCount}</p>
          <p style={styles.statLabel}>Company Docs Pending</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber(colors.green)}>{companyVerifiedCount}</p>
          <p style={styles.statLabel}>Company Docs Verified</p>
        </div>
      </div>
    </div>
  );
}
