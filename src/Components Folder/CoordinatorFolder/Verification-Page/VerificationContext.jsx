import { createContext, useContext, useState } from "react";

/**
 * VerificationContext
 * --------------------
 * Single source of truth for the Student and Company document lists.
 * DocumentVerification (the hub) reads the derived counts from here.
 * StudentRequirmentVerification / CompanyDocumentVerification read AND
 * write here (via updateStudentDocStatus / updateCompanyDocStatus), so
 * approving or rejecting a document immediately changes the numbers
 * shown on the hub page too -- no page refresh needed.
 *
 * Swap the two seed arrays below for real API data once the backend
 * is connected; everything else (counts, approve/reject) keeps working
 * the same way.
 */

const seedStudentDocs = [
  {
    id: 1,
    student: "Mark Villaceran",
    document: "Endorsement Letter",
    submitted: "June 21",
    status: "Verified",
    content:
      "To Whom It May Concern,\n\nThis letter serves to formally endorse Mark Villaceran, a Bachelor of Science in Information Technology student, for the On-the-Job Training program. He has satisfactorily completed all prerequisite coursework and is recommended for placement.\n\nSincerely,\nOJT Coordinator's Office",
  },
  {
    id: 2,
    student: "Vinzent Lariosa",
    document: "Parents Consent Form",
    submitted: "June 22",
    status: "Pending",
    content:
      "I, the parent/guardian of Vinzent Lariosa, hereby give my full consent for my child to participate in the required On-the-Job Training program for the current academic term, including off-campus training at an accredited host company.\n\nSigned,\nParent/Guardian",
  },
  {
    id: 3,
    student: "Jose Adlawan",
    document: "Waiver Form",
    submitted: "June 20",
    status: "Verified",
    content:
      "I, Jose Adlawan, acknowledge the inherent risks associated with On-the-Job Training placement and hereby release the university and its affiliates from liability for incidents occurring during the course of my training, except in cases of gross negligence.\n\nSigned,\nJose Adlawan",
  },
  {
    id: 4,
    student: "John Loquillano",
    document: "Medical Certificate",
    submitted: "June 23",
    status: "Pending",
    content:
      "This is to certify that John Loquillano was examined on June 22 and found physically fit to undergo On-the-Job Training. No medical conditions were noted that would restrict participation in standard office or fieldwork duties.\n\nAttending Physician",
  },
  {
    id: 5,
    student: "Mark Aquino",
    document: "Resume / CV",
    submitted: "June 19",
    status: "Verified",
    content:
      "MARK AQUINO — Bachelor of Science in Information Technology\n\nSkills: Java, React, SQL, Networking Fundamentals\nExperience: IT Support Assistant (Internship), Campus Library System (Capstone Project)\nObjective: Seeking an OJT placement to apply and expand technical skills in a professional environment.",
  },
];

const seedCompanyDocs = [
  {
    id: 1,
    company: "Cebu Pacific",
    document: "Memorandum of Agreement",
    submitted: "June 22",
    status: "Pending",
    content:
      "This Memorandum of Agreement is entered into by and between Cebu Pacific Air and the University, for the purpose of establishing an On-the-Job Training partnership. Cebu Pacific agrees to provide supervised training slots for qualified students for the duration of the academic term.\n\nAuthorized Signatory,\nCebu Pacific HR Department",
  },
  {
    id: 2,
    company: "PLDT",
    document: "Business Permit",
    submitted: "June 20",
    status: "Pending",
    content:
      "Business Permit No. 2026-00114\nIssued to: PLDT Inc.\nType of Business: Telecommunications\nValid Until: December 31, 2026\n\nThis certifies that the business named above has been granted permission to operate within the city, in accordance with local ordinances.",
  },
  {
    id: 3,
    company: "Ayala Corporation",
    document: "Accreditation Letter",
    submitted: "June 18",
    status: "Verified",
    content:
      "This letter certifies that Ayala Corporation has been reviewed and accredited as an official OJT host company for the current academic year, having met all requirements for trainee supervision, workplace safety, and reporting compliance.\n\nOJT Coordinator's Office",
  },
  {
    id: 4,
    company: "Globe Telecom",
    document: "Training Plan",
    submitted: "June 15",
    status: "Verified",
    content:
      "Training Plan Overview — Globe Telecom\n\nWeek 1-2: Company orientation and systems onboarding\nWeek 3-8: Assigned to Network Operations support team\nWeek 9-12: Rotational assignment in Customer Experience\nSupervisor: Department Training Lead, Globe Telecom",
  },
];

const VerificationContext = createContext(null);

export function VerificationProvider({ children }) {
  const [studentDocs, setStudentDocs] = useState(seedStudentDocs);
  const [companyDocs, setCompanyDocs] = useState(seedCompanyDocs);

  const updateStudentDocStatus = (id, status) => {
    setStudentDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const updateCompanyDocStatus = (id, status) => {
    setCompanyDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const value = {
    studentDocs,
    companyDocs,
    updateStudentDocStatus,
    updateCompanyDocStatus,
    // live counts -- these are what the DocumentVerification hub displays
    studentPendingCount: studentDocs.filter((d) => d.status === "Pending").length,
    studentVerifiedCount: studentDocs.filter((d) => d.status === "Verified").length,
    companyPendingCount: companyDocs.filter((d) => d.status === "Pending").length,
    companyVerifiedCount: companyDocs.filter((d) => d.status === "Verified").length,
  };

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerificationData() {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error("useVerificationData must be used inside a <VerificationProvider>");
  }
  return ctx;
}
