package com.example.Hotelroom.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Hotelroom.model.User;
import com.example.Hotelroom.repository.UserRepository;
import com.example.Hotelroom.dto.LoginRequest;
import com.example.Hotelroom.exceptions.EmailAlreadyExistsException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User userDetails) {
        Optional<User> existingUser = userRepository.findByEmail(userDetails.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        return userRepository.save(userDetails);
    }

    public Optional<User> login(LoginRequest request) {
        return userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
    }
}
