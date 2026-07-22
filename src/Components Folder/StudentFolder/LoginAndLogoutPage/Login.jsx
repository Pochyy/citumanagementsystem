import React, { useState } from "react";
import Logo from "../../../MotherScreen/logo.png";

// ============================================================
// Reusable style objects
// Declared at the top to keep the JSX below clean and readable.
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
    height: "calc(100vh - 120px)",
    background: "linear-gradient(180deg,#B23F41 35%,#DB5558 54%,#F1B82D 87%,white 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "20px",
  },

  // ---------------- Login card ----------------
  cardOuter: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
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
    letterSpacing: "2px",
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
  fieldLabel: {
    color: "#7B1113",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  fieldGroup: {
    marginBottom: "18px",
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
  // Placeholder for an inline error/validation message.
  errorText: {
    color: "#B23F41",
    fontSize: "12px",
    marginTop: "6px",
  },
  buttonsRow: {
    display: "flex",
    gap: "14px",
    marginTop: "22px",
  },
  loginButton: {
    flex: 1,
    height: "42px",
    backgroundColor: "#ffffff",
    color: "#7B1113",
    border: "2px solid #7B1113",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
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
  signupTextRow: {
    textAlign: "center",
    marginTop: "18px",
  },
  signupText: {
    color: "#8a8a8a",
    fontSize: "12px",
  },
  signupLink: {
    color: "#7B1113",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default function LoginScreen() {
  // ------------------------------------------------------------
  // Local UI state only (controlled inputs for the form fields).
  // Actual authentication logic will be wired up later.
  // ------------------------------------------------------------
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Future functionality: track a loading state while the login request is in flight
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // Future functionality: track and display an error message if login fails
  // const [loginError, setLoginError] = useState(null);

  // Future functionality: handle form submission
  // This should call the authentication API/backend with { loginValue, passwordValue }
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Future functionality:
    // 1. setIsSubmitting(true)
    // 2. Call the login API/database endpoint with { loginValue, passwordValue }
    // 3. On success -> store auth token/session and redirect (e.g. navigate("/dashboard"))
    // 4. On failure -> setLoginError("Invalid credentials") and setIsSubmitting(false)
  };

  // Future functionality: navigate to the Register screen
  const handleRegisterClick = () => {
    // Future functionality: navigate("/register")
  };

  // Future functionality: navigate to the Sign Up screen from the bottom link
  const handleSignUpLinkClick = () => {
    // Future functionality: navigate("/register")
  };

  return (
    <div className="inner-container" style={{ height: "100vh" }}>
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
        {/* ================= LOGIN CARD ================= */}
        <div className="login-card" style={styles.cardOuter}>
          {/* ---------- Floating logo badge ---------- */}
          <div style={styles.logoCircle}>
            <img src={Logo} alt="CIT University" style={styles.logoImage} />
          </div>

          {/* ---------- Welcome text ---------- */}
          <div style={styles.welcomeRow}>
            <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
            {/* Database: could later show a dynamic subtitle/announcement fetched from the backend */}
            <div style={styles.welcomeSubtitle}>words words words words</div>
          </div>

          {/* ---------- Login form card ---------- */}
          <form style={styles.whiteBox} onSubmit={handleLoginSubmit}>
            {/* Login field */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>Login</div>
              <input
                type="text"
                style={styles.input}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                // Database: this value will be submitted as the username/email/student ID
                // used to look up the account in the backend/database
              />
            </div>

            {/* Password field */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>Password</div>
              <input
                type="password"
                style={styles.input}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                // Database: this value will be submitted (securely, e.g. hashed) to the
                // authentication endpoint for verification against the stored credentials
              />
            </div>

            {/* Future functionality: render this only when loginError is set
            {loginError && <div style={styles.errorText}>{loginError}</div>} */}

            {/* ---------- Action buttons ---------- */}
            <div style={styles.buttonsRow}>
              {/* Future functionality: submits the form -> calls the login API/database */}
              <button type="submit" style={styles.loginButton}>
                {/* Future functionality: show "Logging In..." while isSubmitting is true */}
                Log In
              </button>

              {/* Future functionality: navigates to the Register screen */}
              <button type="button" style={styles.registerButton} onClick={handleRegisterClick}>
                Register
              </button>
            </div>

            {/* ---------- Sign up link ---------- */}
            <div style={styles.signupTextRow}>
              <span style={styles.signupText}>Don't have an account yet? </span>
              <span style={styles.signupLink} onClick={handleSignUpLinkClick}>
                Sign up!
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}