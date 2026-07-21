// src/config/sidebarLinks.jsx

const sidebarLinks = {
  STUDENT: [
    { name: "Profile", path: "/component-10" },       // ProfilePage
    { name: "Dashboard", path: "/component-1" },       // placeholder — confirm which component is Student dashboard
    { name: "Requirements", path: "/component-7" },    // Certificates? confirm
    { name: "Internships", path: "/component-3" },     // InternshipListing
  ],

  COMPANY: [
    { name: "Dashboard", path: "/component-1" },       // Companyprofile? confirm
    { name: "Company Profile", path: "/component-1" },
    { name: "Verification", path: "/component-2" },    // VerificationStatus
    { name: "Internships", path: "/component-3" },      // InternshipListing
    { name: "Applications", path: "/component-4" },     // ApplicationList
    { name: "Shortlisted", path: "/component-5" },      // Shortlisted
    { name: "Slots", path: "/component-6" },            // SlotManagement
    { name: "Certificates", path: "/component-7" },     // Certificates
    { name: "Messages", path: "/component-8" },         // Messages
    { name: "Notifications", path: "/component-9" },    // Notifications
  ],

  COORDINATOR: [
    { name: "Dashboard", path: "/component-1" },        // placeholder — confirm
    { name: "Student Management", path: "/component-4" }, // placeholder — confirm
  ],
};

export default sidebarLinks;