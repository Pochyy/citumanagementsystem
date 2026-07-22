import React, { useState } from "react";

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
  fontFamily:
    "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
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

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export default function ProfilePage() {
  // ------------------------------------------------------------------
  // Local UI state (frontend only)
  // ------------------------------------------------------------------

  // Controls whether the "Edit Profile" popup card is visible.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Local form state for the edit modal's inputs.
  // TODO: Initialize these from the fetched `student` object once the
  // database/API integration is in place, e.g. useState(student.fullName).
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

  // Generic change handler for the modal's inputs.
  const handleFieldChange = (field) => (event) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const openEditModal = () => {
    // TODO: Pre-fill formValues with the current student record here
    // before opening, e.g. setFormValues({ ...student }).
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = () => {
    // TODO: Backend action - submit `formValues` to the API, e.g.:
    // await fetch(`/api/students/${student.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formValues),
    // });
    // On success: refresh/replace `student` state and close the modal.
    closeEditModal();
  };

  // TODO: Replace with real student data fetched from the database/API.
  // Example shape:
  // const [student, setStudent] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   async function fetchStudent() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`/api/students/${studentId}`);
  //       if (!response.ok) throw new Error("Failed to load student profile");
  //       const data = await response.json();
  //       setStudent(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchStudent();
  // }, [studentId]);

  // TODO: Handle loading state, e.g.:
  // if (isLoading) return <div style={pageStyle}>Loading profile...</div>;

  // TODO: Handle error state, e.g.:
  // if (error) return <div style={pageStyle}>Error: {error}</div>;

  // TODO: Handle empty state (no student found), e.g.:
  // if (!student) return <div style={pageStyle}>No student profile found.</div>;

  // TODO: Stats data should eventually come from the database and be
  // rendered dynamically using .map(), keyed by a unique stat/id field.
  // Example:
  // const stats = student?.stats || [];
  // stats.map((stat) => (
  //   <div key={stat.id}>{stat.label}: {stat.value}</div>
  // ));

  return (
    <div style={pageStyle}>
      {/* ---------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------- */}
      <div style={headerStyle}>
        <div style={headerLeftStyle}>
          {/* Simple person/profile icon */}
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

        {/* Opens the edit popup card. Backend save logic lives in handleSaveChanges. */}
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
      {/* Main layout: left column (profile card + stats), right column (forms) */}
      {/* ---------------------------------------------------------- */}
      <div style={layoutStyle}>
        {/* -------------------- Left column -------------------- */}
        <div style={leftColumnStyle}>
          {/* Profile summary card */}
          <div style={profileCardStyle}>
            <div style={avatarCircleStyle}>
              {/* TODO: Replace with student.photoUrl from database if available */}
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
            {/* TODO: Replace with student.fullName from database */}
            <h2 style={studentNameStyle}>Juan Dela Cruz</h2>
            {/* TODO: Replace with student.studentId from database */}
            <p style={studentIdStyle}>STUDENT ID: 2003-5454</p>
            {/* TODO: Replace with student.status from database (e.g. Active / Inactive) */}
            <p style={statusBadgeStyle}>STATUS : ACTIVE</p>
          </div>

          {/* Stats panel */}
          <div style={statsPanelStyle}>
            <h3 style={sectionTitleStyle}>Stats</h3>
            {/*
              TODO: Render stats dynamically from the database, e.g.:
              {stats.map((stat) => (
                <div key={stat.id} style={{ marginBottom: "10px" }}>
                  <span style={labelStyle}>{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
              ))}
            */}
          </div>
        </div>

        {/* -------------------- Right column -------------------- */}
        <div style={rightColumnStyle}>
          {/* Personal Information panel */}
          <div style={panelStyle}>
            <h3 style={sectionTitleStyle}>Personal Information</h3>
            {/*
              TODO: Wrap the fields below in a <form> and hook up onSubmit
              to send updated values to the backend, e.g.:
              <form onSubmit={handlePersonalInfoSubmit}>
            */}
            <div style={formGridStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                {/* TODO: value={student.fullName}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                {/* TODO: value={student.email}, onChange={handleChange} */}
                <input type="email" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                {/* TODO: value={student.phoneNumber}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Date of Birth</label>
                {/* TODO: value={student.dateOfBirth}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupFullWidthStyle}>
                <label style={labelStyle}>Address</label>
                {/* TODO: value={student.address}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
            </div>
            {/* TODO: </form> - submit button for this section would go here */}
          </div>

          {/* Academic Information panel */}
          <div style={panelStyle}>
            <h3 style={sectionTitleStyle}>Academic Information</h3>
            {/*
              TODO: Wrap the fields below in a <form> and hook up onSubmit
              to send updated values to the backend, e.g.:
              <form onSubmit={handleAcademicInfoSubmit}>
            */}
            <div style={formGridStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Program</label>
                {/* TODO: value={student.program}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Year Level</label>
                {/* TODO: value={student.yearLevel}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Department</label>
                {/* TODO: value={student.department}, onChange={handleChange} */}
                <input type="text" style={inputStyle} readOnly />
              </div>
            </div>
            {/* TODO: </form> - submit button for this section would go here */}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Edit Profile modal (popup card) */}
      {/* Rendered only when isEditModalOpen is true. */}
      {/* ---------------------------------------------------------- */}
      {isEditModalOpen && (
        <div
          style={modalOverlayStyle}
          onClick={closeEditModal} // closes when clicking the dimmed backdrop
        >
          <div
            style={modalCardStyle}
            onClick={(event) => event.stopPropagation()} // prevents backdrop click from closing when interacting with the card
          >
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

            {/*
              TODO: Wrap the fields below in a <form> and call
              handleSaveChanges on submit instead of (or in addition to)
              the Save button's onClick, e.g.:
              <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
            */}

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
                  type="text"
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
            {/* TODO: </form> */}

            <div style={modalFooterStyle}>
              <button
                type="button"
                style={modalCancelButtonStyle}
                onClick={closeEditModal}
              >
                Cancel
              </button>
              {/* TODO: Backend action - persists formValues via handleSaveChanges */}
              <button
                type="button"
                style={modalSaveButtonStyle}
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}