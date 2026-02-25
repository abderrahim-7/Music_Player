package com.musicplayer.backend.Service;

import java.util.Optional;

import com.musicplayer.backend.model.User;

public interface UserService {

    User creatUser(User user);

    Optional<User> getUserById(Long id);

    Optional<User> getUserByUsername(String username);

    void deleteUser(Long id);

}