package com.example.Hotelroom.dto;

import com.example.Hotelroom.constants.Role;

public class LoginResponse {

    private String message;
    private String userId;
    private String email;
    private Role role;


	public LoginResponse() {
    }

    public LoginResponse(String message, String userId, String email,Role role) {
        this.message = message;
        this.userId = userId;
        this.email = email;
        this.role= role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}