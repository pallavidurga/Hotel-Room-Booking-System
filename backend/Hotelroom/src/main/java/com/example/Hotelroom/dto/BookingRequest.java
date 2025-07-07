package com.example.Hotelroom.dto;

import java.time.LocalDate;

public class BookingRequest {

	 private String userId;
	    private String roomId;
	    private LocalDate checkInDate;
	    private LocalDate checkOutDate;
	    
	    public String getUserId() { return userId; }
	    public void setUserId(String userId) { this.userId = userId; }

	    public String getRoomId() { return roomId; }
	    public void setRoomId(String roomId) { this.roomId = roomId; }

	    public LocalDate getCheckInDate() { return checkInDate; }
	    public void setCheckInDate(String checkInDate) { this.checkInDate = this.checkInDate; }

	    public LocalDate getCheckOutDate() { return checkOutDate; }
	    public void setCheckOutDate(String checkOutDate) { this.checkOutDate = this.checkOutDate; }
}
