const APPLICATIONS_API = "http://localhost:8080/api/applications";

export async function getAllApplicants() {
  const res = await fetch(APPLICATIONS_API);
  if (!res.ok) throw new Error("Failed to load applications");
  return res.json();
}

export async function getApplicantById(id) {
  const all = await getAllApplicants();
  return all.find((a) => String(a.id) === String(id));
}

export async function decideApplicant(id, decision, notes = "") {
  if (decision === "rejected") {
    await fetch(`${APPLICATIONS_API}/${id}`, { method: "DELETE" });
    return;
  }
  const status = decision === "accepted" ? "Accepted" : "Shortlisted";
  await fetch(`${APPLICATIONS_API}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, notes }),
  });
}

// Called from the Opportunities page "Apply Now" button.
export async function submitApplication(internship) {
  const studentId = localStorage.getItem("studentId");
  if (!studentId) throw new Error("You must be logged in to apply.");

  const res = await fetch(APPLICATIONS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: studentId,
      internshipId: internship.id,
    }),
  });

  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
} 