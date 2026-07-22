import React from "react";
import Internshiplist from "./Internshiplist";

// Reusable style objects for the MyInternshipPage.
// Keeping these at the top makes the JSX below easier to read and maintain.
const styles = {
  page: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerIcon: {
    fontSize: "22px",
    color: "#8b1e2b",
  },
  headerTitle: {
    color: "#8b1e2b",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#8a8a8a",
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    margin: "6px 0 28px 32px",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

// MyInternshipPage
// Main page responsible for the overall layout: header section and the list
// of the student's internship applications, each rendered with InternshipList.
const MyInternshipPage = () => {
  // Replace this temporary internship array with database/API response
  // Example (once backend is connected):
  // const [internships, setInternships] = useState([]);
  // useEffect(() => {
  //   fetchMyInternships().then(setInternships);
  // }, []);
  const temporaryInternships = [
    {
      id: 1,
      positionTitle: "Software Development Intern",
      companyName: "Tech Innovations Inc.",
      department: "Engineering",
      appliedDate: "June 25, 2026",
      lastUpdatedDate: "June 27, 2026",
      applicationStatus: "Under Review",
      progressPercent: 60,
      availableSlots: 3,
      duration: "3 Months",
      startDate: "August 1, 2026",
      applicationDeadline: "July 20, 2026",
      workSetup: "Onsite",
      jobDescription:
        "Join our development team to work on cutting-edge web applications, collaborating with senior engineers on real product features.",
      requiredSkills: ["3rd or 4th Year", "Knowledge in React/Node.js", "Good communication skills"],
    },
    {
      id: 2,
      positionTitle: "Software Development Intern",
      companyName: "Tech Innovations Inc.",
      department: "Engineering",
      appliedDate: "June 25, 2026",
      lastUpdatedDate: "June 27, 2026",
      applicationStatus: "Under Review",
      progressPercent: 70,
      availableSlots: 3,
      duration: "3 Months",
      startDate: "August 1, 2026",
      applicationDeadline: "July 20, 2026",
      workSetup: "Onsite",
      jobDescription:
        "Join our development team to work on cutting-edge web applications, collaborating with senior engineers on real product features.",
      requiredSkills: ["3rd or 4th Year", "Knowledge in React/Node.js", "Good communication skills"],
    },
    {
      id: 3,
      positionTitle: "Software Development Intern",
      companyName: "Tech Innovations Inc.",
      department: "Engineering",
      appliedDate: "June 25, 2026",
      lastUpdatedDate: "June 27, 2026",
      applicationStatus: "Under Review",
      progressPercent: 40,
      availableSlots: 3,
      duration: "3 Months",
      startDate: "August 1, 2026",
      applicationDeadline: "July 20, 2026",
      workSetup: "Onsite",
      jobDescription:
        "Join our development team to work on cutting-edge web applications, collaborating with senior engineers on real product features.",
      requiredSkills: ["3rd or 4th Year", "Knowledge in React/Node.js", "Good communication skills"],
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>📄</span>
        <h1 style={styles.headerTitle}>My Applications</h1>
      </div>
      <p style={styles.subtitle}>Track the status of your internship applications</p>

      {/* Future functionality: Search/filter controls should query internship records from the database */}
      {/* (No search/filter section is shown in this design, add here if introduced later) */}

      <div style={styles.listWrapper}>
        {/* Later render internship listings using .map() over data fetched from the database/API */}
        {temporaryInternships.map((internship) => (
          <Internshiplist key={internship.id} internship={internship} />
        ))}
      </div>

      {/*
        Future functionality: Status updates
        Once connected, this page (or InternshipList) should periodically retrieve
        the current application/internship progress from the backend, e.g. via
        polling, websockets, or a refresh action.
      */}
    </div>
  );
};

export default MyInternshipPage;