import React, { useState } from "react";
import Logo from "../../../MotherScreen/logo.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// ============================================================
// Reusable style objects
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
    height: "calc(100vh - 120px)",
    background: "linear-gradient(180deg,#B23F41 35%,#DB5558 54%,#F1B82D 87%,white 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "20px",
  },

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
  loginButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
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

const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;

export default function LoginScreen({ navigate }) {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginValue, password: passwordValue }),
      });

      if (!response.ok) {
        const message =
          response.status === 401
            ? "Invalid login or password."
            : "Something went wrong logging you in. Please try again.";
        throw new Error(message);
      }

      const user = await response.json(); // UserResponse: userId, studentId, firstName, lastName, email, role, status, dateCreated

      // Stash identity for the rest of the app.
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("role", user.role);
      localStorage.removeItem("studentId");
      localStorage.removeItem("companyId");
      if (user.studentId) {
        localStorage.setItem("studentId", user.studentId);
      }
      if (user.companyId) {
        localStorage.setItem("companyId", user.companyId);
      } else if (user.role === "COMPANY") {
        try {
          const companyResponse = await fetch(`${API_BASE_URL}/api/companies/by-user/${user.userId}`);
          if (companyResponse.ok) {
            const company = await companyResponse.json();
            localStorage.setItem("companyId", company.companyId);
          }
        } catch {
          // The company profile page can still load by userId; uploads need companyId.
        }
      }

      // Route by role. Swap these paths for whatever your router actually uses.
          if (user.role === "STUDENT") {
            navigate
              ? navigate("/student/profile")
              : (window.location.href = "/student/profile");

          } else if (user.role === "COMPANY") {
            navigate
              ? navigate("/component-1")
              : (window.location.href = "/component-1");

          } else if (user.role === "COORDINATOR") {
            navigate
              ? navigate("/coordinator/CoordinatorProfile")
              : (window.location.href = "/coordinator/CoordinatorProfile");
          }
    } catch (err) {
      setLoginError(err.message || "Something went wrong logging you in.");
    } finally {
      setIsSubmitting(false);
    }
  };

      const handleRegisterClick = () => {
        navigate
          ? navigate("/Page/RegisterScreen/")
          : (window.location.href = "/Page/RegisterScreen/");
      };

        const handleSignUpLinkClick = () => {
          navigate
            ? navigate("/Page/RegisterScreen/")
            : (window.location.href = "/Page/RegisterScreen/");
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
          <div style={styles.logoCircle}>
            <img src={Logo} alt="CIT University" style={styles.logoImage} />
          </div>

          <div style={styles.welcomeRow}>
            <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
            <div style={styles.welcomeSubtitle}>Access your OJT workspace</div>
          </div>

          <form style={styles.whiteBox} onSubmit={handleLoginSubmit}>
            {/* Login field */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>Login</div>
              <input
                type="text"
                style={styles.input}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                placeholder="Student ID or Company Email"
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
              />
            </div>

            {loginError && <div style={styles.errorText}>{loginError}</div>}

            {/* ---------- Action buttons ---------- */}
            <div style={styles.buttonsRow}>
              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  ...(isSubmitting ? styles.loginButtonDisabled : {}),
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>

              <button type="button" style={styles.registerButton} onClick={handleRegisterClick}>
                Register
              </button>
            </div>

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
