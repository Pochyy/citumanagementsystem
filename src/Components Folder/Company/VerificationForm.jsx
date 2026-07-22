import React, { useEffect, useState } from "react";
import UploadField from "./UploadField";
import PendingView from "./PendingView";
import VerifiedView from "./VerifiedView";
import CSS from "./verificationStyles";

const VERIFICATION_API = "http://localhost:8080/api/verification";

export default function VerificationForm() {
  const companyId = localStorage.getItem("companyId");

  const [statusData, setStatusData] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const [formData, setFormData] = useState({
    businessRegNo: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [files, setFiles] = useState({
    dtiCertificate: null,
    moaDocument: null,
    businessPermit: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setCheckingStatus(false);
      return;
    }
    fetch(`${VERIFICATION_API}/status/${companyId}`)
      .then((res) => res.json())
      .then((data) => setStatusData(data))
      .catch(() => setStatusData({ status: "NOT_SUBMITTED" }))
      .finally(() => setCheckingStatus(false));
  }, [companyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.businessRegNo || !formData.contactPerson || !formData.contactEmail) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!files.dtiCertificate || !files.moaDocument) {
      setError("Please upload the DTI Certificate and MOA document.");
      return;
    }
    if (!companyId) {
      setError("You must be logged in as a company to submit verification.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("companyId", companyId);
      body.append("businessRegNo", formData.businessRegNo);
      body.append("contactPerson", formData.contactPerson);
      body.append("contactEmail", formData.contactEmail);
      body.append("contactPhone", formData.contactPhone);
      body.append("dtiCertificate", files.dtiCertificate);
      body.append("moaDocument", files.moaDocument);
      if (files.businessPermit) body.append("businessPermit", files.businessPermit);

      const res = await fetch(VERIFICATION_API, { method: "POST", body });
      if (!res.ok) throw new Error("Submit failed");

      const saved = await res.json();
      setStatusData(saved);
    } catch (err) {
      setError("Failed to submit verification. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="verification-form">
        <style>{CSS}</style>
        <p>Loading…</p>
      </div>
    );
  }

  const status = statusData?.status;

  return (
    <>
      <style>{CSS}</style>
      <div className="verification-form">
        {status === "VERIFIED" && <VerifiedView data={statusData} />}

        {status === "PENDING" && <PendingView data={statusData} />}

        {(status === "REJECTED" || status === "NOT_SUBMITTED" || !status) && (
          <>
            <h1 className="verification-form__title">Verification</h1>
            <p className="verification-form__subtitle">
              Submit your company details and documents to get verified on the platform.
            </p>

            {status === "REJECTED" && (
              <div className="verification-form__error" style={{ marginBottom: 18 }}>
                Your previous submission was rejected
                {statusData?.remarks ? `: ${statusData.remarks}` : "."} Please resubmit below.
              </div>
            )}

            <form className="verification-form__card" onSubmit={handleSubmit}>
              <p className="verification-form__section-title">Business details</p>

              <div className="verification-form__field">
                <label className="verification-form__label" htmlFor="businessRegNo">
                  Business registration number <span>*</span>
                </label>
                <input
                  id="businessRegNo"
                  name="businessRegNo"
                  className="verification-form__input"
                  placeholder="e.g. DTI-000123456"
                  value={formData.businessRegNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="verification-form__row">
                <div className="verification-form__field" style={{ marginBottom: 0 }}>
                  <label className="verification-form__label" htmlFor="contactPerson">
                    Contact person <span>*</span>
                  </label>
                  <input
                    id="contactPerson"
                    name="contactPerson"
                    className="verification-form__input"
                    placeholder="Full name"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="verification-form__field" style={{ marginBottom: 0 }}>
                  <label className="verification-form__label" htmlFor="contactPhone">
                    Contact phone
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    className="verification-form__input"
                    placeholder="09xx xxx xxxx"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="verification-form__field">
                <label className="verification-form__label" htmlFor="contactEmail">
                  Contact email <span>*</span>
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  className="verification-form__input"
                  placeholder="you@company.com"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </div>

              <hr className="verification-form__divider" />
              <p className="verification-form__section-title">Required documents</p>

              <UploadField
                label="DTI / SEC Certificate"
                name="dtiCertificate"
                file={files.dtiCertificate}
                onChange={handleFileChange}
              />
              <div style={{ height: 12 }} />
              <UploadField
                label="Memorandum of Agreement (MOA)"
                name="moaDocument"
                file={files.moaDocument}
                onChange={handleFileChange}
              />
              <div style={{ height: 12 }} />
              <UploadField
                label="Business Permit (optional)"
                name="businessPermit"
                file={files.businessPermit}
                onChange={handleFileChange}
              />

              {error && <div className="verification-form__error">{error}</div>}

              <button
                type="submit"
                className="verification-form__submit"
                style={{ marginTop: 20 }}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit for verification"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}