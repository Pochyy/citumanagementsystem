package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "coordinators")
public class Coordinator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String department;

    @Column(name = "office_hours")
    private String officeHours;

    private String phone;

    private String address;

    private String program;

    @Column(name = "year_assigned")
    private String yearAssigned;

    private String campus;

    @Column(name = "students_handled")
    private Integer studentsHandled;

    @Column(name = "companies_managed")
    private Integer companiesManaged;

    @Column(name = "docs_verified")
    private Integer docsVerified;

    public Coordinator() {}

    public Coordinator(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

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
