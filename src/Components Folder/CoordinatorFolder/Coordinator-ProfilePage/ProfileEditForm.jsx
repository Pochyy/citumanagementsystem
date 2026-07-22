const colors = {
  maroon: "#7a1f2b",
  border: "#e5e5e8",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  fieldLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    color: colors.textMuted,
    fontWeight: 500,
  },
  fieldInput: {
    width: "100%",
    fontSize: "14px",
    color: colors.textBody,
    border: "none",
    borderBottom: `1px solid ${colors.border}`,
    outline: "none",
    padding: "6px 0",
    boxSizing: "border-box",
    backgroundColor: "transparent",
  },
  saveButton: {
    width: "100%",
    backgroundColor: colors.maroon,
    color: "#fff",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "4px",
  },
};

export default function ProfileEditForm({ profile, onFieldChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div style={styles.fieldWrap}>
        <label style={styles.fieldLabel}>Email Address</label>
        <input style={styles.fieldInput} name="email" value={profile.email} onChange={onFieldChange} />
      </div>
      <div style={styles.fieldWrap}>
        <label style={styles.fieldLabel}>Address</label>
        <input style={styles.fieldInput} name="address" value={profile.address} onChange={onFieldChange} />
      </div>
      <div style={styles.fieldWrap}>
        <label style={styles.fieldLabel}>Phone Number</label>
        <input style={styles.fieldInput} name="phone" value={profile.phone} onChange={onFieldChange} />
      </div>
      <div style={styles.fieldWrap}>
        <label style={styles.fieldLabel}>Department</label>
        <input style={styles.fieldInput} name="department" value={profile.department} onChange={onFieldChange} />
      </div>
      <div style={styles.fieldWrap}>
        <label style={styles.fieldLabel}>Office Hours</label>
        <input style={styles.fieldInput} name="officeHours" value={profile.officeHours} onChange={onFieldChange} />
      </div>

      <button type="submit" style={styles.saveButton}>
        Save Changes
      </button>
    </form>
  );
}
