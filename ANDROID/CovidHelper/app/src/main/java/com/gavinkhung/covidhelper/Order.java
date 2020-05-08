package com.gavinkhung.covidhelper;

public class Order {
    private String endTime;
    private String location;
    private String name;
    private String startTime;
    private String storeLocation;
    private String storeName;
    private String volunteer;

    public Order(String endTime, String location, String name, String startTime, String storeLocation, String storeName, String volunteer) {
        this.endTime = endTime;
        this.location = location;
        this.name = name;
        this.startTime = startTime;
        this.storeLocation = storeLocation;
        this.storeName = storeName;
        this.volunteer = volunteer;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setStoreLocation(String storeLocation) {
        this.storeLocation = storeLocation;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public void setVolunteer(String volunteer) {
        this.volunteer = volunteer;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getStoreLocation() {
        return storeLocation;
    }

    public String getStoreName() {
        return storeName;
    }

    public String getVolunteer() {
        return volunteer;
    }
}
