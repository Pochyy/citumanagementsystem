import { Mail, MapPin, Phone, Building2, Clock } from "lucide-react";
import ProfileEditForm from "./ProfileEditForm";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#e5e5e8",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
};

const styles = {
  card: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  cardTitle: { color: colors.maroon, fontWeight: 700, fontSize: "15px", margin: "0 0 16px" },
  infoRow: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" },
  infoLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  infoValue: { fontSize: "14px", color: colors.textBody, margin: "2px 0 0" },
  academicRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px", gap: "12px" },
  academicLabel: { color: colors.textMuted, flexShrink: 0 },
  academicValue: { color: colors.textDark, fontWeight: 500, textAlign: "right" },
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div style={styles.infoRow}>
      <Icon size={16} color={colors.maroon} style={{ marginTop: "2px", flexShrink: 0 }} />
      <div>
        <p style={styles.infoLabel}>{label}</p>
        <p style={styles.infoValue}>{value}</p>
      </div>
    </div>
  );
}

export default function ProfileDetailsCard({ profile, academic, isEditing, onFieldChange, onSubmit }) {
  return (
    <>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Contact &amp; Office Information</h3>

        {isEditing ? (
          <ProfileEditForm profile={profile} onFieldChange={onFieldChange} onSubmit={onSubmit} />
        ) : (
          <div>
            <InfoRow icon={Mail} label="Email Address" value={profile.email} />
            <InfoRow icon={MapPin} label="Address" value={profile.address} />
            <InfoRow icon={Phone} label="Phone Number" value={profile.phone} />
            <InfoRow icon={Building2} label="Department" value={profile.department} />
            <InfoRow icon={Clock} label="Office Hours" value={profile.officeHours} />
          </div>
        )}
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Academic Information</h3>
        <div>
          <div style={styles.academicRow}>
            <span style={styles.academicLabel}>Program</span>
            <span style={styles.academicValue}>{academic.program}</span>
          </div>
          <div style={styles.academicRow}>
            <span style={styles.academicLabel}>Year Assigned</span>
            <span style={styles.academicValue}>{academic.yearAssigned}</span>
          </div>
          <div style={{ ...styles.academicRow, marginBottom: 0 }}>
            <span style={styles.academicLabel}>Campus</span>
            <span style={styles.academicValue}>{academic.campus}</span>
          </div>
        </div>
      </div>
    </>
  );
}
