package com.example.Hotelroom.repository;

import com.example.Hotelroom.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HotelRepository extends MongoRepository<Hotel, String> {

    List<Hotel> findByLocationIgnoreCase(String location);

    List<Hotel> findByLocationIgnoreCaseAndNameIgnoreCase(String location, String name);

    List<Hotel> findByLocationIgnoreCaseAndAddressIgnoreCase(String location, String address);

    List<Hotel> findByLocationIgnoreCaseAndRatingGreaterThanEqual(String location, double rating);

    List<Hotel> findByLocationIgnoreCaseAndAddressIgnoreCaseAndRatingGreaterThanEqual(String location, String address, double rating);
}
