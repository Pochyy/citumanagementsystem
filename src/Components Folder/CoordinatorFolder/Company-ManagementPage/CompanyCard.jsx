import { Building2, Mail, Users, CheckCircle2, Clock3, XCircle } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#eaeaec",
  textLabel: "#8a8a92",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  textMuted: "#9a9aa2",
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
  card: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "18px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "18px", cursor: "pointer" },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", minHeight: "56px" },
  cardTopLeft: { display: "flex", alignItems: "flex-start", gap: "10px" },
  logoBadge: { width: "38px", height: "38px", borderRadius: "8px", backgroundColor: colors.chipBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  companyName: { fontSize: "14px", fontWeight: 600, color: colors.textDark, margin: 0, lineHeight: 1.3 },
  companyAddress: { fontSize: "12px", color: colors.textMuted, margin: "4px 0 0", lineHeight: 1.4 },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", whiteSpace: "nowrap", flexShrink: 0 },
  detailsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  detailChip: { backgroundColor: colors.chipBg, borderRadius: "8px", padding: "10px 12px" },
  detailLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textLabel, fontWeight: 600, margin: 0 },
  detailValue: { fontSize: "12.5px", color: colors.textBody, margin: "5px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
};

export default function CompanyCard({ company, onSelect }) {
  const StatusIcon = STATUS_ICONS[company.verificationStatus] || Clock3;
  const statusStyle = statusStyles[company.verificationStatus] || statusStyles.PENDING_REVIEW;

  return (
    <div style={styles.card} onClick={() => onSelect(company.companyId)}>
      <div style={styles.cardTop}>
        <div style={styles.cardTopLeft}>
          <div style={styles.logoBadge}>
            <Building2 size={18} color={colors.maroon} />
          </div>
          <div>
            <h3 style={styles.companyName}>{company.companyName}</h3>
            <p style={styles.companyAddress}>{company.address}</p>
          </div>
        </div>
        <span style={{ ...styles.statusBadge, ...statusStyle }}>
          <StatusIcon size={12} />
          {company.verificationStatus}
        </span>
      </div>

      <div style={styles.detailsRow}>
        <div style={styles.detailChip}>
          <p style={styles.detailLabel}><Users size={12} />Slots</p>
          <p style={styles.detailValue}>{company.slotsFilled}/{company.slotsTotal} filled</p>
        </div>
        <div style={styles.detailChip}>
          <p style={styles.detailLabel}><Mail size={12} />Contact</p>
          <p style={styles.detailValue}>{company.email}</p>
        </div>
      </div>
    </div>
  );
}
