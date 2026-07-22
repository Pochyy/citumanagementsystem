package com.example.ojtmanagementsystem.dto;

public class CoordinatorProfileResponse {

    private Profile profile;
    private Stats stats;
    private Academic academic;

    public CoordinatorProfileResponse() {}

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }

    public Academic getAcademic() {
        return academic;
    }

    public void setAcademic(Academic academic) {
        this.academic = academic;
    }

    public static class Profile {
        private String fullName;
        private String id;
        private String status;
        private String email;
        private String address;
        private String phone;
        private String department;
        private String officeHours;

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public String getOfficeHours() {
            return officeHours;
        }

        public void setOfficeHours(String officeHours) {
            this.officeHours = officeHours;
        }
    }

    public static class Stats {
        private Integer studentsHandled;
        private Integer companiesManaged;
        private Integer docsVerified;

        public Integer getStudentsHandled() {
            return studentsHandled;
        }

        public void setStudentsHandled(Integer studentsHandled) {
            this.studentsHandled = studentsHandled;
        }

        public Integer getCompaniesManaged() {
            return companiesManaged;
        }

        public void setCompaniesManaged(Integer companiesManaged) {
            this.companiesManaged = companiesManaged;
        }

        public Integer getDocsVerified() {
            return docsVerified;
        }

        public void setDocsVerified(Integer docsVerified) {
            this.docsVerified = docsVerified;
        }
    }

    public static class Academic {
        private String program;
        private String yearAssigned;
        private String campus;

        public String getProgram() {
            return program;
        }

        public void setProgram(String program) {
            this.program = program;
        }

        public String getYearAssigned() {
            return yearAssigned;
        }

        public void setYearAssigned(String yearAssigned) {
            this.yearAssigned = yearAssigned;
        }

        public String getCampus() {
            return campus;
        }

        public void setCampus(String campus) {
            this.campus = campus;
        }
    }
}
