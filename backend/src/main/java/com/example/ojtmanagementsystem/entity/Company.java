package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;

/**
 * One Company table for both concerns:
 *  - the auth link (user, via a one-to-one to the User row created at registration)
 *  - the editable profile fields (tagline, industry, about, etc.)
 *
 * A row is created automatically at registration with just user + companyName
 * + verificationStatus set. Everything else stays null/blank until the
 * company fills it in from the Profile page.
 */
@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "company_name")
    private String companyName;

    private String tagline;

    private String industry;

    @Column(name = "company_size")
    private String companySize;

    private String email;

    private String website;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String about;

    private String address;

    // PENDING_REVIEW, VERIFIED, REJECTED - set at registration, only the
    // Coordinator's approval endpoint should change this afterward.
    @Column(name = "verification_status")
    private String verificationStatus;

    public Company() {}

    // Used by AuthService at registration time.
    public Company(User user, String companyName) {
        this.user = user;
        this.companyName = companyName;
        this.verificationStatus = "PENDING_REVIEW";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getCompanySize() { return companySize; }
    public void setCompanySize(String companySize) { this.companySize = companySize; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
}
