package com.example.Hotelroom.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Hotelroom.dto.LoginRequest;
import com.example.Hotelroom.dto.LoginResponse;
import com.example.Hotelroom.model.User;
import com.example.Hotelroom.repository.UserRepository;
import com.example.Hotelroom.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService as;

    @Autowired
    private UserRepository ur;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(as.registerUser(userDetails));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = as.login(request);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

   

    @GetMapping("/getUserId")
    public String getUserIdByEmail(@RequestParam String email) {
        Optional<User> userOpt = ur.findByEmail(email);
        return userOpt.map(User::getId).orElse("");
    }

    @GetMapping("/getUserById")
    public User getUserById(@RequestParam String userId) {
        return ur.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    

}
