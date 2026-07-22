import { useState, useEffect, useRef } from "react";
import { User, Pencil } from "lucide-react";
import ProfileIdentityCard from "./ProfileIdentityCard";
import ProfileDetailsCard from "./ProfileDetailsCard";

const colors = {
  maroon: "#7a1f2b",
  bg: "#f7f7f8",
};

const styles = {
  page: {
    width: "100%",
    height: "100%",
    // Fills MotherScreen's white panel (header 120px, panel ~95% of remaining height)
    minHeight: "calc((100vh - 120px) * 0.95)",
    backgroundColor: colors.bg,
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: colors.maroon,
    margin: 0,
    lineHeight: 1.2,
  },
  headerSubtitle: {
    fontSize: "12px",
    color: "#9a9aa2",
    margin: "2px 0 0",
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: colors.maroon,
    color: "#fff",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 0.9fr) minmax(0, 1.4fr)",
    gap: "16px",
    alignItems: "stretch",
    flex: 1,
    minHeight: 0,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
    minHeight: 0,
    height: "100%",
  },
  identityColumn: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
    height: "100%",
    alignSelf: "stretch",
  },
};


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

  const [academic, setAcademic] = useState({
    program: "Bachelor of Science in Information Technology",
    yearAssigned: "2024 – 2025",
    campus: "CIT-U Main Campus",
  });

  const [activities, setActivities] = useState([
    { id: 1, type: "verified", actor: "You", action: "verified a document for Mark Villaceran", timeAgo: "2 hours ago" },
    { id: 2, type: "student", actor: "You", action: "added Jose Adiawan to Globe Telecom", timeAgo: "5 hours ago" },
    { id: 3, type: "company", actor: "PLDT", action: "submitted a partnership application", timeAgo: "Yesterday" },
    { id: 4, type: "completed", actor: "Maria Marie", action: "completed her OJT hours", timeAgo: "2 days ago" },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/api/coordinator")
      .then((res) => res.json())
      .then((data) => {
        if (data?.profile) {
          setProfile((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(data.profile).filter(([, value]) => value != null && value !== "")
            ),
          }));
        }

        if (data?.academic) {
          setAcademic((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(data.academic).filter(([, value]) => value != null && value !== "")
            ),
          }));
        }
      })
      .catch((err) => {
        console.log("Error fetching coordinator profile:", err);
      });

    fetch("http://localhost:8080/api/coordinator/activity")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setActivities(data);
        }
      })
      .catch((err) => {
        console.log("Error fetching recent activity:", err);
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
        <div style={styles.identityColumn}>
          <ProfileIdentityCard
            profile={profile}
            isEditing={isEditing}
            photoUrl={photoUrl}
            fileInputRef={fileInputRef}
            onFieldChange={handleChange}
            onPhotoChange={handlePhotoChange}
          />
        </div>

        <div style={styles.column}>
          <ProfileDetailsCard
            profile={profile}
            academic={academic}
            isEditing={isEditing}
            onFieldChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
