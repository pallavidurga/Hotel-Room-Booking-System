package com.example.Hotelroom.service;

import com.example.Hotelroom.model.Room;
import com.example.Hotelroom.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

   
    public void deleteRoom(String roomId) {
        roomRepository.deleteById(roomId);
    }

  
    public List<Room> getRoomsByHotelId(String hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

   
    public List<Room> getRoomsByRoomType(String roomType) {
        return roomRepository.findByRoomTypeIgnoreCase(roomType);
    }
    public Room updateRoom(String id, Room updatedRoom) {
        Optional<Room> existingRoomOpt = roomRepository.findById(id);
        if (existingRoomOpt.isPresent()) {
            Room existingRoom = existingRoomOpt.get();
            existingRoom.setRoomType(updatedRoom.getRoomType());
            existingRoom.setPrice(updatedRoom.getPrice());
            existingRoom.setEminities(updatedRoom.getEminities());
            existingRoom.setImageUrl(updatedRoom.getImageUrl());
            return roomRepository.save(existingRoom);
        } else {
            throw new RuntimeException("Room not found with id: " + id);
        }
    }


    public Optional<Room> getRoomById(String roomId) {
        return roomRepository.findById(roomId);
    }
}
