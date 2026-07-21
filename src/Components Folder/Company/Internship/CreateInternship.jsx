import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveCompanyId, createInternship } from "./internshipApi";

const initialForm = {
  positionTitle: "",
  department: "",
  availableSlots: "1",
  duration: "",
  startDate: "",
  applicationDeadline: "",
  jobDescription: "",
  requiredSkills: [],
  workSetup: "",
};

const DESCRIPTION_LIMIT = 600;

export default function CreateInternship({ onSubmit }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [posted, setPosted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const markTouched = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const adjustSlots = (delta) => {
    setForm((prev) => {
      const current = parseInt(prev.availableSlots, 10) || 0;
      const next = Math.min(50, Math.max(1, current + delta));
      return { ...prev, availableSlots: String(next) };
    });
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    setForm((prev) =>
      prev.requiredSkills.some((s) => s.toLowerCase() === value.toLowerCase())
        ? prev
        : { ...prev, requiredSkills: [...prev.requiredSkills, value] }
    );
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    } else if (e.key === "Backspace" && !skillInput && form.requiredSkills.length) {
      removeSkill(form.requiredSkills[form.requiredSkills.length - 1]);
    }
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.positionTitle.trim()) e.positionTitle = "Enter a position title.";
    if (!form.department) e.department = "Select a department.";
    if (!form.availableSlots || Number(form.availableSlots) < 1)
      e.availableSlots = "Enter at least 1 slot.";
    if (!form.duration) e.duration = "Select a duration.";
    if (!form.startDate) e.startDate = "Choose a start date.";
    if (!form.applicationDeadline) e.applicationDeadline = "Choose a deadline.";
    if (
      form.startDate &&
      form.applicationDeadline &&
      new Date(form.applicationDeadline) > new Date(form.startDate)
    ) {
      e.applicationDeadline = "Deadline must be on or before the start date.";
    }
    if (!form.jobDescription.trim()) e.jobDescription = "Describe the role.";
    if (form.jobDescription.length > DESCRIPTION_LIMIT)
      e.jobDescription = `Keep the description under ${DESCRIPTION_LIMIT} characters.`;
    if (!form.requiredSkills.length) e.requiredSkills = "Add at least one skill.";
    if (!form.workSetup) e.workSetup = "Select a work setup.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError(null);

    if (!isValid) {
      const firstErrorField = document.querySelector("[data-invalid='true']");
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const companyId = await resolveCompanyId();
    if (!companyId) {
      setSubmitError("No company is logged in. Please log in again.");
      return;
    }

    const payload = {
      positionTitle: form.positionTitle,
      department: form.department,
      availableSlots: Number(form.availableSlots),
      duration: form.duration,
      startDate: form.startDate,
      applicationDeadline: form.applicationDeadline,
      jobDescription: form.jobDescription,
      requiredSkills: form.requiredSkills,
      workSetup: form.workSetup,
    };

    setSubmitting(true);
    try {
      const created = await createInternship(companyId, payload);
      if (onSubmit) onSubmit(created);
      setPosted(true);
      setTimeout(() => navigate("/component-3"), 900);
    } catch (err) {
      setSubmitError(err.message || "Failed to post internship. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setTouched({});
    setSubmitted(false);
    navigate("/component-3");
  };

  const remaining = DESCRIPTION_LIMIT - form.jobDescription.length;

  return (
    <>
      <style>{`
        .create-internship {
          --maroon: #7a2331;
          --maroon-dark: #5f1b26;
          --maroon-soft: #fbeced;
          --maroon-tint: #f6e2e4;
          --ink: #14151a;
          --ink-soft: #6b7280;
          --ink-faint: #9aa0aa;
          --border: #e2e4e8;
          --surface-alt: #fafafb;
          --error: #b3261e;
          --error-soft: #fdecea;
          --success: #1a7f4e;
          --success-soft: #e9f7ef;

          width: 100%;
          height: 100%;
          max-width: none;
          margin: 0;
          box-sizing: border-box;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: var(--ink);
        }

        .create-internship *,
        .create-internship *::before,
        .create-internship *::after {
          box-sizing: border-box;
        }
        .create-internship__back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 16px;
        margin-bottom: 28px;
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: var(--ink-soft);
        font-size: 13.5px;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        letter-spacing: 0.01em;
        cursor: pointer;
        transition: color 0.15s ease, gap 0.15s ease, background 0.15s ease;
      }

      .create-internship__back:hover {
        color: var(--maroon);
        background: var(--surface-alt);
        gap: 9px;
      }

      .create-internship__back:focus-visible {
        outline: 2px solid var(--maroon);
        outline-offset: 3px;
        border-radius: 8px;
      }

      .create-internship__back svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
     
        .create-internship__card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 12px 24px -8px rgba(16, 24, 40, 0.06);
          padding: 28px 32px 24px;
          position: relative;
        }

        .create-internship__title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .create-internship__title {
          margin: 0 0 4px;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--maroon);
          letter-spacing: -0.01em;
        }

        .create-internship__subtitle {
          margin: 0;
          font-size: 0.85rem;
          color: var(--ink-soft);
        }

        .create-internship__progress {
          flex-shrink: 0;
          text-align: right;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink-soft);
          white-space: nowrap;
          padding-top: 2px;
        }

        .create-internship__progress-bar {
          margin-top: 6px;
          width: 110px;
          height: 5px;
          border-radius: 999px;
          background: var(--surface-alt);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .create-internship__progress-fill {
          height: 100%;
          background: var(--maroon);
          border-radius: 999px;
          transition: width 0.25s ease;
        }

        .create-internship__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
          margin-bottom: 20px;
        }

        .create-internship__field {
          display: flex;
          flex-direction: column;
        }

        .create-internship__field--full {
          grid-column: 1 / -1;
        }

        .create-internship__label {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ink);
        }

        .create-internship__required {
          color: var(--maroon);
          font-weight: 700;
        }

        .create-internship__label-hint {
          font-weight: 400;
          font-size: 0.75rem;
          color: var(--ink-faint);
        }

        .create-internship__input,
        .create-internship__select,
        .create-internship__textarea,
        .create-internship__tags {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: #fff;
          font-family: inherit;
          font-size: 0.875rem;
          color: var(--ink);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .create-internship__input::placeholder,
        .create-internship__textarea::placeholder {
          color: var(--ink-faint);
        }

        .create-internship__input:focus,
        .create-internship__select:focus,
        .create-internship__textarea:focus,
        .create-internship__tags:focus-within {
          outline: none;
          border-color: var(--maroon);
          box-shadow: 0 0 0 3px var(--maroon-soft);
        }

        .create-internship__input[data-invalid="true"],
        .create-internship__select[data-invalid="true"],
        .create-internship__textarea[data-invalid="true"],
        .create-internship__tags[data-invalid="true"] {
          border-color: var(--error);
          background: var(--error-soft);
        }

        .create-internship__input[data-invalid="true"]:focus,
        .create-internship__select[data-invalid="true"]:focus,
        .create-internship__textarea[data-invalid="true"]:focus,
        .create-internship__tags[data-invalid="true"]:focus-within {
          box-shadow: 0 0 0 3px var(--error-soft);
        }

        .create-internship__error {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.78rem;
          color: var(--error);
          font-weight: 500;
        }

        .create-internship__error svg {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }

        .create-internship__select {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 36px;
          cursor: pointer;
          color: var(--ink);
        }

        .create-internship__select:invalid {
          color: var(--ink-faint);
        }

        .create-internship__date-wrap {
          position: relative;
        }

        .create-internship__slots {
          display: flex;
          align-items: stretch;
          border: 1px solid var(--border);
          border-radius: 9px;
          overflow: hidden;
          background: #fff;
        }

        .create-internship__slots[data-invalid="true"] {
          border-color: var(--error);
        }

        .create-internship__slots:focus-within {
          border-color: var(--maroon);
          box-shadow: 0 0 0 3px var(--maroon-soft);
        }

        .create-internship__slots-btn {
          width: 38px;
          flex-shrink: 0;
          background: var(--surface-alt);
          border: none;
          color: var(--maroon);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .create-internship__slots-btn:hover {
          background: var(--maroon-tint);
        }

        .create-internship__slots-btn:disabled {
          color: var(--ink-faint);
          cursor: not-allowed;
          background: var(--surface-alt);
        }

        .create-internship__slots input {
          border: none;
          text-align: center;
          padding: 10px 6px;
          font-size: 0.875rem;
          font-family: inherit;
          color: var(--ink);
          width: 100%;
          -moz-appearance: textfield;
        }

        .create-internship__slots input::-webkit-outer-spin-button,
        .create-internship__slots input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .create-internship__slots input:focus {
          outline: none;
        }

        .create-internship__textarea {
          resize: vertical;
          min-height: 96px;
          line-height: 1.5;
        }

        .create-internship__textarea-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 6px;
          font-size: 0.75rem;
          color: var(--ink-faint);
        }

        .create-internship__textarea-footer[data-over="true"] {
          color: var(--error);
          font-weight: 600;
        }

        .create-internship__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          min-height: 44px;
          align-items: center;
        }

        .create-internship__tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 6px 4px 10px;
          border-radius: 999px;
          background: var(--maroon-soft);
          color: var(--maroon-dark);
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .create-internship__tag button {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--maroon-dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          line-height: 1;
          padding: 0;
        }

        .create-internship__tag button:hover {
          background: rgba(122, 35, 49, 0.15);
        }

        .create-internship__tags-input {
          flex: 1;
          min-width: 140px;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.875rem;
          color: var(--ink);
          padding: 4px 2px;
          background: transparent;
        }

        .create-internship__tags-input::placeholder {
          color: var(--ink-faint);
        }

        .create-internship__hint {
          margin-top: 6px;
          font-size: 0.75rem;
          color: var(--ink-faint);
        }

        .create-internship__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 8px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .create-internship__footer-status {
          font-size: 0.8rem;
          color: var(--error);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .create-internship__footer-status svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }

        .create-internship__footer-actions {
          display: flex;
          gap: 12px;
          margin-left: auto;
        }

        .create-internship__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
        }

        .create-internship__btn:active {
          transform: translateY(1px);
        }

        .create-internship__btn--cancel {
          background: #fff;
          border-color: var(--border);
          color: var(--ink);
        }

        .create-internship__btn--cancel:hover {
          background: var(--surface-alt);
        }

        .create-internship__btn--submit {
          background: var(--maroon);
          color: #fff;
          box-shadow: 0 1px 2px rgba(122, 35, 49, 0.25);
        }

        .create-internship__btn--submit:hover {
          background: var(--maroon-dark);
        }

        .create-internship__btn--submit:disabled {
          background: var(--ink-faint);
          box-shadow: none;
          cursor: not-allowed;
        }

        .create-internship__btn svg {
          width: 16px;
          height: 16px;
        }

        .create-internship__toast {
          position: absolute;
          top: -14px;
          right: 32px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          background: var(--success-soft);
          color: var(--success);
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid #bfe6cf;
          box-shadow: 0 6px 16px -6px rgba(26, 127, 78, 0.3);
        }

        .create-internship__toast svg {
          width: 15px;
          height: 15px;
        }

        @media (max-width: 640px) {
          .create-internship__grid {
            grid-template-columns: 1fr;
          }

          .create-internship__card {
            padding: 22px 18px 20px;
          }

          .create-internship__title-row {
            flex-direction: column;
          }

          .create-internship__progress {
            text-align: left;
          }

          .create-internship__progress-bar {
            width: 100%;
          }

          .create-internship__footer {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .create-internship__footer-actions {
            width: 100%;
            margin-left: 0;
          }

          .create-internship__btn {
            justify-content: center;
            flex: 1;
          }
        }
      `}</style>

      <div className="create-internship">
        <button className="create-internship__back" type="button" onClick={handleCancel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to internship listings
        </button>

        <form className="create-internship__card" onSubmit={handleSubmit} noValidate>
          {posted && (
            <span className="create-internship__toast">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Internship posted
            </span>
          )}

          <div className="create-internship__title-row">
            <div>
              <h1 className="create-internship__title">Post internship</h1>
              <p className="create-internship__subtitle">
                Fill in the details below to publish a new internship opening.
              </p>
            </div>
          </div>

          <div className="create-internship__grid">
            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="positionTitle">
                Position title <span className="create-internship__required">*</span>
              </label>
              <input
                id="positionTitle"
                className="create-internship__input"
                type="text"
                placeholder="e.g. Software Engineering Intern"
                value={form.positionTitle}
                onChange={handleChange("positionTitle")}
                onBlur={markTouched("positionTitle")}
                data-invalid={Boolean(showError("positionTitle"))}
                aria-invalid={Boolean(showError("positionTitle"))}
              />
              {showError("positionTitle") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.positionTitle}
                </span>
              )}
            </div>

            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="department">
                Department <span className="create-internship__required">*</span>
              </label>
              <select
                id="department"
                className="create-internship__select"
                value={form.department}
                onChange={handleChange("department")}
                onBlur={markTouched("department")}
                data-invalid={Boolean(showError("department"))}
                aria-invalid={Boolean(showError("department"))}
              >
                <option value="" disabled hidden>
                  Select department
                </option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
              </select>
              {showError("department") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.department}
                </span>
              )}
            </div>

            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="availableSlots">
                Available slots <span className="create-internship__required">*</span>
              </label>
              <div
                className="create-internship__slots"
                data-invalid={Boolean(showError("availableSlots"))}
              >
                <button
                  type="button"
                  className="create-internship__slots-btn"
                  onClick={() => adjustSlots(-1)}
                  disabled={Number(form.availableSlots) <= 1}
                  aria-label="Decrease available slots"
                >
                  −
                </button>
                <input
                  id="availableSlots"
                  type="number"
                  min="1"
                  max="50"
                  value={form.availableSlots}
                  onChange={handleChange("availableSlots")}
                  onBlur={markTouched("availableSlots")}
                  aria-invalid={Boolean(showError("availableSlots"))}
                />
                <button
                  type="button"
                  className="create-internship__slots-btn"
                  onClick={() => adjustSlots(1)}
                  disabled={Number(form.availableSlots) >= 50}
                  aria-label="Increase available slots"
                >
                  +
                </button>
              </div>
              {showError("availableSlots") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.availableSlots}
                </span>
              )}
            </div>

            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="duration">
                Duration <span className="create-internship__required">*</span>
              </label>
              <select
                id="duration"
                className="create-internship__select"
                value={form.duration}
                onChange={handleChange("duration")}
                onBlur={markTouched("duration")}
                data-invalid={Boolean(showError("duration"))}
                aria-invalid={Boolean(showError("duration"))}
              >
                <option value="" disabled hidden>
                  Select duration
                </option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
              </select>
              {showError("duration") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.duration}
                </span>
              )}
            </div>

            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="startDate">
                Start date <span className="create-internship__required">*</span>
              </label>
              <div className="create-internship__date-wrap">
                <input
                  id="startDate"
                  className="create-internship__input"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange("startDate")}
                  onBlur={markTouched("startDate")}
                  data-invalid={Boolean(showError("startDate"))}
                  aria-invalid={Boolean(showError("startDate"))}
                />
              </div>
              {showError("startDate") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.startDate}
                </span>
              )}
            </div>

            <div className="create-internship__field">
              <label className="create-internship__label" htmlFor="applicationDeadline">
                Application deadline <span className="create-internship__required">*</span>
              </label>
              <div className="create-internship__date-wrap">
                <input
                  id="applicationDeadline"
                  className="create-internship__input"
                  type="date"
                  value={form.applicationDeadline}
                  onChange={handleChange("applicationDeadline")}
                  onBlur={markTouched("applicationDeadline")}
                  data-invalid={Boolean(showError("applicationDeadline"))}
                  aria-invalid={Boolean(showError("applicationDeadline"))}
                />
              </div>
              {showError("applicationDeadline") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.applicationDeadline}
                </span>
              )}
            </div>

            <div className="create-internship__field create-internship__field--full">
              <label className="create-internship__label" htmlFor="jobDescription">
                Job description <span className="create-internship__required">*</span>
              </label>
              <textarea
                id="jobDescription"
                className="create-internship__textarea"
                placeholder="Describe the role, responsibilities, and what the intern will learn..."
                value={form.jobDescription}
                onChange={handleChange("jobDescription")}
                onBlur={markTouched("jobDescription")}
                maxLength={DESCRIPTION_LIMIT + 50}
                data-invalid={Boolean(showError("jobDescription"))}
                aria-invalid={Boolean(showError("jobDescription"))}
              />
              <div className="create-internship__textarea-footer" data-over={remaining < 0}>
                {remaining < 0 ? `${Math.abs(remaining)} characters over limit` : `${remaining} characters left`}
              </div>
              {showError("jobDescription") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.jobDescription}
                </span>
              )}
            </div>

            <div className="create-internship__field create-internship__field--full">
              <label className="create-internship__label" htmlFor="requiredSkills">
                Required skills <span className="create-internship__required">*</span>
                <span className="create-internship__label-hint">press Enter to add each one</span>
              </label>
              <div
                className="create-internship__tags"
                data-invalid={Boolean(showError("requiredSkills"))}
                onClick={() => document.getElementById("requiredSkills")?.focus()}
              >
                {form.requiredSkills.map((skill) => (
                  <span className="create-internship__tag" key={skill}>
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="requiredSkills"
                  className="create-internship__tags-input"
                  type="text"
                  placeholder={form.requiredSkills.length ? "Add another..." : "e.g. React, Python, Figma"}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onBlur={() => {
                    addSkill();
                    markTouched("requiredSkills")();
                  }}
                  aria-invalid={Boolean(showError("requiredSkills"))}
                />
              </div>
              {showError("requiredSkills") ? (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.requiredSkills}
                </span>
              ) : (
                <span className="create-internship__hint">Separate skills with Enter or a comma.</span>
              )}
            </div>

            <div className="create-internship__field create-internship__field--full">
              <label className="create-internship__label" htmlFor="workSetup">
                Work setup <span className="create-internship__required">*</span>
              </label>
              <select
                id="workSetup"
                className="create-internship__select"
                value={form.workSetup}
                onChange={handleChange("workSetup")}
                onBlur={markTouched("workSetup")}
                data-invalid={Boolean(showError("workSetup"))}
                aria-invalid={Boolean(showError("workSetup"))}
              >
                <option value="" disabled hidden>
                  Select work setup
                </option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {showError("workSetup") && (
                <span className="create-internship__error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                  {errors.workSetup}
                </span>
              )}
            </div>
          </div>

          <div className="create-internship__footer">
            {submitted && !isValid && (
              <span className="create-internship__footer-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                Fix the highlighted fields before posting.
              </span>
            )}
            {submitError && (
              <span className="create-internship__footer-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
                {submitError}
              </span>
            )}
            <div className="create-internship__footer-actions">
              <button
                type="button"
                className="create-internship__btn create-internship__btn--cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="create-internship__btn create-internship__btn--submit"
                disabled={posted || submitting}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                </svg>
                {posted ? "Posted" : submitting ? "Posting..." : "Post internship"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}