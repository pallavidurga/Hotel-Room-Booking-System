
package com.example.Hotelroom.controller;

import com.example.Hotelroom.dto.BookingResponse;
import com.example.Hotelroom.model.Booking;
import com.example.Hotelroom.model.Hotel;
import com.example.Hotelroom.model.Room;
import com.example.Hotelroom.repository.BookingRepository;
import com.example.Hotelroom.repository.HotelRepository;
import com.example.Hotelroom.repository.RoomRepository;
import com.example.Hotelroom.service.BookingService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bs;

    @Autowired
    private BookingRepository br;

    @Autowired
    private RoomRepository rr;

    @Autowired
    private HotelRepository hr;

    @PostMapping("/book")
    public String bookRoom(@RequestParam String userId,
                           @RequestParam String roomId,
                           @RequestParam String checkInDate,
                           @RequestParam String checkOutDate) {
        try {
            bs.bookRoom(userId, roomId, checkInDate, checkOutDate);
            return "Room booked successfully";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }
    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUserId(@PathVariable String userId) {
        return bs.getBookingsByUserId(userId);
    }

    @GetMapping("/hotel/{hotelId}")
    public List<BookingResponse> getBookingsByHotel(@PathVariable String hotelId) {
        List<Booking> bookings = bs.getBookingsByHotel(hotelId);
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {
            Room room = rr.findById(booking.getRoomId())
                          .orElseThrow(() -> new RuntimeException("Room not found"));
            Hotel hotel = hr.findById(room.getHotelId())
                            .orElseThrow(() -> new RuntimeException("Hotel not found"));

            BookingResponse response = new BookingResponse(
            	    booking.getId(),
            	    hotel.getName(),
            	    hotel.getLocation(),
            	    room.getRoomType(),
            	    booking.getCheckInDate(),
            	    booking.getCheckOutDate(),
            	    booking.getTotalPrice()
            	);
            responses.add(response);
        }

        return responses;
    }
    @DeleteMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable String bookingId, @RequestParam String userId) {
        try {
            Booking booking = br.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            if (!booking.getUserId().equals(userId)) {
                return "Unauthorized to cancel this booking";
            }

            br.deleteById(bookingId);
            return "Booking cancelled successfully";
        } catch (Exception e) {
            return "Failed to cancel booking: " + e.getMessage();
        }
    }

}


