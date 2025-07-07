package com.example.Hotelroom.service;

import com.example.Hotelroom.model.Hotel;
import com.example.Hotelroom.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }
    public void deleteHotel(String id) {
        hotelRepository.deleteById(id);
    }
    public List<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocationIgnoreCase(location);
    }
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    public Hotel updateHotel(String id, Hotel updatedHotel) {
        Hotel existingHotel = hotelRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Hotel not found"));

        existingHotel.setName(updatedHotel.getName());
        existingHotel.setLocation(updatedHotel.getLocation());
        existingHotel.setAddress(updatedHotel.getAddress());
        existingHotel.setRating(updatedHotel.getRating());
        existingHotel.setPhoneno(updatedHotel.getPhoneno());
        existingHotel.setImageUrl(updatedHotel.getImageUrl());

        return hotelRepository.save(existingHotel);
    }


    public List<Hotel> filterHotels(String location, String name, String address, Double minRating) {

        if (name != null && !name.isEmpty()) {
            return hotelRepository.findByLocationIgnoreCaseAndNameIgnoreCase(location, name);
        } else if (address != null && !address.isEmpty() && minRating != null) {
            return hotelRepository.findByLocationIgnoreCaseAndAddressIgnoreCaseAndRatingGreaterThanEqual(location, address, minRating);
        } else if (address != null && !address.isEmpty()) {
            return hotelRepository.findByLocationIgnoreCaseAndAddressIgnoreCase(location, address);
        } else if (minRating != null) {
            return hotelRepository.findByLocationIgnoreCaseAndRatingGreaterThanEqual(location, minRating);
        } else {
            return hotelRepository.findByLocationIgnoreCase(location);
        }
    }
    public Optional<Hotel> getHotelById(String hotelId) {
        return hotelRepository.findById(hotelId);
    }

}
