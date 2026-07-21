import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import applicants from "./applicantsData";



const STATUS_STYLES = {
  Verified: { bg: "var(--green-light)", fg: "var(--green)", dot: "var(--green)" },
  Pending: { bg: "var(--gold-light)", fg: "#8A6B00", dot: "var(--gold)" },
  Rejected: { bg: "var(--red-light)", fg: "var(--red)", dot: "var(--red)" },
};

function initialsOf(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function ApplicantDetails() {
  const navigate = useNavigate();
  const { applicantId } = useParams();

  const applicant = applicants.find(
    (item) => String(item.id) === String(applicantId)
  );

  const [decision, setDecision] = useState(null); // 'accepted' | 'shortlisted' | 'rejected'
  const [notes, setNotes] = useState("");

  const handleBack = () => navigate("/component-4");

  if (!applicant) {
    return (
      <div className="ad-notfound">
        <style>{CSS}</style>
        <div className="ad-notfound__card">
          <h2>Applicant not found</h2>
          <p>This profile may have been removed or the link is out of date.</p>
          <button className="ad-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to application list
            </button>
        </div>
      </div>
    );
  }

  const skills = applicant.skills || [];
  const documents = applicant.documents || [];
  const coverLetter = applicant.coverLetter || "No cover letter was submitted for this application.";

  return (
    <div className="ad">
      <style>{CSS}</style>

      <div className="ad__topbar">
        <button className="ad-back" onClick={handleBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to applicants
        </button>
      </div>

      <div className="ad__grid">
        {/* ---------- Left: profile card ---------- */}
        <aside className="ad-profile">
          <div className="ad-profile__letterhead">
            <span className="ad-profile__eyebrow">Applicant Record</span>
          </div>

          <div className="ad-profile__body">
            <div className="ad-avatar" aria-hidden="true">
              {initialsOf(applicant.name) || (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>

            <h1 className="ad-name">{applicant.name}</h1>
            <p className="ad-course">{applicant.course}</p>

            <dl className="ad-contact">
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${applicant.email}`}>{applicant.email}</a></dd>
              </div>
              {applicant.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{applicant.phone}</dd>
                </div>
              )}
              <div>
                <dt>Applied for</dt>
                <dd className="ad-strong">{applicant.position}</dd>
              </div>
            </dl>

            <div className="ad-stats">
              <div className="ad-stat">
                <span className="ad-stat__value">{applicant.gwa ?? "—"}</span>
                <span className="ad-stat__label">GWA</span>
              </div>
            </div>
          </div>

          <div className="ad-docs">
            <h2 className="ad-section-title">Documents</h2>
            {documents.length === 0 && (
              <p className="ad-empty">No documents uploaded yet.</p>
            )}
            <ul className="ad-doc-list">
              {documents.map((doc, i) => {
                const s = STATUS_STYLES[doc.status] || STATUS_STYLES.Pending;
                return (
                  <li key={i} className="ad-doc">
                    <span className="ad-doc__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </span>
                    <span className="ad-doc__name">{doc.name}</span>
                    <span
                      className="ad-badge"
                      style={{ background: s.bg, color: s.fg }}
                    >
                      <i style={{ background: s.dot }} />
                      {doc.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ---------- Right: skills, cover letter, decision ---------- */}
        <section className="ad-main">
          <div className="ad-card">
            <h2 className="ad-section-title">Skills</h2>
            {skills.length === 0 ? (
              <p className="ad-empty">No skills listed.</p>
            ) : (
              <ul className="ad-skills">
                {skills.map((skill, i) => (
                  <li key={i} className="ad-skill-chip">{skill}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="ad-card">
            <h2 className="ad-section-title">Cover letter</h2>
            <p className="ad-coverletter">{coverLetter}</p>
          </div>

          <div className="ad-card">
            <h2 className="ad-section-title">Review decision</h2>
            <label className="ad-notes-label" htmlFor="ad-notes">Notes / feedback</label>
            <textarea
              id="ad-notes"
              className="ad-notes"
              placeholder="Optional notes for this applicant…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="ad-actions">
              <button
                className={`ad-btn ad-btn--accept ${decision === "accepted" ? "is-active" : ""}`}
                onClick={() => setDecision("accepted")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Accept
              </button>
              <button
                className={`ad-btn ad-btn--shortlist ${decision === "shortlisted" ? "is-active" : ""}`}
                onClick={() => setDecision("shortlisted")}
              >
                <svg viewBox="0 0 24 24" fill={decision === "shortlisted" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 2 15 9l7 1-5 5 1.5 7L12 18l-6.5 4L7 15l-5-5 7-1z" />
                </svg>
                Shortlist
              </button>
              <button
                className={`ad-btn ad-btn--reject ${decision === "rejected" ? "is-active" : ""}`}
                onClick={() => setDecision("rejected")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                Reject
              </button>
            </div>

            {decision && (
              <p className="ad-decision-note">
                Marked as <strong>{decision}</strong>
                {notes ? " with notes attached." : "."}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const CSS = `

.ad, .ad-notfound {
  --maroon: #7A1B2E;
  --maroon-dark: #55101F;
  --maroon-light: #F4E7EA;
  --gold: #C9A227;
  --gold-light: #FBF1D6;
  --ink: #23262B;
  --ink-soft: #6B7178;
  --paper: #F3F4F6;
  --card: #FFFFFF;
  --line: #E5E7EB;
  --green: #1E7A4C;
  --green-light: #E4F5EC;
  --red: #B3261E;
  --red-light: #FBE9E7;

  font-family: 'Inter', -apple-system, sans-serif;
  color: var(--ink);
  background: var(--paper);
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  box-sizing: border-box;
  margin: 0;
  padding: 16px 20px;
}
.ad *, .ad-notfound * { box-sizing: border-box; }

.ad__topbar { width: 100%; margin: 0 0 16px; }

.ad-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--card);
  border: 1px solid var(--line);
  color: var(--ink);
  font: 600 13.5px 'Inter', sans-serif;
  padding: 9px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: border-color .15s ease, transform .15s ease;
}
.ad-back:hover { border-color: var(--maroon); transform: translateX(-2px); }
.ad-back svg { width: 16px; height: 16px; }

.ad__grid {
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 22px;
  align-items: start;
}
@media (max-width: 860px) {
  .ad__grid { grid-template-columns: 1fr; }
}

/* ---- profile card ---- */
.ad-profile {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  position: sticky;
  top: 16px;
}
.ad-profile__letterhead {
  background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
  padding: 12px 20px;
  border-bottom: 3px solid var(--gold);
}
.ad-profile__eyebrow {
  color: #F3D9DE;
  font: 700 11px/1 'Inter', sans-serif;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.ad-profile__body { padding: 24px 22px 6px; text-align: center; }

.ad-avatar {
  width: 68px;
  height: 68px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: var(--maroon-light);
  color: var(--maroon);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 700 22px 'Fraunces', serif;
  border: 2px solid var(--gold);
}
.ad-avatar svg { width: 30px; height: 30px; }

.ad-name {
  font: 600 22px/1.2 'Fraunces', serif;
  margin: 0 0 2px;
}
.ad-course {
  color: var(--ink-soft);
  font-size: 13.5px;
  margin: 0 0 18px;
}

.ad-contact {
  text-align: left;
  border-top: 1px solid var(--line);
  padding-top: 14px;
  margin: 0 0 18px;
  display: grid;
  gap: 10px;
}
.ad-contact dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--ink-soft);
  margin-bottom: 2px;
}
.ad-contact dd { margin: 0; font-size: 14px; }
.ad-contact a { color: var(--maroon); text-decoration: none; font-weight: 600; }
.ad-contact a:hover { text-decoration: underline; }
.ad-strong { font-weight: 700; }

.ad-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: var(--paper);
  border-radius: 12px;
  padding: 14px 10px;
  margin-bottom: 4px;
}
.ad-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.ad-stat__value { font: 700 20px 'Fraunces', serif; color: var(--maroon-dark); }
.ad-stat__label { font-size: 10.5px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: .05em; }

.ad-docs { padding: 18px 22px 22px; border-top: 1px solid var(--line); }

.ad-section-title {
  font: 700 12.5px 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--ink-soft);
  margin: 0 0 8px;
}

.ad-doc-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.ad-doc {
  display: flex;
  align-items: center;
  gap: 9px;
  background: var(--paper);
  border-radius: 10px;
  padding: 9px 10px;
}
.ad-doc__icon { color: var(--ink-soft); flex-shrink: 0; }
.ad-doc__icon svg { width: 16px; height: 16px; }
.ad-doc__name { flex: 1; font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.ad-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: 700 10.5px 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: .04em;
  padding: 4px 9px;
  border-radius: 999px;
  flex-shrink: 0;
}
.ad-badge i { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }

/* ---- right column ---- */
.ad-main {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ad-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px 20px;
}

.ad-skills { list-style: none; display: flex; flex-wrap: wrap; gap: 9px; margin: 0; padding: 0; }
.ad-skill-chip {
  background: var(--maroon-light);
  color: var(--maroon-dark);
  font: 600 13px 'Inter', sans-serif;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid #ecd3d8;
}

.ad-coverletter {
  font-size: 14.5px;
  line-height: 1.55;
  color: #3A3F45;
  margin: 0;
  white-space: pre-line;
}

.ad-empty { color: var(--ink-soft); font-size: 13.5px; font-style: italic; margin: 0; }

.ad-notes-label {
  display: block;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--ink-soft);
  margin-bottom: 8px;
}
.ad-notes {
  width: 100%;
  resize: vertical;
  height: 160px;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 8px 12px;
  font: 400 14px/1.5 'Inter', sans-serif;
  color: var(--ink);
  background: var(--paper);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.ad-notes:focus {
  border-color: var(--maroon);
  box-shadow: 0 0 0 3px var(--maroon-light);
}

.ad-actions { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }

.ad-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 700 13.5px 'Inter', sans-serif;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
}
.ad-btn:hover { transform: translateY(-1px); }
.ad-btn svg { width: 15px; height: 15px; }
.ad-btn:focus-visible { outline: 2px solid var(--maroon); outline-offset: 2px; }

.ad-btn--accept {
  background: var(--green);
  color: #fff;
}
.ad-btn--accept.is-active { box-shadow: 0 0 0 3px var(--green-light); }

.ad-btn--shortlist {
  background: #fff;
  color: #8A6B00;
  border-color: var(--gold);
}
.ad-btn--shortlist.is-active { background: var(--gold-light); }

.ad-btn--reject {
  background: #fff;
  color: var(--red);
  border-color: #EFC6C1;
}
.ad-btn--reject.is-active { background: var(--red-light); }

.ad-btn--ghost {
  background: var(--card);
  color: var(--ink);
  border-color: var(--line);
}

.ad-decision-note {
  margin: 14px 0 0;
  font-size: 13px;
  color: var(--ink-soft);
}
.ad-decision-note strong { color: var(--ink); text-transform: capitalize; }

/* ---- not found state ---- */
.ad-notfound {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
}
.ad-notfound__card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 40px 44px;
  text-align: center;
  max-width: 360px;
}
.ad-notfound__card h2 { font: 600 22px 'Fraunces', serif; margin: 0 0 8px; }
.ad-notfound__card p { color: var(--ink-soft); font-size: 14px; margin: 0 0 20px; }
`;
