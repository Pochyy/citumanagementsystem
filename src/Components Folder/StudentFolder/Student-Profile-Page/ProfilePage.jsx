  import React, { useState, useEffect } from "react";

  // ------------------------------------------------------------------
  // Reusable style objects
  // ------------------------------------------------------------------

  const colors = {
    maroon: "#7a1f1f",
    maroonDark: "#6b1a1a",
    greyPanel: "#e7e5e3",
    greyBorder: "#d3d1cf",
    inputBg: "#f4f3f2",
    textDark: "#3a2a2a",
    textMuted: "#8a8785",
    green: "#3a9d4f",
    white: "#ffffff",
  };

  const pageStyle = {
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: colors.white,
    minHeight: "100vh",
    padding: "24px 32px",
    color: colors.textDark,
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "16px",
  };

  const headerLeftStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  };

  const headerTitleGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const pageTitleStyle = {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: colors.maroon,
    lineHeight: 1.2,
  };

  const pageSubtitleStyle = {
    margin: "2px 0 0 0",
    fontSize: "11px",
    letterSpacing: "1px",
    color: colors.textMuted,
    fontWeight: 600,
  };

  const editButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: colors.maroon,
    color: colors.white,
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const layoutStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  };

  const leftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "220px",
    flexShrink: 0,
  };

  const rightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    flex: 1,
    minWidth: "300px",
  };

  const panelStyle = {
    backgroundColor: colors.greyPanel,
    borderRadius: "8px",
    padding: "24px",
    boxSizing: "border-box",
  };

  const profileCardStyle = {
    ...panelStyle,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "28px",
    paddingBottom: "28px",
  };

  const avatarCircleStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: colors.maroon,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  };

  const studentNameStyle = {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
    color: colors.maroon,
  };

  const studentIdStyle = {
    margin: "4px 0 0 0",
    fontSize: "11px",
    letterSpacing: "0.5px",
    color: colors.textMuted,
    fontWeight: 600,
  };

  const statusBadgeStyle = {
    marginTop: "14px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: colors.green,
  };

  const statsPanelStyle = {
    ...panelStyle,
    minHeight: "80px",
  };

  const sectionTitleStyle = {
    margin: "0 0 20px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: colors.maroon,
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "24px",
    rowGap: "16px",
  };

  const fieldGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const fieldGroupFullWidthStyle = {
    ...fieldGroupStyle,
    gridColumn: "1 / -1",
  };

  const labelStyle = {
    fontSize: "12px",
    color: colors.textMuted,
    marginBottom: "6px",
    fontWeight: 500,
  };

  const inputStyle = {
    backgroundColor: colors.inputBg,
    border: `1px solid ${colors.greyBorder}`,
    borderRadius: "5px",
    padding: "10px 12px",
    fontSize: "13px",
    color: colors.textDark,
    width: "100%",
    boxSizing: "border-box",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000,
    boxSizing: "border-box",
  };

  const modalCardStyle = {
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "28px 32px",
    width: "100%",
    maxWidth: "560px",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
    boxSizing: "border-box",
  };

  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const modalTitleStyle = {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: colors.maroon,
  };

  const modalCloseButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: colors.textMuted,
    lineHeight: 1,
    padding: "4px",
  };

  const modalSectionLabelStyle = {
    fontSize: "13px",
    fontWeight: 700,
    color: colors.maroon,
    margin: "18px 0 12px 0",
  };

  const modalEditableInputStyle = {
    ...inputStyle,
    backgroundColor: colors.white,
    border: `1px solid ${colors.greyBorder}`,
  };

  const modalFooterStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "26px",
  };

  const modalCancelButtonStyle = {
    backgroundColor: colors.white,
    color: colors.textDark,
    border: `1px solid ${colors.greyBorder}`,
    borderRadius: "6px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const modalSaveButtonStyle = {
    backgroundColor: colors.maroon,
    color: colors.white,
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const errorTextStyle = {
    color: "#b3261e",
    fontSize: "13px",
    margin: "0 0 16px 0",
  };

  const disabledButtonStyle = {
    opacity: 0.6,
    cursor: "not-allowed",
  };

  // ------------------------------------------------------------------
  // API helpers
  // ------------------------------------------------------------------

  const API_BASE = "http://localhost:8080/api/students";

  async function fetchStudentProfile(studentId) {
    const response = await fetch(`${API_BASE}/${studentId}`);
    if (!response.ok) {
      throw new Error("Failed to load student profile");
    }
    return response.json();
  }

  async function saveStudentProfile(studentId, payload) {
    const response = await fetch(`${API_BASE}/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to save profile changes");
    }
    return response.json();
  }

  // Splits "Juan Dela Cruz" -> { firstName: "Juan", lastName: "Dela Cruz" }.
  // NOTE: naive split on the first space - fine for most names, but doesn't
  // know about middle names/suffixes. Replace with separate first/last
  // inputs in the modal if that precision matters.
  function splitFullName(fullName) {
    const trimmed = (fullName || "").trim();
    const firstSpaceIndex = trimmed.indexOf(" ");
    if (firstSpaceIndex === -1) {
      return { firstName: trimmed, lastName: "" };
    }
    return {
      firstName: trimmed.slice(0, firstSpaceIndex),
      lastName: trimmed.slice(firstSpaceIndex + 1),
    };
  }

  // ------------------------------------------------------------------
  // Component
  // ------------------------------------------------------------------

  export default function ProfilePage() {
    // ASSUMPTION: studentId is stored in localStorage after login.
    // Confirm this matches your actual login flow (AuthController/AuthService)
    // and swap this line if it stores the id under a different key or shape.
    const studentId = localStorage.getItem("studentId");

    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      program: "",
      yearLevel: "",
      department: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    useEffect(() => {
      if (!studentId) {
        setLoadError("No logged-in student found.");
        setIsLoading(false);
        return;
      }

      let isCancelled = false;

      async function loadProfile() {
        try {
          setIsLoading(true);
          setLoadError(null);
          const data = await fetchStudentProfile(studentId);
          if (!isCancelled) {
            setStudent(data);
          }
        } catch (err) {
          if (!isCancelled) {
            setLoadError(err.message);
          }
        } finally {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      }

      loadProfile();

      return () => {
        isCancelled = true;
      };
    }, [studentId]);

    const handleFieldChange = (field) => (event) => {
      setFormValues((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

    const openEditModal = () => {
      if (!student) return;
      setFormValues({
        fullName: student.fullName || "",
        email: student.email || "",
        phoneNumber: student.phoneNumber || "",
        dateOfBirth: student.dateOfBirth || "",
        address: student.address || "",
        program: student.program || "",
        yearLevel: student.yearLevel || "",
        department: student.department || "",
      });
      setSaveError(null);
      setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
      if (isSaving) return; // don't let a backdrop click interrupt a save in flight
      setIsEditModalOpen(false);
    };

    const handleSaveChanges = async () => {
      const { firstName, lastName } = splitFullName(formValues.fullName);

      const payload = {
        firstName,
        lastName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        dateOfBirth: formValues.dateOfBirth || null,
        address: formValues.address,
        program: formValues.program,
        yearLevel: formValues.yearLevel,
        department: formValues.department,
      };

      try {
        setIsSaving(true);
        setSaveError(null);
        const updated = await saveStudentProfile(studentId, payload);
        setStudent(updated);
        setIsEditModalOpen(false);
      } catch (err) {
        setSaveError(err.message);
      } finally {
        setIsSaving(false);
      }
    };

    if (isLoading) {
      return <div style={pageStyle}>Loading profile...</div>;
    }

    if (loadError) {
      return <div style={pageStyle}>Error: {loadError}</div>;
    }

    if (!student) {
      return <div style={pageStyle}>No student profile found.</div>;
    }

    return (
      <div style={pageStyle}>
        {/* ---------------------------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------------------------- */}
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.maroon}
              strokeWidth="2"
              style={{ marginTop: "2px" }}
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            <div style={headerTitleGroupStyle}>
              <h1 style={pageTitleStyle}>Student Profile</h1>
              <p style={pageSubtitleStyle}>MANAGE YOUR PERSONAL INFORMATION</p>
            </div>
          </div>

          <button type="button" style={editButtonStyle} onClick={openEditModal}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.white}
              strokeWidth="2.5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Main layout */}
        {/* ---------------------------------------------------------- */}
        <div style={layoutStyle}>
          {/* -------------------- Left column -------------------- */}
          <div style={leftColumnStyle}>
            <div style={profileCardStyle}>
              <div style={avatarCircleStyle}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.white}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <h2 style={studentNameStyle}>{student.fullName}</h2>
              <p style={studentIdStyle}>STUDENT ID: {student.studentId}</p>
              <p style={statusBadgeStyle}>STATUS : {student.status}</p>
            </div>

            <div style={statsPanelStyle}>
              <h3 style={sectionTitleStyle}>Stats</h3>
              {/* Stats aren't part of StudentProfileResponse yet - add them
                  to the DTO/entity when there's real data to show here. */}
            </div>
          </div>

          {/* -------------------- Right column -------------------- */}
          <div style={rightColumnStyle}>
            <div style={panelStyle}>
              <h3 style={sectionTitleStyle}>Personal Information</h3>
              <div style={formGridStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" style={inputStyle} value={student.fullName || ""} readOnly />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" style={inputStyle} value={student.email || ""} readOnly />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="text" style={inputStyle} value={student.phoneNumber || ""} readOnly />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Date of Birth</label>
                  <input type="text" style={inputStyle} value={student.dateOfBirth || ""} readOnly />
                </div>
                <div style={fieldGroupFullWidthStyle}>
                  <label style={labelStyle}>Address</label>
                  <input type="text" style={inputStyle} value={student.address || ""} readOnly />
                </div>
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={sectionTitleStyle}>Academic Information</h3>
              <div style={formGridStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Program</label>
                  <input type="text" style={inputStyle} value={student.program || ""} readOnly />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Year Level</label>
                  <input type="text" style={inputStyle} value={student.yearLevel || ""} readOnly />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Department</label>
                  <input type="text" style={inputStyle} value={student.department || ""} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Edit Profile modal */}
        {/* ---------------------------------------------------------- */}
        {isEditModalOpen && (
          <div style={modalOverlayStyle} onClick={closeEditModal}>
            <div style={modalCardStyle} onClick={(event) => event.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <h2 style={modalTitleStyle}>Edit Profile</h2>
                <button
                  type="button"
                  style={modalCloseButtonStyle}
                  onClick={closeEditModal}
                  aria-label="Close edit profile modal"
                >
                  ✕
                </button>
              </div>

              {saveError && <p style={errorTextStyle}>{saveError}</p>}

              <p style={modalSectionLabelStyle}>Personal Information</p>
              <div style={formGridStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.fullName}
                    onChange={handleFieldChange("fullName")}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    style={modalEditableInputStyle}
                    value={formValues.email}
                    onChange={handleFieldChange("email")}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.phoneNumber}
                    onChange={handleFieldChange("phoneNumber")}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Date of Birth</label>
                  <input
                    type="date"
                    style={modalEditableInputStyle}
                    value={formValues.dateOfBirth}
                    onChange={handleFieldChange("dateOfBirth")}
                  />
                </div>
                <div style={fieldGroupFullWidthStyle}>
                  <label style={labelStyle}>Address</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.address}
                    onChange={handleFieldChange("address")}
                  />
                </div>
              </div>

              <p style={modalSectionLabelStyle}>Academic Information</p>
              <div style={formGridStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Program</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.program}
                    onChange={handleFieldChange("program")}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Year Level</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.yearLevel}
                    onChange={handleFieldChange("yearLevel")}
                  />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Department</label>
                  <input
                    type="text"
                    style={modalEditableInputStyle}
                    value={formValues.department}
                    onChange={handleFieldChange("department")}
                  />
                </div>
              </div>

              <div style={modalFooterStyle}>
                <button
                  type="button"
                  style={modalCancelButtonStyle}
                  onClick={closeEditModal}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={isSaving ? { ...modalSaveButtonStyle, ...disabledButtonStyle } : modalSaveButtonStyle}
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }