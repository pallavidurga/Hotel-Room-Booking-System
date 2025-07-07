package com.example.Hotelroom.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.Hotelroom.model.User;


public interface UserRepository  extends MongoRepository<User, String>{
	
	@Query("{'email' : ?0}")
	Optional<User>findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email, String password);
}
