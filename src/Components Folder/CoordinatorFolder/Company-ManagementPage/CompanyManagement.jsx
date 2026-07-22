import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
import CompanyGrid from "./CompanyGrid";
import CompanyDetail from "./CompanyDetail";

const colors = {
  maroon: "#7a1f2b",
  maroonDark: "#5e1720",
  orange: "#e8a24a",
  bg: "#f7f7f8",
};

const styles = {
  page: { width: "100%", minHeight: "100vh", backgroundColor: colors.bg, fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px", boxSizing: "border-box" },
  banner: { background: `linear-gradient(120deg, ${colors.maroonDark} 0%, ${colors.maroon} 55%, ${colors.orange} 100%)`, borderRadius: "12px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" },
  bannerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  backButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" },
  bannerTitle: { color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 },
  bannerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: "4px 0 0" },
  exportButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: colors.maroonDark, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: 500, padding: "9px 16px", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" },
};

// Fields map directly to the ERD's COMPANY entity:
// companyId (CompanyID), companyName (CompanyName), address (Address),
// contactPerson (ContactPerson), contactNumber (ContactNumber), email (Email),
// verificationStatus (VerificationStatus: Pending | Verified | Rejected)
// slotsFilled/slotsTotal are aggregated from that company's INTERNSHIP POSTING rows
// (SUM of applications accepted vs SUM of AvailableSlots) — not a raw COMPANY column.
export default function CompanyManagement() {
  const [companies, setCompanies] = useState([
    {
      companyId: 1,
      companyName: "Accenture Philippines",
      address: "Cebu IT Park, Cebu City",
      contactPerson: "Maria Santos",
      contactNumber: "+63 2 8988 8000",
      email: "hr@accenture.com.ph",
      verificationStatus: "Verified",
      slotsFilled: 4,
      slotsTotal: 5,
    },
    {
      companyId: 2,
      companyName: "Globe Telecom",
      address: "Ayala Center Cebu, Cebu City",
      contactPerson: "Juan Dela Cruz",
      contactNumber: "+63 2 7730 1000",
      email: "internship@globe.com.ph",
      verificationStatus: "Verified",
      slotsFilled: 3,
      slotsTotal: 5,
    },
    {
      companyId: 3,
      companyName: "PLDT",
      address: "Mandaue City, Cebu",
      contactPerson: "Anna Reyes",
      contactNumber: "+63 2 8816 8555",
      email: "internship@pldt.com",
      verificationStatus: "Pending",
      slotsFilled: 1,
      slotsTotal: 5,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/coordinator/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log("Error fetching companies:", err);
      });
  }, []);

  const filteredCompanies = companies.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.companyName.toLowerCase().includes(term) ||
      c.contactPerson.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  });

  const selectedCompany = companies.find((c) => c.companyId === selectedCompanyId) || null;

  const handleExport = () => {
    const headers = ["Company Name", "Address", "Contact Person", "Contact Number", "Email", "Verification Status", "Slots Filled", "Slots Total"];

    const rows = filteredCompanies.map((c) => [
      c.companyName,
      c.address,
      c.contactPerson,
      c.contactNumber,
      c.email,
      c.verificationStatus,
      c.slotsFilled,
      c.slotsTotal,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "partner_companies.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <div style={styles.bannerLeft}>
          {selectedCompany && (
            <button style={styles.backButton} onClick={() => setSelectedCompanyId(null)}>
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 style={styles.bannerTitle}>
              {selectedCompany ? "Company Record" : "Partner Company List"}
            </h1>
            <p style={styles.bannerSubtitle}>
              {selectedCompany ? "Company details and verification status" : "Accredited OJT partner companies"}
            </p>
          </div>
        </div>
        {!selectedCompany && (
          <button style={styles.exportButton} onClick={handleExport}>
            <Download size={14} />
            Export
          </button>
        )}
      </div>

      {selectedCompany ? (
        <CompanyDetail company={selectedCompany} />
      ) : (
        <CompanyGrid
          companies={filteredCompanies}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSelectCompany={setSelectedCompanyId}
        />
      )}
    </div>
  );
}