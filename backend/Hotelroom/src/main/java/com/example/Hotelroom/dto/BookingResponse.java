package com.example.Hotelroom.dto;

import java.time.LocalDate;

public class BookingResponse {

    private String hotelName;
    private String hotelLocation;  
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private double totalPrice;
    private String bookingId;
 
 public BookingResponse(String bookingId, String hotelName, String hotelLocation, String roomType, LocalDate checkInDate, LocalDate checkOutDate, double totalPrice) {
     this.bookingId = bookingId;
     this.hotelName = hotelName;
     this.hotelLocation = hotelLocation;
     this.roomType = roomType;
     this.checkInDate = checkInDate;
     this.checkOutDate = checkOutDate;
     this.totalPrice = totalPrice;
 }

 public String getBookingId() {
     return bookingId;
 }

    public String getHotelName() {
        return hotelName;
    }

    public String getHotelLocation() {
        return hotelLocation;
    }

    public String getRoomType() {
        return roomType;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }
}
