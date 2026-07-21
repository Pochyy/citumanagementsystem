import React from "react";

const departmentStyles = {
  Engineering: {
    background: "#eef2ff",
    color: "#4338ca",
  },

  Design: {
    background: "#fdf2f8",
    color: "#be185d",
  },

  "Data Science": {
    background: "#ecfdf5",
    color: "#047857",
  },
};

function initials(text) {
  return text
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

  role: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  title: {
    fontWeight: 600,
  },

  posted: {
    color: "#888",
    fontSize: "12px",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: 600,
    fontSize: "13px",
  },

  number: {
    fontWeight: 600,
  },
};

const InternshipList = ({ internship }) => {
  const deptStyle =
    departmentStyles[internship.department] || {
      background: "#eee",
      color: "#444",
    };

  return (
    <tr>
      <td style={styles.td}>
        <div style={styles.role}>
          <div
            style={{
              ...styles.avatar,
              background: deptStyle.background,
              color: deptStyle.color,
            }}
          >
            {initials(internship.position)}
          </div>

          <div>
            <div style={styles.title}>{internship.position}</div>

            <div style={styles.posted}>
              Posted {internship.postedDate}
            </div>
          </div>
        </div>
      </td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            background: deptStyle.background,
            color: deptStyle.color,
          }}
        >
          {internship.department}
        </span>
      </td>

      <td style={styles.td}>
        <span style={styles.number}>{internship.slots}</span>
      </td>

      <td style={styles.td}>
        <span style={styles.number}>{internship.applications}</span>
      </td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            background:
              internship.status === "Open"
                ? "#ecfdf3"
                : "#f2f4f7",
            color:
              internship.status === "Open"
                ? "#067647"
                : "#667085",
          }}
        >
          {internship.status}
        </span>
      </td>
    </tr>
  );
};

export default InternshipList;