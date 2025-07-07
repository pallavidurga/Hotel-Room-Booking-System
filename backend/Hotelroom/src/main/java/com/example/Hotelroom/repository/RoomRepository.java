package com.example.Hotelroom.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Hotelroom.model.Room;

public interface RoomRepository extends MongoRepository<Room, String> {
	
	List<Room> findByHotelId(String hotelId);
	

    List<Room> findByRoomTypeIgnoreCase(String roomType);

    
}

