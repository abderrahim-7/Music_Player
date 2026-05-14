package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Artist;
import com.example.demo.model.Song;
import com.example.demo.service.ArtistService;
import com.example.demo.service.SongService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/artists")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/")
    public List<Artist> getAllArtists(@RequestParam int page, @RequestParam int limit) {
        return artistService.getAllArtists(page, limit);
    }

    @GetMapping("/{id}")
    public Artist getArtistById(@RequestParam String id) {
        return artistService.getArtistById(id);
    }

}