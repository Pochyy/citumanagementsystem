import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const VerificationContext = createContext(null);

export function VerificationProvider({ children }) {
  const [studentDocs, setStudentDocs] = useState([]);
  const [companyDocs, setCompanyDocs] = useState([]);
  const [counts, setCounts] = useState({
    studentPending: 0,
    studentVerified: 0,
    companyPending: 0,
    companyVerified: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const applyPayload = useCallback((payload) => {
    setStudentDocs(payload.studentDocs || []);
    setCompanyDocs(payload.companyDocs || []);
    setCounts(
      payload.counts || {
        studentPending: 0,
        studentVerified: 0,
        companyPending: 0,
        companyVerified: 0,
      }
    );
  }, []);

  const loadVerificationData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/verification`);
      if (!response.ok) {
        throw new Error("Unable to load verification records.");
      }

      applyPayload(await response.json());
    } catch (err) {
      setError(err.message || "Unable to connect to the verification API.");
    } finally {
      setLoading(false);
    }
  }, [applyPayload]);

  useEffect(() => {
    loadVerificationData();
  }, [loadVerificationData]);

  const updateDocumentStatus = useCallback(
    async (ownerType, id, status) => {
      setError("");

      const endpoint =
        ownerType === "student"
          ? `${API_BASE_URL}/api/verification/student-documents/${id}/status`
          : `${API_BASE_URL}/api/verification/company-documents/${id}/status`;

      try {
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error("Unable to update document status.");
        }

        applyPayload(await response.json());
      } catch (err) {
        setError(err.message || "Unable to update document status.");
      }
    },
    [applyPayload]
  );

  const value = useMemo(
    () => ({
      studentDocs,
      companyDocs,
      loading,
      error,
      refreshVerificationData: loadVerificationData,
      updateStudentDocStatus: (id, status) => updateDocumentStatus("student", id, status),
      updateCompanyDocStatus: (id, status) => updateDocumentStatus("company", id, status),
      studentPendingCount: counts.studentPending,
      studentVerifiedCount: counts.studentVerified,
      companyPendingCount: counts.companyPending,
      companyVerifiedCount: counts.companyVerified,
    }),
    [companyDocs, counts, error, loadVerificationData, loading, studentDocs, updateDocumentStatus]
  );

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerificationData() {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error("useVerificationData must be used inside a <VerificationProvider>");
  }
  return ctx;
}
