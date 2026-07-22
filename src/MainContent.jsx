import {Routes, Route} from 'react-router-dom';
import MotherScreen from "./MotherScreen/MotherScreen";
import ProfilePage from "./Components Folder/StudentFolder/Student-Profile-Page/ProfilePage";
import OpportunitiesPage from "./Components Folder/StudentFolder/OpportunitiesPage/OpportunitiesPage";
import MyInternshipsPage from "./Components Folder/StudentFolder/MyInternshipsPage/Myinternshipspage";
import Companyprofile from "./Components Folder/Company/Companyprofile";
import EditProfile from "./Components Folder/Company/EditProfile";

import VerificationStatus from "./Components Folder/Company/Verification/VerificationStatus";

import InternshipListing from "./Components Folder/Company/Internship/InternshipListings";
import CreateInternship from "./Components Folder/Company/Internship/CreateInternship";

import ApplicationList from "./Components Folder/Company/Application/ApplicationList";
import ApplicantDetails from "./Components Folder/Company/Application/ApplicantDetails";

import Shortlisted from "./Components Folder/Company/Shorlisted/Shortlisted";

import SlotManagement from "./Components Folder/Company/SlotManagement/SlotManagement";

import Certificates from "./Components Folder/Company/Certificates/Certificates";

import Messages from "./Components Folder/Company/Messages/Messages";

import Notifications from "./Components Folder/Company/Notification/Notifications";
import NotificationDetails from "./Components Folder/Company/Notification/NotificationDetails";


// ================= COORDINATOR PAGE IMPORTS =================
import CoordinatorProfile from "./Components Folder/CoordinatorFolder/Coordinator-ProfilePage/CoordinatorProfile";
import StudentManagement from "./Components Folder/CoordinatorFolder/Student-ManagementPage/StudentManagement";
import CompanyManagement from "./Components Folder/CoordinatorFolder/Company-ManagementPage/CompanyManagement";
import ProgressMonitoring from "./Components Folder/CoordinatorFolder/Progress-MonitoringPage/ProgressMonitoring";





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
        <Route path="/Page/StudentProfile/ProfileBox" element={<div>Component 1</div>} />
        <Route path="/Page/MotherScreen" element={<MotherScreen/>} />
        <Route path="/component-1" element={<Companyprofile/>} />
        <Route path="/component-1/edit" element={<EditProfile/>} />
        <Route path="/component-2" element={<VerificationStatus/>} />
        <Route path="/component-3" element={<InternshipListing/>} />
        <Route path="/component-3/post" element={<CreateInternship/>} />
        <Route path="/component-4" element={<ApplicationList/>} />
        <Route path="/component-4/:applicantId" element={<ApplicantDetails/>} />
        <Route path="/component-5" element={<Shortlisted/>} />
        <Route path="/component-6" element={<SlotManagement/>} />
        <Route path="/component-7" element={<Certificates/>} />
        <Route path="/component-8" element={<Messages/>} />
        <Route path="/component-9" element={<Notifications/>} />
        <Route path="/component-9/:notificationId" element={<NotificationDetails/>} />
        <Route path="/Page/CoordinatorProfile" element={<CoordinatorProfile/>} />
        <Route path="/Page/StudentManagement" element={<StudentManagement/>} />
        <Route path="/Page/CompanyManagement" element={<CompanyManagement/>} />
        <Route path="/Page/ProgressMonitoring" element={<ProgressMonitoring/>} />
        
      </Routes>



    </div>
  );
}

