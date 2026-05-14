package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Song;
import com.example.demo.service.SongService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/songs")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/")
    public List<Song> getAllSongs(@RequestParam int page, @RequestParam int limit) {
        return songService.getAllSongs(page, limit);
    }

    @GetMapping("/{id}")
    public Song getSongById(@RequestParam String id) {
        return songService.getSongById(id);
    }

}
