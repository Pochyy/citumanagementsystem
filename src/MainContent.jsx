import {Routes, Route, Outlet} from 'react-router-dom';
import MotherScreen from "./MotherScreen/MotherScreen";
import ProfilePage from "./Components Folder/StudentFolder/Student-Profile-Page/ProfilePage";
import OpportunitiesPage from "./Components Folder/StudentFolder/OpportunitiesPage/OpportunitiesPage";
import MyInternshipsPage from "./Components Folder/StudentFolder/MyInternshipsPage/Myinternshipspage";
import Companyprofile from "./Components Folder/Company/Companyprofile";
import EditProfile from "./Components Folder/Company/EditProfile";
import VerificationStatus from "./Components Folder/Company/VerificationStatus";
import InternshipListing from "./Components Folder/Company/InternshipListings";
import CreateInternship from "./Components Folder/Company/CreateInternship";
import ApplicationList from "./Components Folder/Company/ApplicationList";
import ApplicantDetails from "./Components Folder/Company/ApplicantDetails";
import Shortlisted from "./Components Folder/Company/Shortlisted";
import SlotManagement from "./Components Folder/Company/SlotManagement";
import Certificates from "./Components Folder/Company/Certificates";
import Messages from "./Components Folder/Company/Messages";
import Notifications from "./Components Folder/Company/Notifications";
import NotificationDetails from "./Components Folder/Company/NotificationDetails";
import LoginScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Login";
import RegisterScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Logout";
import NotificationsPage from "./Components Folder/CoordinatorFolder/Notifications-Page/Notifications";
import Messaging from "./Components Folder/CoordinatorFolder/Messaging-Page/Messaging";
import DocumentVerification from "./Components Folder/CoordinatorFolder/Verification-Page/DocumentVerification";
import StudentRequirmentVerification from "./Components Folder/CoordinatorFolder/Verification-Page/StudentRequirmentVerification";
import CompanyDocumentVerification from "./Components Folder/CoordinatorFolder/Verification-Page/CompanyDocumentVerification";
import { VerificationProvider } from "./Components Folder/CoordinatorFolder/Verification-Page/VerificationContext";



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

        {/* These pages render INSIDE MotherScreen's header + red sidebar shell
            (via MotherScreen's <Outlet/>), same as the Coordinator Profile screenshot. */}
        <Route element={<MotherScreen/>}>
          <Route path="/Page/Messaging" element={<Messaging/>} />
          <Route path="/Page/Notifications" element={<NotificationsPage/>} />
          <Route element={<VerificationProvider><Outlet /></VerificationProvider>}>
            <Route path="/Page/Verification/DocumentVerification" element={<DocumentVerification/>} />
            <Route path="/Page/Verification/StudentRequirmentVerification" element={<StudentRequirmentVerification/>} />
            <Route path="/Page/Verification/CompanyDocumentVerification" element={<CompanyDocumentVerification/>} />
          </Route>
        </Route>

        
      </Routes>



    </div>
  );
}

