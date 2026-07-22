import React, { useState } from "react";
import Logo from "../../../MotherScreen/logo.png";

// ============================================================
// Reusable style objects
// Declared at the top to keep the JSX below clean and readable.
// Mirrors the Login Page so both screens share the same design language.
// ============================================================
const styles = {
  // ---------------- Header (kept consistent with the rest of the app) ----------------
  globalHeader: {
    width: "100%",
    height: "120px",
    backgroundColor: "white",
    borderBottom: "1px solid #cfcfcf",
    display: "flex",
    alignItems: "center",
    paddingLeft: "18px",
  },
  headerLogo: {
    width: "95px",
    height: "95px",
    objectFit: "contain",
  },
  headerTextWrapper: {
    marginLeft: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#7B1113",
    fontSize: "32px",
    fontFamily: "'Iosevka Charon Mono', 'Roboto Mono', monospace",
    fontWeight: 700,
    letterSpacing: "3.2px",
    lineHeight: "1.1",
    whiteSpace: "nowrap",
  },

  // ---------------- Body / gradient background ----------------
  mainContent: {
    width: "100%",
    minHeight: "calc(100vh - 120px)",
    background: "linear-gradient(180deg,#B23F41 35%,#DB5558 54%,#F1B82D 87%,white 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
    padding: "40px 20px",
  },

  // ---------------- Register card ----------------
  cardOuter: {
    position: "relative",
    width: "100%",
    maxWidth: "460px",
  },
  logoCircle: {
    position: "absolute",
    top: 0,
    left: "20px",
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "3px solid rgba(255,255,255,0.85)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 3,
  },
  logoImage: {
    width: "78px",
    height: "78px",
    objectFit: "contain",
  },
  welcomeRow: {
    minHeight: "88px",
    paddingLeft: "126px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: "26px",
    fontFamily: "'Iosevka Charon Mono', 'Roboto Mono', monospace",
    fontWeight: 700,
    letterSpacing: "1px",
    margin: 0,
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  },
  welcomeSubtitle: {
    color: "#FDEDEA",
    fontSize: "16px",
    fontFamily: "'Iosevka Charon Mono', 'Roboto Mono', monospace",
    fontWeight: 600,
    letterSpacing: "1.4px",
    marginTop: "4px",
  },
  whiteBox: {
    position: "relative",
    zIndex: 1,
    marginTop: "-18px",
    backgroundColor: "#ffffff",
    border: "1px solid #d8d8d8",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    padding: "38px 32px 28px 32px",
    boxSizing: "border-box",
  },

  // ---------------- Account type selection ----------------
  typeSelectRow: {
    display: "flex",
    gap: "16px",
  },
  typeCard: {
    flex: 1,
    border: "2px solid #d8d8d8",
    borderRadius: "8px",
    padding: "22px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    transition: "border-color 0.15s ease",
  },
  typeCardSelected: {
    borderColor: "#7B1113",
    backgroundColor: "#FBEDEE",
  },
  typeIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#7B1113",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 700,
  },
  typeLabel: {
    color: "#7B1113",
    fontSize: "15px",
    fontWeight: 700,
  },
  typeHelperText: {
    color: "#9a9a9a",
    fontSize: "11px",
    textAlign: "center",
  },

  // ---------------- Form ----------------
  backLink: {
    color: "#7B1113",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "18px",
    display: "inline-block",
  },
  fieldLabel: {
    color: "#7B1113",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    height: "40px",
    backgroundColor: "#e2e2e2",
    border: "none",
    borderRadius: "6px",
    padding: "0 12px",
    fontSize: "14px",
    color: "#333333",
    boxSizing: "border-box",
    outline: "none",
  },
  errorText: {
    color: "#B23F41",
    fontSize: "12px",
    marginTop: "6px",
  },

  // ---------------- Document upload section (Company only) ----------------
  uploadSectionTitle: {
    color: "#7B1113",
    fontSize: "14px",
    fontWeight: 700,
    margin: "24px 0 4px 0",
  },
  uploadSectionHint: {
    color: "#9a9a9a",
    fontSize: "11px",
    marginBottom: "14px",
  },
  uploadRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4",
    borderRadius: "6px",
    padding: "10px 14px",
    marginBottom: "10px",
  },
  uploadRowLabel: {
    color: "#333333",
    fontSize: "13px",
    fontWeight: 600,
  },
  uploadButton: {
    backgroundColor: "#ffffff",
    color: "#7B1113",
    border: "1.5px solid #7B1113",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },

  // ---------------- Buttons ----------------
  buttonsRow: {
    display: "flex",
    gap: "14px",
    marginTop: "22px",
  },
  registerButton: {
    flex: 1,
    height: "42px",
    backgroundColor: "#7B1113",
    color: "#ffffff",
    border: "2px solid #7B1113",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  loginTextRow: {
    textAlign: "center",
    marginTop: "18px",
  },
  loginText: {
    color: "#8a8a8a",
    fontSize: "12px",
  },
  loginLink: {
    color: "#7B1113",
    fontWeight: 700,
    cursor: "pointer",
  },

  // ---------------- Success popup / modal ----------------
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "380px",
    padding: "32px 28px 26px 28px",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    textAlign: "center",
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#9a9a9a",
    cursor: "pointer",
    lineHeight: 1,
  },
  successIconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#E7F6EC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 18px auto",
  },
  successIcon: {
    color: "#2E9E5B",
    fontSize: "30px",
    fontWeight: 700,
  },
  modalTitle: {
    color: "#7B1113",
    fontSize: "19px",
    fontWeight: 700,
    margin: "0 0 10px 0",
  },
  modalMessage: {
    color: "#555555",
    fontSize: "13px",
    lineHeight: "20px",
    margin: 0,
  },
  modalContinueButton: {
    width: "100%",
    height: "42px",
    backgroundColor: "#7B1113",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "22px",
  },
};

