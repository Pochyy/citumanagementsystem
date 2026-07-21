import React from "react";

const avatarPalette = [
  { bg: "#f5e1fb", color: "#9333ea" },
  { bg: "#fef3c7", color: "#b45309" },
  { bg: "#e0edff", color: "#1d4ed8" },
  { bg: "#dcfce7", color: "#15803d" },
];

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const styles = {
  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },

  applicant: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  name: {
    fontWeight: 600,
  },

  appliedDate: {
    color: "#888",
    fontSize: "12px",
  },

  action: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  check: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#ecfdf3",
    color: "#17b26a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    background: "#22a35a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 18px",
    fontWeight: 600,
  },
};

const ShortlistedItem = ({ applicant, index }) => {
  const avatar = avatarPalette[index % avatarPalette.length];

  return (
    <tr>
      <td style={styles.td}>
        <div style={styles.applicant}>
          <div
            style={{
              ...styles.avatar,
              background: avatar.bg,
              color: avatar.color,
            }}
          >
            {initials(applicant.name)}
          </div>

          <div>
            <div style={styles.name}>{applicant.name}</div>
            <div style={styles.appliedDate}>
              {applicant.appliedDate}
            </div>
          </div>
        </div>
      </td>

      <td style={styles.td}>{applicant.appliedFor}</td>

      <td style={styles.td}>{applicant.shortlistedOn}</td>

      <td style={styles.td}>{applicant.school}</td>

      <td style={styles.td}>
        <div style={styles.action}>
          <div style={styles.check}>✓</div>

          <button style={styles.button}>
            {applicant.status}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ShortlistedItem;