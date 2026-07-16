import {Routes, Route} from 'react-router-dom';
import MotherScreen from "./MotherScreen/MotherScreen";
import ProfilePage from "./Components Folder/StudentFolder/Student-Profile-Page/ProfilePage";
import OpportunitiesPage from "./Components Folder/StudentFolder/OpportunitiesPage/OpportunitiesPage";
import MyInternshipsPage from "./Components Folder/StudentFolder/MyInternshipsPage/Myinternshipspage";
import LoginScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Login";
import RegisterScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Logout";



export default function MainContent() {
  return (
    <div className="main-content"
    
    style={{
      width: '80%',
      height: '100vh',
      backgroundColor: 'grey',
    }}>

        
      <Routes>
        <Route path="/Page/StudentProfile/ProfileBox" element={<div>Component 1</div>} />
        <Route path="/Page/MotherScreen" element={<MotherScreen/>} />
        <Route path="/Page/StudentProfile/ProfilePage" element={<ProfilePage/>} />
        <Route path="/Page/InternshipOpportunities/Opportunities" element={<OpportunitiesPage/>} />
        <Route path="/Page/MyInternships/" element={<MyInternshipsPage/>} />
        <Route path="/Page/LoginScreen/" element={<LoginScreen/>} />
        <Route path="/Page/RegisterScreen/" element={<RegisterScreen/>} />
        
      </Routes>



    </div>
  );
}