// List of required company verification documents.
// Backend: this list may eventually come from the database so requirements
// can change without redeploying the frontend.
const companyDocumentTypes = [
  { id: "businessPermit", label: "Business Permit" },
  { id: "dtiSecRegistration", label: "DTI/SEC Registration" },
  { id: "mayorsPermit", label: "Mayor's Permit" },
  { id: "birRegistration", label: "BIR Registration" },
  { id: "companyProfile", label: "Company Profile" },
  { id: "otherDocuments", label: "Other Supporting Documents" },
];

export default function RegisterScreen() {
  // ------------------------------------------------------------
  // Local UI state only. No backend logic is implemented here.
  // ------------------------------------------------------------

  // Which account type the user picked: null | "student" | "company"
  const [accountType, setAccountType] = useState(null);

  // Student form fields
  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentConfirmPassword, setStudentConfirmPassword] = useState("");

  // Company form fields
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState("");

  // Backend: tracks which document files the user has attached (frontend placeholder only).
  // Later this should hold actual File objects / upload references keyed by document id.
  const [companyDocuments, setCompanyDocuments] = useState({});

  // Future functionality: track a loading state while the registration request is in flight
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // Future functionality: track and display a validation/registration error message
  // const [registerError, setRegisterError] = useState(null);

  // Controls the success popup shown after a (simulated) successful registration
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reset the flow back to the account type selection screen
  const handleChangeAccountType = () => {
    setAccountType(null);
  };

  // Frontend placeholder for selecting a document file for a given document type.
  // Backend: Upload company verification documents
  // This should eventually open a file picker and upload the selected file to the
  // backend/storage service, then store the returned file path/ID against companyId.
  const handleDocumentUploadClick = (documentId) => {
    setCompanyDocuments((previous) => ({
      ...previous,
      [documentId]: true, // placeholder flag only, replace with real file reference later
    }));
  };

  // Backend: Register student account
  // Should validate studentPassword === studentConfirmPassword, then call the
  // registration API with { studentId, studentPassword }.
  // Backend: Student ID will be validated here to confirm it belongs to an existing student.
  const handleStudentRegisterSubmit = (event) => {
    event.preventDefault();
    // Future functionality:
    // 1. setIsSubmitting(true)
    // 2. Validate password and confirm password match (Password validation / Confirm password validation)
    // 3. Call the student registration API/database with { studentId, studentPassword }
    // 4. On success -> setShowSuccessModal(true)
    // 5. On failure -> setRegisterError("...") and setIsSubmitting(false)
    setShowSuccessModal(true);
  };

  // Backend: Register company account
  // Should validate companyPassword === companyConfirmPassword, then submit the
  // company registration form together with the uploaded verification documents.
  // Backend: uploaded document IDs/file paths will be stored against the new company record.
  // Backend: company verification status will initially be "Pending Review" and later
  // retrieved from the database once the Internship Coordinator reviews the documents.
  const handleCompanyRegisterSubmit = (event) => {
    event.preventDefault();
    // Future functionality:
    // 1. setIsSubmitting(true)
    // 2. Validate password and confirm password match (Password validation / Confirm password validation)
    // 3. Upload each selected document (Company document upload) and collect file references
    // 4. Call the company registration API/database with
    //    { companyName, companyEmail, companyPassword, documents }
    // 5. On success -> setShowSuccessModal(true) (Company verification workflow begins)
    // 6. On failure -> setRegisterError("...") and setIsSubmitting(false)
    setShowSuccessModal(true);
  };

  // Future functionality: redirect to the Login page after closing the success popup
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Future functionality: navigate("/login")
  };

  // Future functionality: navigate straight to the Login page from the bottom link
  const handleLoginLinkClick = () => {
    // Future functionality: navigate("/login")
  };

  return (
    <div className="inner-container" style={{ minHeight: "100vh" }}>
      {/* ================= HEADER ================= */}
      <div className="global-header" style={styles.globalHeader}>
        <img src={Logo} alt="CIT-U Logo" style={styles.headerLogo} />

        <div style={styles.headerTextWrapper}>
          <div style={styles.headerTitle}>CITU OJT INTERNSHIP</div>
          <div style={{ ...styles.headerTitle, marginTop: "6px" }}>MANAGEMENT SYSTEM</div>
        </div>
      </div>

      {/* ================= BODY (GRADIENT BACKGROUND) ================= */}
      <div className="main-content" style={styles.mainContent}>
        {/* ================= REGISTER CARD ================= */}
        <div className="register-card" style={styles.cardOuter}>
          {/* ---------- Floating logo badge ---------- */}
          <div style={styles.logoCircle}>
            <img src={Logo} alt="CIT University" style={styles.logoImage} />
          </div>

          {/* ---------- Welcome text ---------- */}
          <div style={styles.welcomeRow}>
            <h1 style={styles.welcomeTitle}>Create Account!</h1>
            {/* Database: could later show a dynamic subtitle/announcement fetched from the backend */}
            <div style={styles.welcomeSubtitle}>words words words words</div>
          </div>

          {/* ---------- Form card ---------- */}
          <div style={styles.whiteBox}>
            {/* ================= ACCOUNT TYPE SELECTION ================= */}
            {accountType === null && (
              <div className="account-type-select">
                <div style={styles.fieldLabel}>I am registering as a:</div>
                <div style={styles.typeSelectRow}>
                  {/* Student option */}
                  <div
                    style={styles.typeCard}
                    onClick={() => setAccountType("student")}
                  >
                    <div style={styles.typeIcon}>S</div>
                    <div style={styles.typeLabel}>Student</div>
                    <div style={styles.typeHelperText}>Register using your Student ID</div>
                  </div>

                  {/* Company option */}
                  <div
                    style={styles.typeCard}
                    onClick={() => setAccountType("company")}
                  >
                    <div style={styles.typeIcon}>C</div>
                    <div style={styles.typeLabel}>Company</div>
                    <div style={styles.typeHelperText}>Register your organization</div>
                  </div>
                </div>

                <div style={styles.loginTextRow}>
                  <span style={styles.loginText}>Already have an account? </span>
                  <span style={styles.loginLink} onClick={handleLoginLinkClick}>
                    Log in!
                  </span>
                </div>
              </div>
            )}

            {/* ================= STUDENT REGISTRATION FORM ================= */}
            {accountType === "student" && (
              <form onSubmit={handleStudentRegisterSubmit}>
                <span style={styles.backLink} onClick={handleChangeAccountType}>
                  ← Back to account type selection
                </span>

                {/* Student ID field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Student ID</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    // Database: student.studentId
                    // Backend: Student ID will be validated here to confirm it belongs
                    // to an existing student record before the account is created.
                  />
                </div>

                {/* Password field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    // Database: student.password (should be hashed by the backend before storage)
                  />
                </div>

                {/* Confirm Password field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentConfirmPassword}
                    onChange={(e) => setStudentConfirmPassword(e.target.value)}
                    // Future functionality: Confirm password validation
                    // Compare against studentPassword before allowing submission
                  />
                </div>

                {/* Future functionality: render this only when registerError is set
                {registerError && <div style={styles.errorText}>{registerError}</div>} */}

                <div style={styles.buttonsRow}>
                  {/* Backend: Register student account */}
                  <button type="submit" style={styles.registerButton}>
                    {/* Future functionality: show "Registering..." while isSubmitting is true */}
                    Register
                  </button>
                </div>
              </form>
            )}

            {/* ================= COMPANY REGISTRATION FORM ================= */}
            {accountType === "company" && (
              <form onSubmit={handleCompanyRegisterSubmit}>
                <span style={styles.backLink} onClick={handleChangeAccountType}>
                  ← Back to account type selection
                </span>

                {/* Company Name field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Name</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    // Database: company.companyName
                  />
                </div>

                {/* Company Email field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Email</div>
                  <input
                    type="email"
                    style={styles.input}
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    // Database: company.companyEmail
                  />
                </div>

                {/* Password field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                    // Database: company.password (should be hashed by the backend before storage)
                  />
                </div>

                {/* Confirm Password field */}
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyConfirmPassword}
                    onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                    // Future functionality: Confirm password validation
                    // Compare against companyPassword before allowing submission
                  />
                </div>

                {/* ---------- Company verification document uploads ---------- */}
                <div style={styles.uploadSectionTitle}>Verification Documents</div>
                <div style={styles.uploadSectionHint}>
                  Upload the following documents for company verification. These are
                  placeholders only for now.
                </div>

                {/* Database: uploaded document IDs/file paths will be stored against
                    the new company record once the backend upload endpoint exists.
                    Later render this list using .map() over companyDocumentTypes,
                    which may itself eventually come from the database. */}
                {companyDocumentTypes.map((doc) => (
                  <div key={doc.id} style={styles.uploadRow}>
                    <span style={styles.uploadRowLabel}>{doc.label}</span>

                    {/* Backend: Upload company verification documents
                        Should open a file picker and upload the selected PDF/file,
                        then store the returned reference against doc.id */}
                    <button
                      type="button"
                      style={styles.uploadButton}
                      onClick={() => handleDocumentUploadClick(doc.id)}
                    >
                      {companyDocuments[doc.id] ? "Uploaded ✓" : "Upload"}
                    </button>
                  </div>
                ))}

                {/* Future functionality: render this only when registerError is set
                {registerError && <div style={styles.errorText}>{registerError}</div>} */}

                <div style={styles.buttonsRow}>
                  {/* Backend: Register company account (Company verification workflow begins) */}
                  <button type="submit" style={styles.registerButton}>
                    {/* Future functionality: show "Registering..." while isSubmitting is true */}
                    Register
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ================= REGISTRATION SUCCESS MODAL ================= */}
      {showSuccessModal && (
        <div style={styles.modalOverlay} onClick={handleCloseSuccessModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseButton} onClick={handleCloseSuccessModal}>
              ✕
            </button>

            {/* Success icon/illustration placeholder */}
            <div style={styles.successIconWrapper}>
              <span style={styles.successIcon}>✓</span>
            </div>

            <h2 style={styles.modalTitle}>Registration Successful!</h2>

            {accountType === "student" ? (
              <p style={styles.modalMessage}>
                Your student account has been created successfully. You may now log
                in using your Student ID and password.
              </p>
            ) : (
              <p style={styles.modalMessage}>
                Your company account has been successfully registered. Your
                uploaded documents will be reviewed by the Internship Coordinator
                before your company account is verified and gains full access to
                the system.
                {/* Database: company.verificationStatus will read as "Pending Review"
                    until the Internship Coordinator approves the submitted documents */}
              </p>
            )}

            {/* Future functionality: redirect to the Login page after this is clicked */}
            <button style={styles.modalContinueButton} onClick={handleCloseSuccessModal}>
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}