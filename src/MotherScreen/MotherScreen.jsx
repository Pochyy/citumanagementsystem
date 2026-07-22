
import Companyprofile from "../Components Folder/Company/Companyprofile";
import EditProfile from "../Components Folder/Company/EditProfile";
import VerificationForm from "../Components Folder/Company/VerificationForm";
import InternshipListing from "../Components Folder/Company/Internship/InternshipListings";
import CreateInternship from "../Components Folder/Company/Internship/CreateInternship";
import ApplicationList from "../Components Folder/Company/Application/ApplicationList";
import ApplicantDetails from "../Components Folder/Company/Application/ApplicantDetails";
import Shortlisted from "../Components Folder/Company/Shorlisted/Shortlisted";
import SlotManagement from "../Components Folder/Company/SlotManagement/SlotManagement";
import Certificates from "../Components Folder/Company/Certificates/Certificates";
import Messages from "../Components Folder/Company/Messages/Messages";
import Notifications from "../Components Folder/Company/Notification/Notifications";
import NotificationDetails from "../Components Folder/Company/Notification/NotificationDetails";

import ProfilePage from "../Components Folder/StudentFolder/Student-Profile-Page/ProfilePage";

// ================= STUDENT PAGE IMPORTS =================
import StudentAnnouncements from "../Components Folder/StudentFolder/AnnouncementPage/Announcementpage";
import StudentAttendance from "../Components Folder/StudentFolder/AttendancePage/Attendancepage";
import StudentMessages from "../Components Folder/StudentFolder/MessagesPage/MessagesPage";
import StudentMyinternships from "../Components Folder/StudentFolder/MyInternshipsPage/Myinternshipspage";
import StudentNotifications from "../Components Folder/StudentFolder/NotificationPage/NotificationsPage";
import StudentOpportunities from "../Components Folder/StudentFolder/OpportunitiesPage/OpportunitiesPage";
import StudentRequirements from "../Components Folder/StudentFolder/RequirementPage/RequirementsPage";
import StudentProfile from "../Components Folder/StudentFolder/Student-Profile-Page/ProfilePage";

// ================= COORDINATOR PAGE IMPORTS =================
import CoordinatorProfile from "../Components Folder/CoordinatorFolder/Coordinator-ProfilePage/CoordinatorProfile";
import StudentManagement from "../Components Folder/CoordinatorFolder/Student-ManagementPage/StudentManagement";
import CompanyManagement from "../Components Folder/CoordinatorFolder/Company-ManagementPage/CompanyManagement";
import ProgressMonitoring from "../Components Folder/CoordinatorFolder/Progress-MonitoringPage/ProgressMonitoring";


import Logo from "./logo.png";

import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";

import sidebarLinks from "../config/sidebarLinks";

