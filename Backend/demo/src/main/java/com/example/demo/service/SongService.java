package com.example.demo.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.model.Song;
import com.example.demo.repository.SongRepo;

@Service
public class SongService {

    private final SongRepo songRepo;

    public SongService(SongRepo songRepo) {
        this.songRepo = songRepo;
    }

    public List<Song> getAllSongs(int page, int limit) {
        return songRepo.findAll(PageRequest.of(page, limit)).getContent();
    }

    public Song getSongById(String id) {
        return songRepo.findById(id).orElse(null);
    }
}
