import React, { useState } from "react";
import SlotManagementItem from "./SlotManagementItem";

const initialInternships = [
  {
    id: 1,
    position: "Software Engineering Intern",
    taken: 3,
    slots: 5,
  },
  {
    id: 2,
    position: "UI/UX Design Intern",
    taken: 1,
    slots: 2,
  },
  {
    id: 3,
    position: "Data Analytics Intern",
    taken: 3,
    slots: 3,
  },
];

const styles = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    padding: "35px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  summaryRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    flex: 1,
    background: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  },

  label: {
    color: "#777",
    fontSize: "14px",
  },

  value: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#8b1e2b",
  },

  title: {
    color: "#8b1e2b",
    marginBottom: "20px",
  },
};

export default function SlotManagementPage() {
  const [internships, setInternships] =
    useState(initialInternships);

  const [drafts, setDrafts] = useState(
    Object.fromEntries(
      initialInternships.map((item) => [
        item.id,
        item.slots,
      ])
    )
  );

  const totalSlots = internships.reduce(
    (sum, item) => sum + item.slots,
    0
  );

  const slotsRemaining = internships.reduce(
    (sum, item) =>
      sum + Math.max(item.slots - item.taken, 0),
    0
  );

  const handleDraftChange = (id, value) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: Math.max(0, Number(value) || 0),
    }));
  };

  const handleStep = (id, amount) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: Math.max(
        0,
        (prev[id] || 0) + amount
      ),
    }));
  };

  const handleUpdate = (id) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              slots: drafts[id],
            }
          : item
      )
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.summaryRow}>
        <div style={styles.card}>
          <div style={styles.label}>Total Slots</div>
          <div style={styles.value}>{totalSlots}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>
            Slots Remaining
          </div>
          <div style={styles.value}>
            {slotsRemaining}
          </div>
        </div>
      </div>

      <h2 style={styles.title}>
        Slots by Internship
      </h2>

      {internships.map((internship) => (
        <SlotManagementItem
          key={internship.id}
          internship={internship}
          draft={drafts[internship.id]}
          onDraftChange={handleDraftChange}
          onStep={handleStep}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}