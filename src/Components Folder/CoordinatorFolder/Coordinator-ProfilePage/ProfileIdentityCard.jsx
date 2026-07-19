import { User, Camera } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  cardBg: "#ffffff",
  border: "#e5e5e8",
  textMuted: "#9a9aa2",
  textDark: "#2b2b30",
  statusBg: "#eafbf1",
  statusText: "#1fa971",
};

const styles = {
  card: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "40px 24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  identityCard: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  avatar: { width: "96px", height: "96px", borderRadius: "50%", backgroundColor: colors.maroon, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", overflow: "hidden" },
  avatarWrap: { position: "relative", marginBottom: "18px" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  cameraButton: { position: "absolute", bottom: "2px", right: "2px", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: colors.maroon, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  name: { fontSize: "20px", fontWeight: 600, color: colors.textDark, margin: 0 },
  nameInput: { fontSize: "20px", fontWeight: 600, color: colors.textDark, textAlign: "center", border: "none", borderBottom: `1px solid ${colors.border}`, outline: "none", marginBottom: "6px", padding: "4px 0" },
  idText: { fontSize: "13px", color: colors.textMuted, margin: "8px 0 14px" },
  statusBadge: { fontSize: "12px", fontWeight: 600, color: colors.statusText, backgroundColor: colors.statusBg, padding: "6px 16px", borderRadius: "999px" },
  cardTitle: { color: colors.maroon, fontWeight: 700, fontSize: "15px", margin: "0 0 16px" },
  statRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "12px" },
  statLabel: { color: colors.textMuted },
  statValue: { color: "#000000", fontWeight: 600 },
};

export default function ProfileIdentityCard({
  profile,
  stats,
  isEditing,
  photoUrl,
  fileInputRef,
  onFieldChange,
  onPhotoChange,
}) {
  return (
    <>
      <div style={{ ...styles.card, ...styles.identityCard }}>
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" style={styles.avatarImg} />
            ) : (
              <User size={44} color="#fff" />
            )}
          </div>

          {isEditing && (
            <button
              type="button"
              style={styles.cameraButton}
              onClick={() => fileInputRef.current.click()}
            >
              <Camera size={14} color="#fff" />
            </button>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onPhotoChange}
            style={{ display: "none" }}
          />
        </div>

        {isEditing ? (
          <input
            style={styles.nameInput}
            name="fullName"
            value={profile.fullName}
            onChange={onFieldChange}
          />
        ) : (
          <h2 style={styles.name}>{profile.fullName}</h2>
        )}

        <p style={styles.idText}>ID: {profile.id}</p>
        <span style={styles.statusBadge}>STATUS: {profile.status}</span>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>This Semester Stats</h3>
        <div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Student Handled</span>
            <span style={styles.statValue}>{stats?.studentsHandled ?? 0}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Companies Managed</span>
            <span style={styles.statValue}>{stats?.companiesManaged ?? 0}</span>
          </div>
          <div style={{ ...styles.statRow, marginBottom: 0 }}>
            <span style={styles.statLabel}>Docs Verified</span>
            <span style={styles.statValue}>{stats?.docsVerified ?? 0}</span>
          </div>
        </div>
      </div>
    </>
  );
}