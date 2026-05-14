package com.example.demo.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.model.Album;
import com.example.demo.repository.AlbumRepo;

@Service
public class AlbumService {

    private final AlbumRepo albumRepo;

    public AlbumService(AlbumRepo albumRepo) {
        this.albumRepo = albumRepo;
    }

    public List<Album> getAllAlbums(int page, int limit) {
        return albumRepo.findAll(PageRequest.of(page, limit)).getContent();
    }

    public Album getAlbumById(String id) {
        return albumRepo.findById(id).orElse(null);
    }
}