export default function MotherScreen() {
  // ============================================================
  // GET CURRENT USER ROLE
  // ============================================================
  const role = localStorage.getItem("role");

  // Get sidebar links based on the logged-in user's role
  const links = sidebarLinks[role] || [];

  const navigate = useNavigate();

  // ============================================================
  // LOGOUT
  // ============================================================
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("studentId");

    navigate("/Page/LoginScreen/");
  };

  // ============================================================
  // HEADER TITLE STYLE
  // ============================================================
  const titleStyle = {
    color: "#7B1113",
    fontSize: "32px",
    fontFamily: "'Iosevka Charon Mono', 'Roboto Mono', monospace",
    fontWeight: 700,
    letterSpacing: "3.2px",
    lineHeight: "1.1",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="inner-container"
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ============================================================
          HEADER
      ============================================================ */}
      <div
        className="global-header"
        style={{
          width: "100%",
          height: "120px",
          backgroundColor: "white",
          borderBottom: "1px solid #cfcfcf",
          display: "flex",
          alignItems: "center",
          paddingLeft: "18px",
          boxSizing: "border-box",
        }}
      >
        {/* CIT-U LOGO */}
        <img
          src={Logo}
          alt="CIT-U Logo"
          style={{
            width: "95px",
            height: "95px",
            objectFit: "contain",
          }}
        />

        {/* HEADER TEXT */}
        <div
          style={{
            marginLeft: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={titleStyle}>
            CITU OJT INTERNSHIP
          </div>

          <div
            style={{
              ...titleStyle,
              marginTop: "6px",
            }}
          >
            MANAGEMENT SYSTEM
          </div>
        </div>
      </div>

      {/* ============================================================
          BODY
      ============================================================ */}
      <div
        className="side-by-side"
        style={{
          display: "flex",
          height: "calc(100vh - 120px)",
          width: "100%",
        }}
      >
        {/* ============================================================
            SIDEBAR
        ============================================================ */}
        <div
          className="side-bar"
          style={{
            width: "20%",
            backgroundColor: "#7B1113",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* ============================================================
              PROFILE BOX
          ============================================================ */}
          <div
            className="profile-box"
            style={{
              width: "100%",
              height: "180px",
              padding: "24px 20px",
              borderBottom: "1px solid #9A1618",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            {/* PROFILE ICON */}
            <div
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#9A1618",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.30)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* USER ICON */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  position: "relative",
                }}
              >
                {/* HEAD */}
                <div
                  style={{
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    border: "3px solid rgba(255,255,255,0.6)",
                    position: "absolute",
                    top: "5px",
                    left: "13px",
                    boxSizing: "border-box",
                  }}
                />

                {/* BODY */}
                <div
                  style={{
                    width: "24px",
                    height: "11px",
                    borderRadius: "15px 15px 0 0",
                    border: "3px solid rgba(255,255,255,0.6)",
                    borderBottom: "none",
                    position: "absolute",
                    bottom: "5px",
                    left: "7px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* USER INFORMATION */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: "700",
                  lineHeight: "20px",
                }}
              >
                Juan dela Cruz
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.60)",
                  fontSize: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "400",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  lineHeight: "18px",
                  marginTop: "2px",
                }}
              >
                {role || "Student"}
              </div>
            </div>
          </div>

          {/* ============================================================
              SIDEBAR LINKS
          ============================================================ */}
          <div
            className="side-bar-contents"
            style={{
              flex: 1,
              overflowY: "auto",
            }}
          >
            {links.length > 0 ? (
              links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  style={({ isActive }) => ({
                    display: "block",
                    margin: "8px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    color: isActive
                      ? "#7B1113"
                      : "rgba(255,255,255,.9)",
                    backgroundColor: isActive
                      ? "white"
                      : "transparent",
                    fontWeight: isActive ? 700 : 400,
                    fontSize: 14,
                    fontFamily: "Inter",
                    textDecoration: "none",
                    transition:
                      "background-color 0.15s ease",
                  })}
                >
                  {link.name}
                </NavLink>
              ))
            ) : (
              <div
                style={{
                  margin: "8px",
                  padding: "8px 12px",
                  color: "rgba(255,255,255,.6)",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontStyle: "italic",
                }}
              >
                No pages available yet for this role.
              </div>
            )}
          </div>

          {/* ============================================================
              LOGOUT BUTTON
          ============================================================ */}
          <button
            onClick={handleLogout}
            style={{
              margin: "16px",
              padding: "10px 12px",
              backgroundColor: "transparent",
              border:
                "1px solid rgba(255,255,255,0.4)",
              borderRadius: "6px",
              color: "white",
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: 600,
              cursor: "pointer",
              transition:
                "background-color 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "#9A1618")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "transparent")
            }
          >
            Log Out
          </button>
        </div>

        {/* ============================================================
            MAIN CONTENT
        ============================================================ */}
        <div
          className="main-content"
          style={{
            width: "80%",
            background:
              "linear-gradient(180deg,#B23F41 35%,#DB5558 54%,#F1B82D 87%,white 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* ============================================================
              INNER CONTENT
          ============================================================ */}
            <div
              className="inner-content"
              style={{
                width: "95%",
                height: "95%",
                backgroundColor: "white",
                overflowY: "auto",      // scrolls vertically when content is tallers
                overflowX: "hidden",    // still prevents horizontal scroll/layout break
                boxSizing: "border-box",
              }}
            >
            {/* ========================================================
                ROUTES FOR PAGES INSIDE THE SIDEBAR LAYOUT
            ======================================================== */}
            <Routes>

              {/* ================= COMPANY ROUTES ================= */}

              <Route
                path="/component-1"
                element={<Companyprofile />}
              />

              <Route
                path="/component-1/edit"
                element={<EditProfile />}
              />

              <Route
                path="/component-2"
                element={<VerificationForm />}
              />

              <Route
                path="/component-3"
                element={<InternshipListing />}
              />

              <Route
                path="/component-3/post"
                element={<CreateInternship />}
              />

              <Route
                path="/component-4"
                element={<ApplicationList />}
              />

              <Route
                path="/component-4/:applicantId"
                element={<ApplicantDetails />}
              />

              <Route
                path="/component-5"
                element={<Shortlisted />}
              />

              <Route
                path="/component-6"
                element={<SlotManagement />}
              />

              <Route
                path="/component-6/:internshipId"
                element={<SlotManagement />}
              />

              <Route
                path="/component-7"
                element={<Certificates />}
              />

              <Route
                path="/component-8"
                element={<Messages />}
              />

              <Route
                path="/component-9"
                element={<Notifications />}
              />

              <Route
                path="/component-9/:notificationId"
                element={<NotificationDetails />}
              />

              <Route
                path="/component-10"
                element={<ProfilePage />}
              />

              {/* ================= STUDENT ROUTES ================= */}

              <Route
                path="/student/profile"
                element={<StudentProfile />}
              />

              <Route
                path="/student/opportunities"
                element={<StudentOpportunities />}
              />

              <Route
                path="/student/internships"
                element={<StudentMyinternships />}
              />

              <Route
                path="/student/requirements"
                element={<StudentRequirements />}
              />

              <Route
                path="/student/attendance"
                element={<StudentAttendance />}
              />

              <Route
                path="/student/announcements"
                element={<StudentAnnouncements />}
              />

              <Route
                path="/student/messages"
                element={<StudentMessages />}
              />

              <Route
                path="/student/notifications"
                element={<StudentNotifications />}
              />
              
              {/* ================= COORDINATOR ROUTES ================= */}

               <Route
                path="/coordinator/CoordinatorProfile"
                element={<CoordinatorProfile />}
              />
              <Route
                path="/coordinator/StudentManagement"
                element={<StudentManagement />}
              />
              <Route
                path="/coordinator/CompanyManagement"
                element={<CompanyManagement />}
              />
              <Route
                path="/coordinator/ProgressMonitoring"
                element={<ProgressMonitoring />}
              />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

