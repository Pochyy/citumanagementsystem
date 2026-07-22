import React, { useEffect, useState } from "react";
import CompanyStats from "./CompanyStats"; 
const API_BASE = "http://localhost:8080/api/company";


const profileFields = [
  { key: "companyName", label: "Company Name" },
  { key: "tagline", label: "Tagline" },
  { key: "industry", label: "Industry" },
  { key: "companySize", label: "Company Size" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "about", label: "About", isTextArea: true },
];

const emptyCompany = {
  id: null,
  companyName: "",
  tagline: "",
  industry: "",
  companySize: "",
  email: "",
  website: "",
  phone: "",
  about: "",
  address: "",
};

export default function CompanyProfile() {
  const [company, setCompany] = useState(emptyCompany);
  const [formValues, setFormValues] = useState(emptyCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      loadCompany();
    } else {
      setIsLoading(false);
      setErrorMessage("You must be logged in to view this page.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCompany = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_BASE}/${userId}`, {
        credentials: "include", // send the session cookie set at login
      });

      if (res.status === 403) {
        throw new Error(
          "Access denied loading your company profile (403). Your session may have expired - try logging in again."
        );
      }

      if (!res.ok) {
        throw new Error(`Failed to load company profile (server responded ${res.status}).`);
      }

      
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      const loaded = data ?? emptyCompany;
      setCompany(loaded);
      setFormValues(loaded);
    } catch (err) {
      
      const message =
        err instanceof TypeError
          ? "Couldn't reach the server. Make sure the backend is running and check your CORS/port settings."
          : err.message || "Something went wrong loading your profile.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = () => {
    setFormValues(company);
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormValues(company);
    setIsEditing(false);
    setErrorMessage(null);
  };

  const handleSaveClick = async () => {
    if (!userId) {
      setErrorMessage("You need to be logged in to save your company profile.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      // The Company row is created at registration, so this always updates it.
      const res = await fetch(`${API_BASE}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send the session cookie set at login
        body: JSON.stringify(formValues),
      });
      if (res.status === 403) {
        throw new Error(
          "Access denied saving your company profile (403). Your session may have expired - try logging in again."
        );
      }
      if (!res.ok) {
        throw new Error(`Failed to save company profile (server responded ${res.status}).`);
      }
      const saved = await res.json();
      setCompany(saved);
      setFormValues(saved);
      setIsEditing(false);
      setSuccessMessage("Profile saved.");
    } catch (err) {
      const message =
        err instanceof TypeError
          ? "Couldn't reach the server. Make sure the backend is running and check your CORS/port settings."
          : err.message || "Something went wrong saving your profile.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <style>{baseStyles}</style>
        <div className="company-profile">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{baseStyles}</style>

      <div className="company-profile">
        {/* ================= HEADER ================= */}
        <div className="header">
          <div className="avatar">
            <svg viewBox="0 0 100 100" width="55">
              <circle cx="50" cy="35" r="18" fill="none" stroke="#111" strokeWidth="3" />
              <path
                d="M20 90c2-22 18-32 30-32s28 10 30 32"
                fill="none"
                stroke="#111"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="title">
            <h1>{company.companyName || "Set up your company"}</h1>
            <p>{company.tagline || "Add a tagline to introduce your company"}</p>
          </div>

          {!isEditing ? (
            <button className="edit-btn" onClick={handleEditClick}>
              ✎ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={handleCancelClick} disabled={isSaving}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveClick} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {(errorMessage || successMessage) && (
          <div className={`status-banner ${errorMessage ? "status-error" : "status-success"}`}>
            {errorMessage || successMessage}
          </div>
        )}

        {/* ================= BODY ================= */}
        {isEditing ? (
          <section className="card">
            <h2>Edit Company Details</h2>
            <div className="edit-grid">
              {profileFields.map((field) => (
                <div
                  key={field.key}
                  className={field.isTextArea ? "field-group field-wide" : "field-group"}
                >
                  <label className="field-label" htmlFor={field.key}>
                    {field.label}
                  </label>
                  {field.isTextArea ? (
                    <textarea
                      id={field.key}
                      className="field-textarea"
                      value={formValues[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      id={field.key}
                      type="text"
                      className="field-input"
                      value={formValues[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <div className="grid">
              <section className="card">
                <h2>Company Information</h2>
                <Info label="Industry" value={company.industry} />
                <Info label="Email" value={company.email} />
                <Info label="Company Size" value={company.companySize} />
                <Info label="Website" value={company.website} />
                <Info label="Phone" value={company.phone} />
              </section>

              <section className="card">
                <h2>About</h2>
                <p className="text">{company.about || "-"}</p>
              </section>

              <section className="card address-card">
                <h2>Address</h2>
                <p className="text">{company.address || "-"}</p>
              </section>
            </div>

            {/* Stats are now owned by CompanyStats, which fetches its own data */}
            <CompanyStats />
          </>
        )}
      </div>
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="value">{value || "-"}</div>
    </div>
  );
}

const baseStyles = `
.company-profile{
    width:100%;
    height:100%;
    padding:35px;
    background:#f5f7fb;
    border-radius:18px;
    overflow:auto;
    box-sizing:border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header{
    display:flex;
    align-items:center;
    gap:20px;
    padding:25px;
    background:white;
    border-radius:18px;
    margin-bottom:25px;
    box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.avatar{
    width:85px;
    height:85px;
    border-radius:50%;
    background:#fafafa;
    border:3px solid #8b1d23;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
}

.title{
  flex:1;
  min-width:0;
}

.title h1{
  margin:0;
}

.title p{
  margin-top:5px;
  color:#666;
}

.edit-btn{
    background:#8b1d23;
    color:white;
    border:none;
    padding:12px 24px;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    transition:.3s;
    white-space:nowrap;
}

.edit-btn:hover{
    background:#6e1116;
}

.edit-actions{
  display:flex;
  gap:10px;
}

.cancel-btn{
    background:white;
    color:#8a8a8a;
    border:2px solid #d8d8d8;
    padding:10px 22px;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    white-space:nowrap;
}

.save-btn{
    background:#8b1d23;
    color:white;
    border:2px solid #8b1d23;
    padding:10px 22px;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    white-space:nowrap;
}

.save-btn:disabled, .cancel-btn:disabled{
  opacity:.6;
  cursor:not-allowed;
}

.status-banner{
  padding:14px 20px;
  border-radius:12px;
  margin-bottom:20px;
  font-weight:600;
  font-size:14px;
}

.status-error{
  background:#fdecea;
  color:#b23f41;
}

.status-success{
  background:#e9f7ef;
  color:#2e9e5b;
}

.grid{
    display:grid;
    grid-template-columns:2fr 1fr;
    gap:20px;
    margin-top:20px;
}

.card{
    background:white;
    border:none;
    border-radius:18px;
    padding:24px;
    box-shadow:0 8px 18px rgba(0,0,0,.08);
}

.address-card{
    grid-column:1 / 3;
}

.card h2{
  margin-top:0;
}

.label{
    color:#777;
    font-size:13px;
    margin-top:15px;
}

.value{
    font-size:16px;
    font-weight:600;
}

.text{
  line-height:1.6;
  white-space: pre-wrap;
}

.stats{
  margin-top:20px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:18px;
}

.stat{
    background:white;
    border-left:6px solid #8b1d23;
    border-radius:15px;
    padding:25px;
    text-align:center;
    box-shadow:0 6px 18px rgba(0,0,0,.08);
}

.stat strong{
    display:block;
    font-size:40px;
    color:#8b1d23;
}

.stats-error{
  margin-top:20px;
  color:#b23f41;
  font-weight:600;
}

.edit-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px;
  margin-top:10px;
}

.field-group{
  display:flex;
  flex-direction:column;
}

.field-wide{
  grid-column:1 / 3;
}

.field-label{
  font-size:13px;
  font-weight:700;
  color:#8b1d23;
  margin-bottom:6px;
}

.field-input{
  height:42px;
  border-radius:8px;
  border:1px solid #e0e0e0;
  background:#f5f7fb;
  padding:0 14px;
  font-size:14px;
  outline:none;
  box-sizing:border-box;
}

.field-input:focus{
  border-color:#8b1d23;
}

.field-textarea{
  min-height:100px;
  border-radius:8px;
  border:1px solid #e0e0e0;
  background:#f5f7fb;
  padding:12px 14px;
  font-size:14px;
  outline:none;
  box-sizing:border-box;
  resize:vertical;
  font-family:inherit;
}

.field-textarea:focus{
  border-color:#8b1d23;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .address-card {
    grid-column: auto;
  }

  .edit-grid{
    grid-template-columns: 1fr;
  }

  .field-wide{
    grid-column: auto;
  }

  .header{
    flex-wrap:wrap;
  }
}
`;