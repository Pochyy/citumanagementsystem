import React, { useState, useRef } from "react";
import Logo from "../../../MotherScreen/logo.png";

// ============================================================
// Reusable style objects
// Mirrors the Login Page so both screens share the same design language.
// ============================================================
const styles = {
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
    gap: "12px",
  },
  uploadRowTextWrap: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    flex: 1,
  },
  uploadRowLabel: {
    color: "#333333",
    fontSize: "13px",
    fontWeight: 600,
  },
  uploadRowFileName: {
    color: "#2E9E5B",
    fontSize: "11px",
    marginTop: "3px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  uploadRowButtons: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
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
  removeButton: {
    backgroundColor: "#ffffff",
    color: "#9a9a9a",
    border: "1.5px solid #d8d8d8",
    borderRadius: "6px",
    padding: "6px 10px",
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
  registerButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
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

// Change these if your backend runs somewhere else, or swap for relative
// paths ("/api/auth/...") if you set up a CRA proxy in package.json.
const REGISTER_STUDENT_ENDPOINT = "http://localhost:8080/api/auth/register/student";
const REGISTER_COMPANY_ENDPOINT = "http://localhost:8080/api/auth/register/company";

const MAX_FILE_SIZE_MB = 10;

// Company verification document list - unchanged placeholder from before.
// Backend: this list may eventually come from the database so requirements
// can change without redeploying the frontend.
const companyDocumentTypes = [
  { id: "businessPermit", label: "Business Permit" },
  { id: "mayorsPermit", label: "Mayor's Permit" },
  { id: "birRegistration", label: "BIR Registration" },
  { id: "companyProfile", label: "Company Profile" },
];

export default function RegisterScreen({ navigate }) {
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

  // Holds the actual PDF File objects the user picked, keyed by document id.
  // e.g. { businessPermit: File, mayorsPermit: File, ... }
  const [companyDocuments, setCompanyDocuments] = useState({});

  // One hidden <input type="file"> per document type, referenced so the
  // visible "Upload" button can open the native file picker.
  const fileInputRefs = useRef({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChangeAccountType = () => {
    setAccountType(null);
    setRegisterError(null);
  };

  const openFilePicker = (documentId) => {
    const input = fileInputRefs.current[documentId];
    if (input) input.click();
  };

  const handleDocumentFileSelected = (documentId, event) => {
    const file = event.target.files && event.target.files[0];
    // Allow re-selecting the same file later
    event.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") {
      setRegisterError(`${file.name} is not a PDF file. Please upload a PDF.`);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setRegisterError(`${file.name} is larger than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setRegisterError(null);
    setCompanyDocuments((previous) => ({
      ...previous,
      [documentId]: file,
    }));
  };

  const handleRemoveDocument = (documentId) => {
    setCompanyDocuments((previous) => {
      const next = { ...previous };
      delete next[documentId];
      return next;
    });
  };

  // Backend: Register student account -> POST /api/auth/register/student
  const handleStudentRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError(null);

    if (studentPassword !== studentConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(REGISTER_STUDENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          password: studentPassword,
          confirmPassword: studentConfirmPassword,
        }),
      });

      if (!response.ok) {
        const message =
          response.status === 409
            ? "This Student ID is already registered."
            : response.status === 400
            ? "Please check your Student ID and password."
            : "Something went wrong registering your account.";
        throw new Error(message);
      }

    setShowSuccessModal(true);      
    } catch (err) {
      setRegisterError(err.message || "Something went wrong registering your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Backend: Register company account -> POST /api/auth/register/company
  // Sent as multipart/form-data so the PDF files travel in the same request
  // as the account fields. The coordinator's review screen can then pull
  // each document back from the company's record to view/download.
  const handleCompanyRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError(null);

    if (companyPassword !== companyConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    const missingDocs = companyDocumentTypes.filter((doc) => !companyDocuments[doc.id]);
    if (missingDocs.length > 0) {
      setRegisterError(
        `Please upload: ${missingDocs.map((d) => d.label).join(", ")}.`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("companyEmail", companyEmail);
      formData.append("password", companyPassword);
      formData.append("confirmPassword", companyConfirmPassword);

      // Backend: expect one PDF file field per document type, e.g.
      // documents[businessPermit], documents[mayorsPermit], ...
      companyDocumentTypes.forEach((doc) => {
        const file = companyDocuments[doc.id];
        if (file) {
          formData.append(`documents[${doc.id}]`, file, file.name);
        }
      });

      // NOTE: do not set a Content-Type header manually here - the browser
      // sets the correct multipart/form-data boundary automatically.
      const response = await fetch(REGISTER_COMPANY_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message =
          response.status === 409
            ? "This email is already registered."
            : response.status === 400
            ? "Please check your company details, password, and documents."
            : "Something went wrong registering your company.";
        throw new Error(message);
      }

      setShowSuccessModal(true);
    } catch (err) {
      setRegisterError(err.message || "Something went wrong registering your company.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate ? navigate("/login") : (window.location.href = "/login");
  };

  const handleLoginLinkClick = () => {
    navigate ? navigate("/login") : (window.location.href = "/login");
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
          <div style={styles.logoCircle}>
            <img src={Logo} alt="CIT University" style={styles.logoImage} />
          </div>

          <div style={styles.welcomeRow}>
            <h1 style={styles.welcomeTitle}>Create Account!</h1>
            <div style={styles.welcomeSubtitle}>words words words words</div>
          </div>

          <div style={styles.whiteBox}>
            {/* ================= ACCOUNT TYPE SELECTION ================= */}
            {accountType === null && (
              <div className="account-type-select">
                <div style={styles.fieldLabel}>I am registering as a:</div>
                <div style={styles.typeSelectRow}>
                  <div style={styles.typeCard} onClick={() => setAccountType("student")}>
                    <div style={styles.typeIcon}>S</div>
                    <div style={styles.typeLabel}>Student</div>
                    <div style={styles.typeHelperText}>Register using your Student ID</div>
                  </div>

                  <div style={styles.typeCard} onClick={() => setAccountType("company")}>
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

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Student ID</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentConfirmPassword}
                    onChange={(e) => setStudentConfirmPassword(e.target.value)}
                  />
                </div>

                {registerError && <div style={styles.errorText}>{registerError}</div>}

                <div style={styles.buttonsRow}>
                  <button
                    type="submit"
                    style={{
                      ...styles.registerButton,
                      ...(isSubmitting ? styles.registerButtonDisabled : {}),
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
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

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Name</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Email</div>
                  <input
                    type="email"
                    style={styles.input}
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyConfirmPassword}
                    onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                  />
                </div>

                {/* ---------- Company verification document uploads ---------- */}
                <div style={styles.uploadSectionTitle}>Verification Documents</div>
                <div style={styles.uploadSectionHint}>
                  Upload each document as a PDF. The Internship Coordinator will
                  review these files before your company account is verified.
                </div>

                {companyDocumentTypes.map((doc) => {
                  const file = companyDocuments[doc.id];
                  return (
                    <div key={doc.id} style={styles.uploadRow}>
                      <div style={styles.uploadRowTextWrap}>
                        <span style={styles.uploadRowLabel}>{doc.label}</span>
                        {file && (
                          <span style={styles.uploadRowFileName} title={file.name}>
                            ✓ {file.name}
                          </span>
                        )}
                      </div>

                      <div style={styles.uploadRowButtons}>
                        {/* Hidden native file input - PDF only */}
                        <input
                          ref={(el) => (fileInputRefs.current[doc.id] = el)}
                          type="file"
                          accept="application/pdf"
                          style={{ display: "none" }}
                          onChange={(e) => handleDocumentFileSelected(doc.id, e)}
                        />

                        <button
                          type="button"
                          style={styles.uploadButton}
                          onClick={() => openFilePicker(doc.id)}
                        >
                          {file ? "Replace" : "Upload"}
                        </button>

                        {file && (
                          <button
                            type="button"
                            style={styles.removeButton}
                            onClick={() => handleRemoveDocument(doc.id)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {registerError && <div style={styles.errorText}>{registerError}</div>}

                <div style={styles.buttonsRow}>
                  <button
                    type="submit"
                    style={{
                      ...styles.registerButton,
                      ...(isSubmitting ? styles.registerButtonDisabled : {}),
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
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
              </p>
            )}

            <button style={styles.modalContinueButton} onClick={handleCloseSuccessModal}>
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}