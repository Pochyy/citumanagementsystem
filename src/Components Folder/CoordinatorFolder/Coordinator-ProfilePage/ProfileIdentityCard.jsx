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
  card: {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "36px 28px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
    flex: 1,
    boxSizing: "border-box",
    minHeight: "100%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  avatarWrap: {
    position: "relative",
    marginBottom: "20px",
  },
  avatar: {
    width: "104px",
    height: "104px",
    borderRadius: "50%",
    backgroundColor: colors.maroon,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cameraButton: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: colors.maroon,
    border: "2px solid #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  },
  name: {
    fontSize: "20px",
    fontWeight: 600,
    color: colors.textDark,
    margin: "0 0 8px",
    lineHeight: 1.3,
  },
  nameInput: {
    fontSize: "20px",
    fontWeight: 600,
    color: colors.textDark,
    textAlign: "center",
    border: "none",
    borderBottom: `1px solid ${colors.border}`,
    outline: "none",
    marginBottom: "8px",
    padding: "4px 0",
    width: "100%",
    maxWidth: "240px",
  },
  idText: {
    fontSize: "13px",
    color: colors.textMuted,
    margin: "0 0 18px",
    lineHeight: 1.4,
  },
  statusBadge: {
    fontSize: "12px",
    fontWeight: 600,
    color: colors.statusText,
    backgroundColor: colors.statusBg,
    padding: "7px 16px",
    borderRadius: "999px",
    letterSpacing: "0.02em",
  },
};

export default function ProfileIdentityCard({
  profile,
  isEditing,
  photoUrl,
  fileInputRef,
  onFieldChange,
  onPhotoChange,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" style={styles.avatarImg} />
            ) : (
              <User size={48} color="#fff" />
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
    </div>
  );
}


