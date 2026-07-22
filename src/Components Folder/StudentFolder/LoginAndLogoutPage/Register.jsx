import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../MotherScreen/logo.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const companyDocumentTypes = [
  { id: "moa", label: "Memorandum of Agreement" },
  { id: "businessPermit", label: "Business Permit" },
  { id: "accreditationLetter", label: "Accreditation Letter" },
  { id: "trainingPlan", label: "Training Plan" },
];

const styles = {
  globalHeader: {
    width: "100%",
    height: "120px",
    backgroundColor: "white",
    borderBottom: "1px solid #cfcfcf",
    display: "flex",
    alignItems: "center",
    paddingLeft: "18px",
    boxSizing: "border-box",
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
    fontSize: "14px",
    fontFamily: "'Iosevka Charon Mono', 'Roboto Mono', monospace",
    fontWeight: 600,
    letterSpacing: "1.2px",
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
    padding: "24px 28px 18px",
    boxSizing: "border-box",
    maxHeight: "calc(100vh - 140px)",
    overflowY: "auto",
  },
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
    color: "#777",
    fontSize: "11px",
    textAlign: "center",
  },
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
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    height: "36px",
    backgroundColor: "#e2e2e2",
    border: "none",
    borderRadius: "6px",
    padding: "0 12px",
    fontSize: "14px",
    color: "#333333",
    boxSizing: "border-box",
    outline: "none",
  },
  uploadSectionTitle: {
    color: "#7B1113",
    fontSize: "14px",
    fontWeight: 700,
    margin: "18px 0 4px",
  },
  uploadSectionHint: {
    color: "#777",
    fontSize: "11px",
    marginBottom: "12px",
    lineHeight: 1.45,
  },
  uploadRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4",
    borderRadius: "6px",
    padding: "10px 12px",
    marginBottom: "8px",
    gap: "10px",
  },
  uploadRowLabel: {
    color: "#333333",
    fontSize: "13px",
    fontWeight: 600,
  },
  requiredBadge: {
    backgroundColor: "#FBEDEE",
    color: "#7B1113",
    border: "1px solid #E7C3C6",
    borderRadius: "999px",
    padding: "5px 12px",
    fontSize: "11px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  errorText: {
    color: "#B23F41",
    fontSize: "12px",
    marginTop: "6px",
  },
  buttonsRow: {
    display: "flex",
    gap: "14px",
    marginTop: "14px",
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
    padding: "32px 28px 26px",
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
    margin: "0 auto 18px",
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
    margin: "0 0 10px",
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

export default function RegisterScreen({ navigate: navigateProp } = {}) {
  const routerNavigate = useNavigate();
  const navigate = navigateProp || routerNavigate;

  const [accountType, setAccountType] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentConfirmPassword, setStudentConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const goToLogin = () => navigate("/Page/LoginScreen/");

  const handleChangeAccountType = () => {
    setAccountType(null);
    setRegisterError("");
  };

  const readErrorMessage = async (response, fallback) => {
    try {
      const payload = await response.json();
      return payload.detail || payload.message || payload.error || fallback;
    } catch {
      return fallback;
    }
  };

  const handleStudentRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");

    if (studentPassword !== studentConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          password: studentPassword,
          confirmPassword: studentConfirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response, "Unable to register student account."));
      }

      setShowSuccessModal(true);
    } catch (err) {
      setRegisterError(err.message || "Unable to connect to the registration API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanyRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");

    if (companyPassword !== companyConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          companyEmail,
          password: companyPassword,
          confirmPassword: companyConfirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response, "Unable to register company account."));
      }

      setShowSuccessModal(true);
    } catch (err) {
      setRegisterError(err.message || "Unable to connect to the registration API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSubmitButton = () => (
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
  );

  return (
    <div className="inner-container" style={{ minHeight: "100vh" }}>
      <div className="global-header" style={styles.globalHeader}>
        <img src={Logo} alt="CIT-U Logo" style={styles.headerLogo} />

        <div style={styles.headerTextWrapper}>
          <div style={styles.headerTitle}>CITU OJT INTERNSHIP</div>
          <div style={{ ...styles.headerTitle, marginTop: "6px" }}>MANAGEMENT SYSTEM</div>
        </div>
      </div>

      <div className="main-content" style={styles.mainContent}>
        <div className="register-card" style={styles.cardOuter}>
          <div style={styles.logoCircle}>
            <img src={Logo} alt="CIT University" style={styles.logoImage} />
          </div>

          <div style={styles.welcomeRow}>
            <h1 style={styles.welcomeTitle}>Create Account</h1>
            <div style={styles.welcomeSubtitle}>Start your OJT verification</div>
          </div>

          <div style={styles.whiteBox}>
            {accountType === null && (
              <div className="account-type-select">
                <div style={styles.fieldLabel}>I am registering as a:</div>
                <div style={styles.typeSelectRow}>
                  <div style={styles.typeCard} onClick={() => setAccountType("student")}>
                    <div style={styles.typeIcon}>S</div>
                    <div style={styles.typeLabel}>Student</div>
                    <div style={styles.typeHelperText}>Use your Student ID</div>
                  </div>

                  <div style={styles.typeCard} onClick={() => setAccountType("company")}>
                    <div style={styles.typeIcon}>C</div>
                    <div style={styles.typeLabel}>Company</div>
                    <div style={styles.typeHelperText}>Register your organization</div>
                  </div>
                </div>

                <div style={styles.loginTextRow}>
                  <span style={styles.loginText}>Already have an account? </span>
                  <span style={styles.loginLink} onClick={goToLogin}>
                    Log in
                  </span>
                </div>
              </div>
            )}

            {accountType === "student" && (
              <form onSubmit={handleStudentRegisterSubmit}>
                <span style={styles.backLink} onClick={handleChangeAccountType}>
                  &lt;- Back to account type selection
                </span>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Student ID</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={studentConfirmPassword}
                    onChange={(e) => setStudentConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {registerError && <div style={styles.errorText}>{registerError}</div>}
                {renderSubmitButton()}
              </form>
            )}

            {accountType === "company" && (
              <form onSubmit={handleCompanyRegisterSubmit}>
                <span style={styles.backLink} onClick={handleChangeAccountType}>
                  &lt;- Back to account type selection
                </span>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Name</div>
                  <input
                    type="text"
                    style={styles.input}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Company Email</div>
                  <input
                    type="email"
                    style={styles.input}
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>Confirm Password</div>
                  <input
                    type="password"
                    style={styles.input}
                    value={companyConfirmPassword}
                    onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.uploadSectionTitle}>Verification Documents</div>
                <div style={styles.uploadSectionHint}>
                  These requirements are queued for coordinator review after registration.
                </div>

                {companyDocumentTypes.map((doc) => (
                  <div key={doc.id} style={styles.uploadRow}>
                    <span style={styles.uploadRowLabel}>{doc.label}</span>
                    <span style={styles.requiredBadge}>Required</span>
                  </div>
                ))}

                {registerError && <div style={styles.errorText}>{registerError}</div>}
                {renderSubmitButton()}
              </form>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div style={styles.modalOverlay} onClick={goToLogin}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseButton} onClick={goToLogin}>
              x
            </button>

            <div style={styles.successIconWrapper}>
              <span style={styles.successIcon}>OK</span>
            </div>

            <h2 style={styles.modalTitle}>Registration Successful</h2>

            {accountType === "student" ? (
              <p style={styles.modalMessage}>
                Your student account was created. Required student documents are now pending
                coordinator verification.
              </p>
            ) : (
              <p style={styles.modalMessage}>
                Your company account was created. Required company documents are now pending
                coordinator verification.
              </p>
            )}

            <button style={styles.modalContinueButton} onClick={goToLogin}>
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
