import React from "react";
import { useNavigate } from "react-router-dom";

const avatarPalette = [
  { bg: "#e0edff", color: "#1d4ed8" },
  { bg: "#dcfce7", color: "#15803d" },
  { bg: "#fdf2f8", color: "#be185d" },
  { bg: "#fef3c7", color: "#b45309" },
  { bg: "#ede9fe", color: "#6d28d9" },
];

const statusStyles = {
  Pending: {
    bg: "#fef3e2",
    color: "#b45309",
  },

  Shortlisted: {
    bg: "#fef3c7",
    color: "#92620a",
  },

  Accepted: {
    bg: "#ecfdf3",
    color: "#067647",
  },
};

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
    cursor: "pointer",
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

  date: {
    color: "#888",
    fontSize: "12px",
  },

  badge: {
    padding: "5px 12px",
    borderRadius: "30px",
    fontWeight: 600,
    fontSize: "13px",
  },
};

export default function ApplicationItem({
  applicant,
  index,
}) {
  const navigate = useNavigate();

  const avatar =
    avatarPalette[index % avatarPalette.length];

  const status = statusStyles[applicant.status];

  return (
    <tr>
      <td style={styles.td}>
        <div
          style={styles.applicant}
          onClick={() =>
            navigate(`/component-4/${applicant.id}`)
          }
        >
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
            <div style={styles.name}>
              {applicant.name}
            </div>

            <div style={styles.date}>
              {applicant.appliedDate}
            </div>
          </div>
        </div>
      </td>

      <td style={styles.td}>
        {applicant.appliedFor}
      </td>

      <td style={styles.td}>
        {applicant.course}
      </td>

      <td style={styles.td}>
        {applicant.school}
      </td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            background: status.bg,
            color: status.color,
          }}
        >
          {applicant.status}
        </span>
      </td>
    </tr>
  );
}