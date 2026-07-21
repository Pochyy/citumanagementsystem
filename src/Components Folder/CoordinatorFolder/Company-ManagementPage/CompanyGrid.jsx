import { Search } from "lucide-react";
import CompanyCard from "./CompanyCard";

const colors = {
  cardBg: "#ffffff",
  border: "#eaeaec",
  textMuted: "#9a9aa2",
  textBody: "#4b4b52",
};

const styles = {
  searchCard: { backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "14px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", marginBottom: "20px" },
  searchInputWrap: { display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "9px 12px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px", color: colors.textBody },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0" },
  emptyState: { gridColumn: "1 / -1", textAlign: "center", padding: "48px 16px", color: colors.textMuted, fontSize: "13px", backgroundColor: colors.cardBg, border: `1px dashed ${colors.border}`, borderRadius: "12px" },
};

export default function CompanyGrid({ companies, searchTerm, onSearchChange, onSelectCompany }) {
  return (
    <>
      <div style={styles.searchCard}>
        <div style={styles.searchInputWrap}>
          <Search size={16} color={colors.textMuted} />
          <input
            style={styles.searchInput}
            placeholder="Search partner companies..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div style={styles.grid}>
        {companies.length === 0 ? (
          <div style={styles.emptyState}>No partner companies available yet.</div>
        ) : (
          companies.map((company) => (
            <CompanyCard key={company.companyId} company={company} onSelect={onSelectCompany} />
          ))
        )}
      </div>
    </>
  );
}