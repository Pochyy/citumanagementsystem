-- CIT-U OJT Internship Management System
-- Verification tables for student/school-side users and partner companies.
--
-- How this maps to the UI:
-- - The Document Verification dashboard counts rows in document_submissions by
--   owner_type and status.
-- - The Student Requirement Verification table lists STUDENT submissions.
-- - The Company Document Verification table lists COMPANY submissions.
-- - Approve/Reject actions update document_submissions and insert a row in
--   document_verification_reviews.

CREATE TABLE IF NOT EXISTS user_accounts (
  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('STUDENT', 'COMPANY', 'COORDINATOR', 'ADMIN') NOT NULL,
  account_status ENUM('PENDING_VERIFICATION', 'ACTIVE', 'REJECTED', 'SUSPENDED') NOT NULL DEFAULT 'PENDING_VERIFICATION',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_profiles (
  student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  student_number VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL,
  program VARCHAR(150) NOT NULL,
  year_level TINYINT NOT NULL,
  school_name VARCHAR(180) NOT NULL DEFAULT 'Cebu Institute of Technology - University',
  verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_student_profiles_user
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_profiles (
  company_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  company_name VARCHAR(180) NOT NULL,
  industry VARCHAR(120),
  contact_person VARCHAR(150) NOT NULL,
  contact_number VARCHAR(50),
  company_email VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  verified_at TIMESTAMP NULL,
  valid_until DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_company_profiles_user
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
    ON DELETE CASCADE
);

-- Final branch already has the real application tables named students,
-- companies, and users. These columns make document approval visible there too.
ALTER TABLE students
  ADD COLUMN verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

ALTER TABLE students
  ADD COLUMN verified_at TIMESTAMP NULL;

ALTER TABLE companies
  ADD COLUMN verified_at TIMESTAMP NULL;

CREATE TABLE IF NOT EXISTS document_types (
  document_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  owner_type ENUM('STUDENT', 'COMPANY') NOT NULL,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(500),
  is_required BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_document_types_owner_name (owner_type, name)
);

CREATE TABLE IF NOT EXISTS document_submissions (
  submission_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  document_type_id BIGINT NOT NULL,
  submitted_by_user_id BIGINT NOT NULL,
  student_id BIGINT NULL,
  company_id BIGINT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_mime_type VARCHAR(100),
  file_size_bytes BIGINT,
  status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  reviewer_notes VARCHAR(1000),
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  reviewed_by_user_id BIGINT NULL,
  CONSTRAINT fk_document_submissions_type
    FOREIGN KEY (document_type_id) REFERENCES document_types(document_type_id),
  CONSTRAINT fk_document_submissions_submitter
    FOREIGN KEY (submitted_by_user_id) REFERENCES user_accounts(user_id),
  CONSTRAINT fk_document_submissions_student
    FOREIGN KEY (student_id) REFERENCES student_profiles(student_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_document_submissions_company
    FOREIGN KEY (company_id) REFERENCES company_profiles(company_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_document_submissions_reviewer
    FOREIGN KEY (reviewed_by_user_id) REFERENCES user_accounts(user_id),
  CONSTRAINT chk_document_submission_owner
    CHECK (
      (student_id IS NOT NULL AND company_id IS NULL)
      OR
      (student_id IS NULL AND company_id IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS document_verification_reviews (
  review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  submission_id BIGINT NOT NULL,
  reviewer_user_id BIGINT NOT NULL,
  old_status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL,
  new_status ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL,
  notes VARCHAR(1000),
  reviewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_document_reviews_submission
    FOREIGN KEY (submission_id) REFERENCES document_submissions(submission_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_document_reviews_reviewer
    FOREIGN KEY (reviewer_user_id) REFERENCES user_accounts(user_id)
);

CREATE INDEX idx_document_submissions_student_status
  ON document_submissions (student_id, status);

CREATE INDEX idx_document_submissions_company_status
  ON document_submissions (company_id, status);

CREATE INDEX idx_document_submissions_status_submitted
  ON document_submissions (status, submitted_at);

CREATE OR REPLACE VIEW v_student_document_verification AS
SELECT
  ds.submission_id,
  sp.student_id,
  CONCAT(sp.first_name, ' ', sp.last_name) AS student_name,
  sp.student_number,
  sp.program,
  dt.name AS document_name,
  ds.file_name,
  ds.file_url,
  ds.status,
  ds.submitted_at,
  ds.reviewed_at,
  reviewer.email AS reviewed_by_email
FROM document_submissions ds
JOIN document_types dt
  ON dt.document_type_id = ds.document_type_id
JOIN student_profiles sp
  ON sp.student_id = ds.student_id
LEFT JOIN user_accounts reviewer
  ON reviewer.user_id = ds.reviewed_by_user_id
WHERE dt.owner_type = 'STUDENT';

CREATE OR REPLACE VIEW v_company_document_verification AS
SELECT
  ds.submission_id,
  cp.company_id,
  cp.company_name,
  cp.contact_person,
  dt.name AS document_name,
  ds.file_name,
  ds.file_url,
  ds.status,
  ds.submitted_at,
  ds.reviewed_at,
  reviewer.email AS reviewed_by_email
FROM document_submissions ds
JOIN document_types dt
  ON dt.document_type_id = ds.document_type_id
JOIN company_profiles cp
  ON cp.company_id = ds.company_id
LEFT JOIN user_accounts reviewer
  ON reviewer.user_id = ds.reviewed_by_user_id
WHERE dt.owner_type = 'COMPANY';

CREATE OR REPLACE VIEW v_all_document_verification AS
SELECT
  ds.submission_id,
  dt.owner_type,
  sp.student_id AS owner_id,
  CONCAT(sp.first_name, ' ', sp.last_name) AS owner_name,
  sp.student_number AS owner_reference,
  dt.name AS document_name,
  ds.file_name,
  ds.file_url,
  ds.status,
  ds.submitted_at,
  ds.reviewed_at,
  reviewer.email AS reviewed_by_email
FROM document_submissions ds
JOIN document_types dt
  ON dt.document_type_id = ds.document_type_id
JOIN student_profiles sp
  ON sp.student_id = ds.student_id
LEFT JOIN user_accounts reviewer
  ON reviewer.user_id = ds.reviewed_by_user_id
WHERE dt.owner_type = 'STUDENT'
UNION ALL
SELECT
  ds.submission_id,
  dt.owner_type,
  cp.company_id AS owner_id,
  cp.company_name AS owner_name,
  cp.company_email AS owner_reference,
  dt.name AS document_name,
  ds.file_name,
  ds.file_url,
  ds.status,
  ds.submitted_at,
  ds.reviewed_at,
  reviewer.email AS reviewed_by_email
FROM document_submissions ds
JOIN document_types dt
  ON dt.document_type_id = ds.document_type_id
JOIN company_profiles cp
  ON cp.company_id = ds.company_id
LEFT JOIN user_accounts reviewer
  ON reviewer.user_id = ds.reviewed_by_user_id
WHERE dt.owner_type = 'COMPANY';

-- Default verification requirements shown in the provided screens.
INSERT INTO document_types (owner_type, name, description, is_required)
VALUES
  ('STUDENT', 'Endorsement Letter', 'School endorsement proving the student is cleared for OJT.', TRUE),
  ('STUDENT', 'Parents Consent Form', 'Guardian consent for off-campus OJT participation.', TRUE),
  ('STUDENT', 'Waiver Form', 'Student waiver and acknowledgement form.', TRUE),
  ('STUDENT', 'Medical Certificate', 'Proof that the student is physically fit for OJT.', TRUE),
  ('STUDENT', 'Resume / CV', 'Student resume for company matching and review.', TRUE),
  ('COMPANY', 'Memorandum of Agreement', 'Signed agreement between the school and partner company.', TRUE),
  ('COMPANY', 'Business Permit', 'Proof that the company is legally allowed to operate.', TRUE),
  ('COMPANY', 'Accreditation Letter', 'School approval or accreditation document for the company.', TRUE),
  ('COMPANY', 'Training Plan', 'Company plan describing student duties, supervision, and training schedule.', TRUE)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  is_required = VALUES(is_required),
  is_active = TRUE;

-- Dashboard query examples:
-- SELECT COUNT(*) FROM document_submissions ds
-- JOIN document_types dt ON dt.document_type_id = ds.document_type_id
-- WHERE dt.owner_type = 'STUDENT' AND ds.status = 'PENDING';
--
-- SELECT COUNT(*) FROM document_submissions ds
-- JOIN document_types dt ON dt.document_type_id = ds.document_type_id
-- WHERE dt.owner_type = 'COMPANY' AND ds.status = 'VERIFIED';
--
-- Student verification table:
-- SELECT student_name, document_name, submitted_at, status
-- FROM v_student_document_verification
-- ORDER BY submitted_at DESC;
--
-- Company verification table:
-- SELECT company_name, document_name, submitted_at, status
-- FROM v_company_document_verification
-- ORDER BY submitted_at DESC;
