# Verification Table Guide

This schema supports the three verification screens:

- Document Verification dashboard
- Student Requirement Verification
- Company Document Verification

Use `verification_tables.sql` in the MySQL database named in `application.properties`.
The backend is also configured to run this SQL file on startup, so a fresh local
database can create the tables automatically.

## Tables

### `user_accounts`

Stores the login account for every person or organization using the system.

Why it exists: registration starts with an account, but the account should not be treated as fully active until its documents are approved.

Important fields:

- `role`: separates `STUDENT`, `COMPANY`, `COORDINATOR`, and `ADMIN`
- `account_status`: keeps new registrations in `PENDING_VERIFICATION`

### `student_profiles`

Stores student or school-side identity details.

Why it exists: student information is different from login information. This table gives the coordinator the person being verified.

Important fields:

- `student_number`
- `program`
- `school_name`
- `verification_status`

### `company_profiles`

Stores partner company identity details.

Why it exists: company verification needs business details, contact details, and validity dates that do not belong in a generic user table.

Important fields:

- `company_name`
- `contact_person`
- `company_email`
- `verification_status`
- `valid_until`

### `document_types`

Stores the required document names for each verification category.

Why it exists: the system should not hard-code requirements in React. If the coordinator later adds another required document, it can be added here.

Default student documents:

- Endorsement Letter
- Parents Consent Form
- Waiver Form
- Medical Certificate
- Resume / CV

Default company documents:

- Memorandum of Agreement
- Business Permit
- Accreditation Letter
- Training Plan

### `document_submissions`

Stores each uploaded document.

Why it exists: this is the main table used by the verification pages. Each row is one submitted document with a status of `PENDING`, `VERIFIED`, or `REJECTED`.

Important fields:

- `student_id`: filled only for student documents
- `company_id`: filled only for company documents
- `document_type_id`: tells what document was submitted
- `file_url`: points to the uploaded file
- `status`: drives the UI badges and dashboard counts
- `reviewed_by_user_id`: coordinator/admin who approved or rejected it

### `document_verification_reviews`

Stores the approval/rejection history.

Why it exists: verification is an official action, so the system should remember who changed the status, when it happened, and why.

## Views

### `v_student_document_verification`

This view produces the row format needed by the Student Requirement Verification screen:

- student name
- student number
- program
- document name
- uploaded file
- submitted date
- status
- reviewer

### `v_company_document_verification`

This view produces the row format needed by the Company Document Verification screen:

- company name
- contact person
- document name
- uploaded file
- submitted date
- status
- reviewer

## Basic Workflow

1. A student or company registers through `/api/auth/register/student` or `/api/auth/register/company`.
2. The account is saved in `user_accounts` with `PENDING_VERIFICATION` status.
3. Their details are saved in either `student_profiles` or `company_profiles`.
4. The required verification checklist is created in `document_submissions` with `PENDING` status.
5. The coordinator opens the verification page and reviews each row.
6. Approving or rejecting updates `document_submissions.status`.
7. The same action inserts a history row in `document_verification_reviews`.
8. When all required documents are verified, the profile is marked `VERIFIED` and the account becomes `ACTIVE`.

Why the split matters:

- `user_accounts` answers: who can log in, and is the account allowed yet?
- `student_profiles` answers: which school-side/student record is being verified?
- `company_profiles` answers: which partner company is being verified?
- `document_types` answers: what documents are required for each side?
- `document_submissions` answers: what exact document row is pending, verified, or rejected?
- `document_verification_reviews` answers: who changed a document status, from what, to what, and when?

This avoids mixing login data, profile identity, document requirements, submitted
documents, and approval history in one oversized table.

## Registration Endpoints

Student registration:

```http
POST /api/auth/register/student
Content-Type: application/json

{
  "studentId": "23-0001",
  "password": "secret",
  "confirmPassword": "secret"
}
```

Company registration:

```http
POST /api/auth/register/company
Content-Type: application/json

{
  "companyName": "Example Company",
  "companyEmail": "hr@example.com",
  "password": "secret",
  "confirmPassword": "secret"
}
```

After either request succeeds, refresh the Document Verification page. New pending
rows should appear in the student or company verification table.

## Dashboard Counts

Student pending count:

```sql
SELECT COUNT(*)
FROM document_submissions ds
JOIN document_types dt ON dt.document_type_id = ds.document_type_id
WHERE dt.owner_type = 'STUDENT'
  AND ds.status = 'PENDING';
```

Company verified count:

```sql
SELECT COUNT(*)
FROM document_submissions ds
JOIN document_types dt ON dt.document_type_id = ds.document_type_id
WHERE dt.owner_type = 'COMPANY'
  AND ds.status = 'VERIFIED';
```
