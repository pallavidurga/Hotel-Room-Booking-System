package com.example.Hotelroom.service;

import com.example.Hotelroom.dto.BookingResponse;
import com.example.Hotelroom.model.Booking;
import com.example.Hotelroom.model.Hotel;
import com.example.Hotelroom.model.Room;
import com.example.Hotelroom.repository.BookingRepository;
import com.example.Hotelroom.repository.HotelRepository;
import com.example.Hotelroom.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    HotelRepository hr;
    @Autowired
    private BookingRepository bookingRepository;
    public List<Booking> getBookingsByHotel(String hotelId) {
        List<Room> rooms = roomRepository.findByHotelId(hotelId);
        List<String> roomIds = new ArrayList<>();
        for (Room room : rooms) {
            roomIds.add(room.getId());
        }

        List<Booking> bookings = new ArrayList<>();
        for (String roomId : roomIds) {
            bookings.addAll(bookingRepository.findByRoomId(roomId));
        }

        return bookings;
    }
    public List<BookingResponse> getBookingsByUserId(String userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {
            Room room = roomRepository.findById(booking.getRoomId())
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

    

    public void bookRoom(String userId, String roomId, String checkInDate, String checkOutDate) {
        
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

       
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate checkIn = LocalDate.parse(checkInDate, formatter);
        LocalDate checkOut = LocalDate.parse(checkOutDate, formatter);

        long days = ChronoUnit.DAYS.between(checkIn, checkOut);
        if (days <= 0) {
            throw new RuntimeException("Invalid Check-in/Check-out dates");
        }

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setRoomId(roomId);
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setTotalPrice(room.getPrice() * days);
        booking.setStatus("booked");

        bookingRepository.save(booking);
    }
    
}
