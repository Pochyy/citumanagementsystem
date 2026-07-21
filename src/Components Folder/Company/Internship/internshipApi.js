// Talks to the Spring Boot backend for internship postings.
// Adjust API_BASE_URL if your backend runs on a different port.
const API_BASE_URL = "http://localhost:8080";

/**
 * Login only stores userId + role (see LoginScreen.jsx), not companyId.
 * This resolves userId -> companyId via GET /api/companies/by-user/{userId}
 * and caches it in localStorage so we don't hit the backend on every page load.
 */
export async function resolveCompanyId() {
  const cached = localStorage.getItem("companyId");
  if (cached) return Number(cached);

  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  const res = await fetch(`${API_BASE_URL}/api/companies/by-user/${userId}`);
  if (!res.ok) return null;

  const data = await res.json();
  if (data.companyId) {
    localStorage.setItem("companyId", data.companyId);
    return data.companyId;
  }
  return null;
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || message;
    } catch {
      // response wasn't JSON, keep default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function fetchInternships(companyId) {
  return request(`/api/internships/company/${companyId}`);
}

export function fetchInternshipStats(companyId) {
  return request(`/api/internships/company/${companyId}/stats`);
}

export function fetchInternshipById(internshipId) {
  return request(`/api/internships/${internshipId}`);
}

export function createInternship(companyId, payload) {
  return request(`/api/internships/company/${companyId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateInternshipStatus(internshipId, status) {
  return request(`/api/internships/${internshipId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function updateInternshipSlots(internshipId, availableSlots) {
  return request(`/api/internships/${internshipId}/slots`, {
    method: "PATCH",
    body: JSON.stringify({ availableSlots }),
  });
}