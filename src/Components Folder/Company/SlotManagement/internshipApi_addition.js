export function fetchInternshipById(internshipId) {
  return request(`/api/internships/${internshipId}`);
}

export function updateInternshipSlots(internshipId, availableSlots) {
  return request(`/api/internships/${internshipId}/slots`, {
    method: "PATCH",
    body: JSON.stringify({ availableSlots }),
  });
}
