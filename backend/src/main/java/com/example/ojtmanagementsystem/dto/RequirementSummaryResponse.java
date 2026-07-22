package com.example.ojtmanagementsystem.dto;

public class RequirementSummaryResponse {
    private int completedCount;
    private int totalCount;
    private int percent;

    public RequirementSummaryResponse() {}

    public RequirementSummaryResponse(int completedCount, int totalCount, int percent) {
        this.completedCount = completedCount;
        this.totalCount = totalCount;
        this.percent = percent;
    }

    public int getCompletedCount() { return completedCount; }
    public void setCompletedCount(int completedCount) { this.completedCount = completedCount; }
    public int getTotalCount() { return totalCount; }
    public void setTotalCount(int totalCount) { this.totalCount = totalCount; }
    public int getPercent() { return percent; }
    public void setPercent(int percent) { this.percent = percent; }
}