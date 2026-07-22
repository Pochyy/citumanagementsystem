import React from "react";

export default function UploadField({ label, name, file, onChange }) {
  const inputId = `upload-${name}`;
  return (
    <div className="verification-form__upload">
      <div className="verification-form__upload-info">
        <span className="verification-form__upload-name">{label}</span>
        <span className={file ? "verification-form__upload-filename" : "verification-form__upload-hint"}>
          {file ? file.name : "PDF, JPG or PNG, up to 10MB"}
        </span>
      </div>
      <label htmlFor={inputId} className="verification-form__upload-btn">
        {file ? "Replace" : "Upload"}
      </label>
      <input
        id={inputId}
        name={name}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
