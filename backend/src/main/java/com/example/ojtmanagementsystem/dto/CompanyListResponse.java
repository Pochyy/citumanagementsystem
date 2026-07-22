package com.example.ojtmanagementsystem.dto;

/**
 * DTO for listing companies in the Coordinator's Company Management page.
 * Maps to COMPANY entity fields from the ERD.
 */
public class CompanyListResponse {
    private Long companyId;
    private String companyName;
    private String address;
    private String contactPerson;
    private String contactNumber;
    private String email;
    private String verificationStatus;
    private Integer slotsFilled;
    private Integer slotsTotal;

    public CompanyListResponse() {}

    public CompanyListResponse(Long companyId, String companyName, String address,
                                String contactPerson, String contactNumber, String email,
                                String verificationStatus, Integer slotsFilled, Integer slotsTotal) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.address = address;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.email = email;
        this.verificationStatus = verificationStatus;
        this.slotsFilled = slotsFilled;
        this.slotsTotal = slotsTotal;
    }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public Integer getSlotsFilled() { return slotsFilled; }
    public void setSlotsFilled(Integer slotsFilled) { this.slotsFilled = slotsFilled; }

    public Integer getSlotsTotal() { return slotsTotal; }
    public void setSlotsTotal(Integer slotsTotal) { this.slotsTotal = slotsTotal; }
}