package com.example.Hotelroom.controller;

import com.example.Hotelroom.constants.Role;
import com.example.Hotelroom.model.Hotel;
import com.example.Hotelroom.model.User;
import com.example.Hotelroom.service.HotelService;
import com.example.Hotelroom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
@CrossOrigin
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private UserRepository userRepository;

    private boolean isAdmin(String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && userOpt.get().getRole() == Role.ADMIN;
    }

    @PostMapping
    public Object addHotel(@RequestParam String userId, @RequestBody Hotel hotel) {
        if (isAdmin(userId)) {
            return hotelService.addHotel(hotel);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. Only Admin can add hotels.");
    }

    @DeleteMapping("/{id}")
    public String deleteHotel(@RequestParam String userId, @PathVariable String id) {
        if (isAdmin(userId)) {
            hotelService.deleteHotel(id);
            return "Hotel deleted successfully";
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. Only Admin can delete hotels.");
    }
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/filter")
    public List<Hotel> filterHotels(
            @RequestParam String location,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double minRating) {

        return hotelService.filterHotels(location, name, address, minRating);
    }
    @PutMapping("/{id}")
    public Hotel updateHotel(@RequestParam String userId, @PathVariable String id, @RequestBody Hotel hotel) {
        if (isAdmin(userId)) {
            return hotelService.updateHotel(id, hotel);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. Only Admin can update hotels.");
    }

}
