import { Link } from "react-router-dom";
import sidebarLinks from "./config/sidebarLinks";


export default function SideBar({ role }) {

  const links = sidebarLinks[role] || [];

  return (
    <div 
      className="sidebar"
      style={{
        width: "15%",
        height: "100vh",
        backgroundColor: "white",
      }}
    >

      <h1>Mother Screen</h1>

      <Link to="/Page/MotherScreen">
        Mother Screen
      </Link>


      <h1>Component Links</h1>

      <Link to="/Page/StudentProfile/ProfilePage">Student Profile Page </Link>
      <br />
      <Link to="/Page/InternshipOpportunities/Opportunities">Opportunities Page </Link>
      <br />
      <Link to="/Page/MyInternships/">My Internships </Link>
      <br />
      <Link to="/Page/LoginScreen/">Login Screen </Link>
      <br />
      <Link to="/Page/RegisterScreen/">Register Screen </Link>
      <br />
      <Link to="/Page/AttendancePage/">Attendance Page </Link>
      <br />
      <Link to="/Page/AnnouncementPage/">Announcement Page </Link>
      <br />
      <Link to="/Page/MessagesPage/">Messages Page </Link>
      <br />
      <Link to="/Page/NotificationsPage/">Notifications Page </Link>
      <br />
      <Link to="/Page/RequirementsPage/">Requirements Page </Link>


      {links.map((link) => (
        <div key={link.path}>

          <Link to={link.path}>
            {link.name}
          </Link>

          <br />

        </div>
      ))}


    </div>
  );
}




