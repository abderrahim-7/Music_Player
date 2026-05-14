package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Album;
import com.example.demo.model.Song;
import com.example.demo.service.AlbumService;
import com.example.demo.service.SongService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/albums")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/")
    public List<Album> getAllAlbums(@RequestParam int page, @RequestParam int limit) {
        return albumService.getAllAlbums(page, limit);
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@RequestParam String id) {
        return albumService.getAlbumById(id);
    }

}
