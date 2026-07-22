import { Building2, Mail, Phone, User, Users, CheckCircle2, Clock3, XCircle } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#eaeaec",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  chipBg: "#f7f7f8",
  verifiedBg: "#e6f7ec",
  verifiedText: "#22a855",
  pendingBg: "#fdf3e2",
  pendingText: "#c98a1c",
  rejectedBg: "#fbe7e7",
  rejectedText: "#e0392b",
};

// Matches COMPANY.verificationStatus values from the backend entity:
// PENDING_REVIEW | VERIFIED | REJECTED
const statusStyles = {
  VERIFIED: { backgroundColor: colors.verifiedBg, color: colors.verifiedText },
  PENDING_REVIEW: { backgroundColor: colors.pendingBg, color: colors.pendingText },
  REJECTED: { backgroundColor: colors.rejectedBg, color: colors.rejectedText },
};

const STATUS_ICONS = {
  VERIFIED: CheckCircle2,
  PENDING_REVIEW: Clock3,
  REJECTED: XCircle,
};

const styles = {
  detailCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  detailHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" },
  detailLogo: { width: "56px", height: "56px", borderRadius: "12px", backgroundColor: colors.chipBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", whiteSpace: "nowrap" },
  detailName: { fontSize: "17px", fontWeight: 700, color: colors.textDark, margin: 0 },
  detailSub: { fontSize: "13px", color: colors.textMuted, margin: "2px 0 0" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" },
  infoRow: { display: "flex", alignItems: "flex-start", gap: "10px" },
  infoLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  infoValue: { fontSize: "14px", color: colors.textBody, margin: "2px 0 0" },
};

export default function CompanyDetail({ company }) {
  const StatusIcon = STATUS_ICONS[company.verificationStatus] || Clock3;
  const statusStyle = statusStyles[company.verificationStatus] || statusStyles.PENDING_REVIEW;

  return (
    <div style={styles.detailCard}>
      <div style={styles.detailHeader}>
        <div style={styles.detailLogo}>
          <Building2 size={26} color={colors.maroon} />
        </div>
        <div>
          <h2 style={styles.detailName}>{company.companyName}</h2>
          <p style={styles.detailSub}>{company.address}</p>
        </div>
        <span style={{ ...styles.statusBadge, ...statusStyle, marginLeft: "auto" }}>
          <StatusIcon size={12} />
          {company.verificationStatus}
        </span>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoRow}>
          <User size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Contact Person</p>
            <p style={styles.infoValue}>{company.contactPerson}</p>
          </div>
        </div>
        <div style={styles.infoRow}>
          <Mail size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Email</p>
            <p style={styles.infoValue}>{company.email}</p>
          </div>
        </div>
        <div style={styles.infoRow}>
          <Phone size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Contact Number</p>
            <p style={styles.infoValue}>{company.contactNumber}</p>
          </div>
        </div>
        <div style={styles.infoRow}>
          <Users size={16} color={colors.maroon} style={{ marginTop: "2px" }} />
          <div>
            <p style={styles.infoLabel}>Slots</p>
            <p style={styles.infoValue}>{company.slotsFilled}/{company.slotsTotal} filled</p>
          </div>
        </div>
      </div>
    </div>
  );
}