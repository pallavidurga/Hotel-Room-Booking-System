package com.example.Hotelroom.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Hotelroom.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
	
	List<Booking> findByUserId(String userId);

	List<Booking> findByHotelId(String hotelId);
	List<Booking> findByRoomId(String roomId);

	
	
}
