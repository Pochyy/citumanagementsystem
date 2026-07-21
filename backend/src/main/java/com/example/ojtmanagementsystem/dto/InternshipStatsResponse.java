package com.example.ojtmanagementsystem.dto;

/**
 * Backs the 4 stat cards: Total Postings, Currently Open, Total Slots, Applicants.
 */
public class InternshipStatsResponse {

    private long totalPostings;
    private long currentlyOpen;
    private long totalSlots;
    private long totalApplicants;

    public InternshipStatsResponse() {
    }

    public InternshipStatsResponse(long totalPostings, long currentlyOpen, long totalSlots, long totalApplicants) {
        this.totalPostings = totalPostings;
        this.currentlyOpen = currentlyOpen;
        this.totalSlots = totalSlots;
        this.totalApplicants = totalApplicants;
    }

    public long getTotalPostings() {
        return totalPostings;
    }

    public void setTotalPostings(long totalPostings) {
        this.totalPostings = totalPostings;
    }

    public long getCurrentlyOpen() {
        return currentlyOpen;
    }

    public void setCurrentlyOpen(long currentlyOpen) {
        this.currentlyOpen = currentlyOpen;
    }

    public long getTotalSlots() {
        return totalSlots;
    }

    public void setTotalSlots(long totalSlots) {
        this.totalSlots = totalSlots;
    }

    public long getTotalApplicants() {
        return totalApplicants;
    }

    public void setTotalApplicants(long totalApplicants) {
        this.totalApplicants = totalApplicants;
    }
}
