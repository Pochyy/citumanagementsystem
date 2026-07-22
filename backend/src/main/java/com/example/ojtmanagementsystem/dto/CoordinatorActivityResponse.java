package com.example.ojtmanagementsystem.dto;

public class CoordinatorActivityResponse {

    private Integer id;
    private String type;
    private String actor;
    private String action;
    private String timeAgo;

    public CoordinatorActivityResponse() {}

    public CoordinatorActivityResponse(Integer id, String type, String actor, String action, String timeAgo) {
        this.id = id;
        this.type = type;
        this.actor = actor;
        this.action = action;
        this.timeAgo = timeAgo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getTimeAgo() {
        return timeAgo;
    }

    public void setTimeAgo(String timeAgo) {
        this.timeAgo = timeAgo;
    }
}
