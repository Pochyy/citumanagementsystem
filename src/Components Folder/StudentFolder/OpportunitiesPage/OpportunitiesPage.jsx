import React from "react";
import InternshipOpportunityCard from "./InternshipOpportunityCard";
// Reusable style objects for the InternshipOpportunitiesPage.
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
    fontSize: "24px",
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
    margin: "6px 0 28px 34px",
  },
  searchWrapper: {
    border: "1px solid #d9d9d9",
    borderRadius: "6px",
    padding: "14px 18px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchIcon: {
    color: "#b0b0b0",
    fontSize: "14px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#9a9a9a",
    backgroundColor: "transparent",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

// InternshipOpportunitiesPage
// Main page responsible for the overall layout: header, search/filter section,
// and the list of internship opportunity cards.
const InternshipOpportunitiesPage = () => {
  // Replace this temporary array with internship data fetched from the database/API
  // Example (once backend is connected):
  // const [internships, setInternships] = useState([]);
  // useEffect(() => {
  //   fetchInternships().then(setInternships);
  // }, []);
  const temporaryInternships = [
    {
      id: 1,
      title: "Software Development Intern",
      companyName: "Tech Innovations Inc.",
      companyLogo: null,
      description: "Join our development team to work on cutting-edge web applications.",
      location: "Cebu City, Philippines",
      duration: "3 Months",
      compensation: "₱15,000/month",
      requiredSkills: ["3rd or 4th Year", "Knowledge in React/Node.js", "Good communication skills"],
      status: "Onsite",
      postedDaysAgo: 2,
    },
    {
      id: 2,
      title: "Software Development Intern",
      companyName: "Tech Innovations Inc.",
      companyLogo: null,
      description: "Join our development team to work on cutting-edge web applications.",
      location: "Cebu City, Philippines",
      duration: "3 Months",
      compensation: "₱15,000/month",
      requiredSkills: [],
      status: "Onsite",
      postedDaysAgo: 2,
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <span style={styles.headerIcon}>💼</span>
        <h1 style={styles.headerTitle}>Internship Opportunities</h1>
      </div>
      <p style={styles.subtitle}>Browse and apply for available internship positions</p>

      {/* Future functionality: Search/filter section should connect to the database filtering/query system */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search for Opportunities..."
          style={styles.searchInput}
          onChange={() => {
            // Future functionality: trigger a filtered/query request to the backend as the user types
          }}
        />
      </div>

      <div style={styles.listWrapper}>
        {/* Later render internship opportunities using .map() over data fetched from the database/API */}
        {temporaryInternships.map((internship) => (
          <InternshipOpportunityCard key={internship.id} internship={internship} />
        ))}
      </div>

      {/*
        Future functionality: Pagination / Load More
        Once the database is connected, add a control here to retrieve additional
        internship records (either paginated requests or infinite scroll).
        Example:
        <button style={styles.loadMoreButton} onClick={() => fetchMoreInternships()}>
          Load More
        </button>
      */}
    </div>
  );
};

export default InternshipOpportunitiesPage;