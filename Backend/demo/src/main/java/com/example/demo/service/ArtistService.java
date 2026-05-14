package com.example.demo.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.model.Artist;
import com.example.demo.model.Song;
import com.example.demo.repository.ArtistRepo;

@Service
public class ArtistService {

    private final ArtistRepo artistRepo;

    public ArtistService(ArtistRepo artistRepo) {
        this.artistRepo = artistRepo;
    }

    public List<Artist> getAllArtists(int page, int limit) {
        return artistRepo.findAll(PageRequest.of(page, limit)).getContent();
    }

    public Artist getArtistById(String id) {
        return artistRepo.findById(id).orElse(null);
    }

}
