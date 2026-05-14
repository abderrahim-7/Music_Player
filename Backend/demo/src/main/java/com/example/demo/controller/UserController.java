package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    // Helper: get the Supabase user ID from the security context
    private String getCurrentUserId() {
        return (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    @PostMapping
    public ResponseEntity<User> createProfile(@RequestBody ProfileRequest request) {
        User profile = service.createProfile(
                getCurrentUserId(),
                request.username(),
                request.birthDate(),
                request.genres());
        return ResponseEntity.status(201).body(profile);
    }

    @GetMapping
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(service.getProfile(getCurrentUserId()));
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(@RequestBody ProfileRequest request) {
        User profile = service.updateProfile(
                getCurrentUserId(),
                request.username(),
                request.birthDate(),
                request.genres());
        return ResponseEntity.ok(profile);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProfile() {
        service.deleteProfile(getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    public record ProfileRequest(String username, String birthDate, List<String> genres) {
    }
}