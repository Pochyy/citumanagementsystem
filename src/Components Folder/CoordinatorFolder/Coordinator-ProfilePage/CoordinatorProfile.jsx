import { useState, useEffect, useRef } from "react";
import { User, Pencil, Mail, MapPin, Phone, Building2, Clock, Camera } from "lucide-react";

const colors = {
  maroon: "#7a1f2b",
  bg: "#f7f7f8",
  cardBg: "#ffffff",
  border: "#e5e5e8",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
  textDark: "#2b2b30",
  statusBg: "#eafbf1",
  statusText: "#1fa971",
};

const styles = {
  page: { width: "100%", minHeight: "100vh", backgroundColor: colors.bg, padding: "24px", boxSizing: "border-box", fontFamily: "'Segoe UI', Arial, sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  headerTitle: { fontSize: "20px", fontWeight: 700, color: colors.maroon, margin: 0, lineHeight: 1.2 },
  headerSubtitle: { fontSize: "12px", color: colors.textMuted, margin: "2px 0 0" },
  editButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: colors.maroon, color: "#fff", border: "none", fontSize: "14px", fontWeight: 500, padding: "8px 16px", borderRadius: "6px", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: "20px" },
  column: { display: "flex", flexDirection: "column", gap: "20px" },
  card: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  identityCard: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  avatar: { width: "64px", height: "64px", borderRadius: "50%", backgroundColor: colors.maroon, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", overflow: "hidden" },
  avatarWrap: { position: "relative", marginBottom: "12px" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  cameraButton: { position: "absolute", bottom: "0", right: "0", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: colors.maroon, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  name: { fontSize: "16px", fontWeight: 600, color: colors.textDark, margin: 0 },
  nameInput: { fontSize: "16px", fontWeight: 600, color: colors.textDark, textAlign: "center", border: "none", borderBottom: `1px solid ${colors.border}`, outline: "none", marginBottom: "4px", padding: "2px 0" },
  idText: { fontSize: "12px", color: colors.textMuted, margin: "6px 0 10px" },
  statusBadge: { fontSize: "11px", fontWeight: 600, color: colors.statusText, backgroundColor: colors.statusBg, padding: "4px 12px", borderRadius: "999px" },
  cardTitle: { color: colors.maroon, fontWeight: 700, fontSize: "15px", margin: "0 0 16px" },
  statRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "12px" },
  statLabel: { color: colors.textMuted },
  statValue: { color: "#000000", fontWeight: 600 },
  infoRow: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" },
  infoLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, margin: 0 },
  infoValue: { fontSize: "14px", color: colors.textBody, margin: "2px 0 0" },
  fieldWrap: { marginBottom: "16px" },
  fieldLabel: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.03em", color: colors.textMuted, fontWeight: 500, display: "block", marginBottom: "4px" },
  fieldInput: { width: "100%", fontSize: "14px", color: colors.textBody, border: "none", borderBottom: `1px solid ${colors.border}`, outline: "none", padding: "4px 0", boxSizing: "border-box" },
  saveButton: { width: "100%", backgroundColor: colors.maroon, color: "#fff", border: "none", fontSize: "14px", fontWeight: 500, padding: "10px", borderRadius: "6px", cursor: "pointer", marginTop: "8px" },
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

export default function CoordinatorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "Marc Wayne",
    id: "2010-44405",
    status: "ACTIVE",
    email: "info@ojtcitu.edu",
    address: "Cebu City, Philippines",
    phone: "+63 917 123 4567",
    department: "College of Computer Studies",
    officeHours: "Mon–Fri, 9:00 AM – 5:00 PM",
  });

  const [stats, setStats] = useState({
    studentsHandled: 89,
    companiesManaged: 35,
    docsVerified: 156,
  });

  const [academic, setAcademic] = useState({
    program: "Bachelor of Science in Information Technology",
    yearAssigned: "2024 – 2025",
    campus: "CIT-U Main Campus",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/coordinator")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setStats(data.stats);
        setAcademic(data.academic);
      })
      .catch((err) => {
        console.log("Error fetching coordinator profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);

    // To upload to the backend once ready, something like:
    // const formData = new FormData();
    // formData.append("photo", file);
    // fetch("http://localhost:8080/api/coordinator/photo", { method: "POST", body: formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/coordinator", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile saved:", data);
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <User size={24} color={colors.maroon} />
          <div>
            <h1 style={styles.headerTitle}>Coordinator Profile</h1>
            <p style={styles.headerSubtitle}>Manage your personal information</p>
          </div>
        </div>

        <button style={styles.editButton} onClick={() => setIsEditing((prev) => !prev)}>
          <Pencil size={16} />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.column}>
          <div style={{ ...styles.card, ...styles.identityCard }}>
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" style={styles.avatarImg} />
                ) : (
                  <User size={32} color="#fff" />
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  style={styles.cameraButton}
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera size={12} color="#fff" />
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </div>

            {isEditing ? (
              <input
                style={styles.nameInput}
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
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
                <span style={styles.statValue}>{stats.studentsHandled}</span>
              </div>
              <div style={styles.statRow}>
                <span style={styles.statLabel}>Companies Managed</span>
                <span style={styles.statValue}>{stats.companiesManaged}</span>
              </div>
              <div style={{ ...styles.statRow, marginBottom: 0 }}>
                <span style={styles.statLabel}>Docs Verified</span>
                <span style={styles.statValue}>{stats.docsVerified}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.column}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Contact &amp; Office Information</h3>

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div style={styles.fieldWrap}>
                  <label style={styles.fieldLabel}>Email Address</label>
                  <input style={styles.fieldInput} name="email" value={profile.email} onChange={handleChange} />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.fieldLabel}>Address</label>
                  <input style={styles.fieldInput} name="address" value={profile.address} onChange={handleChange} />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.fieldLabel}>Phone Number</label>
                  <input style={styles.fieldInput} name="phone" value={profile.phone} onChange={handleChange} />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.fieldLabel}>Department</label>
                  <input style={styles.fieldInput} name="department" value={profile.department} onChange={handleChange} />
                </div>
                <div style={{ ...styles.fieldWrap, marginBottom: 0 }}>
                  <label style={styles.fieldLabel}>Office Hours</label>
                  <input style={styles.fieldInput} name="officeHours" value={profile.officeHours} onChange={handleChange} />
                </div>

                <button type="submit" style={styles.saveButton}>
                  Save Changes
                </button>
              </form>
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
        </div>
      </div>
    </div>
  );
}