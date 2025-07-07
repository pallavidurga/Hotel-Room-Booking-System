package com.example.Hotelroom.controller;

import com.example.Hotelroom.constants.Role;
import com.example.Hotelroom.model.Room;
import com.example.Hotelroom.model.User;
import com.example.Hotelroom.service.RoomService;
import com.example.Hotelroom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserRepository userRepository;

    private boolean isAdmin(String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && userOpt.get().getRole() == Role.ADMIN;
    }

    @PostMapping("/{hotelId}")
    public Object addRoom(@RequestParam String userId, @PathVariable String hotelId, @RequestBody Room room) {
        if (isAdmin(userId)) {
            room.setHotelId(hotelId);
            return roomService.addRoom(room);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. Only Admin can add rooms.");
    }


  
    @DeleteMapping("/{roomId}")
    public String deleteRoom(@RequestParam String userId, @PathVariable String roomId) {
        if (isAdmin(userId)) {
            roomService.deleteRoom(roomId);
            return "Room deleted successfully";
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. Only Admin can delete rooms.");
    }

  
    @GetMapping("/hotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable String hotelId) {
        return roomService.getRoomsByHotelId(hotelId);
    }

   
    @GetMapping("/type/{roomType}")
    public List<Room> getRoomsByType(@PathVariable String roomType) {
        return roomService.getRoomsByRoomType(roomType);
    }
    @PutMapping("/{id}")
    public Room updateRoom(@RequestParam String userId, @PathVariable String id, @RequestBody Room updatedRoom) {
        if (isAdmin(userId)) {
            return roomService.updateRoom(id, updatedRoom);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only Admin can update rooms");
    }
    

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable String roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        return room.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}
