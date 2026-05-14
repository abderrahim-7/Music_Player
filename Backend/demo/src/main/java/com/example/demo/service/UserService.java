package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo repository;

    public User createProfile(String supabaseId, String username,
            String birthDate, List<String> genres) {
        if (repository.findBySupabaseId(supabaseId).isPresent()) {
            throw new IllegalStateException("Profile already exists");
        }
        if (repository.existsByUsername(username)) {
            throw new IllegalStateException("Username already taken");
        }

        User profile = new User();
        profile.setSupabaseId(supabaseId);
        profile.setUsername(username);
        profile.setBirthDate(birthDate);
        profile.setPrefered_genres(genres);

        return repository.save(profile);
    }

    public User getProfile(String supabaseId) {
        return repository.findBySupabaseId(supabaseId)
                .orElseThrow(() -> new NoSuchElementException("Profile not found"));
    }

    public User updateProfile(String supabaseId, String username,
            String birthDate, List<String> genres) {
        User profile = getProfile(supabaseId);
        profile.setUsername(username);
        profile.setBirthDate(birthDate);
        profile.setPrefered_genres(genres);
        return repository.save(profile);
    }

    public void deleteProfile(String supabaseId) {
        User profile = getProfile(supabaseId);
        repository.delete(profile);
    }
}
