import { Link } from "react-router-dom";


export default function SideBar() {


  return (

    <div className="sidebar" 
    style={{
      width: '15%',
      height: '100vh',
      backgroundColor: 'white',
    }}>

      <h1>Mother Screen</h1>

      <Link to="/Page/MotherScreen">Mother Screen</Link>

      <h1>Component Links </h1>

      <Link to="/Page/StudentProfile/ProfilePage">Student Profile Page </Link>
      <br />
      <Link to="/Page/InternshipOpportunities/Opportunities">Opportunities Page </Link>
      <br />
      <Link to="/Page/MyInternships/">My Internships </Link>
      <br />
      <Link to="/Page/LoginScreen/">Login Screen </Link>
      <br />
      <Link to="/Page/RegisterScreen/">Register Screen </Link>

      


    </div>

      );


}